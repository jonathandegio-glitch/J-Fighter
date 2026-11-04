/* General H.H. independent fighting kit: project-local fighter id general-hh, with no native Solan dependency. */
(() => {
  'use strict';
  const balance = { cooldowns:{skill1:3,skill2:6,ultimate:18}, castTime:.5, roarDamage:16, basicRefund:.05 };
  const names = ['IRON DISCIPLINE','AIR STRIKE','RALLYING CRY','TOTAL BARRAGE'];
  // Heavy greatsword chain: a little quicker than HALDOR's hammer, with big knockback. Reach sits inside the measured
  // blade tip (149/95/74 px in emitters.json; the cleave ends on the floor close in front of him).
  const combo = [
    {damage:6,knockback:90,reach:130,duration:.4,hitAt:.5},
    {damage:8,knockback:120,reach:100,duration:.46,hitAt:.5},
    {damage:12,knockback:230,reach:95,duration:.6,hitAt:.58}
  ];
  // Solar Crescent: a golden crescent slash wave at chest height, `range` px long.
  const crescent = { speed:700, range:480 };
  // Leonine Leap: SOLAN springs forward (`dash` px/s) and slams the blade down; everything within `radius` px of the
  // impact point on the floor is hit. He does not need to touch the rival.
  const leap = { dash:420, radius:120, ahead:70 };
  // Sunmane Roar: three roars 0.38 s apart (inside the 0.42 s hurt stun); each sends a tall sound wave both ways along
  // the floor that cannot be jumped (`tall`) and fades after `range` px. A rival inside 480 px takes all three (48);
  // getting farther away than that before the roars dodges them.
  const roar = { cutinDuration:.78, roars:[.8,1.18,1.56], speed:530, range:650, tall:190, size:240, duration:2.7 };
  function move(name,index=1) {
    if(name==='attack')return {name:`attack${index}`,type:'attack',index,...combo[index-1]};
    if(name==='skill1')return {name,type:name,damage:19,duration:.62,knockback:180,projectile:true,speed:610,range:700,hitAt:.58};
    if(name==='skill2')return {name,type:name,damage:0,duration:.76,buff:true,hitAt:.55};
    return {name:'ultimate',type:'ultimate',duration:balance.castTime,damage:0,hitAt:1};
  }
  function start(a,name,index=1) {
    if(a.action||a.state==='hurt'||a.state==='down'||a.state==='recover')return false;
    if(name!=='attack'&&a.cooldowns[name]>0)return false;
    if(name!=='attack')a.cooldowns[name]=balance.cooldowns[name];
    a.action={...move(name,index),t:0,fired:false,queued:0};a.state=a.action.name;a.stateTime=0;return true;
  }
  function refund(a) {for(const name of Object.keys(balance.cooldowns))a.cooldowns[name]=Math.max(0,a.cooldowns[name]-balance.cooldowns[name]*balance.basicRefund);}
  window.GeneralHH={balance,names,combo,crescent,leap,roar,move,start,refund};
})();
