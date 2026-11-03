/* J-Fighter Alpha 0.2.3 — startup overlay fix. */
(() => {
  window.AETHER_PRELOAD = Promise.resolve();
  let dismissed = false;
  const finish = () => {
    if (dismissed) return;
    dismissed = true;
    const boot = document.getElementById('boot');
    if (!boot) return;
    // style.css defines #boot.done, not #boot.hidden.
    boot.classList.add('done');
    boot.style.pointerEvents = 'none';
    // Remove the overlay from the document after the fade.
    setTimeout(() => boot.remove(), 650);
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, {once:true});
  // Even a missing optional asset must not hold the full-screen splash hostage.
  setTimeout(finish, 1600);
  try {
    if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations()
      .then(list => list.forEach(r => r.unregister())).catch(() => {});
    if ('caches' in window) caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('aether')).map(k => caches.delete(k))))
      .catch(() => {});
  } catch (_) {}
})();
