/* The exported game keeps its own saves. Updates never clear storage or other apps. */
(()=>{'use strict';
function initPortal(){
const lang=window.rzLang||'ru';const tr=(ru,en,he)=>lang==='he'?he:lang==='en'?en:ru;
const tap=document.getElementById('rz-tap');
if(tap){const kicker=document.createElement('div');kicker.className='portal-kicker';kicker.textContent=tr('Шесть эпох · Одна история','Six ages · One story','שישה עידנים · סיפור אחד');tap.prepend(kicker);
const copy=document.createElement('p');copy.className='portal-copy';copy.textContent=tr('Проведи свой отряд от первых поселений к городам будущего. Собирай героинь, развивай лагерь и побеждай.','Lead your squad from the first settlements to the cities of tomorrow. Recruit heroines, grow your camp and win.','הובילו את היחידה מהיישובים הראשונים לערי העתיד. גייסו גיבורות, פתחו את המחנה ונצחו.');tap.append(copy);
const ages=document.createElement('div');ages.className='portal-ages';[1,4,6].forEach((n,i)=>{const card=document.createElement('figure');card.className='portal-age';const img=document.createElement('img');img.src='art/age-'+n+'.webp';img.alt='';const label=document.createElement('figcaption');label.textContent=[tr('Истоки','Origins','ראשית'),tr('Новые горизонты','New horizons','אופקים חדשים'),tr('Будущее','The future','העתיד')][i];card.append(img,label);ages.append(card);});tap.append(ages);}
const tools=document.createElement('div');tools.id='portal-tools';const update=document.createElement('button');update.textContent='↻ '+tr('Обновить','Update','עדכון');const sound=document.createElement('button');sound.textContent='♫ '+tr('Звук','Sound','צליל');const version=document.createElement('span');version.id='portal-version';version.textContent='v1.6.2';tools.append(update,sound,version);tools.setAttribute('data-portal-action','true');if(tap)tap.append(tools);else tools.hidden=true;
window.addEventListener('rubezh-started',()=>{tools.hidden=true;document.documentElement.style.setProperty('--portal-height','0px');});
let toolHeight=0;
function measureTools(){const height=tools.hidden?0:Math.ceil(tools.getBoundingClientRect().height);if(height===toolHeight)return;toolHeight=height;document.documentElement.style.setProperty('--portal-height',height+'px');}
measureTools();if('ResizeObserver'in window)new ResizeObserver(measureTools).observe(tools);
window.addEventListener('resize',measureTools);window.addEventListener('orientationchange',measureTools);

const panel=document.createElement('div');panel.id='portal-message';panel.hidden=true;panel.setAttribute('role','status');panel.setAttribute('aria-live','polite');document.body.append(panel);
function message(text,reload){panel.replaceChildren();panel.hidden=false;const p=document.createElement('div');p.textContent=text;panel.append(p);if(reload){const b=document.createElement('button');b.textContent=tr('Перезапустить','Restart','הפעלה מחדש');b.onclick=()=>location.reload();panel.append(b);}const close=document.createElement('button');close.textContent=tr('Закрыть','Close','סגירה');close.onclick=()=>panel.hidden=true;panel.append(close);}
let busy=false;
window.rzUpdate=async()=>{if(busy)return;busy=true;update.disabled=true;let timer;message(tr('Проверяю обновление…','Checking for updates…','בודק עדכון…'));
try{await Promise.race([(async()=>{if(!('serviceWorker'in navigator))throw Error('unsupported');const r=await navigator.serviceWorker.register('index.service.worker.js',{updateViaCache:'none'});await r.update();const w=r.installing||r.waiting;if(w&&w.state!=='activated')await new Promise((resolve,reject)=>{const check=()=>{if(w.state==='activated')resolve();else if(w.state==='redundant')reject(Error('install'));};w.addEventListener('statechange',check);check();});})(),new Promise((_,reject)=>timer=setTimeout(()=>reject(Error('timeout')),20000))]);message(tr('Проверка завершена. Заверши бой перед перезапуском. Сохранения не удаляются.','Check complete. Finish your battle before restarting. Saved data is not deleted.','הבדיקה הסתיימה. סיימו את הקרב לפני הפעלה מחדש. השמירות אינן נמחקות.'),true);}catch(e){message(tr('Не удалось проверить обновление. Проверь интернет и попробуй снова.','Could not check for updates. Check your connection and retry.','בדיקת העדכון נכשלה. בדקו חיבור ונסו שוב.'));}finally{clearTimeout(timer);busy=false;update.disabled=false;}};
update.onclick=window.rzUpdate;sound.onclick=()=>window.rubezhOpenAudioDebug?.();
}
if(document.readyState==='complete')initPortal();else document.addEventListener('DOMContentLoaded',initPortal,{once:true});
})();
