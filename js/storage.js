const Store = {
  get(k, fallback, ok = () => true) {
    try { const v = JSON.parse(localStorage.getItem('facturo.' + k)); return v !== null && ok(v) ? v : fallback; }
    catch { return fallback; }
  },
  set(k, v) {
    try { localStorage.setItem('facturo.' + k, JSON.stringify(v)); return true; } catch { return false; }
  }
};
