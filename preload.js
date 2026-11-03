/* J-Fighter: boot immediately, assets are verified by game.js independently. */
(()=>{'use strict';window.AETHER_PRELOAD=Promise.resolve();const b=document.getElementById('boot');if(b){b.classList.add('done');setTimeout(()=>b.remove(),350);}if('serviceWorker'in navigator){navigator.serviceWorker.getRegistrations().then(regs=>Promise.all(regs.map(r=>r.unregister()))).catch(()=>{});}})();
