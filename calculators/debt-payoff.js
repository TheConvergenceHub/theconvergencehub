/*
 * Debt payoff calculator (avalanche vs snowball)
 * Browser script used on https://theconvergencehub.com/debt-payoff-calculator
 * MIT License, Copyright (c) 2026 The Convergence Hub
 * Estimates only, not financial advice. It expects the matching input elements on the page (see the live page for the HTML).
 */
(function(){
function $(i){return document.getElementById(i)}
function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
function sim(debts,extra,mode){
 var d=debts.map(function(x){return {n:x.n,b:x.b,r:x.a/1200,m:x.m,paid:-1}});
 var month=0,interest=0,guard=1200;
 while(d.some(function(x){return x.b>0.005})&&month<guard){
  month++;
  d.forEach(function(x){if(x.b>0){var i=x.b*x.r;x.b+=i;interest+=i}});
  var pool=extra+d.reduce(function(s,x){return s+(x.b>0?x.m:0)},0);
  // minimums
  d.forEach(function(x){if(x.b>0){var p=Math.min(x.m,x.b);x.b-=p;pool-=p}});
  var order=d.filter(function(x){return x.b>0}).sort(function(a,b){return mode==='av'?(b.r-a.r||a.b-b.b):(a.b-b.b||b.r-a.r)});
  for(var k=0;k<order.length&&pool>0.005;k++){var p2=Math.min(pool,order[k].b);order[k].b-=p2;pool-=p2}
  d.forEach(function(x){if(x.b<=0.005&&x.paid<0){x.b=0;x.paid=month}});
 }
 return {months:month,interest:interest,done:!d.some(function(x){return x.b>0.005}),d:d};
}
$('dpGo').addEventListener('click',function(){
 var debts=[],bad='';
 for(var i=1;i<=5;i++){var b=parseFloat($('db'+i).value),a=parseFloat($('da'+i).value),m=parseFloat($('dm'+i).value),n=$('dn'+i).value||('Debt '+i);
  if(isNaN(b)&&isNaN(a)&&isNaN(m))continue;
  if(!(b>0)||isNaN(a)||a<0||a>100||!(m>0)){bad='Row '+i+' needs a balance, an APR between 0 and 100, and a minimum payment above 0.';break}
  debts.push({n:n,b:b,a:a,m:m});}
 var extra=parseFloat($('dpExtra').value);if(isNaN(extra)||extra<0)extra=0;
 var out=$('dpOut');
 if(bad){out.innerHTML='<div class="answer-box">'+bad+'</div>';return}
 if(!debts.length){out.innerHTML='<div class="answer-box">Enter at least one debt.</div>';return}
 var low=debts.filter(function(x){return x.m<=x.b*x.a/1200});
 var A=sim(debts,extra,'av'),S=sim(debts,extra,'sn');
 var warn=low.length?'<p><strong>Warning:</strong> the minimum payment on '+low.map(function(x){return x.n}).join(', ')+' does not cover its monthly interest, so the balance may never shrink without extra payments.</p>':'';
 function line(r,label){if(!r.done)return '<p><strong>'+label+':</strong> not paid off within 100 years at these payments. Increase the payments.</p>';var y=Math.floor(r.months/12),mo=r.months%12;return '<p><strong>'+label+':</strong> debt-free in '+r.months+' months ('+y+' yr '+mo+' mo). Total interest: about '+money(r.interest)+'.</p>'}
 var diff=(A.done&&S.done)?'<p>Avalanche saves about '+money(S.interest-A.interest)+' in interest compared with snowball'+(A.months<S.months?' and finishes '+(S.months-A.months)+' months sooner':'')+'.</p>':'';
 out.innerHTML='<div class="answer-box"><strong>Your results</strong>'+line(A,'Avalanche (highest rate first)')+line(S,'Snowball (smallest balance first)')+diff+'</div>'+warn;
});
})();
