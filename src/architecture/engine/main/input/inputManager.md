# `inputManager`

The `InputManager` class is responsible for handling raw DOM input events (keyboard and mouse) and emitting them as internal engine events used by other components, such as `InputPacketCreator`. It tracks the state of keys and mouse buttons and is integrated with the game's network lifecycle.

## `InputManager` <Badge type="tip" text="public" />

Bounded to `game` as `game.inputManager`. Extends `EventEmitter`, alias: `game.inputManagerType`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `mousePosition` | `object` | The current `{ x, y }` coordinates of the mouse on the screen. |
| `mouseDown` | `boolean` | Whether the primary mouse button is currently pressed. |
| `mouseRightDown` | `boolean` | Whether the right mouse button is currently pressed. |
| `keysDown` | `object` | A map of key codes currently being held down. |
| `enabled` | `boolean` | Whether input processing is currently active. |

### Getters & Setters

#### `getEnabled()`
```ts
function getEnabled(): boolean
```
Returns whether the input manager is currently enabled.

#### `setEnabled()`
```ts
function setEnabled(enabled: boolean): void
```
Enables or disables input processing. When disabled, it will also reset the `mouseDown` state and emit a `mouseUp` event if necessary. It also synchronizes the enabled state with `InputPacketCreator`.

### Handlers & Emitters

| Method | Description |
| :--- | :--- |
| `onKeyPress()` | Internal handler for `keydown` events. Updates `keysDown` and emits `keyPress`. |
| `onKeyRelease()` | Internal handler for `keyup` events. Updates `keysDown` and emits `keyRelease`. |
| `onMouseDown()` | Internal handler for `mousedown` events. Handles both primary and secondary (right-click) buttons, updates states, and emits corresponding events. |
| `onMouseUp()` | Internal handler for `mouseup` events. Updates mouse states and emits corresponding events. |
| `onMouseMoved()` | Internal handler for `mousemove` events. Updates `mousePosition` and emits either `mouseMoved` or `mouseMovedWhileDown` depending on the current `mouseDown` state. |

::: details Input Events

The `InputManager` emits the following events:

| Event | Data | Description |
| :--- | :--- | :--- |
| `keyPress` | `KeyboardEvent` | Fired when a key is pressed. |
| `keyRelease` | `KeyboardEvent` | Fired when a key is released. |
| `mouseDown` | `MouseEvent` | Fired when the left mouse button is pressed. |
| `mouseUp` | `MouseEvent` | Fired when the left mouse button is released. |
| `mouseRightDown` | `MouseEvent` | Fired when the right mouse button is pressed. |
| `mouseRightUp` | `MouseEvent` | Fired when the right mouse button is released. |
| `mouseMoved` | `MouseEvent` | Fired when the mouse moves while no buttons are held. |
| `mouseMovedWhileDown` | `MouseEvent` | Fired when the mouse moves while the left button is held. |

:::