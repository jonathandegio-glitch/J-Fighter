/* J-Fighter Alpha 0.2.1: no legacy bulk download or old asset cache. */
(() => { const finish=()=>document.getElementById('boot')?.classList.add('hidden');
 window.AETHER_PRELOAD=Promise.resolve();
 if('serviceWorker' in navigator)navigator.serviceWorker.getRegistrations().then(list=>list.forEach(r=>r.unregister())).catch(()=>{});
 if('caches' in window)caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('aether')).map(k=>caches.delete(k)))).catch(()=>{});
 window.addEventListener('load',finish,{once:true});setTimeout(finish,1500);
})();
