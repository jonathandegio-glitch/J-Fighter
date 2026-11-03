/* Front door: player -> rival -> arena/difficulty, with future locked roster slots. */
(() => {
  'use strict';
  const root=document.querySelector('#front-menu'),game=window.__game;
  const fighters={
    nib:{name:'BAD BENNY',tag:'THE COMMANDER',race:'SATIRICAL FIGHTER',portrait:'assets/nib/ui/portrait.webp',art:'assets/menu/nib-select.webp',detail:'A relentless forward-pressure fighter.',basic:'IRON COMMAND',ultimate:'DUCE BOMBER',style:'Rushdown / carica / buff / bombardamento',color:'#e0b283'},
    solan:{name:'GENERAL H.H.',tag:'THE GENERAL',race:'SATIRICAL FIGHTER',portrait:'assets/solan/ui/portrait.webp',art:'assets/menu/solan-select.webp',detail:'Controls range and calls in air strikes.',basic:'IRON DISCIPLINE',ultimate:'TOTAL BARRAGE',style:'Zoner / raid / buff / raffica',color:'#bdc47c'}
  };
  // Showcase fighters (assets/showcase/showcase.js) fill roster slots with avatar and art; they cannot be confirmed yet.
  const showcase={};
  const info=id=>fighters[id]||showcase[id],soon=id=>!!showcase[id];
  const opened=[...Object.keys(fighters),...Object.keys(showcase)];
  // Touch screens have no hover: a tap only previews a fighter; the yellow CONFIRM button picks it.
  const touch=document.documentElement.classList.contains('touch');
  // Phones get a fullscreen button on the home screen (no trip to Settings). Hidden where the page cannot go fullscreen
  // (iPhone Safari); inside the mobile shell the shell's document is the one that goes fullscreen.
  const canFullscreen=touch&&(()=>{try{const d=window.parent!==window?window.parent.document:document;return !!(d.fullscreenEnabled||d.webkitFullscreenEnabled);}catch(_){return false;}})();
  // Until the phone has been fullscreen once (button or the shell's first-touch fullscreen), the button glows.
  const hintKey='aether.fullscreenHint';
  let fullscreenHint=canFullscreen&&(()=>{try{return localStorage.getItem(hintKey)!=='seen';}catch(_){return true;}})();
  function dismissFullscreenHint(){if(!fullscreenHint)return;fullscreenHint=false;try{localStorage.setItem(hintKey,'seen');}catch(_){}root.querySelector('.menu-fullscreen')?.classList.remove('hinted');}
  if(fullscreenHint)try{const d=window.parent!==window?window.parent.document:document;d.addEventListener('fullscreenchange',()=>{if(d.fullscreenElement)dismissFullscreenHint();});}catch(_){}
  // Warm the small roster portraits so the grid appears at once. The large select art and arena pictures are fetched when
  // shown and then come from the browser cache; holding all of them decoded would waste a phone's image memory.
  const warm=opened.map(id=>info(id).portrait).filter(Boolean).map(src=>{const im=new Image();im.decoding='async';im.src=src;return im;});
  const roster=[...opened,...Array.from({length:0},(_,i)=>'locked-'+i)];
  // lockIn: the pending step change while a confirmed fighter flashes 3 times (PICK_FLASH s each); input waits for it.
  const PICK_FLASH=.3;let lockIn=null,lockTicks=[];
  let screen='home',step=0,mode='versus',player='nib',enemy='solan',hover='nib',stage='piazza',level='medium',result=null,interacted=false,lastSound=0;
  const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let backgroundEnabled=false,backgroundVideo=null,videoPlayToken=0;
  const backgroundToggle=document.querySelector('#menu-video-toggle');
  function shouldAnimate(){return backgroundEnabled && screen==='home' && !root.hidden && !document.hidden && !game.snapshot().settingsOpen;}
  function syncBackground(){
    if(!backgroundVideo)return;const token=++videoPlayToken;
    if(!shouldAnimate()){backgroundVideo.pause();return;}
    if(backgroundVideo.paused){const p=backgroundVideo.play();p?.catch(()=>{if(token===videoPlayToken)backgroundVideo.dataset.state='autoplay-blocked';});}
  }
  function attachBackground(){
    if(screen!=='home')return;
    if(!backgroundVideo && backgroundEnabled){
      backgroundVideo=document.createElement('video');backgroundVideo.id='menu-background-video';backgroundVideo.className='menu-background-video';
      backgroundVideo.muted=true;backgroundVideo.defaultMuted=true;backgroundVideo.autoplay=true;backgroundVideo.loop=true;backgroundVideo.playsInline=true;backgroundVideo.preload='auto';
      backgroundVideo.setAttribute('muted','');backgroundVideo.setAttribute('playsinline','');backgroundVideo.setAttribute('aria-hidden','true');backgroundVideo.tabIndex=-1;backgroundVideo.disablePictureInPicture=true;
      backgroundVideo.poster='assets/menu/jf-home.webp';backgroundVideo.dataset.state='loading';
      backgroundVideo.addEventListener('playing',()=>{if(!shouldAnimate()){backgroundVideo.pause();return;}backgroundVideo.classList.add('is-playing');backgroundVideo.dataset.state='playing';});
      backgroundVideo.addEventListener('error',()=>{backgroundVideo.classList.remove('is-playing');backgroundVideo.dataset.state='poster-fallback';});
      backgroundVideo.src='';
    }
    if(backgroundVideo)root.querySelector('.home-art')?.prepend(backgroundVideo);
    syncBackground();
  }
  if(backgroundToggle){backgroundToggle.checked=backgroundEnabled;backgroundToggle.onchange=e=>{backgroundEnabled=e.target.checked;attachBackground();syncBackground();};}
  document.addEventListener('visibilitychange',syncBackground);
  function sfx(kind='move',explicit=false){if(!interacted&&!explicit)return;interacted=true;const now=performance.now();if(kind==='move'&&now-lastSound<75)return;lastSound=now;game.menuSound(kind);}
  root.addEventListener('pointerdown',()=>{interacted=true;},true);
  const brand='<span class="wordmark">J<span>-FIGHTER</span><i>✦</i></span>';
  const footer=()=>'<footer class="menu-footer"><span><kbd>W A S D</kbd> / <kbd>↑ ↓ ← →</kbd> SELECT &nbsp; <kbd>ENTER</kbd> CONFIRM &nbsp; <kbd>ESC</kbd> BACK</span><span>LOCAL PLAY <i></i> ALPHA 0.2</span></footer>';
  function navHeader(title,subtitle){return `<header class="select-header"><button class="menu-back" data-cmd="back" aria-label="Kembali">← <span>BACK</span></button><div><span class="eyebrow">${subtitle}</span><h1>${title}</h1></div>${brand}</header>`;}
  function fighterPanel(id,side){const f=info(id);return `<div class="fighter-plinth ${side} ${f?'':'unknown'} ${soon(id)?'soon':''}"><div class="plinth-light"></div><span class="side-tag">${side==='player'?'P1 / YOUR FIGHTER':'CPU / YOUR RIVAL'}</span><img class="selection-art" src="${f?.art||'assets/menu/locked.svg'}" alt="${f?.name||'Karakter belum dipilih'}"><div class="fighter-copy"><span>${f?.tag||'AWAITING CHALLENGER'}</span><h2>${f?.name||'???'}</h2><p>${f?.race||'ROSTER EXPANDING'}</p><small>${f?.detail||'A new challenger is on the way.'}</small></div></div>`;}
  function render(){
    if(lockIn){clearTimeout(lockIn);lockIn=null;}for(const t of lockTicks)clearTimeout(t);lockTicks=[];
    if(backgroundVideo){videoPlayToken++;backgroundVideo.pause();backgroundVideo.remove();}
    root.dataset.screen=screen;root.dataset.step=String(step);root.dataset.mode=mode;
    if(screen==='home'){
      root.innerHTML=`<div class="home-art video-backed"></div><div class="menu-grain"></div><header class="home-top"><span></span><span class="home-top-right"><span class="build-tag">J-FIGHTER / ALPHA 0.2</span>${canFullscreen?`<button class="menu-fullscreen${fullscreenHint?' hinted':''}" data-cmd="fullscreen" aria-label="Layar penuh" title="Layar penuh"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>`:''}</span></header><div class="home-content"><div class="home-title"><h1>J-<br><em>FIGHTER</em><i>✦</i></h1><p>Due rivali. Un solo vincitore.</p></div><nav class="home-nav" aria-label="Main menu"><button data-cmd="versus"><span class="nav-index">01</span><span>VS COMPUTER<small>Choose your rival. Claim the arena.</small></span><b>↗</b></button><button data-cmd="training"><span class="nav-index">02</span><span>TRAINING<small>Learn your fighter. Refine your combo.</small></span><b>↗</b></button><button data-cmd="settings"><span class="nav-index">03</span><span>PENGATURAN</span><b>↗</b></button><button data-cmd="about"><span class="nav-index">04</span><span>ABOUT</span><b>↗</b></button></nav></div><div class="home-caption"><span>BAD BENNY</span><i>VS</i><span>GENERAL H.H.</span><small>SATIRICAL ARCADE FIGHTING</small></div><footer class="home-footer"><span></span><span id="menu-ready">${game.snapshot().ready?'READY TO FIGHT':'PREPARING ARENA…'}</span></footer>`;
    } else if(screen==='select'){
      root.innerHTML=`<div class="selection-backdrop"></div>${navHeader(step===0?'SELECT YOUR FIGHTER':'SELECT YOUR RIVAL',mode==='versus'?'VERSUS COMPUTER':'TRAINING ROOM')}<div class="selection-steps"><span class="${step===0?'current':'done'}">01 <b>PLAYER</b></span><i></i><span class="${step===1?'current':''}">02 <b>RIVAL</b></span><i></i><span>03 <b>ARENA</b></span></div><div class="select-stage"><div id="player-preview">${fighterPanel(step===0?hover:player,'player')}</div><div class="roster-center"><div class="roster-caption"><strong>${step===0?'PLAYER 1':'COMPUTER'}</strong><span>CHOOSE A FIGHTER</span></div><div class="roster-grid" role="group" aria-label="Character roster">${roster.map((id,i)=>{const f=info(id);return `<button class="roster-tile ${id===hover?'highlight':''} ${!f?'locked':''} ${soon(id)?'soon':''}" data-fighter="${id}" aria-label="${f?f.name+' — '+f.race+(soon(id)?', not playable':''):'Slot '+(i+1)+' locked'}" aria-disabled="${!fighters[id]}"><img class="${f?'portrait-image':''}" data-portrait-side="${step===1?'enemy':'player'}" src="${f?.portrait||'assets/menu/locked.svg'}" alt=""><span>${f?.name||'LOCKED'}</span><b>${step===1&&id===player?'P1':''}</b></button>`;}).join('')}</div><div id="fighter-moves" class="fighter-moves"></div><button class="menu-primary confirm-fighter" data-cmd="confirm">${step===0?'CONFIRM FIGHTER':'CONFIRM RIVAL'} <b>→</b></button><p id="roster-notice" class="roster-notice" aria-live="polite">${roster.length>opened.length?(roster.length-opened.length)+' challenger slots reserved.':''}</p></div><div id="enemy-preview">${fighterPanel(step===1?hover:null,'enemy')}</div></div>${footer()}`;
      updatePreview(false);
    } else if(screen==='arena'){
      const st=MatchRules.stages[stage];root.innerHTML=`<div class="arena-screen-bg" style="background-image:url('${st.image}')"></div>${navHeader('SET THE STAGE',mode==='versus'?'VERSUS COMPUTER / MATCH SETUP':'TRAINING / ARENA SETUP')}<div class="arena-content"><div class="versus-strip"><div><img class="portrait-image" data-portrait-side="player" src="${fighters[player].portrait}" alt=""><span>P1<strong>${fighters[player].name}</strong></span></div><b>VS</b><div><span>CPU<strong>${fighters[enemy].name}</strong></span><img class="portrait-image" data-portrait-side="enemy" src="${fighters[enemy].portrait}" alt=""></div></div><div class="arena-window"><span class="arena-number">${String(Object.keys(MatchRules.stages).indexOf(stage)+1).padStart(2,'0')} / ${String(Object.keys(MatchRules.stages).length).padStart(2,'0')}</span><div><small>${st.tag}</small><h2>${st.name}</h2></div><span class="arena-day">✦ ${st.time||'SUNNY DAYLIGHT'}</span></div><div class="arena-tiles" role="group" aria-label="Choose an arena">${Object.entries(MatchRules.stages).map(([id,a])=>`<button class="arena-tile ${id===stage?'selected':''}" data-stage="${id}" aria-pressed="${id===stage}"><img src="${a.image}" alt=""><span>${a.name}</span></button>`).join('')}</div><div class="match-options"><div class="difficulty-area"><span class="eyebrow">${mode==='versus'?'CPU DIFFICULTY':'PRACTICE MODE'}</span>${mode==='versus'?`<div class="difficulty-buttons" role="group" aria-label="Difficulty">${Object.entries(MatchRules.difficulties).map(([id,d],i)=>`<button data-level="${id}" class="${id===level?'selected':''}" aria-pressed="${id===level}"><i>${'▰'.repeat(i+1)}</i>${d.label}</button>`).join('')}</div>`:'<p class="training-note">Unlimited time · Passive rival · Reset anytime</p>'}</div><div class="match-rules">${mode==='versus'?'<b>FIRST TO 2 WINS</b><span>BEST OF 3 ROUNDS · 90 SECONDS</span>':'<b>MAKE EVERY HIT COUNT</b><span>COMBO TRACKER · FULL MOVE SET</span>'}</div></div><button class="menu-primary start-battle" data-cmd="start" ${game.snapshot().ready?'':'disabled'}>${game.snapshot().ready?(mode==='versus'?'LET’S FIGHT':'ENTER TRAINING'):'PREPARING ARENA…'} <b>↗</b></button><p id="setup-error" role="status"></p></div>${footer()}`;
    } else if(screen==='about'){
      root.innerHTML=`<div class="home-art dim"></div>${navHeader('ABOUT J-FIGHTER','STORICAL SATIRE · ARCADE')}<article class="about-panel"><span class="eyebrow">J-FIGHTER · ARCADE</span><h2>La battaglia<br><em>inizia qui.</em></h2><p>Two satirical fighters, two arenas, special moves and Ultimates. J-Fighter is a single-player arcade demo powered by the Aether Clash engine.</p><div class="about-fighters"><p><b>BAD BENNY</b><span>Charging attacks, power-up speeches and aerial barrages.</span></p><p><b>GENERAL H.H.</b><span>Aerial strikes, temporary boosts and a final barrage.</span></p></div><div class="about-stats"><span><b>02</b>ARENAS</span><span><b>02</b>FIGHTERS</span><span><b>∞</b>RIVALRIES</span></div><small>Engine: Aether Clash · Sprite: schede originali · Typography: Rajdhani<br>Local fighting demo · Single player</small><button class="menu-primary" data-cmd="home">BACK TO MAIN MENU <b>↗</b></button></article>`;
    } else if(screen==='result'){
      const won=result.winner==='player',winner=won?result.player:result.enemy;root.innerHTML=`<div class="result-bg"></div>${navHeader('MATCH COMPLETE',MatchRules.stages[result.stage].name.toUpperCase())}<div class="result-layout"><img class="result-fighter" src="${fighters[winner].art}" alt="${fighters[winner].name}"><div class="result-copy"><span class="eyebrow">${won?'PLAYER 1':'COMPUTER'} TAKES THE MATCH</span><h1>${won?'VICTORY':'DEFEAT'}</h1><p>${fighters[winner].name} WINS</p><div class="final-score"><span>${result.playerWins}</span><i>—</i><span>${result.enemyWins}</span></div><small>${fighters[result.player].name} vs ${fighters[result.enemy].name} · ${MatchRules.difficulties[result.level].label}</small><button class="menu-primary" data-cmd="rematch">REMATCH <b>↗</b></button><button class="result-secondary" data-cmd="reselect">CHARACTER SELECT</button><button class="result-secondary" data-cmd="home">MAIN MENU</button></div></div>`;
    }
    bind();attachBackground();
  }
  function updatePreview(play=true){
    root.querySelectorAll('[data-fighter]').forEach(b=>b.classList.toggle('highlight',b.dataset.fighter===hover));
    const panel=root.querySelector(step===0?'#player-preview':'#enemy-preview');if(panel)panel.innerHTML=fighterPanel(hover,step===0?'player':'enemy');
    const f=info(hover),moves=root.querySelector('#fighter-moves');if(moves)moves.innerHTML=f?`<span>${f.style}</span>${soon(hover)?'':`<b>${f.ultimate}</b>`}`:'<span>NEW CHALLENGER</span><b>COMING LATER</b>';
    const confirm=root.querySelector('.confirm-fighter');if(confirm)confirm.setAttribute('aria-disabled',String(!fighters[hover]));if(play)sfx('move');
  }
  function focusFighter(id){if(hover===id||lockIn)return;hover=id;updatePreview();}
  function confirm(){if(lockIn)return;if(!fighters[hover]){sfx('locked',true);root.querySelector('#roster-notice').textContent=soon(hover)?showcase[hover].name+' not playable.':'Karakter ini belum terbuka.';return;}
    // The pick flashes 3 times (tile and big art) with a lock-in chime before the next step, so the screen does not jump.
    sfx('pick',true);game.announceSelection(hover);root.dataset.picking='true';
    root.querySelector(`[data-fighter="${hover}"]`)?.classList.add('picked');root.querySelector(step===0?'#player-preview':'#enemy-preview')?.classList.add('picked');
    lockTicks=[1,2].map(i=>setTimeout(()=>sfx('blink',true),i*PICK_FLASH*1000));
    lockIn=setTimeout(()=>{lockIn=null;delete root.dataset.picking;if(step===0){player=hover;step=1;hover=player==='nib'?'solan':'nib';}else{enemy=hover;screen='arena';step=2;}render();},3*PICK_FLASH*1000);
  }
  function back(){if(lockIn)return;game.stopAnnouncer();sfx('back',true);if(screen==='arena'){screen='select';step=1;hover=enemy;}else if(screen==='select'&&step===1){step=0;hover=player;}else screen='home';render();}
  function start(){if(game.startMatch({player,enemy,stage,level,mode})){document.querySelector('#arena').focus();}else {const error=root.querySelector('#setup-error');if(error)error.textContent='Game files are still loading or missing. Please refresh and try again.';sfx('locked',true);}}
  function command(cmd){
    if(lockIn)return;
    if(cmd==='fullscreen'){sfx('move',true);dismissFullscreenHint();game.toggleFullscreen?.();return;}
    if(cmd==='confirm'){confirm();return;}if(cmd==='back'){back();return;}sfx('confirm',true);
    if(cmd==='versus'||cmd==='training'){mode=cmd;screen='select';step=0;hover=player;render();}
    if(cmd==='settings')game.openSettings();if(cmd==='about'){screen='about';render();}
    if(cmd==='home'){game.stopAnnouncer();screen='home';render();}if(cmd==='start')start();
    if(cmd==='rematch'){({player,enemy,stage,level,mode}=result);start();}
    if(cmd==='reselect'){screen='select';step=0;hover=player;render();}
  }
  function bind(){
    root.querySelectorAll('[data-cmd]').forEach(b=>{b.onclick=()=>command(b.dataset.cmd);b.onpointerenter=()=>sfx('move');b.onfocus=()=>sfx('move');});
    root.querySelectorAll('[data-fighter]').forEach(b=>{b.onpointerenter=()=>focusFighter(b.dataset.fighter);b.onfocus=()=>focusFighter(b.dataset.fighter);b.onclick=()=>{focusFighter(b.dataset.fighter);if(!touch)confirm();};});
    root.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{stage=b.dataset.stage;sfx('move',true);render();root.querySelector(`[data-stage="${stage}"]`).focus();});
    root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=b.dataset.level;sfx('move',true);render();root.querySelector(`[data-level="${level}"]`).focus();});
  }
  document.addEventListener('keydown',e=>{
    if(root.hidden||document.querySelector('dialog[open]')||e.repeat)return;interacted=true;
    if(lockIn){e.preventDefault();return;}
    if(e.key==='Escape'){e.preventDefault();back();return;}
    if(screen==='select'&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s'].includes(e.key)){e.preventDefault();const offset={ArrowLeft:-1,a:-1,ArrowRight:1,d:1,ArrowUp:-4,w:-4,ArrowDown:4,s:4}[e.key],i=(roster.indexOf(hover)+offset+roster.length)%roster.length;focusFighter(roster[i]);root.querySelector(`[data-fighter="${hover}"]`).focus();return;}
    if(screen==='select'&&(e.key==='Enter'||e.key===' ')){const cmd=e.target.closest?.('[data-cmd]')?.dataset.cmd;if(cmd&&cmd!=='confirm')return;e.preventDefault();confirm();return;}
    if(screen==='arena'&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s'].includes(e.key)){
      e.preventDefault();const levels=Object.keys(MatchRules.difficulties),stages=Object.keys(MatchRules.stages),vertical=['ArrowUp','ArrowDown','w','s'].includes(e.key),backward=['ArrowLeft','ArrowUp','a','w'].includes(e.key);
      if(vertical&&mode==='versus'){level=levels[(levels.indexOf(level)+(backward?-1:1)+levels.length)%levels.length];}else{stage=stages[(stages.indexOf(stage)+(backward?-1:1)+stages.length)%stages.length];}sfx('move');render();return;
    }
    if(screen==='arena'&&e.key==='Enter'&&!e.target.closest?.('button')){e.preventDefault();command('start');return;}
    if(screen==='home'&&e.key==='Enter'&&!e.target.closest?.('button')){e.preventDefault();command('versus');return;}
    if(screen==='home'&&['ArrowUp','ArrowDown','w','s'].includes(e.key)){e.preventDefault();const list=[...root.querySelectorAll('.home-nav button')],current=list.indexOf(document.activeElement),next=(current+(['ArrowUp','w'].includes(e.key)?-1:1)+list.length)%list.length;list[next].focus();}
  });
  window.FrontEnd={syncBackground,home(){screen='home';game.setMenuOpen(true);render();},showResult(data){result=data;({player,enemy,stage,level,mode}=data);screen='result';game.setMenuOpen(true);render();},assetsReady(ok=true){if(game.snapshot().menuOpen){render();if(!ok){const status=root.querySelector('#menu-ready');if(status)status.textContent='ASSET ERROR · RELOAD REQUIRED';}}}};
  // First paint after the loading screen's download, so menu pictures come straight from the cache.
  Promise.resolve(window.AETHER_PRELOAD).then(render);
})();
