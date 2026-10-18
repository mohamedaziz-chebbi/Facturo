(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const h = (tag, a = {}, ...c) => { const e = document.createElement(tag); for (const k in a) k.startsWith('on') ? e.addEventListener(k.slice(2), a[k]) : e.setAttribute(k, a[k]); e.append(...c); return e; };
  const DEF = { name: '', address: '', email: '', phone: '', taxId: '', logo: '', pay: '', cur: 'EUR', tax: 20, pi: 'FAC', pq: 'DEV', terms: '' };
  const CUR = ['EUR', 'USD', 'GBP', 'TND', 'MAD', 'CAD', 'CHF'], STAT = ['draft', 'unpaid', 'paid'];
  const isObj = o => o && typeof o === 'object' && !Array.isArray(o);
  L.cur = Store.get('lang', 'fr', x => x in I18N);
  let docs = Store.get('docs', [], Array.isArray).filter(d => isObj(d) && isObj(d.client) && isObj(d.company) && Array.isArray(d.items));
  let settings = { ...DEF, ...Store.get('settings', {}, isObj) };
  let cur = null, view = 'dashboard';
  const iso = (d = new Date()) => d.toISOString().slice(0, 10);
  const plus = n => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
  const num = Inv.num;

  const toast = (m, err) => { const e = h('div', err ? { class: 'err' } : {}, t(m)); $('#toast').append(e); setTimeout(() => e.remove(), 3200); };
  const persist = () => Store.set('docs', docs) || (toast('err_storage', 1), false);
  const get = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
  const set = (o, p, v) => { const ks = p.split('.'), l = ks.pop(); ks.reduce((a, k) => a[k], o)[l] = v; };
  const total = d => Inv.calc(d).total;

  function applyLang() {
    document.documentElement.lang = L.cur; $('#lang').value = L.cur;
    $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
    $('#q').placeholder = t('search');
    fill($('#fs'), [['', t('all')], ...STAT.concat('overdue').map(s => [s, t('st_' + s)]), ['quote', t('quote')]]);
    fill($('#so'), [['date', t('sort_date')], ['num', t('sort_num')], ['amt', t('sort_amt')]]);
    fill($('[data-f=status]'), STAT.map(s => [s, t('st_' + s)]));
    show(view);
  }
  function fill(sel, opts) { const v = sel.value; sel.replaceChildren(...opts.map(([val, l]) => h('option', { value: val }, l))); sel.value = v; if (sel.value !== v) sel.selectedIndex = 0; }

  function show(v) {
    view = v;
    $$('main>section').forEach(s => s.hidden = s.id !== 'v-' + v);
    $$('nav [data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === v));
    $('#side').classList.remove('open');
    if (v === 'dashboard') dash(); else if (v === 'list') list(); else if (v === 'settings') setForm(); else if (v === 'editor') fillEditor();
  }

  function dash() {
    const inv = docs.filter(d => d.type === 'invoice'), tot = inv.reduce((a, d) => a + total(d), 0), paid = inv.reduce((a, d) => a + Inv.calc(d).paid, 0);
    const m = v => Inv.money(v, settings.cur);
    $('#stats').replaceChildren(...[['s_inv', inv.length], ['s_quo', docs.length - inv.length], ['s_tot', m(tot)], ['s_paid', m(paid)], ['s_unpaid', m(tot - paid)]]
      .map(([k, v]) => h('div', { class: 'card' }, h('span', {}, t(k)), h('b', {}, String(v)))));
    $('#recent').replaceChildren(table(sorted(docs, 'date').slice(0, 5)));
  }
  const sorted = (a, k) => [...a].sort((x, y) => k === 'num' ? x.number.localeCompare(y.number) : k === 'amt' ? total(y) - total(x) : (y.issue || '').localeCompare(x.issue || '') || y.id.localeCompare(x.id));

  function list() {
    const q = $('#q').value.trim().toLowerCase(), f = $('#fs').value;
    const r = docs.filter(d => (!q || d.number.toLowerCase().includes(q) || (d.client.name || '').toLowerCase().includes(q)) && (!f || (f === 'quote' ? d.type === 'quote' : d.type === 'invoice' && Inv.status(d) === f)));
    $('#rows').replaceChildren(table(sorted(r, $('#so').value), true));
  }
  function table(r, actions) {
    if (!r.length) return h('p', { class: 'empty' }, t('empty'));
    const b = (k, fn, c = '') => h('button', { class: 'btn alt sm ' + c, onclick: fn }, t(k));
    return h('table', {}, h('thead', {}, h('tr', {}, ...['l_number', 'l_name', 'l_issue', 'total', 'l_status', ''].map(k => h('th', {}, k ? t(k) : '')))),
      h('tbody', {}, ...r.map(d => h('tr', {}, h('td', {}, d.number), h('td', {}, d.client.name || '—'), h('td', {}, Inv.date(d.issue)), h('td', {}, Inv.money(total(d), d.cur)),
        h('td', {}, d.type === 'invoice' ? h('span', { class: 'badge ' + Inv.status(d) }, t('st_' + Inv.status(d))) : t('quote')),
        h('td', {}, ...(actions ? [b('edit', () => open(d)), b('dup', () => dup(d)), b('print', () => printDoc(d)),
          d.type === 'invoice' ? b(d.status === 'paid' ? 'markunpaid' : 'markpaid', () => togglePaid(d)) : b('convert', () => convert(d)), b('del', () => del(d), 'red')] : [b('edit', () => open(d))]))))));
  }
  const dup = d => { const c = structuredClone(d); c.id = Date.now().toString(36); c.number = Inv.next(docs, d.type, settings); c.issue = iso(); c.status = 'draft'; c.paid = 0; docs.push(c); persist(); list(); toast('saved'); };
  const del = d => { if (confirm(t('confirm_del'))) { docs = docs.filter(x => x.id !== d.id); persist(); list(); } };
  const togglePaid = d => { d.status = d.status === 'paid' ? 'unpaid' : 'paid'; d.paid = d.status === 'paid' ? total(d) : 0; persist(); list(); };
  function convert(d) {
    const c = structuredClone(d); Object.assign(c, { id: Date.now().toString(36), type: 'invoice', number: Inv.next(docs, 'invoice', settings), issue: iso(), due: plus(30), status: 'draft', paid: 0 });
    docs.push(c); persist(); toast('converted'); open(c);
  }
  function printDoc(d) { $('#pz').innerHTML = Inv.render(d); window.print(); }

  const fld = (path, key, type = 'text', cls = '') => h('label', { class: cls }, h('span', { 'data-i18n': key }), h('input', { type, 'data-f': path, ...(type === 'number' ? { min: 0, step: 'any' } : {}) }));
  function buildForm() {
    const grp = (title, o, keys) => h('fieldset', {}, h('legend', { 'data-i18n': title }), h('div', { class: 'fs' }, ...keys.map(k => fld(o + '.' + k, 'l_' + k))));
    const sel = (path, key, opts, cls = '') => h('label', { class: cls }, h('span', { 'data-i18n': key }), h('select', { 'data-f': path }, ...opts.map(o => h('option', { value: o }, o))));
    $('#form').append(grp('f_company', 'company', ['name', 'address', 'email', 'phone', 'taxId']), grp('f_client', 'client', ['name', 'company', 'email', 'phone', 'address', 'taxId']),
      h('fieldset', {}, h('div', { class: 'fs' }, fld('number', 'l_number'), fld('issue', 'l_issue', 'date'), fld('due', 'l_due', 'date', 'inv-only'), fld('due', 'l_valid', 'date', 'quo-only'),
        sel('cur', 'l_cur', CUR), sel('status', 'l_status', STAT, 'inv-only'), fld('paid', 'l_paid', 'number', 'inv-only'))),
      h('fieldset', {}, h('legend', { 'data-i18n': 'f_items' }), h('div', { id: 'items' }), h('button', { class: 'btn alt', type: 'button', onclick: () => { cur.items.push({ d: '', q: 1, p: 0, disc: 0, tax: num(settings.tax) }); items(); preview(); } }, '+ ', h('span', { 'data-i18n': 'f_add' }))),
      h('label', {}, h('span', { 'data-i18n': 'l_notes' }), h('textarea', { 'data-f': 'notes', rows: 3 })));
    $$('#form [data-f]').forEach(el => el.addEventListener('input', () => {
      set(cur, el.dataset.f, el.type === 'number' ? num(el.value) : el.value);
      if (el.dataset.f === 'status' && cur.status === 'paid') { cur.paid = total(cur); $('[data-f=paid]').value = cur.paid; }
      preview();
    }));
  }
  function items() {
    const cols = [['d', 'f_desc', 'text'], ['q', 'f_qty'], ['p', 'f_price'], ['disc', 'f_disc'], ['tax', 'f_tax']];
    $('#items').replaceChildren(...cur.items.map((it, n) => h('div', { class: 'it' },
      ...cols.map(([k, key, ty = 'number']) => h('input', { type: ty, value: it[k], placeholder: t(key), 'aria-label': t(key), ...(ty === 'number' ? { min: 0, step: 'any' } : {}),
        oninput: e => { it[k] = ty === 'number' ? num(e.target.value) : e.target.value; preview(); } })),
      h('b', { class: 'lt' }), h('button', { class: 'btn red sm', type: 'button', 'aria-label': t('del'), onclick: () => { if (cur.items.length > 1) { cur.items.splice(n, 1); items(); preview(); } } }, '✕'))));
  }
  function fillEditor() {
    $('#e').dataset.type = cur.type;
    $$('#form [data-f]').forEach(el => el.value = get(cur, el.dataset.f) ?? '');
    items(); preview();
  }
  function preview() {
    $('#preview').innerHTML = Inv.render(cur);
    $$('.lt').forEach((s, i) => s.textContent = Inv.money(Inv.line(cur.items[i]), cur.cur));
  }
  function create(type) {
    return { id: Date.now().toString(36), type, number: Inv.next(docs, type, settings), issue: iso(), due: plus(30), cur: settings.cur, status: 'draft', paid: 0, company: { ...settings }, client: { name: '', company: '', email: '', phone: '', address: '', taxId: '' }, items: [{ d: '', q: 1, p: 0, disc: 0, tax: num(settings.tax) }], notes: settings.terms };
  }
  const open = d => { cur = structuredClone(d); show('editor'); };
  function save() {
    const e = [];
    if (!cur.client.name.trim()) e.push('err_client');
    if (!cur.items.some(i => String(i.d).trim() && num(i.q) > 0)) e.push('err_items');
    if (!cur.issue || (cur.due && cur.due < cur.issue)) e.push('err_dates');
    if (e.length) { toast(e[0], 1); return false; }
    const i = docs.findIndex(d => d.id === cur.id); i < 0 ? docs.push(structuredClone(cur)) : docs[i] = structuredClone(cur);
    if (persist()) toast('saved'); return true;
  }

  function setForm() {
    const f = (k, key, ty = 'text') => h('label', {}, h('span', {}, t(key)), ty === 'area' ? h('textarea', { 'data-s': k, rows: 3 }) : h('input', { type: ty, 'data-s': k, ...(ty === 'number' ? { min: 0, step: 'any' } : {}) }));
    const sel = h('label', {}, h('span', {}, t('set_cur')), h('select', { 'data-s': 'cur' }, ...CUR.map(c => h('option', { value: c }, c))));
    const logo = h('label', {}, h('span', {}, t('set_logo')), h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp', id: 'logo' }), h('img', { id: 'logoprev', alt: '', style: 'max-height:48px;margin-top:.4rem' }));
    $('#sform').replaceChildren(f('name', 'l_name'), f('address', 'l_address'), f('email', 'l_email'), f('phone', 'l_phone'), f('taxId', 'l_taxId'), logo, sel, f('tax', 'set_tax', 'number'), f('pi', 'set_pi'), f('pq', 'set_pq'), f('terms', 'set_terms', 'area'), f('pay', 'set_pay', 'area'));
    $$('#sform [data-s]').forEach(el => el.value = settings[el.dataset.s] ?? '');
    $('#logoprev').src = settings.logo || ''; $('#logoprev').hidden = !settings.logo;
    $('#logo').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      if (!/^image\/(png|jpeg|webp)$/.test(f.type) || f.size > 512000) { e.target.value = ''; return toast('err_logo', 1); }
      const r = new FileReader(); r.onload = () => { settings.logo = r.result; $('#logoprev').src = r.result; $('#logoprev').hidden = false; }; r.readAsDataURL(f);
    };
  }
  $('#s-save').onclick = () => {
    $$('#sform [data-s]').forEach(el => settings[el.dataset.s] = el.type === 'number' ? num(el.value) : el.value.trim());
    Store.set('settings', settings) ? toast('saved_set') : toast('err_storage', 1);
  };

  document.addEventListener('click', e => { const n = e.target.closest('[data-new]'); if (n) open(create(n.dataset.new)); const v = e.target.closest('[data-view]'); if (v) show(v.dataset.view); });
  $('#lang').onchange = e => { L.cur = e.target.value; Store.set('lang', L.cur); applyLang(); };
  $('#menu').onclick = () => $('#side').classList.toggle('open');
  ['#q', '#fs', '#so'].forEach(s => $(s).addEventListener('input', list));
  $('#b-save').onclick = save; $('#b-back').onclick = () => show('list'); $('#b-print').onclick = () => printDoc(cur);
  $('#b-conv').onclick = () => { if (save()) convert(docs.find(d => d.id === cur.id)); };
  buildForm(); applyLang();
})();
