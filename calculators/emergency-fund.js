/*
 * Emergency fund calculator
 * Browser script used on https://theconvergencehub.com/emergency-fund-calculator
 * MIT License, Copyright (c) 2026 The Convergence Hub
 * Estimates only, not financial advice. It expects the matching input elements on the page (see the live page for the HTML).
 */
(function(){
function g(id){var v=parseFloat(document.getElementById(id).value);return isNaN(v)?0:v;}
function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
function when(mo){var d=new Date();d.setMonth(d.getMonth()+mo);return d.toLocaleDateString('en-US',{month:'long',year:'numeric'});}
document.getElementById('esGo').addEventListener('click',function(){
 var out=document.getElementById('esOut');
 var ess=g('esRent')+g('esFood')+g('esUtil')+g('esTrans')+g('esIns')+g('esDebt')+g('esOther');
 if(ess<=0){out.innerHTML='<p>Enter your monthly essential bills first.</p>';return;}
 var months=parseFloat(document.getElementById('esRisk').value)+(document.getElementById('esDep').checked?1:0);
 var target=ess*months,saved=g('esSaved'),add=g('esAdd'),gap=Math.max(0,target-saved);
 var h='<div class="answer-box"><strong>Your target: '+money(target)+'</strong> ('+months+' months of essentials at '+money(ess)+' a month). You have '+money(saved)+', which covers about '+(Math.round(saved/ess*10)/10)+' months.';
 if(gap<=0){h+=' You have reached your target.';}
 else if(add>0){var mo=Math.ceil(gap/add);h+=' At '+money(add)+' a month you reach it in '+mo+' months ('+when(mo)+').';}
 else{h+=' Enter a monthly amount to see how long it takes.';}
 h+='</div>';
 h+='<h3>Other targets for comparison</h3><table><tr><th>Goal</th><th>Amount</th><th>Still needed</th><th>Time at your savings rate</th></tr>';
 [1,3,6,9].forEach(function(n){var t=ess*n,gp=Math.max(0,t-saved);var tm=gp<=0?'Done':(add>0?Math.ceil(gp/add)+' months':'Enter a monthly amount');h+='<tr><td>'+n+(n===1?' month':' months')+'</td><td>'+money(t)+'</td><td>'+money(gp)+'</td><td>'+tm+'</td></tr>';});
 h+='</table>';
 h+='<p><strong>First milestone:</strong> one month of essentials, '+money(ess)+'. Reach that first, then keep going to your target.</p>';
 out.innerHTML=h;
});
})();
