const { test } = require('node:test');
const assert = require('node:assert/strict');
const { PlaybackCoordinator } = require(process.env.PLAYBACK_MODULE || '../playback-state.js');

function setup() {
  const machine = new PlaybackCoordinator();
  const pauses = [];
  for (const id of ['a', 'b', 'beats']) {
    machine.register(id, () => pauses.push(id));
    machine.transition(id, 'ready');
    machine.transition(id, 'enable');
  }
  return { machine, pauses };
}

test('starting another album pauses the previous album exactly once', () => {
  const { machine, pauses } = setup();
  machine.transition('a', 'started');
  machine.transition('b', 'started');
  machine.transition('b', 'update', { isPaused: false });
  assert.equal(machine.activeId, 'b');
  assert.deepEqual(pauses, ['a']);
  assert.equal(machine.players.get('a').state, 'pausing');
});

test('late updates and starts from the paused album cannot pause its replacement', () => {
  const { machine, pauses } = setup();
  machine.transition('a', 'started');
  machine.transition('b', 'started');
  machine.transition('a', 'update', { isPaused: false });
  machine.transition('a', 'started');
  machine.transition('a', 'update', { isPaused: true });
  assert.equal(machine.activeId, 'b');
  assert.deepEqual(pauses, ['a']);
});

test('pause and resume can transfer ownership back to an earlier album', () => {
  const { machine, pauses } = setup();
  machine.transition('a', 'started');
  machine.transition('b', 'started');
  machine.transition('a', 'update', { isPaused: true });
  machine.transition('a', 'update', { isPaused: false });
  assert.equal(machine.activeId, 'a');
  assert.deepEqual(pauses, ['a', 'b']);
});

test('closing or switching categories pauses playback and rejects a late start', () => {
  const { machine, pauses } = setup();
  machine.transition('a', 'started');
  machine.transition('a', 'disable');
  machine.transition('a', 'update', { isPaused: true });
  machine.transition('a', 'started');
  assert.equal(machine.activeId, null);
  assert.deepEqual(pauses, ['a', 'a']);
});

test('hidden players cannot claim ownership during asynchronous initialization', () => {
  const machine = new PlaybackCoordinator();
  let paused = 0;
  machine.register('a', () => paused++);
  machine.transition('a', 'disable');
  machine.transition('a', 'ready');
  machine.transition('a', 'started');
  assert.equal(machine.activeId, null);
  assert.equal(paused, 1);
});

test('buffering counts as active playback and is paused by the next album', () => {
  const { machine, pauses } = setup();
  machine.transition('a', 'update', { isPaused: false, isBuffering: true });
  assert.equal(machine.players.get('a').state, 'buffering');
  machine.transition('b', 'started');
  assert.equal(machine.activeId, 'b');
  assert.deepEqual(pauses, ['a']);
});

test('the native beat player and Spotify albums pause each other', () => {
  const { machine, pauses } = setup();
  machine.transition('beats', 'started');
  machine.transition('a', 'started');
  machine.transition('beats', 'update', { isPaused: true });
  machine.transition('beats', 'started');
  assert.equal(machine.activeId, 'beats');
  assert.deepEqual(pauses, ['beats', 'a']);
});

test('a synchronous pause event cannot clear the new active player', () => {
  const machine = new PlaybackCoordinator();
  machine.register('a', () => machine.transition('a', 'update', { isPaused: true }));
  machine.register('b', () => {});
  for (const id of ['a', 'b']) {
    machine.transition(id, 'ready');
    machine.transition(id, 'enable');
  }
  machine.transition('a', 'started');
  machine.transition('b', 'started');
  assert.equal(machine.activeId, 'b');
  assert.equal(machine.players.get('a').state, 'paused');
});

test('errors release ownership without interrupting a different player', () => {
  const { machine } = setup();
  machine.transition('a', 'started');
  machine.transition('b', 'started');
  machine.transition('a', 'error');
  assert.equal(machine.activeId, 'b');
  machine.transition('b', 'error');
  assert.equal(machine.activeId, null);
});
