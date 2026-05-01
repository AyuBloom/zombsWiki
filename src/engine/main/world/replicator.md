# `replicator`

The `Replication` class drives client-side entity interpolation and extrapolation. It maintains a queue of server ticks, advances a local clock (`shiftedGameTime`) each renderer frame, and fires callbacks when the client time crosses a tick boundary. It also tracks diagnostics such as FPS, frame stutters, extrapolation incidents, and client-server time desync.

## `Replication` <Badge type="danger" text="private" />

Bound to `game.world` as `game.world.replicator`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `currentTick` | `object \| null` | The most recently consumed tick from the queue. |
| `ticks` | `object[]` | Queue of incoming server ticks awaiting consumption. |
| `shiftedGameTime` | `number` | The authoritative client-side game clock (ms), offset by a 90 ms interpolation buffer. |
| `lastShiftedGameTime` | `number` | Previous frame's `shiftedGameTime`, used for renderer-pause detection. |
| `receivedFirstTick` | `boolean` | Whether the first server tick has been received and the clock initialized. |
| `serverTime` | `number` | Estimated server time (ms), derived from each tick's index and ping. |
| `msPerTick` | `number` | Duration of one server tick in milliseconds. |
| `msInThisTick` | `number` | Milliseconds elapsed within the current tick window. |
| `msElapsed` | `number` | Accumulator for fixed-timestep stutter detection. |
| `lastMsElapsed` | `number` | Delta time of the most recent renderer frame. |
| `ping` | `number` | Network ping at the time of entering the world. |
| `lastPing` | `number` | Previous ping value. |
| `startTime` | `Date \| null` | Wall-clock timestamp when the first tick was received. |
| `startShiftedGameTime` | `number` | Value of `shiftedGameTime` at the moment the first tick was received. |
| `frameStutters` | `number` | Number of frames where more than one fixed timestep elapsed (frame drops). |
| `frameTimes` | `number[]` | Rolling window (last 10) of frame delta times for FPS calculation. |
| `interpolating` | `boolean` | `true` when the client clock is within the bounds of the current tick window; `false` during extrapolation. |
| `ticksDesynced` | `number` | Counter for consecutive ticks where `serverTime - shiftedGameTime < ping`. |
| `ticksDesynced2` | `number` | Counter for consecutive ticks where the client-server time difference exceeds 40 ms. Triggers a client time reset at 10. |
| `clientTimeResets` | `number` | Number of times the client clock was forcibly corrected due to desync. |
| `maxExtrapolationTime` | `number` | Largest observed extrapolation overshoot (ms). |
| `totalExtrapolationTime` | `number` | Cumulative time spent extrapolating (ms). |
| `extrapolationIncidents` | `number` | Number of times the client transitioned from interpolation to extrapolation. |
| `differenceInClientTime` | `number` | Most recent difference between expected and actual client time (ms). |
| `equalTimes` | `number` | Consecutive frames where `shiftedGameTime` did not change, used for pause detection. |
| `wasRendererJustUnpaused` | `boolean` | Flag set when the renderer resumes from a detected pause. |
| `tickUpdatedCallback` | `Function` | Callback invoked when the client clock crosses a tick boundary (set by `World`). |
| `latestTickUpdatedCallback` | `Function \| undefined` | Optional callback invoked immediately when a new tick arrives from the server. |

### Methods

#### `init()`
```ts
function init(): void
```
Registers network handlers for `EnterWorld` and `EntityUpdate`, and adds a renderer tick callback.

#### `setTargetTickUpdatedCallback()`
```ts
function setTargetTickUpdatedCallback(tickUpdatedCallback: function): void
```
Sets the callback that is invoked each time the client clock advances past a tick boundary. Used by `World` to receive entity updates.

#### `setLatestTickUpdatedCallback()`
```ts
function setLatestTickUpdatedCallback(callback: function): void
```
Sets an optional callback invoked immediately upon receiving each entity update from the server, before tick scheduling.

#### `resetClientLag()`
```ts
function resetClientLag(): void
```
Resets `shiftedGameTime` to the real client time, correcting any accumulated drift.

### Getters & Setters

#### `getClientTimeResets()`
```ts
function getClientTimeResets(): number
```
Returns the number of client clock resets that have occurred.

#### `getMsInThisTick()`
```ts
function getMsInThisTick(): number
```
Returns the floored milliseconds elapsed within the current tick.

#### `getMsPerTick()`
```ts
function getMsPerTick(): number
```
Returns the tick duration in milliseconds.

#### `getMsSinceTick()`
```ts
function getMsSinceTick(tick: number, useInterpolationOffset?: boolean): number
```
Returns the milliseconds elapsed since the given tick. When `useInterpolationOffset` is `true` (default), adds a 2-tick offset before computing the delta.

#### `getMsUntilTick()`
```ts
function getMsUntilTick(tick: number): number
```
Returns the milliseconds remaining until the given tick.

#### `getServerTime()`
```ts
function getServerTime(): number
```
Returns the floored estimated server time.

#### `getClientTime()`
```ts
function getClientTime(): number
```
Returns the floored `shiftedGameTime`.

#### `getRealClientTime()`
```ts
function getRealClientTime(): number
```
Returns the actual wall-clock-based client time, computed from `startShiftedGameTime` plus the elapsed wall time since `startTime`. Returns `0` before the first tick is received.

#### `getFrameStutters()`
```ts
function getFrameStutters(): number
```
Returns the total number of frame stutters detected.

#### `getDifferenceInClientTime()`
```ts
function getDifferenceInClientTime(): number
```
Returns the most recent client time difference value.

#### `isFpsReady()`
```ts
function isFpsReady(): boolean
```
Returns `true` once at least 10 frame times have been collected.

#### `getFps()`
```ts
function getFps(): number
```
Computes and returns the average FPS from the last 10 frame deltas.

#### `getInterpolating()`
```ts
function getInterpolating(): boolean
```
Returns whether the replicator is currently interpolating (as opposed to extrapolating).

#### `getTickByteSize()`
```ts
function getTickByteSize(): number
```
Returns the byte size of the current tick. Returns `0` if no tick has been consumed yet.

#### `getTickEntities()`
```ts
function getTickEntities(): number
```
Returns the number of entities in the current tick. Returns `0` if no tick has been consumed yet.

#### `getTickIndex()`
```ts
function getTickIndex(): number
```
Returns the tick index of the current tick. Returns `0` if no tick has been consumed yet.

#### `getLastMsElapsed()`
```ts
function getLastMsElapsed(): number
```
Returns the delta time of the most recent renderer frame.

#### `getMaxExtrapolationTime()`
```ts
function getMaxExtrapolationTime(): number
```
Returns the maximum extrapolation overshoot observed (ms).

#### `getExtrapolationIncidents()`
```ts
function getExtrapolationIncidents(): number
```
Returns the total number of extrapolation incidents.

#### `getTotalExtrapolationTime()`
```ts
function getTotalExtrapolationTime(): number
```
Returns the cumulative time spent extrapolating (ms).

### Event Handlers

#### `onEnterWorld()`
```ts
function onEnterWorld(data: ENTER_WORLD_DATA): void
```
Handles the `EnterWorld` network event. If `allowed` is `false`, returns early. Otherwise resets all timing state — `msPerTick`, `shiftedGameTime`, `serverTime`, `ping`, and flags — preparing the replicator for a new world session.

#### `onEntityUpdate()`
```ts
function onEntityUpdate(data: ENTITY_UPDATE_DATA): void
```
Handles incoming entity update packets. Fires the `latestTickUpdatedCallback` if set, updates `serverTime`, and pushes the tick onto the queue. On the first tick, initializes `startTime`, `shiftedGameTime` (with a 90 ms interpolation buffer), and `startShiftedGameTime`. On subsequent ticks, checks for renderer pauses, computes client lag difference, and resets the client clock if the desync exceeds 40 ms for 10 consecutive ticks or the renderer was just unpaused.

#### `onTick()`
```ts
function onTick(msElapsed: number): void
```
Renderer tick handler. Accumulates frame times for FPS and stutter tracking, detects renderer pauses (zeroing `msElapsed` on resume to avoid time jumps), advances `serverTime`, `shiftedGameTime`, and `msInThisTick`, then calls `updateTick()`.

#### `updateTick()` <Badge type="info" text="internal" />
```ts
function updateTick(): void
```
Iterates the tick queue and fires `tickUpdatedCallback` for each tick whose start time the client clock has passed. After draining eligible ticks, checks whether the client clock exceeds the next expected tick boundary to detect extrapolation, and tracks desync counters.

#### `checkRendererPaused()` <Badge type="info" text="internal" />
```ts
function checkRendererPaused(): void
```
Increments `equalTimes` if `shiftedGameTime` has not changed since the last check, or resets it to `0`. Used by `isRendererPaused()`.

#### `isRendererPaused()` <Badge type="info" text="internal" />
```ts
function isRendererPaused(): boolean
```
Returns `true` when `equalTimes >= 8`, indicating the renderer has been stalled for at least 8 consecutive frames.
