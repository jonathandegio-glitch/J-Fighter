/* Independent Bad Benny fighting kit. No changes to native Nib/Solan. */
(() => {
  'use strict';
  const balance={cooldowns:{skill1:3,skill2:6,ultimate:18},castTime:.5,basicRefund:.05};
  const names=['IRON COMMAND','MARCH ON ROME','NATIONAL ADDRESS','DUCE BOMBER'];
  const combo=[
    {damage:6,knockback:55,reach:95,duration:.32,hitAt:.5},
    {damage:8,knockback:80,reach:92,duration:.36,hitAt:.5},
    {damage:12,knockback:165,reach:112,duration:.48,hitAt:.55}
  ];
  const slip={dash:650,behind:70};
  const delivery={cutinDuration:.78,releases:[.7,.90,1.1,1.3,1.5,1.7],speed:1250,turn:0,life:1.1,size:95,duration:2.4};
  function move(name,index=1){
    if(name==='attack')return {name:`attack${index}`,type:'attack',index,...combo[index-1]};
    if(name==='skill1')return {name,type:name,damage:19,duration:.64,knockback:220,reach:146,dash:610,hitAt:.45};
    if(name==='skill2')return {name,type:name,damage:20,duration:.72,shockwave:true,speed:850,range:760,knockback:120,hitAt:.52};
    return {name:'ultimate',type:'ultimate',duration:balance.castTime,damage:0,hitAt:1};
  }
  function start(actor,name,index=1){
    if(actor.action||['hurt','down','recover'].includes(actor.state))return false;
    if(name!=='attack'&&actor.cooldowns[name]>0)return false;
    if(name!=='attack')actor.cooldowns[name]=balance.cooldowns[name];
    actor.action={...move(name,index),t:0,fired:false,queued:0};actor.state=actor.action.name;actor.stateTime=0;return true;
  }
  function refund(actor){for(const name of Object.keys(balance.cooldowns))actor.cooldowns[name]=Math.max(0,actor.cooldowns[name]-balance.cooldowns[name]*balance.basicRefund);}
  window.BadBenny={balance,names,combo,delivery,slip,move,start,refund};
})();
