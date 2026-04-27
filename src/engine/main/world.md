<!-- headers are case-sensitive -->
# `World`

The `World` class is responsible for managing the game world state, including all networked entities, the local player, and the replication system. It handles entity creation, updates, and removal through object pooling, and synchronizes world state with the renderer each tick.

## `World` <Badge type="tip" text="public" />

Bounded to `game` as `game.world`. Alias: `game.worldType`

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `entities` | `Record<string, NetworkEntity>` | A map of all active entities in the world, keyed by UID. |
| `inWorld` | `boolean` | Whether the player has entered the world. |
| `myUid` | `number \| null` | The UID of the local player's entity, or `null` if not yet in the world. |
| `networkEntityPool` | `NetworkEntity[]` | Pool of pre-allocated `NetworkEntity` instances for reuse. |
| `modelEntityPool` | `Record<string, Model[]>` | Pool of pre-loaded model instances, keyed by model name. |
| `network` | `BinNetworkAdapter` | Reference to the current game's network adapter. |
| `renderer` | `Renderer` | Reference to the current game's renderer. |
| `replicator` | `Replication` | The replication instance used for entity state synchronization. |
| `localPlayer` | `LocalPlayer` | The local player instance. |
| `tickRate` | `number` | The server tick rate (ticks per second). Set on entering the world. |
| `msPerTick` | `number` | Milliseconds per tick, derived from `tickRate`. Set on entering the world. |
| `height` | `number` | The height of the world in units. Set on entering the world. |
| `width` | `number` | The width of the world in units. Set on entering the world. |

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Initializes the world state, sets up references to the network and renderer, and creates the `Replication` and `LocalPlayer` instances.

#### `init()`
```ts
function init(): void
```
Binds the replicator's target tick callback to `onEntityUpdate`, initializes the replicator, registers a network handler for `PACKET_ENTER_WORLD2` which in reality is called `PACKET_ENTER_WORLD` and adds a renderer tick callback.

#### `preloadNetworkEntities()`
```ts
function preloadNetworkEntities(): void
```
Pre-allocates a pool of `NetworkEntity` instances based on the pool size returned by `game.getNetworkEntityPooling()`. Does nothing if entity pooling is disabled.

#### `preloadModelEntities()`
```ts
function preloadModelEntities(): void
```
Pre-loads and pools model instances for each model name and pool size defined by `game.getModelEntityPooling()`.


#### `createEntity()`
```ts
function createEntity(data: object): void
```
Creates a new entity in the world. Uses a pooled `NetworkEntity` if available, otherwise creates a new one. Refreshes the entity's model, and if the entity UID matches `myUid`, binds it to the local player and tells the renderer to follow it. Adds the entity to the renderer.

#### `updateEntity()`
```ts
function updateEntity(uid: string, data: object): void
```
Updates the target tick data for the entity with the given UID.

#### `removeEntity()`
```ts
function removeEntity(uid: string): void
```
Removes an entity from the world. Returns the entity's model and the entity itself to their respective pools if pooling is enabled, then removes the entity from the renderer and the `entities` map.

### Getters & Setters

#### `getTickRate()`
```ts
function getTickRate(): number
```
Returns the server tick rate.

#### `getMsPerTick()`
```ts
function getMsPerTick(): number
```
Returns the milliseconds per tick.

#### `getReplicator()`
```ts
function getReplicator(): Replication
```
Returns the `Replication` instance.

#### `getHeight()`
```ts
function getHeight(): number
```
Returns the world height.

#### `getWidth()`
```ts
function getWidth(): number
```
Returns the world width.

#### `getLocalPlayer()`
```ts
function getLocalPlayer(): LocalPlayer
```
Returns the `LocalPlayer` instance.

#### `getInWorld()`
```ts
function getInWorld(): boolean
```
Returns whether the player is currently in the world.

#### `getMyUid()`
```ts
function getMyUid(): number | null
```
Returns the local player's entity UID.

#### `getEntityByUid()`
```ts
function getEntityByUid(uid: string): NetworkEntity
```
Returns the entity with the given UID, or `undefined` if it does not exist.

#### `getPooledNetworkEntityCount()`
```ts
function getPooledNetworkEntityCount(): number
```
Returns the number of `NetworkEntity` instances currently available in the pool.

#### `getModelFromPool()`
```ts
function getModelFromPool(modelName: string): Model | null
```
Removes and returns a model instance from the pool for the given model name. Returns `null` if the pool is empty.

#### `getPooledModelEntityCount()`
```ts
function getPooledModelEntityCount(modelName: string): number
```
Returns the number of pooled model instances available for the given model name. Returns `0` if the model name has no pool.

### Event Handlers

#### `onEnterWorld()`
```ts
function onEnterWorld(data: ENTER_WORLD_DATA): void
```
Handles the `EnterWorld` network event. If `allowed` is `false`, returns early. Otherwise sets `width`, `height`, `tickRate`, `msPerTick`, `inWorld`, and `myUid` from the response data.

#### `onEntityUpdate()`
```ts
function onEntityUpdate(data: ENTITY_DATA): void
```
Handles replicator target tick updates. Iterates over current entities to remove or update them based on the incoming data, then creates any new entities. Also updates the local player's target tick if its entity is present.

#### `onRendererTick()`
```ts
function onRendererTick(delta: number): void
```
Called each renderer frame. Ticks all entities with the current interpolation progress from the replicator.

## `LocalPlayer`

The `LocalPlayer` class represents the client's own player within the world. It holds a reference to the player's `NetworkEntity`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `entity` | `NetworkEntity` | The network entity associated with the local player. |

### Methods

#### `setEntity()`
```ts
function setEntity(entity: NetworkEntity): void
```
Stores a reference to the player's `NetworkEntity`.

#### `getEntity()`
```ts
function getEntity(): NetworkEntity
```
Returns the player's `NetworkEntity`.

#### `setTargetTick()`
```ts
function setTargetTick(tick: object): void
```
Forwards the given tick data to the UI via `game.ui.setPlayerTick()`.

## `Replication`

The `Replication` class drives client-side entity interpolation and extrapolation. It maintains a queue of server ticks, advances a local clock (`shiftedGameTime`) each renderer frame, and fires callbacks when the client time crosses a tick boundary. It also tracks diagnostics such as FPS, frame stutters, extrapolation incidents, and client-server time desync.

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