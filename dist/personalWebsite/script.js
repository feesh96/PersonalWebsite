const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scrollQueued = false;

function updateCurrentSection() {
  const marker = window.innerHeight * 0.38 + document.querySelector('.site-header').offsetHeight;
  let current = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) current = `#${section.id}`;
  }
  for (const link of navLinks) {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollQueued = false;
}

window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(updateCurrentSection);
}, { passive: true });
window.addEventListener('resize', updateCurrentSection);
window.addEventListener('hashchange', updateCurrentSection);
updateCurrentSection();

document.querySelector('#year').textContent = new Date().getFullYear();

const audio = document.querySelector('#audio');
const playToggle = document.querySelector('#play-toggle');
const playSymbol = document.querySelector('#play-symbol');
const title = document.querySelector('#track-title');
const seek = document.querySelector('#seek');
const elapsed = document.querySelector('#elapsed');
const duration = document.querySelector('#duration');
const status = document.querySelector('#player-status');
const playerPanel = document.querySelector('.player-panel');
const tracks = [...document.querySelectorAll('.track')];
let selectedIndex = 0;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

function syncPlayState() {
  const playing = !audio.paused;
  playSymbol.textContent = playing ? 'Ⅱ' : '▶';
  playToggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${tracks[selectedIndex].dataset.title}`);
  playerPanel.classList.toggle('is-playing', playing);
}

function selectTrack(index, shouldPlay) {
  selectedIndex = index;
  const track = tracks[index];
  audio.src = track.dataset.src;
  audio.load();
  title.textContent = track.dataset.title;
  seek.value = 0;
  seek.style.setProperty('--progress', '0%');
  elapsed.textContent = '0:00';
  duration.textContent = '0:00';
  tracks.forEach((item, itemIndex) => {
    item.classList.toggle('is-selected', itemIndex === index);
    if (itemIndex === index) item.setAttribute('aria-current', 'true');
    else item.removeAttribute('aria-current');
  });
  status.textContent = `Selected ${track.dataset.title}`;
  syncPlayState();
  if (shouldPlay) playAudio();
}

async function playAudio() {
  try {
    await audio.play();
    status.textContent = `Playing ${tracks[selectedIndex].dataset.title}`;
  } catch {
    status.textContent = 'This track could not be played. Please try another.';
  }
  syncPlayState();
}

playToggle.addEventListener('click', () => {
  if (audio.paused) playAudio();
  else audio.pause();
});

tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    if (index === selectedIndex) {
      if (audio.paused) playAudio();
      else audio.pause();
    } else selectTrack(index, true);
  });
});

audio.addEventListener('play', syncPlayState);
audio.addEventListener('pause', syncPlayState);
audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  elapsed.textContent = formatTime(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    seek.value = (audio.currentTime / audio.duration) * 100;
  }
});
audio.addEventListener('ended', () => {
  if (selectedIndex < tracks.length - 1) selectTrack(selectedIndex + 1, true);
  else { status.textContent = 'The beat archive has finished playing.'; syncPlayState(); }
});
audio.addEventListener('error', () => {
  status.textContent = 'This track could not be loaded. Please try another.';
  syncPlayState();
});
seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(seek.value) / 100) * audio.duration;
  }
});
