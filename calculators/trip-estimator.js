/*
 * Trip cost estimator
 * Browser script used on https://theconvergencehub.com/trip-estimator
 * MIT License, Copyright (c) 2026 The Convergence Hub
 * Runs entirely in your browser; files are not uploaded.
 */
(function(){
var TIERS={low:{n:'Budget-friendly',r:[[40,70],[90,150],[200,350]]},mid:{n:'Moderate',r:[[80,130],[160,260],[350,600]]},high:{n:'Pricey',r:[[140,220],[280,450],[600,1100]]}};
var FOCUS=[['Tbilisi','low'],['Quy Nhon','low'],['Hanoi','low'],['Tirana','low'],['Puerto Escondido','mid'],['Recife','mid'],['Madeira','mid'],['Kotor','mid'],['Tokyo','high'],['Dubai','high']];
var LV=[['Just get me there','Budget, no frills. Free and cheap sights, local food, public transport.'],['Let me choose','Best value. The main sights plus optional paid excursions you pick.'],['We got you','Fully planned and pampered. Signature experiences, central stay, booked ahead.']];
function $(i){return document.getElementById(i);}
function el(tag,txt,cls){var e=document.createElement(tag);if(txt!=null)e.textContent=txt;if(cls)e.className=cls;return e;}
function api(p){return fetch('https://en.wikivoyage.org/w/api.php?'+p+'&format=json&origin=*').then(function(r){return r.json();});}
function getText(title){return api('action=query&prop=extracts&explaintext=1&redirects=1&titles='+encodeURIComponent(title)).then(function(d){var p=d.query&&d.query.pages||{};var k=Object.keys(p)[0];var pg=p[k];if(!pg||pg.missing!==undefined||!pg.extract)return null;return {title:pg.title,text:pg.extract};});}
function findGuide(q){return getText(q).then(function(r){if(r&&/==\s*(See|Do)\s*==/.test(r.text))return r;return api('action=query&list=search&srnamespace=0&srlimit=3&srsearch='+encodeURIComponent(q)).then(function(d){var h=(d.query&&d.query.search)||[];var i=0;function next(){if(i>=h.length)return null;var title=h[i++].title;return getText(title).then(function(x){if(x&&/==\s*(See|Do)\s*==/.test(x.text))return x;return next();});}return next();});});}
function sections(txt){var out={},cur=null;txt.split('\n').forEach(function(l){var m=l.match(/^==\s*([^=].*?)\s*==\s*$/);if(m){cur=m[1].trim();if(!out[cur])out[cur]=[];return;}if(cur&&l.trim().length>25&&!/^===/.test(l)&&!/^\s*\{\{/.test(l))out[cur].push(l.trim());});return out;}
function shorten(s){return s.length>150?s.slice(0,147).replace(/\s+\S*$/,'')+'…':s;}
function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
function list(h,items){var box=document.createDocumentFragment();if(!items.length)return box;box.appendChild(el('h4',h));var ul=el('ul');items.forEach(function(x){ul.appendChild(el('li',shorten(x)));});box.appendChild(ul);return box;}
function render(city,tier,sec,title){
 var out=$('te-out');out.textContent='';
 var nights=Math.max(1,Math.min(30,parseInt($('te-nights').value,10)||5));
 var trav=Math.max(1,Math.min(10,parseInt($('te-trav').value,10)||2));
 var T=TIERS[tier];
 var see=sec.See||[],doo=sec.Do||[],eat=sec.Eat||[];
 var h=el('h2',city+': '+nights+' nights, '+trav+(trav>1?' travelers':' traveler'));h.style.fontSize='1.3rem';out.appendChild(h);
 out.appendChild(el('p','Cost level: '+T.n+'. Ranges cover lodging, food, local transport and activities. Flights are not included.','te-note'));
 var wrap=el('div',null,'te-cards');
 LV.forEach(function(lv,i){
  var c=el('div',null,'te-card');c.appendChild(el('h3',(i+1)+'. '+lv[0]));c.appendChild(el('div',lv[1],'te-note'));
  var lo=T.r[i][0],hi=T.r[i][1];
  c.appendChild(el('div',money(lo*nights*trav)+' to '+money(hi*nights*trav)+' total','te-price'));
  c.appendChild(el('div',money(lo)+' to '+money(hi)+' per person per day','te-note'));
  if(i===0){c.appendChild(list('Visit',see.slice(0,3)));}
  if(i===1){c.appendChild(list('Visit',see.slice(0,3)));c.appendChild(list('Optional excursions',doo.slice(0,3)));}
  if(i===2){c.appendChild(list('Visit',see.slice(0,5)));c.appendChild(list('Signature experiences',doo.slice(0,4)));c.appendChild(list('Eat',eat.slice(0,3)));c.appendChild(el('p','Reserve the top experiences ahead and stay central to save transit time.','te-note'));}
  wrap.appendChild(c);
 });
 out.appendChild(wrap);
 var n=el('p',null,'te-note');n.appendChild(document.createTextNode('Ranges are our rough planning figures, not quotes, and prices change. Sights from the '));
 var a=el('a','Wikivoyage guide to '+title);a.href='https://en.wikivoyage.org/wiki/'+encodeURIComponent(title.replace(/ /g,'_'));a.target='_blank';a.rel='noopener noreferrer';n.appendChild(a);n.appendChild(document.createTextNode(' (CC BY-SA 4.0). We sell nothing and add no fee or markup.'));
 out.appendChild(n);
}
function run(q,tier){
 var st=$('te-status');st.textContent='Looking up '+q+'…';$('te-out').textContent='';
 findGuide(q).then(function(r){
  if(!r){st.textContent='We could not find a travel guide for that name. Try a city name, or a nearby larger city.';return;}
  var sec=sections(r.text);
  if(!(sec.See&&sec.See.length)&&!(sec.Do&&sec.Do.length)){st.textContent='That guide has no sight list on the main page (big cities split into districts). Try a smaller city or a district name.';return;}
  st.textContent='';render(q,tier,sec,r.title);
 }).catch(function(){st.textContent='The guide lookup failed. Check your connection and try again.';});
}
var chips=$('te-chips');
FOCUS.forEach(function(f){var b=el('button',f[0],'te-chip');b.type='button';b.appendChild(el('small',TIERS[f[1]].n));b.onclick=function(){run(f[0],f[1]);};chips.appendChild(b);});
$('te-go').onclick=function(){var q=$('te-city').value.trim();if(q)run(q,$('te-tier').value);};
$('te-city').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();$('te-go').click();}});
function tab(n){$('te-p1').hidden=n!==1;$('te-p2').hidden=n!==2;$('te-t1').setAttribute('aria-selected',n===1);$('te-t2').setAttribute('aria-selected',n===2);}
$('te-t1').onclick=function(){tab(1);};$('te-t2').onclick=function(){tab(2);};
})();
