var $=function(i){return document.getElementById(i)},fmt=function(n){return "₹"+n.toLocaleString("en-IN")},mo=[1,3,6,12];
/* open status (IST) */
(function(){var p=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
var t=(+o.hour%24)*60+ +o.minute,open=o.weekday!=="Sun"&&t>=330&&t<1320,e=$("st");e.className="pill"+(open?" open":"");e.lastChild.textContent=open?"Open now · closes 10:00 PM":"Closed now · Mon–Sat, 5:30 AM – 10:00 PM"})();
/* theme */
$("tt").onclick=function(){var r=document.documentElement,d=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
/* goals */
var G=[{t:"Lose fat",r:[["Start with","Gym + classes"],["Classes","HIIT and Zumba"],["Try","3 months, ₹6,000"],["Tip","Add nutrition guidance"]]},
{t:"Build muscle",r:[["Start with","Gym only"],["Focus","Strength floor and coach guidance"],["Try","6 months, ₹7,500"],["Upgrade","Personal training, alternate days"]]},
{t:"Stay active",r:[["Start with","Gym + classes"],["Classes","Zumba, three mornings a week"],["Try","1 month, ₹2,500"],["Tip","Bring a friend to your trial"]]}];
function goal(i){document.querySelectorAll("#opts .opt").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.g==i)});var g=G[i];
$("res").innerHTML="<h3>"+g.t+": your starting point</h3>"+g.r.map(function(x){return "<div class='row'><span>"+x[0]+"</span><b>"+x[1]+"</b></div>"}).join("")+"<p style='margin:18px 0 0'><a class='btn' href='#contact'>Book a free trial</a></p>"}
$("opts").onclick=function(e){var b=e.target.closest(".opt");if(b)goal(b.dataset.g)};goal(0);
/* plans */
function plan(i){document.querySelectorAll("#seg button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.i==i)});
document.querySelectorAll(".price[data-p]").forEach(function(p){var v=+p.dataset.p.split(",")[i];p.textContent=fmt(v);p.nextElementSibling.textContent="About "+fmt(Math.round(v/mo[i]))+" per month"})}
$("seg").onclick=function(e){if(e.target.dataset.i!==undefined)plan(e.target.dataset.i)};plan(0);
var PT=[[4500,8000,12000],[7000,12500,18000]],pm=0,pi=0;
function pt(){var i=Math.min(pi,2);$("ptp").textContent=fmt(PT[pm][i]);$("ptl").textContent=(pm?"Daily":"Alternate days")+" · "+(i+1)+(i?" months":" month")}
$("pts").onclick=function(e){if(e.target.dataset.m===undefined)return;pm=+e.target.dataset.m;document.querySelectorAll("#pts button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.m==pm)});pt()};
$("seg").addEventListener("click",function(e){if(e.target.dataset.i!==undefined){pi=+e.target.dataset.i;pt()}});pt();
/* timetable */
var D=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],C={Zumba:["8:45 – 9:45 AM","#ff6a2b"],HM:["7:30 – 8:30 AM","#2f5bff"],HE:["7:00 – 8:00 PM","#2f5bff"]};
var S={Mon:["Zumba","HE"],Tue:["HM"],Wed:["Zumba","HE"],Thu:["HM"],Fri:["Zumba","HE"],Sat:["HM"],Sun:[]},N={Zumba:"Zumba",HM:"HIIT class",HE:"HIIT class"};
function day(d){document.querySelectorAll("#days button").forEach(function(b){b.setAttribute("aria-pressed",b.textContent===d)});var s=S[d];
$("slots").innerHTML=s.length?s.map(function(k){return "<div class='slot' style='--c:"+C[k][1]+"'><b>"+N[k]+"</b><span>"+C[k][0]+"</span></div>"}).join(""):"<div class='rest'>No group classes on this day. The gym floor is "+(d==="Sun"?"closed on Sundays.":"open 5:30 AM – 10:00 PM.")+"</div>"}
$("days").innerHTML=D.map(function(d){return "<button aria-pressed='false'>"+d+"</button>"}).join("");
$("days").onclick=function(e){if(e.target.tagName==="BUTTON")day(e.target.textContent)};
var td=new Date().toLocaleDateString("en-US",{timeZone:"Asia/Kolkata",weekday:"short"});day(D.indexOf(td)>-1?td:"Mon");
/* calc */
$("hu").onchange=function(){var isCm=this.value==="cm";$("hcm").hidden=!isCm;$("hft").hidden=isCm};
$("bf").onsubmit=function(e){e.preventDefault();var ft=$("hu").value==="ft",hc=ft?(+$("hf").value*30.48+(+$("hi").value||0)*2.54):+$("h").value,wk=+$("w").value*($("wu").value==="lb"?0.45359:1),a=+$("a").value,f=$("s").value==="f",g=+$("gl").value;
function err(t){$("bo").innerHTML="<span class='er2'>"+t+"</span>";$("pin").style.left="0";["kc","pr","wt"].forEach(function(i){$(i).textContent="–"})}
if(!hc||hc<100||hc>250)return err("Height should be 100 to 250 cm (3 ft 3 in to 8 ft 2 in). Check the unit you picked.");
if(!wk||wk<25||wk>300)return err("Weight should be 25 to 300 kg. Check the unit you picked.");
if(!a||a<12||a>90)return err("Enter an age between 12 and 90.");
var b=wk/Math.pow(hc/100,2);if(b<10||b>60)return err("That result looks off. Check that height and weight are not swapped.");
var bmr=10*wk+6.25*hc-5*a+(f?-161:5),kc=Math.round((bmr*1.55+g)/10)*10,c=b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";
$("bo").innerHTML="<big>"+b.toFixed(1)+"</big>"+c;$("pin").style.left=Math.max(0,Math.min(97,(b-14)/24*100))+"%";$("kc").textContent=kc.toLocaleString("en-IN");$("pr").textContent=Math.round(wk*1.6);$("wt").textContent=(wk*.035).toFixed(1)};
/* coaches */
var T=[["Mahendra Verma","mv","IES certified fitness coach"],["Harshal Chawda","hc","IFSA certified fitness coach"],["Manoj Yadav","my","IFSA certified fitness coach"],["Rajesh Sahu","rs","IES certified fitness coach"],["AakashDeep","ad","K11 certified fitness coach"]];
$("tm").innerHTML=T.map(function(t){return "<button class='fc' aria-label='"+t[0]+", flip card'><div class='fi'><div class='ff' data-bg='"+t[1]+"'><h3>"+t[0]+"</h3><p>"+t[2]+"</p></div><div class='fb'><h3>"+t[0]+"</h3><p>Book a free trial and ask for a personal plan with this coach.</p></div></div></button>"}).join("");
$("tm").onclick=function(e){var c=e.target.closest(".fc");if(c)c.classList.toggle("on")};
/* photos */
var IMG={"hero": "assets/img/hero.jpg", "about": "assets/img/about.jpg", "g1": "assets/img/g1.jpg", "g2": "assets/img/g2.jpg", "g3": "assets/img/g3.jpg", "g4": "assets/img/g4.jpg", "g5": "assets/img/g5.jpg", "g6": "assets/img/g6.jpg", "g7": "assets/img/g7.jpg", "g8": "assets/img/g8.jpg", "g9": "assets/img/g9.jpg", "c1": "assets/img/c1.jpg", "c2": "assets/img/c2.jpg", "c3": "assets/img/c3.jpg", "c4": "assets/img/c4.jpg", "c5": "assets/img/c5.jpg", "mv": "assets/img/mv.jpg", "hc": "assets/img/hc.jpg", "my": "assets/img/my.jpg", "rs": "assets/img/rs.jpg", "ad": "assets/img/ad.jpg"};
function bg(){document.querySelectorAll("[data-bg]").forEach(function(e){e.style.backgroundImage="url("+IMG[e.dataset.bg]+")"})}
var GI=[["g1","Free weights zone","Equipment","t w"],["g4","Main gym floor","Gym only",""],["c3","Group workout","Classes",""],["g2","Cardio floor","Gym only","w"],["g6","Dumbbell rack","Equipment","t"],["g5","Reception","Gym only",""],["c2","Stretch and flexibility","Classes",""],["g7","Boxing and mirror wall","Gym only","w"],["c1","Power rack","Equipment",""],["g3","Stamina zone","Gym only","t"],["g8","Bench area","Equipment","w"],["c4","Cardio machines","Gym only",""],["g9","Gym hall","Gym only",""],["c5","Bench and dumbbells","Equipment","w"],["about","Training area","Gym only",""]];
$("gal").innerHTML=GI.map(function(g,i){return "<button class='g "+g[3]+"' data-c='"+g[2]+"' data-bg='"+g[0]+"' aria-label='Open photo: "+g[1]+"'><span>"+g[1]+"</span></button>"}).join("");
var cur=0;function vis(){return [].filter.call(document.querySelectorAll("#gal .g"),function(e){return !e.classList.contains("x")})}
function show(i){var v=vis();if(!v.length)return;cur=(i+v.length)%v.length;var e=v[cur];$("lbi").style.backgroundImage=e.style.backgroundImage;$("lbc").textContent=e.querySelector("span").textContent+" · "+(cur+1)+" of "+v.length}
$("gal").onclick=function(e){var g=e.target.closest(".g");if(g){show(vis().indexOf(g));openLb()}};
$("lp").onclick=function(){show(cur-1)};$("ln").onclick=function(){show(cur+1)};
function openLb(){$("lb").classList.add("on");document.body.style.overflow="hidden";$("lx").focus()}
function closeLb(){$("lb").classList.remove("on");document.body.style.overflow=""}
$("lx").onclick=closeLb;
$("lb").addEventListener("click",function(e){if(e.target===$("lb"))closeLb()});
document.addEventListener("keydown",function(e){if(!$("lb").classList.contains("on"))return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")show(cur-1);if(e.key==="ArrowRight")show(cur+1)});
var sx=null;$("lbi").addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});$("lbi").addEventListener("touchend",function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)show(cur+(d<0?1:-1));sx=null});
$("gc").onclick=function(e){var c=e.target.dataset.c;if(!c)return;document.querySelectorAll("#gc button").forEach(function(b){b.setAttribute("aria-pressed",b===e.target)});document.querySelectorAll("#gal .g").forEach(function(g){g.classList.toggle("x",c!=="all"&&g.dataset.c!==c)})};
bg();
var heroCore=document.querySelector(".core[data-bg='hero']");
if(heroCore){
  heroCore.onclick=function(){
    $("lbi").style.backgroundImage="url("+IMG["hero"]+")";
    $("lbc").textContent="Gear Up Fitness Centre · Main Floor";
    openLb();
  };
}
/* hiit timer */
var TP=[[20,20,6],[30,15,8],[40,20,10]],tp=1,T2={ph:"ready",left:0,rd:1,run:false,iv:0};
function beep(){try{var a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=880;o.start();setTimeout(function(){o.stop();a.close()},160)}catch(x){}}
function tdraw(){var w=TP[tp],r=T2.ph==="ready"||T2.ph==="done";$("tt2").textContent=r?w[0]:T2.left;$("tp2").textContent=T2.ph==="ready"?"Ready":T2.ph==="work"?"Work":T2.ph==="rest"?"Rest":"Done!";$("tr2").textContent=r?"":"Round "+T2.rd+" of "+w[2];
$("tg").style.setProperty("--c",T2.ph==="rest"?"#2f5bff":"#ff6a2b");$("tg").style.setProperty("--p",T2.ph==="work"?T2.left/w[0]:T2.ph==="rest"?T2.left/w[1]:1)}
function tstop(ph){clearInterval(T2.iv);T2.run=false;T2.ph=ph||"ready";if(!ph)T2.rd=1;$("ts2").textContent="Start";tdraw()}
function tick(){T2.left--;if(T2.left<=0){if(T2.ph==="work"){if(T2.rd>=TP[tp][2]){beep();tstop("done");return}T2.ph="rest";T2.left=TP[tp][1]}else{T2.ph="work";T2.rd++;T2.left=TP[tp][0]}beep()}tdraw()}
$("ts2").onclick=function(){if(T2.run){clearInterval(T2.iv);T2.run=false;this.textContent="Resume";return}if(T2.ph==="ready"||T2.ph==="done"){T2.ph="work";T2.rd=1;T2.left=TP[tp][0];beep()}T2.run=true;this.textContent="Pause";T2.iv=setInterval(tick,1000);tdraw()};
$("tx").onclick=function(){tstop()};
$("tpr").onclick=function(e){var i=e.target.dataset.i;if(i===undefined)return;tp=+i;document.querySelectorAll("#tpr button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.i===i)});tstop()};tstop();
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(function(x){io.observe(x)});
var p2=function(n){return String(n).padStart(2,"0")},MN=["January","February","March","April","May","June","July","August","September","October","November","December"],
esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return "&#"+c.charCodeAt(0)+";"})},
ist=function(){return new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}))},
isoD=function(d){return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())},
addD=function(d,n){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n)},
nw=ist(),TDY=new Date(nw.getFullYear(),nw.getMonth(),nw.getDate()),LAST=addD(TDY,59),HRS=[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],sel=TDY,vy,vm,slot=null;
function openDay(d){return d.getDay()!==0&&d>=TDY&&d<=LAST}
function slotOk(d,t){return isoD(d)!==isoD(TDY)||t*60>nw.getHours()*60+nw.getMinutes()+30}
function f12(t){return (t%12||12)+":00 "+(t<12?"AM":"PM")}
(function(){for(var i=0;i<60;i++){var d=addD(TDY,i);if(openDay(d)&&HRS.some(function(t){return slotOk(d,t)})){sel=d;break}}vy=sel.getFullYear();vm=sel.getMonth()})();
function cal(){$("cm").textContent=MN[vm]+" "+vy;var f=new Date(vy,vm,1).getDay(),n=new Date(vy,vm+1,0).getDate(),s="";for(var i=0;i<f;i++)s+="<i></i>";
for(var d=1;d<=n;d++){var x=new Date(vy,vm,d),on=isoD(x)===isoD(sel);s+="<button type='button' class='"+(on?"on ":"")+(isoD(x)===isoD(TDY)?"td":"")+"' data-d='"+isoD(x)+"'"+(openDay(x)?"":" disabled")+" aria-label='"+x.toDateString()+"' aria-pressed='"+on+"'>"+d+"</button>"}
$("cg").innerHTML=s;$("cp").disabled=vy===TDY.getFullYear()&&vm<=TDY.getMonth();$("cn").disabled=vy>=LAST.getFullYear()&&vm>=LAST.getMonth()}
function slots(){var G=[["Morning",6,11],["Afternoon",12,16],["Evening",17,21]],s="";
G.forEach(function(g){s+="<div class='sg'><span>"+g[0]+"</span><div>";for(var t=g[1];t<=g[2];t++)s+="<button type='button' data-h='"+t+"'"+(slotOk(sel,t)?"":" disabled")+" class='"+(slot===t?"on":"")+"'>"+f12(t)+"</button>";s+="</div></div>"});$("ts").innerHTML=s;
if(slot===null||!slotOk(sel,slot)){var f=HRS.filter(function(t){return slotOk(sel,t)})[0];slot=f===undefined?null:f;if(slot!==null){slots();return}}
$("pk").textContent=sel.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})+(slot!==null?" at "+f12(slot):" · no slots left, pick another day")}
$("cg").onclick=function(e){var b=e.target.closest("button[data-d]");if(!b)return;var p=b.dataset.d.split("-");sel=new Date(+p[0],+p[1]-1,+p[2]);slot=null;cal();slots()};
$("ts").onclick=function(e){var b=e.target.closest("button[data-h]");if(!b||b.disabled)return;slot=+b.dataset.h;slots()};
$("cp").onclick=function(){vm--;if(vm<0){vm=11;vy--}cal()};$("cn").onclick=function(){vm++;if(vm>11){vm=0;vy++}cal()};cal();slots();
document.addEventListener("click",function(e){var b=e.target.closest("[data-int]");if(!b)return;$("g").value=b.dataset.int;$("contact").scrollIntoView({behavior:"smooth"})});
function downloadIcs(st, en){
  var ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Gear Up Fitness//Appointment//EN\r\nBEGIN:VEVENT\r\nSUMMARY:Gear Up Fitness Free Trial\r\nDESCRIPTION:Free trial appointment at Gear Up Fitness Centre, Raipur\r\nLOCATION:6th Floor, Usha Pride, Vidhan Sabha Road, Mowa, Raipur\r\nDTSTART:" + st + "\r\nDTEND:" + en + "\r\nSTATUS:CONFIRMED\r\nEND:VEVENT\r\nEND:VCALENDAR";
  var blob = new Blob([ics], {type: "text/calendar;charset=utf-8"});
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "GearUp_Appointment.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderSavedAppt(){
  var data = localStorage.getItem("gearup_trial_booking");
  var pickView = $("appt-picker-view");
  var actView = $("appt-active-view");
  var titleEl = $("appt-card-title");
  if(!pickView || !actView) return;

  if(!data){
    pickView.style.display = "block";
    actView.style.display = "none";
    if(titleEl) titleEl.textContent = "Pick Date & Time Slot";
    return;
  }
  try{
    var appt = JSON.parse(data);
    pickView.style.display = "none";
    actView.style.display = "block";
    if(titleEl) titleEl.textContent = "Your Scheduled Appointment";

    $("active-appt-content").innerHTML = 
      "<h4>Trial Slot Reserved</h4>" +
      "<p class='sb-when'>📅 <b>" + esc(appt.when) + "</b></p>" +
      "<p class='sb-sub'>📍 6th Floor, Usha Pride, Vidhan Sabha Road, Mowa, Raipur</p>";

    $("active-appt-actions").innerHTML = 
      "<a class='btn cal-btn' href='" + appt.gc + "' target='_blank' rel='noopener' style='width:100%;text-align:center'>📅 Open in Google Calendar ↗</a>";
  }catch(err){
    pickView.style.display = "block";
    actView.style.display = "none";
  }
}

if($("btn-rebook-appt")){
  $("btn-rebook-appt").onclick = function(){
    localStorage.removeItem("gearup_trial_booking");
    renderSavedAppt();
  };
}

function getSlotInfo(){
  if(slot===null) return null;
  var c=isoD(sel).replace(/-/g,""),st=c+"T"+p2(slot)+"0000",en=c+"T"+p2(slot+1)+"0000",when=$("pk").textContent;
  var nameVal=$("n")&&$("n").value.trim()?$("n").value.trim():"Guest Member";
  var interestVal=$("g")?$("g").value:"Gym trial";
  var goalVal=$("gl2")?$("gl2").value:"Fitness";
  var det="Free trial at Gear Up Fitness Centre, Raipur. Slot: "+when+".",loc="6th Floor, Usha Pride, Vidhan Sabha Road, Mowa, Raipur";
  var gc="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Free trial at Gear Up Fitness Centre")+"&dates="+st+"/"+en+"&ctz=Asia/Kolkata&details="+encodeURIComponent(det)+"&location="+encodeURIComponent(loc);
  return { st: st, en: en, when: when, name: nameVal, interest: interestVal, goal: goalVal, gc: gc };
}

function showApptAlert(msg, type){
  var al = $("appt-alert");
  if(!al) return;
  al.style.display = "block";
  al.className = "appt-alert " + (type||"success");
  al.innerHTML = msg;
}

if($("btn-submit-appt")){
  $("btn-submit-appt").onclick = function(){
    var info = getSlotInfo();
    if(!info){ showApptAlert("⚠️ Please select an available time slot first.", "warn"); return; }
    localStorage.setItem("gearup_trial_booking", JSON.stringify(info));
    renderSavedAppt();
    window.open(info.gc, "_blank");
  };
}

if($("cf")){
  $("cf").onsubmit=function(e){
    e.preventDefault();
    if(slot===null){$("sent").innerHTML="<span class='er'>No slots left on this day. Please pick another day.</span>";return}
    var n=$("n").value.trim(),c=isoD(sel).replace(/-/g,""),st=c+"T"+p2(slot)+"0000",en=c+"T"+p2(slot+1)+"0000",when=$("pk").textContent,
    interest=$("g").value,goalVal=$("gl2").value,expVal=$("ex").value,notesVal=$("nt").value,
    det="Free trial. Interest: "+interest+". "+goalVal+". Experience: "+expVal+"."+(notesVal?" Note: "+notesVal:""),loc="6th Floor, Usha Pride, Vidhan Sabha Road, Mowa, Raipur",
    msg="Hi Gear Up, I'm "+n+" ("+$("m").value+($("em").value?", "+$("em").value:"")+"). I would like a free trial on "+when+". Interested in: "+interest+". "+goalVal+". Experience: "+expVal+"."+(notesVal?" Note: "+notesVal:""),
    gc="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Free trial at Gear Up Fitness Centre")+"&dates="+st+"/"+en+"&ctz=Asia/Kolkata&details="+encodeURIComponent(det)+"&location="+encodeURIComponent(loc);

    var apptData = { name: n, phone: $("m").value, email: $("em").value, when: when, st: st, en: en, interest: interest, goal: goalVal, experience: expVal, notes: notesVal, gc: gc };
    localStorage.setItem("gearup_trial_booking", JSON.stringify(apptData));

    window.open("https://wa.me/917893300440?text="+encodeURIComponent(msg),"_blank");
    
    $("sent").innerHTML="<div class='ok'><b>You're booked in, "+esc(n)+"!</b><p>"+esc(when)+". Saved to your device! Send the WhatsApp message to confirm.</p><div class='ob'><a class='btn cal-btn' href='"+gc+"' target='_blank' rel='noopener'>📅 Open in Google Calendar ↗</a></div></div>";
    
    renderSavedAppt();
  };
}

renderSavedAppt();

$("mb").onclick=function(){var o=$("mm").classList.toggle("on");this.setAttribute("aria-expanded",o);this.textContent=o?"✕":"☰"};
$("mm").onclick=function(e){if(e.target.tagName==="A"){$("mm").classList.remove("on");$("mb").textContent="☰"}};

/* Disable right-click */
document.addEventListener("contextmenu",function(e){e.preventDefault();return false;});

/* Disable developer tools and source view shortcuts */
document.addEventListener("keydown",function(e){
  var k=e.key||e.keyCode,ctrl=e.ctrlKey||e.metaKey,shift=e.shiftKey;
  if(k==="F12"||k===123) {e.preventDefault();return false;}
  if(ctrl&&shift&&(k==="I"||k==="i"||k===73||k==="J"||k==="j"||k===74||k==="C"||k==="c"||k===67)) {e.preventDefault();return false;}
  if(ctrl&&(k==="U"||k==="u"||k===85||k==="S"||k==="s"||k===83)) {e.preventDefault();return false;}
});

/* Prevent dragging images and links */
document.addEventListener("dragstart",function(e){e.preventDefault();return false;});

/* reviews filter */
var rf = $("rev-filters");
if (rf) {
  rf.onclick = function(e) {
    var btn = e.target.closest("button");
    if (!btn || btn.dataset.cat === undefined) return;
    var cat = btn.dataset.cat;
    rf.querySelectorAll("button").forEach(function(b) {
      b.setAttribute("aria-pressed", b === btn);
    });
    document.querySelectorAll("#reviews-grid .review-card").forEach(function(card) {
      if (cat === "all" || card.dataset.cat === cat) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };
}

/* ==========================================================================
   1. 6th Floor Zone & Equipment Explorer Logic
   ========================================================================== */
var ZONES = [
  {
    title: "Free Weights & Power Arena",
    badge: "Zone 1 of 4 · Strength Floor",
    img: "assets/img/g1.jpg",
    desc: "Built for serious lifters and beginners alike. Heavy-duty rubberized flooring with complete barbell and dumbbell stations.",
    specs: [
      { b: "Dumbbells", s: "Up to 50 kg pairs" },
      { b: "Power Racks", s: "4 Olympic Squat Stations" },
      { b: "Benches", s: "8 Incline, Flat & Decline" },
      { b: "Flooring", s: "High-density anti-shock turf" }
    ]
  },
  {
    title: "Skyline Cardio Deck",
    badge: "Zone 2 of 4 · Cardio Arena",
    img: "assets/img/g2.jpg",
    desc: "Burn calories with panoramic 6th-floor views of Vidhan Sabha Road. State-of-the-art cardiovascular machinery with heart-rate telemetry.",
    specs: [
      { b: "Treadmills", s: "Commercial grade auto-incline" },
      { b: "Ellipticals", s: "Cross-trainers with digital displays" },
      { b: "Spin Bikes", s: "High-inertia flywheel cycles" },
      { b: "Rowers", s: "Concept2 Air-resistance rowers" }
    ]
  },
  {
    title: "Zumba & Group Studio",
    badge: "Zone 3 of 4 · Group Studio",
    img: "assets/img/c3.jpg",
    desc: "Sprung wooden flooring to protect your knees and joints during high-impact dance, aerobic steps, and intense HIIT intervals.",
    specs: [
      { b: "Floor Type", s: "Shock-absorbing sprung wood" },
      { b: "Sound System", s: "Studio acoustics & lighting" },
      { b: "Group Gear", s: "Step boxes, kettlebells & bands" },
      { b: "Batches", s: "Morning & Evening schedules" }
    ]
  },
  {
    title: "Steam & Luxury Locker Rooms",
    badge: "Zone 4 of 4 · Recovery & Amenities",
    img: "assets/img/g5.jpg",
    desc: "Freshen up post-workout with our hygienic shower suites, private key-locked lockers, and restorative steam sauna.",
    specs: [
      { b: "Steam Bath", s: "Aromatherapy steam room" },
      { b: "Lockers", s: "Private secure keyed storage" },
      { b: "Showers", s: "Continuous hot water supply" },
      { b: "Hygiene", s: "Sanitized round the clock" }
    ]
  }
];

function selectZone(i) {
  var z = ZONES[i];
  if (!z) return;
  var tabs = document.querySelectorAll("#zone-tabs button");
  tabs.forEach(function(b, idx) {
    b.setAttribute("aria-pressed", idx === i);
  });
  var img = $("zone-img");
  if (img) img.style.backgroundImage = "url('" + z.img + "')";
  if ($("zone-badge")) $("zone-badge").textContent = z.badge;
  if ($("zone-title")) $("zone-title").textContent = z.title;
  if ($("zone-desc")) $("zone-desc").textContent = z.desc;
  if ($("zone-specs")) {
    $("zone-specs").innerHTML = z.specs.map(function(s) {
      return "<div><b>" + s.b + "</b><span>" + s.s + "</span></div>";
    }).join("");
  }
}

var zt = $("zone-tabs");
if (zt) {
  zt.onclick = function(e) {
    var btn = e.target.closest("button");
    if (btn && btn.dataset.z !== undefined) {
      selectZone(+btn.dataset.z);
    }
  };
}

/* ==========================================================================
   2. Live Gym Crowd & Peak Hours Meter Logic
   ========================================================================== */
var CROWD_HOURS = [
  { t: "5:30 AM", timeFull: "5:30 AM – 7:00 AM", lvl: "steady", label: "🟡 Steady Training", desc: "Early morning lifters and cardio enthusiasts. Great quiet energy to start your day." },
  { t: "7:00 AM", timeFull: "7:00 AM – 8:30 AM", lvl: "steady", label: "🟡 Steady & Active", desc: "Morning Zumba and group class rush. High energy, friendly community atmosphere." },
  { t: "8:30 AM", timeFull: "8:30 AM – 10:00 AM", lvl: "steady", label: "🟡 Smooth Flow", desc: "Steady floor flow with immediate equipment availability across all racks." },
  { t: "10:00 AM", timeFull: "10:00 AM – 1:00 PM", lvl: "quiet", label: "🟢 Calm & Open", desc: "Spacious training environment. Ideal for long personal training sessions and form work." },
  { t: "1:00 PM", timeFull: "1:00 PM – 4:30 PM", lvl: "quiet", label: "🟢 Quiet Hours", desc: "Least crowded time of the day. Complete freedom on all squat racks and free weights." },
  { t: "4:30 PM", timeFull: "4:30 PM – 6:30 PM", lvl: "steady", label: "🟡 Evening Warmup", desc: "After-work crowd begins to arrive. Energetic music and steady floor movement." },
  { t: "6:30 PM", timeFull: "6:30 PM – 8:30 PM", lvl: "peak", label: "🔴 Peak Energy Session", desc: "Maximum gym energy! Coaches actively on the floor, high motivation, and great workout vibe." },
  { t: "8:30 PM", timeFull: "8:30 PM – 10:00 PM", lvl: "steady", label: "🟡 Late Night Flow", desc: "Crowd tapers down. Perfect for late-night strength work and steam relaxation." }
];

function selectCrowdHour(i) {
  var ch = CROWD_HOURS[i];
  if (!ch) return;
  var btns = document.querySelectorAll("#crowd-hours .ch-btn");
  btns.forEach(function(b, idx) {
    b.setAttribute("aria-pressed", idx === i);
  });
  if ($("cic-time")) $("cic-time").textContent = ch.timeFull;
  var lvlEl = $("cic-level");
  if (lvlEl) {
    lvlEl.className = "badge-" + ch.lvl;
    lvlEl.textContent = ch.label;
  }
  if ($("cic-desc")) $("cic-desc").textContent = ch.desc;
}

var chBar = $("crowd-hours");
if (chBar) {
  chBar.innerHTML = CROWD_HOURS.map(function(ch, idx) {
    return "<button type='button' class='ch-btn' data-idx='" + idx + "' aria-pressed='" + (idx === 6) + "'>" + ch.t + "</button>";
  }).join("");

  chBar.onclick = function(e) {
    var btn = e.target.closest(".ch-btn");
    if (btn && btn.dataset.idx !== undefined) {
      selectCrowdHour(+btn.dataset.idx);
    }
  };
}

/* ==========================================================================
   3. Before & After Transformation Slider Logic
   ========================================================================== */
var TF_DATA = [
  {
    name: "Pooja Dewangan's Transformation",
    pill: "🔥 11 kg Fat Loss",
    duration: "⏱ 90 Days",
    quote: "\"Coach Mahendra customized my diet and lifting routine. Lost 11 kg and gained immense stamina. Best decision I made for my health.\"",
    coach: "Mahendra Verma (IES Certified)",
    afterImg: "assets/img/g4.jpg",
    beforeImg: "assets/img/g1.jpg"
  },
  {
    name: "Vikram Sahu's Muscle Building Journey",
    pill: "💪 7 kg Lean Muscle Gain",
    duration: "⏱ 6 Months",
    quote: "\"Came in skinny and unsure about heavy weights. Coach Harshal taught me progressive overload and bulking macros. My bench and squat doubled.\"",
    coach: "Harshal Chawda (IFSA Certified)",
    afterImg: "assets/img/c1.jpg",
    beforeImg: "assets/img/g8.jpg"
  },
  {
    name: "Rohan Agrawal's Full Body Recomp",
    pill: "⚡ 14 kg Fat Loss & Definition",
    duration: "⏱ 4 Months",
    quote: "\"The 6th-floor atmosphere and intense HIIT sessions kept me disciplined. Lost 14 kg of body fat while retaining solid muscle definition.\"",
    coach: "Manoj Yadav (IFSA Certified)",
    afterImg: "assets/img/c5.jpg",
    beforeImg: "assets/img/g3.jpg"
  }
];

function selectTransformation(i) {
  var tf = TF_DATA[i];
  if (!tf) return;
  var btns = document.querySelectorAll("#tf-tabs button");
  btns.forEach(function(b, idx) {
    b.setAttribute("aria-pressed", idx === i);
  });
  if ($("tf-pill")) $("tf-pill").textContent = tf.pill;
  if ($("tf-duration")) $("tf-duration").textContent = tf.duration;
  if ($("tf-member-name")) $("tf-member-name").textContent = tf.name;
  if ($("tf-quote")) $("tf-quote").textContent = tf.quote;
  if ($("tf-coach-name")) $("tf-coach-name").textContent = tf.coach;
  if ($("tf-img-after")) $("tf-img-after").style.backgroundImage = "url('" + tf.afterImg + "')";
  if ($("tf-img-before")) $("tf-img-before").style.backgroundImage = "url('" + tf.beforeImg + "')";
}

var tfTabs = $("tf-tabs");
if (tfTabs) {
  tfTabs.onclick = function(e) {
    var btn = e.target.closest("button");
    if (btn && btn.dataset.tf !== undefined) {
      selectTransformation(+btn.dataset.tf);
    }
  };
}

// Range slider sync
var tfRange = $("tf-range");
var tfBefore = $("tf-img-before");
var tfDivider = $("tf-divider");

if (tfRange && tfBefore && tfDivider) {
  tfRange.oninput = function() {
    var val = this.value;
    tfBefore.style.clipPath = "polygon(0 0, " + val + "% 0, " + val + "% 100%, 0 100%)";
    tfDivider.style.left = val + "%";
  };
}

/* ==========================================================================
   4. Member Reviews & Google Ratings Filter Logic
   ========================================================================== */
var revFilters = $("rev-filters");
var revCards = document.querySelectorAll(".review-card");

if (revFilters && revCards.length > 0) {
  revFilters.onclick = function(e) {
    var btn = e.target.closest("button");
    if (!btn || !btn.dataset.cat) return;
    
    var cat = btn.dataset.cat;
    
    // Update button active state
    var btns = revFilters.querySelectorAll("button");
    btns.forEach(function(b) {
      b.setAttribute("aria-pressed", b === btn);
    });
    
    // Filter cards
    revCards.forEach(function(card) {
      if (cat === "all" || card.dataset.cat === cat) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  };
}

/* ==========================================================================
   5. Anti-Scraper, Anti-Cloning & Domain Security Protection
   ========================================================================== */
(function() {
  // 1. Domain Lock: Prevent re-hosting on unauthorized domains if scraped by Cyotek/HTTrack
  var allowedHosts = [
    "mekhle.github.io",
    "localhost",
    "127.0.0.1",
    "gearup-fitness.test",
    ""
  ];
  var currentHost = window.location.hostname.toLowerCase();
  var isLocal = window.location.protocol === "file:" || currentHost.endsWith(".test") || currentHost.endsWith(".local");
  var isAllowed = isLocal || allowedHosts.some(function(h) { return h && (currentHost === h || currentHost.endsWith("." + h)); });

  if (!isAllowed) {
    document.documentElement.innerHTML = "<div style='display:flex;height:100vh;align-items:center;justify-content:center;background:#0a1233;color:#fff;font-family:sans-serif;text-align:center;padding:20px'><div><h1 style='color:#ff5e14;font-size:2rem;margin-bottom:12px'>Gear Up Fitness Centre</h1><p style='color:#94a3b8;font-size:1.1rem;max-width:500px'>Unauthorized copy detected. Visit the official website at <a href='https://mekhle.github.io/gearupfitness/' style='color:#00d2ff;text-decoration:none;font-weight:bold'>mekhle.github.io/gearupfitness</a></p></div></div>";
    return;
  }

  // 2. Anti-Iframe Clickjacking Protection
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {}
  }

  // 3. Disable Right-Click Context Menu
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    return false;
  }, false);

  // 4. Disable Element / Image Drag & Drop
  document.addEventListener("dragstart", function(e) {
    e.preventDefault();
    return false;
  }, false);

  // 5. Block Developer Tools & Save Keyboard Shortcuts
  document.addEventListener("keydown", function(e) {
    // F12 key
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source) or Ctrl+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
  }, false);
})();
