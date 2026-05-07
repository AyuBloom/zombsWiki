# `world`

The `world` component is responsible for managing the game world state, including all networked entities, the local player, and the replication system. It handles entity creation, updates, and removal through object pooling, and synchronizes world state with the renderer each tick.

## `World` <Badge type="tip" text="public" />

Alias: `game.worldType`

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

## Game/`World` <Badge type="danger" text="private" />

Extends `World`. Bounded to `game` as `game.world`.

The **game-specific** world subclass that adds ground rendering and an `EntityGrid` spatial index on top of the base engine world. On entering the world, it creates the ground and border grass textures and attaches them to the renderer. Entity lifecycle methods are overridden to keep the `EntityGrid` in sync.

### Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isInitialized` | `boolean` | `false` | Guards the ground texture setup so it only runs once. |
| `entityGrid` | `EntityGrid` | — | Spatial grid for fast entity lookups, created on entering the world with a cell size of `48`. |

### Methods

#### `init()`
```ts
function init(): void
```
Calls the parent `World.init()`, then registers a network `EnterWorld` handler that builds the ground layer. The handler creates a `GroundEntity` with two `SpriteEntity` grass-texture attachments:

| Attachment | Position | Size | Notes |
| :--- | :--- | :--- | :--- |
| Border texture | `(-960, -960)` | `width + 1920` × `height + 1920` | Alpha set to `0.75`. Extends 20 tiles beyond the world bounds on every side. |
| Grass texture | `(0, 0)` | `width` × `height` | Covers the playable area. |

::: info
The handler exits early if `data.allowed` is `false` or `isInitialized` is already `true`, preventing duplicate ground layers.
:::

#### `onEnterWorld()`
```ts
function onEnterWorld(data: ENTER_WORLD_DATA): void
```
Calls the parent `World.onEnterWorld()`, then creates the `EntityGrid` with the world's `width`, `height`, and a cell size of `48`.

#### `createEntity()`
```ts
function createEntity(data: ENTITY_DATA): void
```
Calls the parent `World.createEntity()`, then adds the new entity to the `EntityGrid`.

#### `updateEntity()`
```ts
function updateEntity(uid: string, data: ENTITY_DATA): void
```
Calls the parent `World.updateEntity()`, then updates the entity's position in the `EntityGrid`.

#### `removeEntity()`
```ts
function removeEntity(uid: string): void
```
Calls the parent `World.removeEntity()`, then removes the entity from the `EntityGrid` by its numeric UID.
