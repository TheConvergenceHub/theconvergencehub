/*
 * Trump Account compounding calculator
 * Browser script used on https://theconvergencehub.com/trump-accounts-for-your-child
 * MIT License, Copyright (c) 2026 The Convergence Hub
 * Estimates only, not financial advice. It expects the matching input elements on the page (see the live page for the HTML).
 */
(function(){
function g(id){var v=parseFloat(document.getElementById(id).value);return isNaN(v)?0:v;}
function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
function fv(s,c,r,n){var b=s;for(var y=0;y<n;y++){b=b*(1+r)+c;}return b;}
document.getElementById('taGo').addEventListener('click',function(){
 var out=document.getElementById('taOut');
 var seed=g('taSeed'),fam=g('taFam'),emp=Math.min(2500,g('taEmp')),yrs=Math.max(1,Math.min(18,Math.round(g('taYrs')||18))),r=g('taRet')/100;
 var yr=fam+emp,note='';
 if(yr>5000){yr=5000;note='<p><strong>Note:</strong> family, friend and employer deposits together are limited to $5,000 a year, so this uses $5,000.</p>';}
 var at18=fv(seed,yr,r,yrs),put=seed+yr*yrs,grow=at18-put,to65=at18*Math.pow(1+r,65-yrs);
 var h='<div class="answer-box"><strong>At 18: about '+money(at18)+'</strong>. You and others put in '+money(put)+' (including the starting deposit) and growth added about '+money(grow)+' at an assumed '+(r*100).toFixed(1)+'% a year. If nobody touches it and it keeps growing at the same rate, it would be about '+money(to65)+' at age 65, before taxes.</div>'+note;
 h+='<h3>Same child, different yearly deposits (starting deposit and growth rate as above)</h3><table><tr><th>Per year</th><th>At 18</th><th>At 65, untouched</th></tr>';
 [0,250,1000,2500,5000].forEach(function(c){var a=fv(seed,c,r,yrs);h+='<tr><td>'+money(c)+'</td><td>'+money(a)+'</td><td>'+money(a*Math.pow(1+r,65-yrs))+'</td></tr>';});
 h+='</table><p>Why the last column is so large: money earns growth on its earlier growth. Money in by year 1 gets all the years of compounding, so early deposits matter more than late ones.</p>';
 out.innerHTML=h;
});
})();
