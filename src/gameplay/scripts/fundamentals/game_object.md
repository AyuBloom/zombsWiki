---
title: The game Object - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: The game Object - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        A practical guide to window.game — the single global that every zombs.io
        script reads and drives.
  - - meta
    - property: 'og:description'
      content: >-
        A practical guide to window.game — the single global that every zombs.io
        script reads and drives.
---
# The `game` Object

Every script starts here. The game client exposes a single global called `game` that holds every subsystem. You can access it by name directly in the console or in a script — no `window.` prefix required.

```js
game               // the live Game instance
window.game        // same thing
window.Game.currentGame  // also the same thing
```

Open the browser console while on zombs.io and type `game` to explore the live object tree yourself.

## Top-level structure

`game` contains three categories of keys:

| Category | Pattern | Example |
| :--- | :--- | :--- |
| **Subsystem instances** | plain name | `game.network`, `game.ui`, `game.world` |
| **Subsystem classes** | ends with `Type` | `game.networkType`, `game.uiType` |
| **Misc** | — | `game.options`, `game._events` |

The `*Type` keys are class references — they let you construct new instances of subsystems, but scripts almost never need them.

## Subsystems

### `game.network`

The WebSocket adapter. This is how scripts send actions to the server and listen for responses.

Key methods:

| Method | Use |
| :--- | :--- |
| `sendRpc(data)` | Send an RPC (an action) — `data.name` + arguments |
| `sendInput(data)` | Send a movement / aim / attack input |
| `addRpcHandler(name, fn)` | Listen for a named server event (e.g. `"Dead"`, `"DayCycle"`) |
| `addPacketHandler(opcode, fn)` | Listen by raw opcode — opcode `0` fires every entity-update tick, making it the standard game loop hook |
| `addEntityUpdateHandler(fn)` | Shorthand for the opcode `0` tick |

See [Network Basics](/gameplay/scripts/fundamentals/network_basics) and the [RPC Reference](/gameplay/scripts/fundamentals/rpc_reference) for full usage.

### `game.ui`

All readable game state lives here. This is where scripts get the player's gold, health, inventory, buildings, and party.

::: warning
`game.ui.playerTick` is `null` until you have entered the world (picked a name and spawned). Always gate on it before reading player state.
:::

**Commonly used properties:**

| Property | Type | What it holds |
| :--- | :--- | :--- |
| `playerTick` | object \| null | Per-tick snapshot of your character (position, gold, health, wave, etc.) |
| `buildings` | object | Map of your party's placed buildings by UID |
| `inventory` | object | Your held items (`Bow`, `Pickaxe`, `HealthPotion`, etc.) |
| `parties` | object | All parties the client knows about — both open and non-open |
| `components` | object | Every live UI component by name (e.g. `game.ui.components.Chat`) |

**Useful getter methods:**

```js
game.ui.getPlayerTick()           // same as game.ui.playerTick
game.ui.getPlayerPartyId()        // your numeric party ID
game.ui.getPlayerPartyMembers()   // array of { playerUid, canSell, ... }
game.ui.getPlayerPartyShareKey()  // your 20-char party share key
game.ui.getPlayerPartyLeader()    // UID of the party leader
game.ui.getInventory()            // same as game.ui.inventory
game.ui.getBuildings()            // same as game.ui.buildings
```

**`playerTick` fields** (when in-world):

```js
const p = game.ui.playerTick;
p.position   // { x, y } — world coordinates
p.gold
p.wood
p.stone
p.token
p.health
p.maxHealth
p.wave       // current wave number
```

### `game.world`

The live world state — entities, your own UID, and the renderer.

| Property | What it is |
| :--- | :--- |
| `entities` | `Map` of all visible entities — iterate with `.values()` |
| `myUid` | Your entity's UID (number) |
| `inWorld` | `true` once you have spawned |
| `replicator` | Tick interpolation data (`replicator.msInThisTick`) |
| `localPlayer` | Your local player object |

**Iterating entities:**

```js
for (const entity of game.world.entities.values()) {
  const t = entity.targetTick;
  if (!t || !t.position) continue;
  // t.model, t.entityClass, t.position, t.health, t.partyId, t.dead, t.uid ...
}
```

See [Entity and World State](/gameplay/scripts/fundamentals/entity_world_state) for the full entity shape and filtering patterns.

### `game.renderer`

The PIXI renderer. Handles coordinate conversion between world space and screen space.

::: info
`game.renderer` and `game.world.renderer` are the **same object**.
:::

**Coordinate conversion:**

```js
game.renderer.worldToScreen(x, y)
```
Converts a world position into CSS pixel coordinates relative to the browser window. Use this when you want to place a DOM element at a world position, or when you need the screen coordinates of an entity to pass to `inputManager.onMouseMoved` for aim scripts.

```js
game.renderer.screenToWorld(clientX, clientY)
```
The reverse — converts CSS pixel coordinates (e.g. from a mouse event's `clientX`/`clientY`) into world coordinates. Useful when you want to know what world position the player clicked on.

```js
game.renderer.worldToUi(x, y)
```
Similar to `worldToScreen`, but returns coordinates relative to the game's internal UI overlay layer rather than the full browser window. Use this when positioning elements inside the game's own HUD rather than as raw DOM overlays.

**PIXI layers** for drawing custom overlays:

```js
game.renderer.ground    // ground layer — rendered beneath entities
game.renderer.npcs      // NPC / entity layer
game.renderer.players   // player layer
```

### `game.inputManager`

Handles raw keyboard and mouse state. The most common scripting use is `onMouseMoved`, which artificially moves the player's aim crosshair to a given screen position — the game responds exactly as if the player physically moved their mouse there:

```js
// Point the crosshair at a world position
const screenPos = game.renderer.worldToScreen(targetX, targetY);
game.inputManager.onMouseMoved({ clientX: screenPos.x, clientY: screenPos.y });
```

This is how auto-aim scripts work: they find a target in `game.world.entities`, convert its world position to screen coordinates, then call `onMouseMoved` to snap the aim to it every tick.

### `game.options`

Server/session metadata, set at load time:

```js
game.options.stage      // environment ("production", etc.)
game.options.servers    // list of available servers
game.options.userGroup  // user group / account tier
```

### Other subsystems

| Key | Purpose |
| :--- | :--- |
| `game.assetManager` | Loads and caches game assets (images, audio) |
| `game.debug` | Debug utilities — mostly internal |
| `game.metrics` | Performance metrics |
| `game.platform` | Platform detection (browser, OS) |
| `game.inputPacketCreator` | Builds input packets from raw input state |
| `game.inputPacketScheduler` | Rate-limits input packets to the server tick |
