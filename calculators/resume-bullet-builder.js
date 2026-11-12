/* Resume bullet builder: tool logic from The Convergence Hub.
   Live tool: https://theconvergencehub.com/resume-bullet-builder
   MIT licensed. Runs in the browser; nothing is sent or stored. The page markup and styling are not included. */
(function(){
var V={"Led and organized":["Led","Managed","Coordinated","Supervised","Trained","Mentored","Organized","Directed"],"Built and improved":["Built","Designed","Developed","Created","Launched","Improved","Streamlined","Redesigned","Automated"],"Solved and delivered":["Resolved","Delivered","Completed","Processed","Handled","Fixed","Repaired","Installed","Maintained"],"Sold and served":["Sold","Negotiated","Served","Supported","Closed","Grew","Retained","Educated"],"Analyzed and checked":["Analyzed","Audited","Tracked","Forecasted","Reduced","Increased","Saved","Verified"]};
var sel=document.getElementById('rbVerb');var o0=document.createElement('option');o0.value='';o0.textContent='Choose a verb';sel.appendChild(o0);
Object.keys(V).forEach(function(g){var og=document.createElement('optgroup');og.label=g;V[g].forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=v;og.appendChild(o)});sel.appendChild(og)});
var bullets=[];
function render(){var ul=document.getElementById('rbList');ul.innerHTML='';bullets.forEach(function(b,i){var li=document.createElement('li');li.appendChild(document.createTextNode(b+' '));var x=document.createElement('button');x.type='button';x.textContent='remove';x.style.cssText='font-size:.8rem; background:transparent; color:inherit; border:1px solid rgba(255,255,255,.4); border-radius:6px; cursor:pointer;';x.onclick=function(){bullets.splice(i,1);render()};li.appendChild(x);ul.appendChild(li)});
 var s=document.getElementById('rbOut');s.style.display=bullets.length?'block':'none';s.style.padding='18px';s.style.borderRadius='14px';s.style.color='#fff';s.style.background='linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.65)),linear-gradient(135deg,#c9a24b,#2874a6)'}
function clean(t){return t.replace(/\s+/g,' ').trim().replace(/[.;,]+$/,'')}
document.getElementById('rbAdd').onclick=function(){
 var m=document.getElementById('rbMsg');m.textContent='';
 var v=sel.value,w=clean(document.getElementById('rbWhat').value),h=clean(document.getElementById('rbHow').value),r=clean(document.getElementById('rbRes').value);
 if(!v||!w){m.textContent='Please pick a verb and say what you did.';return}
 var b=v+' '+w;if(h)b+=' '+h;
 if(r)b+=', '+r;else m.textContent='Tip: add a result, scope or quality marker if you can.';
 b+='.';bullets.push(b);render();
 ['rbWhat','rbHow','rbRes'].forEach(function(id){document.getElementById(id).value=''});sel.value='';
 if(window.gtag)try{gtag('event','resume_bullet_built')}catch(e){}
};
document.getElementById('rbCopy').onclick=function(){var m=document.getElementById('rbCopyMsg');
 var all=[].every.call(document.querySelectorAll('.tc'),function(c){return c.checked});
 if(!all){m.textContent='Please tick every item in the truth check first.';return}
 var txt=bullets.map(function(b){return '- '+b}).join('\n');
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){m.textContent='Copied.'},function(){m.textContent='Copy failed.'})}else m.textContent='Copy is not available here.'};
document.getElementById('rbClear').onclick=function(){bullets=[];[].forEach.call(document.querySelectorAll('.tc'),function(c){c.checked=false});render();document.getElementById('rbCopyMsg').textContent='Cleared.'};
var WEAK=/^(responsible for|duties included|worked on|helped( with)?|assisted( with)?|participated in|involved in|tasked with|in charge of)\b/i;
document.getElementById('ckGo').onclick=function(){
 var out=document.getElementById('ckOut');out.innerHTML='';
 var lines=document.getElementById('ckIn').value.split(/\n/).map(function(l){return l.replace(/^[\s\-•*]+/,'').trim()}).filter(Boolean);
 if(!lines.length){out.textContent='Paste at least one bullet.';return}
 lines.forEach(function(l){var f=[];var words=l.split(/\s+/).length;
  if(WEAK.test(l))f.push('Opens with a weak phrase. Start with a strong action verb instead, like Led, Built, Resolved or Reduced.');
  if(!/\d/.test(l))f.push('No number or scope. If true, add how many, how often, how much, or time saved. If you have no number, add a quality marker.');
  if(words>28)f.push('Long ('+words+' words). Try to keep it to one or two lines.');
  if(/\b(I|my|me)\b/i.test(l))f.push('Uses first person. Resumes usually drop "I" and "my".');
  if(/\b(various|many|etc|stuff|things|duties)\b/i.test(l))f.push('Vague wording. Name the specific task or tool.');
  var d=document.createElement('div');d.style.cssText='border:1px solid var(--hairline,#2a3342); border-radius:10px; padding:12px; margin:10px 0; background:rgba(255,255,255,0.03);';
  var p=document.createElement('p');p.style.margin='0 0 6px';p.textContent=l;d.appendChild(p);
  var q=document.createElement('p');q.style.cssText='margin:0; font-size:.95rem;';
  if(!f.length){q.textContent='Looks strong. Check that it is true and you can explain it.'}else{q.textContent='Ideas: '+f.join(' ')}
  d.appendChild(q);out.appendChild(d)});
};
})();
