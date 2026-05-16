---
title: renderer - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The renderer component is responsible for all rendering using PIXI.js.
        It manages the render loop, the scene graph layer hierarchy, camera
        tracking, coordinate transformations, and viewport scaling.
  - - meta
    - name: 'og:description'
      content: >-
        The renderer component is responsible for all rendering using PIXI.js.
        It manages the render loop, the scene graph layer hierarchy, camera
        tracking, coordinate transformations, and viewport scaling.
---
# `renderer`

The `renderer` component is responsible for all rendering using PIXI.js. It manages the render loop, the scene graph layer hierarchy, camera tracking, coordinate transformations, and viewport scaling.

## `Renderer` <Badge type="tip" text="public" />

Extends `EventEmitter`. Alias: `game.rendererType`

The base engine renderer. Creates a PIXI renderer, manages a layered scene graph, drives the render loop via a `PIXI.ticker.Ticker`, and provides coordinate conversion utilities. Emits a `cameraUpdate` event when the camera position changes.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `renderer` | `PIXI.WebGLRenderer \| PIXI.CanvasRenderer` | — | The underlying PIXI renderer instance. |
| `ticker` | `PIXI.ticker.Ticker` | — | The PIXI ticker driving the render loop at a minimum of 60 FPS. |
| `scale` | `number` | `1` | Current display scale ratio, computed from window size vs 1920×1080 reference. |
| `forceCanvas` | `boolean` | `false` | Whether the Canvas renderer is forced instead of WebGL. |
| `tickCallbacks` | `Function[]` | `[]` | Array of callbacks invoked every frame with the delta time. |
| `lastMsElapsed` | `number` | `0` | Cumulative elapsed time from `performance.now()`, used to compute per-frame delta. |
| `firstPerformance` | `number \| null` | `null` | The first `performance.now()` reading; `null` until the first frame. |
| `followingObject` | `Entity \| null` | `null` | The entity the camera is currently following, or `null`. |
| `viewport` | `VIEWPORT` | `{ x: -500, y: -400, width: 1000, height: 800 }` | The current camera viewport in world coordinates. |
| `viewportPadding` | `number` | `100` | Extra padding (in world units) added around the viewport. |
| `longFrames` | `number` | `0` | Counter for frames where the update took ≥ 10 ms. |

#### Scene Graph Layers

The renderer organises the scene into a hierarchy of `RendererLayer` instances. Layers are rendered in the order they are attached.

| Property | Type | Description |
| :--- | :--- | :--- |
| `scene` | `Entity` | Root scene node. Hidden until `follow()` is called. |
| `entities` | `RendererLayer` | Container for all world-space layers (ground, scenery, NPCs, projectiles, players). |
| `ui` | `RendererLayer` | Overlay layer for text entities and UI elements. |
| `ground` | `RendererLayer` | Ground textures (attached to `entities`). |
| `scenery` | `RendererLayer` | Prop / scenery entities (attached to `entities`). |
| `npcs` | `RendererLayer` | NPC and default network entities (attached to `entities`). |
| `projectiles` | `RendererLayer` | Projectile entities (attached to `entities`). |
| `players` | `RendererLayer` | Player entities (attached to `entities`). |

::: info
The layer render order from back to front is: **`ground` → `scenery` → `npcs` → `projectiles` → `players` → `ui`**.
:::

### Methods

#### `add()`
```ts
function add(object: Entity, entityClass?: string): void
```
Adds an entity to the appropriate layer based on its type:

| Entity Type | `entityClass` | Target Layer |
| :--- | :--- | :--- |
| `NetworkEntity` | `'Prop'` | `scenery` |
| `NetworkEntity` | `'Projectile'` | `projectiles` |
| `NetworkEntity` | `'Player'` | `players` |
| `NetworkEntity` | `'Npc'` / default | `npcs` |
| `GroundEntity` | — | `ground` |
| `TextEntity` | — | `ui` |

Throws an error for unhandled entity types.

#### `remove()`
```ts
function remove(object: Entity): void
```
Removes an entity from its layer. Uses the same type/class routing logic as `add()`.

#### `follow()`
```ts
function follow(object: Entity): void
```
Sets the camera to follow the given entity. Makes the scene visible and updates `followingObject`.

#### `stopFollowing()`
```ts
function stopFollowing(): void
```
Clears the followed object, stopping camera tracking.

#### `start()`
```ts
function start(firstTime: boolean): void
```
Starts the PIXI ticker, beginning the render loop.

#### `stop()`
```ts
function stop(): void
```
Stops the PIXI ticker, pausing the render loop.

#### `addTickCallback()`
```ts
function addTickCallback(callback: (delta: number) => void): void
```
Registers a callback to be invoked every frame with the elapsed milliseconds.

#### `update()`
```ts
function update(delta: number): void
```
Main render loop, called by the PIXI ticker each frame. Computes the real delta using `performance.now()`, invokes all tick callbacks, updates the camera position if following an object, updates the scene graph, renders via PIXI, and tracks long frames (≥ 10 ms). Errors in tick callbacks or scene updates are caught and reported via Raven (Sentry).

#### `lookAtPosition()`
```ts
function lookAtPosition(x: number, y: number): void
```
Moves the camera to center on the given world coordinates. Updates the `entities` layer position, recalculates the viewport, and emits a `cameraUpdate` event if the position changed.

#### `screenToWorld()`
```ts
function screenToWorld(x: number, y: number): { x: number, y: number }
```
Converts screen-space pixel coordinates to world-space coordinates, accounting for scale and `devicePixelRatio`.

#### `worldToScreen()`
```ts
function worldToScreen(x: number, y: number): { x: number, y: number }
```
Converts world-space coordinates to screen-space pixel coordinates.

#### `worldToUi()`
```ts
function worldToUi(x: number, y: number): { x: number, y: number }
```
Converts world-space coordinates to UI-layer coordinates (without `devicePixelRatio` correction).

#### `reportRavenError()`
```ts
function reportRavenError(e: Error): void
```
Reports an error to Raven (Sentry) if the `Raven` global is available.

#### `countTotalNodes()`
```ts
function countTotalNodes(node: PIXI.DisplayObject): number
```
Recursively counts the total number of PIXI display objects in the subtree rooted at `node`.

#### `countEmptyNodes()`
```ts
function countEmptyNodes(node: PIXI.DisplayObject): number
```
Recursively counts the number of empty `Container` nodes (nodes with no sprite/texture) in the subtree rooted at `node`.

### Getters & Setters

#### `getWidth()`
```ts
function getWidth(): number
```
Returns the renderer width divided by `devicePixelRatio`.

#### `getHeight()`
```ts
function getHeight(): number
```
Returns the renderer height divided by `devicePixelRatio`.

#### `getScale()`
```ts
function getScale(): number
```
Returns the current display scale.

#### `getForceCanvas()`
```ts
function getForceCanvas(): boolean
```
Returns whether the Canvas renderer was forced.

#### `getCurrentViewport()`
```ts
function getCurrentViewport(): VIEWPORT
```
Returns the current viewport object.

#### `getInternalRenderer()`
```ts
function getInternalRenderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer
```
Returns the underlying PIXI renderer instance.

#### `getLongFrames()`
```ts
function getLongFrames(): number
```
Returns the number of frames where the update exceeded 10 ms.

### Event Handlers

#### `onWindowResize()`
```ts
function onWindowResize(): void
```
Handles browser window resize events. Recalculates the scale ratio based on the window size vs a 1920×1080 reference, applies the scale to the `entities` and `ui` layers, resizes the PIXI renderer, and recalculates the viewport dimensions.

## `RendererLayer` <Badge type="danger" text="private" />

Extends `Entity`.

A lightweight wrapper around a `PIXI.Container` used to group entities into named rendering layers. The `Renderer` creates one `RendererLayer` for each logical layer (ground, scenery, npcs, projectiles, players, ui).

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Calls the parent `Entity` constructor and sets the node to a new `PIXI.Container`.

## Game/`Renderer` <Badge type="danger" text="private" />

Extends `Renderer`. Bounded to `game` as `game.renderer`.

The **game-specific** renderer subclass. Its only role is to pass the `forceCanvas` flag to the base `Renderer` based on the `localStorage` setting.

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Checks `forceCanvas` in `localStorage` and passes `true` to the parent `Renderer` constructor if the value is `'true'`, otherwise passes `false`.

::: info
The `forceCanvas` localStorage flag is set automatically when `options.platform` is `'FBInstant'` during `Game.init()`.
:::

## Data Interfaces

#### `VIEWPORT`

```ts
interface VIEWPORT {
    x: number
    y: number
    width: number
    height: number
}
```
