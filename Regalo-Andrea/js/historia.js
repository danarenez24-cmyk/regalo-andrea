const $ = id => document.getElementById(id); const screens = ['welcome', 'garden', 'letter', 'adopt', 'room'];
function show(id) { screens.forEach(s => $(s).classList.toggle('active', s === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); if (id === 'room') startRoom() }
['wakeCat', 'adoptCat', 'roomCat'].forEach(id => createCat($(id), id === 'wakeCat' ? 'sleeping' : 'normal'));
let woke = false;
function wake() { if (woke) return; woke = true; catMood($('wakeCat'), 'surprised'); $('welcomeTalk').textContent = '¿Miauuu? ¿Andreaaa? ¡Por fin llegaste! Llevo como 3 años esperando... bueno, 5 minutos 😾💙'; $('start').hidden = false }
$('wakeCat').addEventListener('click', wake); $('wakeCat').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wake() } });
$('start').onclick = () => show('garden');
const notes = ['Me encanta hablar contigo 💙', 'Me haces sonreír muchísimooo 🥹', 'Me gusta cuando bromeamos juntos 🐱', 'Qué bonito fue conocerte 🌷', 'Eres alguien muy especial para mí ✨']; let opened = 0;
notes.forEach((note, i) => { const b = document.createElement('button'); b.className = 'flower'; b.textContent = '🪻'; b.setAttribute('aria-label', 'Abrir flor ' + (i + 1)); b.onclick = () => { if (!b.classList.contains('open')) { b.classList.add('open'); opened++ } b.textContent = '🌸'; $('flowerMessage').textContent = note; if (opened === notes.length) { $('toLetter').hidden = false; $('flowerMessage').textContent = '¡Florecieron todas! Creo que alguien te quiere muchooo 👀💙' } }; $('flowers').appendChild(b) });
$('toLetter').onclick = () => show('letter'); $('envelope').onclick = () => { $('envelope').hidden = true; $('letterText').hidden = false }; $('toAdopt').onclick = () => show('adopt');
$('maybe').onclick = () => { catMood($('adoptCat'), 'surprised'); $('adoptTalk').textContent = '¿CÓMO QUE PENSARLO? ¡SI YA HICE MI MALETA! 😭🐾' };
$('yesAdopt').onclick = () => { $('nameBox').hidden = false; $('adoptTalk').textContent = '¡SÍIIII! ¿Y cómo me voy a llamar? 🥹'; catMood($('adoptCat'), 'happy') };
$('saveName').onclick = () => { const name = $('catName').value.trim() || 'Nubecito'; localStorage.setItem('andrea-cat-name', name); localStorage.setItem('andrea-adopted', 'yes'); $('roomTitle').textContent = 'La casita de ' + name + ' 🏡'; show('room') };
$('replay').onclick = () => { opened = 0; document.querySelectorAll('.flower').forEach(b => { b.classList.remove('open'); b.textContent = '🪻' }); $('toLetter').hidden = true; $('envelope').hidden = false; $('letterText').hidden = true; show('welcome') };
if (localStorage.getItem('andrea-adopted') === 'yes') { $('roomTitle').textContent = 'La casita de ' + (localStorage.getItem('andrea-cat-name') || 'Nubecito') + ' 🏡'; show('room') }
// Sonidito opcional generado con Web Audio, sin archivos externos.
let soundOn = false, audioCtx; $('sound').onclick = () => { soundOn = !soundOn; $('sound').textContent = soundOn ? '🔊' : '🔇' };
document.addEventListener('click', () => { if (!soundOn) return; try { audioCtx ??= new (window.AudioContext || window.webkitAudioContext)(); const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.type = 'sine'; o.frequency.value = 740; g.gain.setValueAtTime(.025, audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .11); o.connect(g).connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + .12) } catch (e) { } });
