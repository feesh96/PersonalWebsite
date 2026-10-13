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

const playback = new PlaybackCoordinator();
playback.register('beats', () => audio.pause());
playback.transition('beats', 'ready');
playback.transition('beats', 'enable');
audio.addEventListener('play', () => playback.transition('beats', 'started'));
audio.addEventListener('pause', () => playback.transition('beats', 'update', { isPaused: true }));
audio.addEventListener('ended', () => playback.transition('beats', 'update', { isPaused: true }));
audio.addEventListener('error', () => playback.transition('beats', 'error'));


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


const interestDialog = document.querySelector('#interest-dialog');
const interestTitle = document.querySelector('#interest-dialog-title');
const interestTabs = [...document.querySelectorAll('[data-category]')];
const interestHeadings = {
  music: 'Who I Listen To',
  podcasts: 'What I Listen To',
  movies: 'My Favorite Movies'
};
let interestOpener;

function selectInterest(category) {
  interestTitle.textContent = interestHeadings[category];
  if (category === 'music' && interestDialog.open) initializeAlbumPlayers();
  interestTabs.forEach(tab => {
    const selected = tab.dataset.category === category;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = !selected;
    panel.scrollTop = 0;
    panel.querySelectorAll('.spotify-embed').forEach(host => {
      playback.transition(host.dataset.playerId, selected ? 'enable' : 'disable');
    });
  });
}

document.querySelectorAll('[data-interest]').forEach(button => {
  button.addEventListener('click', () => {
    interestOpener = button;
    selectInterest(button.dataset.interest);
    interestDialog.showModal();
    if (button.dataset.interest === 'music') initializeAlbumPlayers();
    document.body.classList.add('modal-open');
  });
});

interestTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectInterest(tab.dataset.category));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % interestTabs.length;
    if (event.key === 'ArrowLeft') next = (index + interestTabs.length - 1) % interestTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = interestTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectInterest(interestTabs[next].dataset.category);
    interestTabs[next].focus();
  });
});

interestDialog.querySelector('.dialog-close').addEventListener('click', () => interestDialog.close());
interestDialog.addEventListener('click', event => {
  // A dialog also receives backdrop clicks; avoid closing clicks inside its padding.
  const bounds = interestDialog.getBoundingClientRect();
  if (event.target === interestDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) interestDialog.close();
});
interestDialog.addEventListener('close', () => {
  document.querySelectorAll('.spotify-embed').forEach(host => playback.transition(host.dataset.playerId, 'disable'));
  document.body.classList.remove('modal-open');
  interestOpener?.focus({ preventScroll: true });
});


let spotifyAPI;
let spotifyAPIPromise;
const albumControllers = new Map();
const albumHosts = [...document.querySelectorAll('.spotify-embed')];

function loadSpotifyAPI() {
  if (spotifyAPIPromise) return spotifyAPIPromise;
  spotifyAPIPromise = new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = api => { spotifyAPI = api; resolve(api); };
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    script.onerror = () => reject(new Error('Spotify could not be reached'));
    document.head.append(script);
  });
  return spotifyAPIPromise;
}

async function initializeAlbumPlayers() {
  try {
    const api = spotifyAPI || await loadSpotifyAPI();
    albumHosts.forEach(host => {
      const id = host.dataset.playerId;
      if (albumControllers.has(id)) return;
      // Reserve before initialization so repeated tab clicks cannot duplicate controllers.
      albumControllers.set(id, null);
      const placeholder = document.createElement('div');
      host.replaceChildren(placeholder);
      playback.register(id, () => albumControllers.get(id)?.pause(), state => {
        host.dataset.playbackState = state;
      });
      const enabled = interestDialog.open && !host.closest('[role="tabpanel"]').hidden;
      playback.transition(id, enabled ? 'enable' : 'disable');
      api.createController(placeholder, { url: host.dataset.spotifyUrl, width: '100%', height: 352 }, controller => {
        albumControllers.set(id, controller);
        const iframe = host.querySelector('iframe');
        if (iframe) iframe.title = `Spotify player: ${host.dataset.playerTitle}`;
        controller.addListener('ready', () => playback.transition(id, 'ready'));
        controller.addListener('playback_started', () => playback.transition(id, 'started'));
        controller.addListener('playback_update', event => playback.transition(id, 'update', event.data));
      });
    });
  } catch {
    albumHosts.forEach(host => {
      if (host.querySelector('iframe')) return;
      host.dataset.playbackState = 'error';
      host.replaceChildren(Object.assign(document.createElement('p'), {
        className: 'spotify-loading', textContent: 'The Spotify player is unavailable. Use the Spotify link above to listen.'
      }));
    });
  }
}
