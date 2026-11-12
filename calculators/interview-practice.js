/* Interview practice: tool logic from The Convergence Hub.
   Live tool: https://theconvergencehub.com/interview-practice
   MIT licensed. Runs in the browser; nothing is sent or stored. The page markup and styling are not included. */
(function(){
var skills=[],qs=[],idx=0,timer=null,left=120;
var STOP={the:1,and:1,for:1,with:1,you:1,our:1,are:1,will:1,have:1,this:1,that:1,from:1,your:1,able:1,work:1,team:1,job:1,role:1,years:1,experience:1,skills:1,including:1,ability:1,strong:1,must:1,such:1,may:1,all:1,not:1,their:1,who:1,can:1,has:1,been:1,other:1,more:1,new:1,including:1,etc:1,per:1,across:1,within:1,through:1,about:1,also:1,into:1,over:1,use:1,using:1,related:1,required:1,preferred:1,plus:1,bonus:1,looking:1,candidate:1,company:1,position:1,responsibilities:1,qualifications:1,benefits:1,equal:1,opportunity:1,employer:1};
function rsk(){var ul=document.getElementById('ipSkills');ul.innerHTML='';skills.forEach(function(s,i){var li=document.createElement('li');li.appendChild(document.createTextNode(s+' '));var x=document.createElement('button');x.type='button';x.textContent='remove';x.style.cssText='font-size:.8rem; background:transparent; color:inherit; border:1px solid var(--slate,#999); border-radius:6px; cursor:pointer;';x.onclick=function(){skills.splice(i,1);rsk()};li.appendChild(x);ul.appendChild(li)})}
document.getElementById('ipAdd').onclick=function(){var i=document.getElementById('ipSkill'),t=i.value.replace(/\s+/g,' ').trim();if(!t)return;if(skills.length>=4){document.getElementById('ipMsg').textContent='Four experiences is plenty.';return}skills.push(t);i.value='';document.getElementById('ipMsg').textContent='';rsk()};
function keywords(txt){var c={};(txt.toLowerCase().match(/[a-z][a-z+#.\-]{2,}/g)||[]).forEach(function(w){w=w.replace(/[.\-]+$/,'');if(w.length<3||STOP[w])return;c[w]=(c[w]||0)+1});return Object.keys(c).filter(function(w){return c[w]>=2}).sort(function(a,b){return c[b]-c[a]}).slice(0,4)}
function show(){var q=qs[idx];document.getElementById('ipQ').textContent=(idx+1)+'. '+q.q;document.getElementById('ipTip').textContent=q.t;document.getElementById('ipCount').textContent='Question '+(idx+1)+' of '+qs.length;[].forEach.call(document.querySelectorAll('.sc'),function(c){c.checked=false});reset()}
function reset(){if(timer)clearInterval(timer);timer=null;left=120;document.getElementById('ipTimer').textContent='2:00'}
document.getElementById('ipStart').onclick=function(){reset();timer=setInterval(function(){left--;var m=Math.floor(left/60),s=left%60;document.getElementById('ipTimer').textContent=m+':'+(s<10?'0':'')+s;if(left<=0){clearInterval(timer);timer=null;document.getElementById('ipTimer').textContent='Time. Wrap up your answer.'}},1000)};
document.getElementById('ipNext').onclick=function(){idx=(idx+1)%qs.length;show()};
document.getElementById('ipGo').onclick=function(){
 var m=document.getElementById('ipMsg');m.textContent='';
 var pending=document.getElementById('ipSkill').value.trim();if(pending&&skills.length<4){skills.push(pending);document.getElementById('ipSkill').value='';rsk()}
 if(!skills.length){m.textContent='Please add at least one experience.';return}
 qs=[];var role=document.getElementById('ipRole').value.trim();
 skills.forEach(function(s){qs.push({q:'Tell me about a time you dealt with this: '+s+'. What was the situation, what did you do, and what happened?',t:'Use STAR. Focus on your own actions and a true, specific result.'})});
 var kw=keywords(document.getElementById('ipPost').value);
 kw.slice(0,2).forEach(function(k){qs.push({q:'This role mentions "'+k+'". What experience do you have with it?',t:'Name one real example. If you have limited experience, say so and describe how you would learn it quickly.'})});
 qs.push({q:'What is something you are still working to improve, and what are you doing about it?',t:'Pick something real and fixable. Describe the steps you are taking, not a disguised strength.'});
 qs.push({q:role?'Why do you want this '+role+' role, and what do you know about the team and company?':'Why do you want this role, and what do you know about the team and company?',t:'Reference something specific you read from the company\'s own pages or recent news, and say where you saw it.'});
 if(document.getElementById('ipGap').checked)qs.push({q:'I see a gap in your work history. Can you tell me about that time?',t:'Prepare one honest sentence, then pivot to what you did to stay current and why you are ready now. You do not have to share private details.'});
 qs.push({q:'What would make you struggle in this role, and what do you need from a manager to do your best work?',t:'Be honest and specific. This helps both sides find a real fit.'});
 idx=0;document.getElementById('ipRes').style.display='block';
 var s=document.getElementById('ipRes');s.style.padding='18px';s.style.borderRadius='14px';s.style.color='#fff';s.style.background='linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.65)),linear-gradient(135deg,#2874a6,#8e2de2)';
 show();s.scrollIntoView({behavior:'smooth',block:'start'});
 if(window.gtag)try{gtag('event','interview_practice_started',{n:qs.length})}catch(e){}
};
document.getElementById('ipClear').onclick=function(){skills=[];qs=[];reset();rsk();['ipSkill','ipRole','ipPost'].forEach(function(i){document.getElementById(i).value=''});document.getElementById('ipGap').checked=false;document.getElementById('ipRes').style.display='none';document.getElementById('ipMsg').textContent='Cleared.'};
})();
