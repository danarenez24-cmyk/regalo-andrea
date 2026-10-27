// Gatito ilustrado con HTML y CSS: no necesita imágenes externas.
function createCat(target, mood='normal'){
 target.innerHTML=`<div class="cat"><div class="tail"></div><div class="ear"></div><div class="ear right"></div><div class="head"><div class="eye"></div><div class="eye right"></div><div class="nose"></div><div class="mouth">ω</div><div class="cheek"></div><div class="cheek right"></div></div><div class="bow">🎀</div></div>`;
 target.classList.remove('sleeping','happy','surprised');if(mood!=='normal')target.classList.add(mood);
}
function catMood(target,mood){target.classList.remove('sleeping','happy','surprised');if(mood)target.classList.add(mood)}
const roomCat=document.getElementById('roomCat'),room=document.getElementById('roomScene'),roomBubble=document.getElementById('roomBubble');
let catTimer=null,autoWalk=null;
function sayCat(message,mood='happy'){roomBubble.textContent=message;catMood(roomCat,mood)}
function walkTo(x){const width=room.clientWidth;const catWidth=roomCat.offsetWidth;roomCat.style.left=Math.max(0,Math.min(width-catWidth,x-catWidth/2))+'px';roomCat.classList.add('walking');clearTimeout(catTimer);catTimer=setTimeout(()=>roomCat.classList.remove('walking'),1250)}
room.addEventListener('click',e=>{if(e.target.closest('.room-bubble'))return;walkTo(e.clientX-room.getBoundingClientRect().left);sayCat('¡Miauuu! Voy para allá 🐾')});
function startRoom(){clearInterval(autoWalk);sayCat('¡Andreaaa! ¡Qué bonito verte! 💙');autoWalk=setInterval(()=>{if(document.getElementById('room').classList.contains('active'))walkTo(50+Math.random()*(room.clientWidth-100))},5500)}
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{const action=btn.dataset.action;const messages={feed:['¡UN PESCADITOOOO! 🐟💙','happy'],pet:['Prrrr... me encantan los cariñitos 🥹','happy'],play:['¡Atrapemos el estambreee! 🧶','surprised'],sleep:['Cinco minutitos más... zzz 💤','sleeping']};sayCat(...messages[action]);if(action==='feed')walkTo(room.clientWidth-55);if(action==='play')walkTo(Math.random()*room.clientWidth);if(action==='sleep'){clearTimeout(catTimer);roomCat.classList.remove('walking')}if(action==='pet'){roomCat.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:600})}}));
