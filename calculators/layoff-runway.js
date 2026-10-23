/*
 * Layoff runway calculator
 * Browser script used on https://theconvergencehub.com/layoff-runway-calculator
 * MIT License, Copyright (c) 2026 The Convergence Hub
 * Estimates only, not financial advice. It expects the matching input elements on the page (see the live page for the HTML).
 */
(function(){
function g(id){var v=parseFloat(document.getElementById(id).value);return isFinite(v)&&v>0?v:0;}
function sim(cut){
 var bal=g('lrCash')+g('lrSev'),exp=g('lrExp')*(1-cut/100),ins=g('lrIns'),inc=g('lrInc'),ben=g('lrBen'),wait=g('lrWait')/4.33,dur=g('lrDur');
 for(var m=0;m<240;m++){
  var b=exp+ins-inc-((m>=wait&&m<wait+dur)?ben:0);
  if(b<0)b=0;
  if(b>=bal){return m+(b>0?bal/b:0);}
  bal-=b;
 }
 return 240;
}
function fm(m){return m>=240?'20+ years':(Math.round(m*10)/10)+' months';}
function fd(m){if(m>=240)return 'no run-out date';var d=new Date();d.setDate(d.getDate()+Math.round(m*30.4));return d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});}
function money(n){return '$'+Math.round(n).toLocaleString();}
document.getElementById('lrGo').addEventListener('click',function(){
 var out=document.getElementById('lrOut');
 var pool=g('lrCash')+g('lrSev'),exp=g('lrExp');
 if(exp<=0||pool<=0){out.innerHTML='<p>Enter your savings and your monthly must-pay bills to see a result.</p>';return;}
 var cut=Math.min(50,g('lrCut'));
 var base=sim(0),chosen=sim(cut);
 var h='<div class="answer-box"><strong>Your runway: '+fm(base)+'</strong> (money runs out around '+fd(base)+').';
 if(cut>0){h+=' Cutting '+cut+'% of must-pay bills stretches that to <strong>'+fm(chosen)+'</strong> (around '+fd(chosen)+').';}
 h+='</div>';
 h+='<h3>How spending cuts change it</h3><table><tr><th>Cut</th><th>Runway</th><th>Runs out around</th></tr>';
 [0,10,20,30,40].forEach(function(c){var m=sim(c);h+='<tr><td>'+c+'%</td><td>'+fm(m)+'</td><td>'+fd(m)+'</td></tr>';});
 h+='</table>';
 h+='<h3>Emergency fund targets for next time</h3><p>Three, six and nine months of your must-pay bills are '+money(exp*3)+', '+money(exp*6)+' and '+money(exp*9)+'. Your available money today is '+money(pool)+'.</p>';
 if(base<3){h+='<p><strong>Under three months:</strong> do the first-7-days list below today, and treat finding income or cutting bills as the priority this week.</p>';}
 else if(base<6){h+='<p><strong>Three to six months:</strong> you have time, but start your search now and trim bills so the run-out date moves later.</p>';}
 else{h+='<p><strong>Six months or more:</strong> you have a cushion. Keep the cut plan ready in case the search takes longer than expected.</p>';}
 out.innerHTML=h;
});
})();
