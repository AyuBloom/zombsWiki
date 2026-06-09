---
title: Timing, Ticks, and Intervals - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Timing, Ticks, and Intervals - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The server tick, scheduling script work, debouncing, throttling, and
        rate limits to respect in zombs.io scripts.
  - - meta
    - property: 'og:description'
      content: >-
        The server tick, scheduling script work, debouncing, throttling, and
        rate limits to respect in zombs.io scripts.
---
# Timing, Ticks, and Intervals

## The server tick

The server updates the world approximately **20 times per second** (every ~50ms). Each update pushes a new entity-update packet (opcode `0`) to all connected clients. This is the heartbeat that scripts sync to.

```js
// runs every server tick (~20x per second)
game.network.addPacketHandler(0, () => {
  // your game loop logic here
});
```

Input packets follow the same cadence — `inputPacketScheduler` only sends the latest input state once per tick, so calling `sendInput` multiple times in one tick is safe and won't flood the server.

## Scheduling work

### On every tick — the game loop

Use `addPacketHandler(0, fn)` or `addEntityUpdateHandler(fn)` for anything that needs to run continuously:

```js
game.network.addPacketHandler(0, () => {
  // runs every tick — keep this fast
});
```

### On a timer — `setInterval` / `setTimeout`

Use these for work that does not need to be tick-synchronised:

```js
// run something every 2 seconds
const timer = setInterval(() => {
  game.network.sendRpc({ name: "CollectHarvester", uid: someUid });
}, 2000);

// cancel it later
clearInterval(timer);
```

`setInterval` is appropriate for periodic non-critical tasks like collecting harvesters or checking conditions infrequently. For anything that reacts to world state (health, enemies, position), the tick handler is more reliable.

### On a server event — `addRpcHandler`

Use this to react to specific server-sent events:

```js
game.network.addRpcHandler("Dead", () => {
  setTimeout(() => game.network.sendInput({ respawn: 1 }), 500);
});
```

## Debouncing and throttling

Scripts that send RPCs in a tick handler can accidentally spam the server. The two patterns to know:

### Throttle with a timestamp

Allow an action at most once every N milliseconds:

```js
let lastAt = 0;
game.network.addPacketHandler(0, () => {
  const now = Date.now();
  if (now - lastAt < 400) return;
  lastAt = now;
  // do the thing
});
```

Use this for actions that should repeat but not on every single tick — healing, feeding harvesters, attacking.

### Debounce with a flag

Allow an action only once per trigger event:

```js
let triggered = false;
game.network.addRpcHandler("Dead", () => {
  if (triggered) return;
  triggered = true;
  setTimeout(() => {
    game.network.sendInput({ respawn: 1 });
    triggered = false;
  }, 500);
});
```

## Rate limits to respect

| Action | Safe rate |
| :--- | :--- |
| `sendInput` | Any — the scheduler merges per tick automatically |
| `sendRpc` (general) | ~1 per tick per RPC type |
| `SendChatMessage` | ~1 per second (server enforces ~1050ms) |
| `SetPartyMemberCanSell` | Stagger calls — the server processes ~1 per network flush |

Sending the same RPC type faster than the server processes them does not help and may cause dropped packets or disconnection.

## Day/night timing

The server pushes a `DayCycle` RPC when the cycle flips:

```js
game.network.addRpcHandler("DayCycle", ({ isDay }) => {
  if (isDay) {
    // daytime — safe to travel, farm, build
  } else {
    // nighttime — zombies are attacking
  }
});
```

One full day+night cycle is approximately **120 seconds**.
