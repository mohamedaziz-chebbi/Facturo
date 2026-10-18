const Inv = (() => {
  const r2 = n => Math.round((n + Number.EPSILON) * 100) / 100;
  const num = v => Math.max(0, parseFloat(v) || 0);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const loc = () => (L.cur === 'fr' ? 'fr-FR' : 'en-US');
  const money = (v, c) => { try { return new Intl.NumberFormat(loc(), { style: 'currency', currency: c || 'EUR' }).format(v); } catch { return v.toFixed(2); } };
  const date = s => { const d = new Date(s + 'T00:00:00'); return s && !isNaN(d) ? new Intl.DateTimeFormat(loc(), { dateStyle: 'medium' }).format(d) : ''; };
  const line = i => { const g = num(i.q) * num(i.p); return r2(g - g * Math.min(100, num(i.disc)) / 100); };
  function calc(d) {
    let sub = 0, dis = 0, tax = 0;
    for (const i of d.items) {
      const g = num(i.q) * num(i.p), x = g * Math.min(100, num(i.disc)) / 100;
      sub += g; dis += x; tax += (g - x) * num(i.tax) / 100;
    }
    const total = r2(sub - dis + tax);
    const paid = d.type === 'invoice' ? (d.status === 'paid' ? total : Math.min(num(d.paid), total)) : 0;
    return { sub: r2(sub), dis: r2(dis), tax: r2(tax), total, paid: r2(paid), bal: r2(total - paid) };
  }
  const status = d => d.type === 'invoice' && d.status === 'unpaid' && d.due && d.due < new Date().toISOString().slice(0, 10) ? 'overdue' : d.status;
  function next(docs, type, s) {
    const p = (type === 'invoice' ? s.pi : s.pq) || 'DOC', y = new Date().getFullYear();
    let n = docs.filter(d => d.type === type).length + 1, id;
    do { id = `${p}-${y}-${String(n++).padStart(3, '0')}`; } while (docs.some(d => d.number === id));
    return id;
  }
  const lines = (...a) => a.filter(Boolean).map(esc).join('<br>');
  function render(d) {
    const c = d.company, k = d.client, T = calc(d), st = status(d), m = v => money(v, d.cur);
    const rows = d.items.map(i => `<tr><td>${esc(i.d)}</td><td>${num(i.q)}</td><td>${m(num(i.p))}</td><td>${num(i.disc)}%</td><td>${num(i.tax)}%</td><td>${m(line(i))}</td></tr>`).join('');
    const tr = (l, v, b) => `<div class="tr${b ? ' b' : ''}"><span>${t(l)}</span><span>${m(v)}</span></div>`;
    return `<div class="doc"><div class="dh"><div>${c.logo ? `<img src="${esc(c.logo)}" alt="" class="dlogo">` : ''}<h2>${esc(c.name)}</h2><p>${lines(c.address, c.email, c.phone, c.taxId && t('l_taxId') + ': ' + c.taxId)}</p></div>
<div class="dr"><h1>${t(d.type).toUpperCase()}</h1><p>${esc(d.number)}</p>${d.type === 'invoice' ? `<span class="badge ${st}">${t('st_' + st)}</span>` : ''}</div></div>
<div class="dm"><div><h4>${t('bill_to')}</h4><p>${lines(k.name, k.company, k.address, k.email, k.phone, k.taxId && t('l_taxId') + ': ' + k.taxId)}</p></div>
<div><h4>${t('l_issue')}</h4><p>${date(d.issue)}</p></div><div><h4>${t(d.type === 'invoice' ? 'l_due' : 'l_valid')}</h4><p>${date(d.due)}</p></div></div>
<div class="scroll"><table><thead><tr><th>${t('f_desc')}</th><th>${t('f_qty')}</th><th>${t('f_price')}</th><th>${t('f_disc')}</th><th>${t('f_tax')}</th><th>${t('total')}</th></tr></thead><tbody>${rows}</tbody></table></div>
<div class="tots">${tr('subtotal', T.sub)}${tr('discount', -T.dis)}${tr('tax', T.tax)}${tr('total', T.total, 1)}${d.type === 'invoice' ? tr('paidl', T.paid) + tr('balance', T.bal, 1) : ''}</div>
${c.pay ? `<h4>${t('pay_info')}</h4><p>${lines(...String(c.pay).split('\n'))}</p>` : ''}${d.notes ? `<h4>${t('l_notes')}</h4><p>${lines(...String(d.notes).split('\n'))}</p>` : ''}
<footer>${esc(c.name)} · ${t('foot')} · Facturo v1.0</footer></div>`;
  }
  return { calc, line, num, status, next, render, money, date };
})();
