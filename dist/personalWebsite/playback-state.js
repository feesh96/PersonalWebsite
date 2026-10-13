class PlaybackCoordinator {
  constructor() {
    this.players = new Map();
    this.activeId = null;
  }

  register(id, pause, onState = () => {}) {
    this.players.set(id, { state: 'loading', enabled: false, pause, onState });
  }

  setState(id, state) {
    const player = this.players.get(id);
    if (player.state === state) return;
    player.state = state;
    player.onState(state);
  }

  pause(id) {
    const player = this.players.get(id);
    if (!player || player.state === 'pausing') return;
    if (this.activeId === id) this.activeId = null;
    // Mark before sending the command, including for synchronous native events.
    this.setState(id, 'pausing');
    player.pause();
  }

  transition(id, event, data = {}) {
    const player = this.players.get(id);
    if (!player) return;
    switch (event) {
      case 'enable':
        player.enabled = true;
        break;
      case 'disable':
        player.enabled = false;
        if (['playing', 'buffering'].includes(player.state)) this.pause(id);
        break;
      case 'ready':
        this.setState(id, 'paused');
        break;
      case 'error':
        if (this.activeId === id) this.activeId = null;
        this.setState(id, 'error');
        break;
      case 'update':
        if (data.isPaused) {
          if (this.activeId === id) this.activeId = null;
          this.setState(id, 'paused');
          break;
        }
        // Updates queued before a pause must not reclaim playback ownership.
        if (!player.enabled || player.state === 'pausing') {
          this.pause(id);
          break;
        }
        this.claim(id, data.isBuffering ? 'buffering' : 'playing');
        break;
      case 'started':
        if (!player.enabled || player.state === 'pausing') {
          this.pause(id);
          break;
        }
        this.claim(id, 'playing');
        break;
    }
  }

  claim(id, state) {
    const previous = this.activeId;
    this.activeId = id;
    this.setState(id, state);
    if (previous && previous !== id) this.pause(previous);
  }
}

if (typeof module !== 'undefined') module.exports = { PlaybackCoordinator };
