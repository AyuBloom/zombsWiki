---
title: game - zombs.io Wiki
---
# `game`

## `Game` <Badge type="danger" text="private" />

Extends `EventEmitter`.

The base game class that bootstraps the entire engine. It acts as a **service locator** by storing constructor references ("types") for every major subsystem and instantiating them during [`init()`](#init).
### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `GAME_OPTIONS` | `{}` | Configuration options passed to the constructor. |
| `group` | `number` | `0` | The party / server group the player belongs to. |
| `networkEntityPooling` | `number \| false` | `false` | Pool size for network entities, or `false` when pooling is disabled. |
| `modelEntityPooling` | `object` | `{}` | Map of model name → pool size for model entity pooling. |

#### Component Type References

These properties hold **constructor references** that `init()` uses to create the corresponding subsystem instances. They can be overridden by subclasses before `init()` is called.

| Property | Default Type | Description |
| :--- | :--- | :--- |
| `assetManagerType` | `AssetManager` | Asset loading and caching. |
| `networkType` | `BinNetworkAdapter` | Binary WebSocket network adapter. |
| `rendererType` | `Renderer` | Rendering pipeline. |
| `inputManagerType` | `InputManager` | Keyboard / mouse input handling. |
| `inputPacketSchedulerType` | `InputPacketScheduler` | Schedules outgoing input packets. |
| `inputPacketCreatorType` | `InputPacketCreator` | Builds input packets from raw input. |
| `platformType` | `WebPlatform` | Platform abstraction (Web / FBInstant). |
| `worldType` | `World` | Game world and entity management. |
| `debugType` | `Debug` | Debug utilities. |
| `metricsType` | `Metrics` | Performance and network telemetry. |
| `uiType` | `Ui` | User interface root. |

#### Component Instances

Created during [`init()`](#init). Each one corresponds to a type reference above.

| Property | Type | Description |
| :--- | :--- | :--- |
| `assetManager` | `AssetManager` | Asset loading and caching instance. |
| `network` | `BinNetworkAdapter` | Network adapter instance. |
| `renderer` | `Renderer` | Renderer instance. |
| `inputManager` | `InputManager` | Input manager instance. |
| `inputPacketScheduler` | `InputPacketScheduler` | Input packet scheduler instance. |
| `inputPacketCreator` | `InputPacketCreator` | Input packet creator instance. |
| `platform` | `WebPlatform \| FBInstantPlatform` | Platform instance. |
| `world` | `World` | World instance. |
| `debug` | `Debug` | Debug instance. |
| `metrics` | `Metrics` | Metrics instance. |
| `ui` | `Ui` | UI instance. |

#### Static Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `Game.currentGame` | `Game` | Singleton reference to the active game instance. Set in the constructor. |

### Methods

#### `init()`
```ts
function init(callback: () => void): void
```

Bootstraps every subsystem by instantiating all component type references, starts the input pipeline and renderer, initialises the world and platform, then invokes `callback` (bound to the game instance).

::: info
If `options.platform` is `'FBInstant'`, the platform type is swapped to `FBInstantPlatform` and canvas rendering is forced.
:::

#### `start()`
```ts
function start(firstTime: boolean): void
```

Starts (or restarts) the renderer.

#### `stop()`
```ts
function stop(): void
```

Stops the renderer.

#### `run()`
```ts
function run(): void
```

No-op in the base class. Intended to be overridden by subclasses to begin the game loop.

#### `preload()`
```ts
function preload(): void
```

Preloads network entities and model entities through the world instance.

#### `getNetworkEntityPooling()`
```ts
function getNetworkEntityPooling(): number | false
```

Returns the current network entity pool size, or `false` if pooling is disabled.

#### `setNetworkEntityPooling()`
```ts
function setNetworkEntityPooling(poolSize: number): void
```

Sets the pool size for network entities.

#### `getModelEntityPooling()`
```ts
function getModelEntityPooling(modelName?: string): boolean | object
```

When called with a `modelName`, returns `true` / `false` indicating whether that model has pooling enabled. When called without arguments, returns the entire `modelEntityPooling` map.

#### `setModelEntityPooling()`
```ts
function setModelEntityPooling(modelName: string, poolSize: number): void
```

Registers a pool size for the given model name.

#### `setGroup()`
```ts
function setGroup(group: number): void
```

Sets the party / server group.

#### `getGroup()`
```ts
function getGroup(): number
```

Returns the current party / server group.

## Game/`Game` <Badge type="tip" text="public" />

Extends `Game`. Class is accessible at `window.Game`. Game instance is accessible at `window.game` and `window.Game.currentGame`.

The **game-specific** subclass that configures zombs.io on top of the base engine. It overrides the world and renderer types with game-specific implementations, disables culling, and sets up entity pooling for projectile models.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `options` | `GAME_OPTIONS` | Configuration options forwarded from the constructor. |
| `worldType` | Game/`World` | Overridden to use the game-specific `World` class. |
| `rendererType` | Game/`Renderer` | Overridden to use the game-specific `Renderer` class. |

::: info

`options` is a dynamic data that is defined by the website. Its structure is documented in [Data Interfaces](#data-interfaces).

:::


### Methods

#### `enablePooling()`
```ts
function enablePooling(): void
```

Configures object pooling for the game. Sets the network entity pool to **200** and creates pools of **50** for each projectile model:

| Model | Pool Size |
| :--- | :--- |
| `ProjectileArrowModel` | 50 |
| `ProjectileBombModel` | 50 |
| `ProjectileCannonModel` | 50 |
| `ProjectileMageModel` | 50 |

Calls `preload()` afterwards to warm the pools.

::: info
`enablePooling()` is deferred via `_.defer()` during construction, meaning they execute after the current call stack has cleared.
:::

#### `disableCulling()`
```ts
function disableCulling(): void
```

Disables entity culling. Currently a no-op stub.

::: info
Similar to `enablePooling`,`disableCulling()` is deferred via `_.defer()` during construction.
:::

#### `run()`
```ts
function run(): void
```

Calls the parent `Game.run()` implementation. Is called when the website loads.


## Data Interfaces

#### `GAME_OPTIONS`

```ts
interface GAME_OPTIONS {
    stage: string;
    servers: Record<string, SERVER_DATA>;
    userGroup: number;
}
```

#### `SERVER_DATA`

```ts
interface SERVER_DATA = {
    id: string;
    region: string;
    name: string;
    hostname: string;
    ipAddress: string;
    port: number;
    fallbackPort: number;
    selected: boolean;
};
```


