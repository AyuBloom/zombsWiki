# `debug`

The `debug` utility provides a fixed on-screen display for monitoring real-time game performance (FPS/millisecond), engine metrics and network synchronization. This HUD is hidden from the user, and can be toggled on/off with the `F6` key.

## `Debug` <Badge type="tip" text="public" />

Bounded to `game` as `game.debug`. Alias: `game.debugType`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `visible` | `boolean` | Indicates if the debug overlay is currently displayed. |
| `ticks` | `number` | Counter for total frames processed by the renderer. |
| `stats` | `Stats` | Instance of the `stats.js` monitoring library. |
| `debugElem` | `HTMLElement` | The DOM element used to display text-based metrics. |

::: details Debug HUD

The debug overlay displays the following metrics gathered from the engine:

| Metric | Description |
| :--- | :--- |
| **Ping** | Current network latency in milliseconds. |
| **Server/Client Time** | Current timestamps from the server and local simulation. |
| **Client Lag** | The difference between server time and client/real-client time. |
| **Stutters** | Count of detected frame stutters. |
| **FPS** | Current frames per second. |
| **Interpolating** | Boolean status of entity interpolation. |
| **Tick Byte Size** | Size of the last received network tick. |
| **Pooled Entity Counts** | Count of pooled network entities and specific model entities. |

:::

### Methods

#### `init()`
```ts
function init(): void
```
Is called when the website loads. Initializes the debug system. Creates the HTML HUD element, configures the `stats.js` overlay, and attaches listeners to the renderer tick and keyboard input.

#### `begin()`
```ts
function begin(): void
```
Starts the `stats.js` performance measurement. This should be called at the beginning of the frame.

#### `end()`
```ts
function end(): void
```
Ends the `stats.js` performance measurement. This should be called at the end of the frame.

#### `show()`
```ts
function show(): void
```
Enables the debug display and shows all associated HUD elements.

#### `hide()`
```ts
function hide(): void
```
Disables the debug display and hides all associated HUD elements.

#### `onRendererTick()`
```ts
function onRendererTick(): void
```
Callback triggered by the renderer. When visible, it updates the debug HUD text every 20 renderer ticks with the latest game metrics.

#### `onKeyRelease(event)`
```ts
function onKeyRelease(event: KeyboardEvent): void
```
Listens for the release of the **F6** (keyCode 117) key to toggle the visibility of the debug overlay
