/* Work style culture fit: tool logic from The Convergence Hub.
   Live tool: https://theconvergencehub.com/work-style-culture-fit
   MIT licensed. Runs in the browser; nothing is sent or stored. The page markup and styling are not included. */
(function(){
var Q=[
["A project goes off-plan. You would rather:",["The team talks it through together","Try a quick new approach","Check the numbers and re-aim at the target","Follow the agreed process to fix it"]],
["A great day at work is one where:",["People helped each other","You tried something new","You hit a clear goal","Everything ran smoothly"]],
["Feedback works best when it is:",["Kind and private, one-on-one","Fast and blunt while the work is happening","Tied to measurable results","Given in a regular scheduled review"]],
["You prefer a manager who:",["Checks in on you as a person","Lets you run with ideas","Sets tough goals and gets out of the way","Gives clear rules and expectations"]],
["Pick a new task:",["Help onboard a teammate","Prototype an untested idea","Win back a lost customer","Document and improve a process"]],
["Change at work:",["Is fine if people are treated fairly","Is exciting, the more the better","Is fine if it improves results","Is stressful unless well planned"]],
["Recognition feels best when:",["The whole team is thanked","Your idea is adopted","You are rewarded for results","Your reliability is noted"]],
["Your ideal pace is:",["Steady and friendly","Bursts of experimenting","Fast, with deadlines","Predictable"]],
["When people disagree:",["Work to keep relationships intact","Debate openly until the best idea wins","Let the data decide","Use the proper channel"]],
["Rules are:",["Guidelines for working together","Obstacles worth questioning","Fine if they help hit targets","The foundation of fairness"]]];
var W=[[{C:1},{A:1},{M:1},{H:1}],[{C:1},{A:1},{M:1},{H:1}],[{C:1},{A:.5,M:.5},{M:1},{H:1}]];
var T={C:{n:"Teamwork-first",c:"#2e9e6b",d:"You lean toward collaborative, people-centered workplaces. Kinds of places that often emphasize this: small teams, nonprofits, and parts of healthcare and education. Look for: how the team handles conflict, how much mentoring happens, and how credit is shared."},A:{n:"Build-the-new",c:"#8e44ad",d:"You lean toward innovative, flexible workplaces. Kinds of places that often emphasize this: startups, creative studios and R&D teams. Look for: how failed experiments are treated, how much autonomy people get, and how stable the funding is."},M:{n:"Results-and-targets",c:"#d35400",d:"You lean toward goal-driven, competitive workplaces. Kinds of places that often emphasize this: sales-driven and performance-managed organizations. Look for: how targets are set, how pay links to results, and what burnout looks like on that team."},H:{n:"Clear-process-and-stability",c:"#2874a6",d:"You lean toward structured, reliable workplaces. Kinds of places that often emphasize this: government, utilities and regulated industries. Look for: how decisions get made, how promotions work, and how open the organization is to improvement."}};
var box=document.getElementById('wfQs');
Q.forEach(function(q,i){var f=document.createElement('fieldset');f.style.cssText='border:1px solid var(--hairline,#2a3342); border-radius:10px; padding:16px; margin:14px 0; background:rgba(255,255,255,0.03);';var l=document.createElement('legend');l.style.cssText='padding:0 6px; font-weight:600;';l.textContent=(i+1)+'. '+q[0];f.appendChild(l);q[1].forEach(function(o,j){var lb=document.createElement('label');lb.style.cssText='display:block; margin:6px 0; cursor:pointer;';var r=document.createElement('input');r.type='radio';r.name='q'+i;r.value=j;lb.appendChild(r);lb.appendChild(document.createTextNode(' '+o));f.appendChild(lb)});box.appendChild(f)});
var last='';
document.getElementById('wfGo').onclick=function(){
 var s={C:0,A:0,M:0,H:0},k=['C','A','M','H'],n=0;
 for(var i=0;i<Q.length;i++){var r=document.querySelector('input[name=q'+i+']:checked');if(!r){document.getElementById('wfMsg').textContent='Please answer question '+(i+1)+'.';return}
  var j=parseInt(r.value,10);if(i===2){var w=W[2][j];for(var x in w)s[x]+=w[x]}else s[k[j]]+=1;n++}
 document.getElementById('wfMsg').textContent='';
 var tot=s.C+s.A+s.M+s.H;var order=k.slice().sort(function(a,b){return s[b]-s[a]});
 var bars=document.getElementById('wfBars');bars.innerHTML='';
 order.forEach(function(x){var row=document.createElement('div');row.style.margin='8px 0';var lab=document.createElement('div');lab.textContent=T[x].n+': '+s[x]+' of '+tot;lab.style.cssText='font-size:.95rem; margin-bottom:3px;';var tr=document.createElement('div');tr.style.cssText='background:rgba(255,255,255,0.12); border-radius:6px; height:16px; overflow:hidden;';var fl=document.createElement('div');fl.style.cssText='height:16px; width:'+Math.round(s[x]/tot*100)+'%; background:'+T[x].c+';';tr.appendChild(fl);row.appendChild(lab);row.appendChild(tr);bars.appendChild(row)});
 var a=order[0],b=order[1];var tie=s[a]-s[b]<=1;
 document.getElementById('wfTitle').textContent='Your leanings today: '+T[a].n+(tie?' and '+T[b].n:'');
 document.getElementById('wfTop').textContent=tie?'You are close between two styles, which is common. Many people are a blend.':'Your top leaning is '+T[a].n+'.';
 var dd=document.getElementById('wfDesc');dd.innerHTML='';[a].concat(tie?[b]:[]).forEach(function(x){var p=document.createElement('p');p.textContent=T[x].n+': '+T[x].d;dd.appendChild(p)});
 var rs=document.getElementById('wfRes');rs.style.display='block';rs.style.padding='18px';rs.style.borderRadius='14px';rs.style.color='#fff';rs.style.background='linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.65)),linear-gradient(135deg,'+T[a].c+','+T[b].c+')';
 last='My work-style leanings today: '+T[a].n+(tie?' and '+T[b].n:'')+'. Scores: '+order.map(function(x){return T[x].n+' '+s[x]}).join(', ')+'. (Conversation starter, not a test or a guarantee.)';
 if(window.gtag)try{gtag('event','work_style_completed',{top:T[a].n})}catch(e){}
 rs.scrollIntoView({behavior:'smooth',block:'start'});
};
document.getElementById('wfClear').onclick=function(){[].forEach.call(document.querySelectorAll('#wfQs input'),function(r){r.checked=false});document.getElementById('wfRes').style.display='none';last='';document.getElementById('wfMsg').textContent='Cleared.'};
document.getElementById('wfCopy').onclick=function(){var m=document.getElementById('wfCopyMsg');if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(last).then(function(){m.textContent='Copied.'},function(){m.textContent='Copy failed.'})}else m.textContent='Copy is not available here.'};
})();
