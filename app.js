/* TranzHealthMate: offline-first educational wellness MVP */
const STORAGE_KEY = "tranzhealthmate.v1";
const HABITS = ["Eat a varied meal with vegetables or fruit","Take a movement break or walk","Drink water regularly","Make time to relax or connect","Keep a consistent bedtime routine"];
const defaults = {profile:{country:"India",diet:"Vegetarian",activity:"Sedentary",goal:"Build consistent habits"},today:{date:new Date().toISOString().slice(0,10),water:0,sleep:0,steps:0,habits:[]},theme:"light",favourites:[]};
let state = loadState();
function loadState(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));return saved?{...structuredClone(defaults),...saved,profile:{...defaults.profile,...saved.profile},today:{...defaults.today,...saved.today}}:structuredClone(defaults)}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function refreshDay(){const today=new Date().toISOString().slice(0,10);if(state.today.date!==today){state.today={...defaults.today,date:today};save()}}
function $(id){return document.getElementById(id)}
function safeNumber(v){const n=Number(v);return Number.isFinite(n)&&n>0?n:null}
function bmi(heightCm,weightKg){if(!safeNumber(heightCm)||!safeNumber(weightKg))return null;return weightKg/((heightCm/100)**2)}
function proteinGuide(weightKg){if(!safeNumber(weightKg))return null;return Math.round(weightKg*0.8)}
function getProfile(){return state.profile}
function recommendations(p=state.profile){
 const out=[];
 if(p.weight)out.push(["Protein","A general adult reference is around 0.8 g per kg body weight daily; individual needs vary."]);
 else out.push(["Balanced meals","Include a mix of vegetables or fruit, whole grains and a suitable protein source."]);
 out.push(["Movement","Build towards regular weekly activity gradually, choosing movement that is safe and enjoyable."]);
 out.push(["Sleep","Most adults need at least 7 hours of sleep; consistency and sleep quality also matter."]);
 out.push(["Hydration","Drink regularly and adjust for heat, exercise and personal needs. There is no single target for everyone."]);
 out.push(["Recovery","Take short breaks and make time for relaxation, social connection or a calming activity."]);
 return out;
}
function renderHabits(target){const el=$(target);if(!el)return;el.innerHTML="";HABITS.forEach((h,i)=>{const label=document.createElement("label");label.className="habit-row"+(state.today.habits.includes(i)?" done":"");const cb=document.createElement("input");cb.type="checkbox";cb.checked=state.today.habits.includes(i);cb.addEventListener("change",()=>{state.today.habits=cb.checked?[...state.today.habits,i]:state.today.habits.filter(x=>x!==i);save();renderAll()});const span=document.createElement("span");span.textContent=h;label.append(cb,span);el.append(label)})}
function renderDashboard(){
 const p=state.profile,b=bmi(p.height,p.weight),pr=proteinGuide(p.weight);
 $("bmi-value").textContent=b?b.toFixed(1):"—";$("bmi-note").textContent=b?"BMI is a screening measure, not a diagnosis":"Add height and weight";
 $("protein-value").textContent=pr?`${pr} g`:"—";$("water-value").textContent=`${state.today.water} ml`;$("water-goal").textContent="No universal target; adjust to your needs";
 $("sleep-value").textContent=`${state.today.sleep} h`;$("profile-status").textContent=p.age||p.height||p.weight?"Using the details you provided":"Add profile details for more relevant guidance";
 $("greeting").textContent=p.name?`Welcome back, ${p.name}.`:"Build habits that support you.";
 $("welcome-subtitle").textContent=`Your ${p.diet||"selected"} food preferences and available profile details guide this overview.`;
 $("recommendations").innerHTML="";recommendations(p).forEach(([t,d])=>{const div=document.createElement("div");div.className="recommendation";const dot=document.createElement("span");dot.className="rec-bullet";const body=document.createElement("div");const strong=document.createElement("strong");strong.textContent=t;const small=document.createElement("small");small.textContent=d;body.append(strong,small);div.append(dot,body);$("recommendations").append(div)});
 $("habit-count").textContent=`${state.today.habits.length} / ${HABITS.length}`;renderHabits("habit-list");renderHabits("habit-list-secondary");
 $("water-large").textContent=`${state.today.water} ml`;$("sleep-large").textContent=`${state.today.sleep} h`;$("steps-large").textContent=`${state.today.steps.toLocaleString()} steps`;
}
function renderFoods(){const q=$("food-search").value.toLowerCase(),n=$("nutrient-filter").value;const grid=$("food-grid");grid.innerHTML="";const diet=state.profile.diet||"Vegetarian";const allergy=(state.profile.allergies||"").toLowerCase().split(",").map(x=>x.trim()).filter(Boolean);
 const foods=FOODS.filter(f=>(!q||(f.name+" "+f.nutrients.join(" ")+" "+f.regions.join(" ")).toLowerCase().includes(q))&&(!n||f.nutrients.includes(n))&&f.diets.includes(diet)&&!allergy.some(a=>a&&f.name.toLowerCase().includes(a)));
 if(!foods.length){grid.textContent="No matching foods. Try another search or dietary preference.";return}
 foods.forEach(f=>{const card=document.createElement("article");card.className="food-card";const h=document.createElement("h3");h.textContent=f.name;const p=document.createElement("p");p.textContent=f.note;const tags=document.createElement("div");tags.className="tags";f.nutrients.forEach(x=>{const t=document.createElement("span");t.className="tag";t.textContent=x;tags.append(t)});card.append(h,p,tags);grid.append(card)})
}
function renderThought(){const list=THOUGHTS;let idx=Math.floor(Date.now()/86400000)%list.length;$("thought-text").textContent=list[idx].text}
function showView(name){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${name}`));document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===name));const titles={dashboard:"Your wellness overview",profile:"Personal wellness profile",nutrition:"Food & nutrition",habits:"Daily habits",assistant:"Wellness guide",privacy:"Settings & privacy"};$("page-title").textContent=titles[name]||titles.dashboard;if(name==="nutrition")renderFoods()}
function applyTheme(){document.body.classList.toggle("dark",state.theme==="dark")}
function renderAll(){refreshDay();applyTheme();renderDashboard();renderThought();$("date-chip").textContent=new Intl.DateTimeFormat(undefined,{weekday:"short",day:"numeric",month:"short"}).format(new Date())}
function answerQuestion(q){const s=q.toLowerCase();const entries=[
 {keys:["protein","lentil","dal","tofu"],text:"Protein supports muscle maintenance and many body functions. Plant-based options include lentils (dal), chickpeas, beans, tofu, tempeh, soy foods, nuts and seeds. Dairy and eggs can also contribute if they fit your diet."},
 {keys:["fibre","fiber","bowel"],text:"Fibre supports digestive health and can help with fullness. Increase it gradually with vegetables, fruits, beans, lentils, oats, nuts and whole grains, and drink fluids regularly."},
 {keys:["sleep","insomnia","bed"],text:"Many adults need at least 7 hours of sleep. A regular sleep and wake time, a relaxing wind-down routine, daylight during the day and a cool, dark bedroom may help. Persistent sleep problems deserve professional advice."},
 {keys:["iron","haemoglobin","hemoglobin"],text:"Iron sources include lentils, beans, chickpeas, tofu, seeds and leafy greens. Meat and seafood also contain iron for people who eat them. Vitamin C foods alongside plant sources can improve non-haem iron absorption. Only a clinician can assess deficiency."},
 {keys:["water","hydration","thirst"],text:"Hydration needs vary with body size, activity, climate, pregnancy and health. Drink regularly and use thirst and urine colour as rough everyday cues; follow clinician advice if you have a fluid restriction."},
 {keys:["b12","vitamin b12"],text:"Vitamin B12 occurs naturally in animal foods such as dairy, eggs, fish and meat. Vegan diets need reliable fortified foods or a suitable supplement; discuss personal needs with a qualified professional."},
 {keys:["calcium","bone"],text:"Calcium sources include dairy foods, calcium-set tofu, fortified plant drinks, some leafy greens and sesame. Check labels because amounts vary considerably."},
 {keys:["vitamin d","sunlight","sun"],text:"Vitamin D status depends on factors including location, skin exposure, season, age and health. Food sources are limited; fortified foods and some fish provide it. Avoid deliberate sunburn and seek professional advice about testing or supplements."}
 ];const found=entries.find(e=>e.keys.some(k=>s.includes(k)));return found?found.text:"I don't have a specific entry for that yet. I can share general information about protein, fibre, iron, hydration, sleep, vitamin B12, calcium or vitamin D. For symptoms, diagnoses, supplements or treatment decisions, consult a qualified healthcare professional."}
function addChat(text,who){const b=document.createElement("div");b.className=`chat-bubble ${who}`;b.textContent=text;$("chat-log").append(b);$("chat-log").scrollTop=$("chat-log").scrollHeight}
function bind(){
 document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
 $("profile-form").addEventListener("submit",e=>{e.preventDefault();const p={};["age","height","weight"].forEach(k=>{const v=$(k).value;p[k]=v?Number(v):null});["gender","country","diet","activity","goal","allergies"].forEach(k=>p[k]=$(k).value);for(const [k,min,max] of [["age",1,120],["height",50,250],["weight",10,500]])if(p[k]!==null&&(!Number.isFinite(p[k])||p[k]<min||p[k]>max)){alert(`Please enter a valid ${k} (${min}–${max}).`);return}state.profile={...state.profile,...p};save();renderAll();alert("Profile saved on this device.")});
 $("food-search").addEventListener("input",renderFoods);$("nutrient-filter").addEventListener("change",renderFoods);
 $("new-thought").addEventListener("click",()=>{const t=THOUGHTS[Math.floor(Math.random()*THOUGHTS.length)];$("thought-text").textContent=t.text});
 document.querySelectorAll("[data-water]").forEach(b=>b.addEventListener("click",()=>{state.today.water=Math.min(10000,state.today.water+Number(b.dataset.water));save();renderAll()}));
 document.querySelectorAll("[data-sleep]").forEach(b=>b.addEventListener("click",()=>{state.today.sleep=Math.max(0,Math.min(24,state.today.sleep+Number(b.dataset.sleep)));save();renderAll()}));
 document.querySelectorAll("[data-steps]").forEach(b=>b.addEventListener("click",()=>{state.today.steps=Math.min(100000,state.today.steps+Number(b.dataset.steps));save();renderAll()}));
 $("reset-habits").addEventListener("click",()=>{state.today.habits=[];save();renderAll()});
 $("chat-form").addEventListener("submit",e=>{e.preventDefault();const q=$("chat-input").value.trim();if(!q)return;addChat(q,"user");addChat(answerQuestion(q),"bot");$("chat-input").value=""});
 document.querySelectorAll(".suggestion").forEach(b=>b.addEventListener("click",()=>{$("chat-input").value=b.textContent;$("chat-form").requestSubmit()}));
 const toggle=()=>{state.theme=state.theme==="dark"?"light":"dark";save();applyTheme()};$("theme-toggle").addEventListener("click",toggle);$("theme-toggle-settings").addEventListener("click",toggle);
 $("export-data").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="tranzhealthmate-data.json";a.click();URL.revokeObjectURL(a.href)});
 $("delete-data").addEventListener("click",()=>{if(confirm("Delete all TranzHealthMate data saved in this browser? This cannot be undone.")){localStorage.removeItem(STORAGE_KEY);state=structuredClone(defaults);renderAll();showView("dashboard")}});
}
document.addEventListener("DOMContentLoaded",()=>{bind();renderAll();});
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
if(typeof module!=="undefined")module.exports={bmi,proteinGuide,answerQuestion,recommendations};
