# `inputPacketCreator`

The `InputPacketCreator` class handles the conversion of user input events (keyboard and mouse) into network packets that are sent to the server. It listens to events from the `InputManager` and communicates with the `Network` module.

## `InputPacketCreator` <Badge type="tip" text="public" />

Bounded to `game` as `game.inputPacketCreator`. Alias: `game.inputPacketCreatorType`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `sendMouseMoveChance` | `number` | The probability (0.0 to 1.0) of sending a `mouseMoved` packet to the server. Defaults to `1`. |
| `lastMouseMoveYaw` | `number` | The last yaw angle sent during a mouse move event. Used for deduplication. |
| `lastMouseDragYaw` | `number` | The last yaw angle sent during a mouse drag event. Used for deduplication. |
| `lastAnyYaw` | `number` | The most recent yaw angle recorded from any mouse interaction. |
| `enabled` | `boolean` | Whether the packet creator is currently processing and sending inputs. |

### Methods

#### `start()`
```ts
function start(): void
```
Initializes the packet creator by binding to key and mouse events from `InputManager`.

#### `setSendMouseMoveChance()`
```ts
function setSendMouseMoveChance(chance: number): void
```
Sets the probability of sending mouse move packets.

#### `getLastAnyYaw()`
```ts
function getLastAnyYaw(): number
```
Returns the most recent yaw angle recorded.

#### `getEnabled()`
```ts
function getEnabled(): boolean
```
Returns whether the input packet creator is currently enabled.

#### `setEnabled()`
```ts
function setEnabled(enabled: boolean): void
```
Sets the enabled state of the packet creator.

#### `bindKeys()`
```ts
function bindKeys(): void
```
Binds listeners to `keyPress` and `keyRelease` events. It maps WASD and arrow keys to directional input packets (up, down, left, right) and the spacebar to the space input. Input is ignored if an `input` or `textarea` element is active.

#### `bindMouse()`
```ts
function bindMouse(): void
```
Binds listeners to mouse events (`mouseDown`, `mouseUp`, `mouseMovedWhileDown`, `mouseMoved`). It calculates the yaw angle and sends corresponding input packets to the server.

#### `screenToYaw()`
```ts
function screenToYaw(x: number, y: number): number
```
Calculates the angle (in degrees, 0-359) from the center of the screen to the specified `(x, y)` coordinates.

#### `screenToWorld()`
```ts
function screenToWorld(event: MouseEvent): object
```
Converts screen coordinates to world coordinates `{ x, y }`, rounding values down to the nearest integer.

#### `distanceToCenter()`
```ts
function distanceToCenter(x: number, y: number): number
```
Calculates the distance from the screen center to the specified `(x, y)` coordinates.

## Input Packets

The following fields are sent to `InputPacketSchduler` via `scheduler.scheduleInput()`. Each packet contains one or more of these properties representing the player's current input state.

### Movement & Actions

| Field | Type | Keys | Description |
| :--- | :--- | :--- | :--- |
| `up` | `number` | `W`, `Up Arrow` | `1` to move up, `0` to stop. |
| `down` | `number` | `S`, `Down Arrow` | `1` to move down, `0` to stop. |
| `left` | `number` | `A`, `Left Arrow` | `1` to move left, `0` to stop. |
| `right` | `number` | `D`, `Right Arrow` | `1` to move right, `0` to stop. |
| `space` | `number` | `Space` | `1` when the spacebar is pressed, `0` when released. |

### Mouse Interaction

| Field | Type | Description |
| :--- | :--- | :--- |
| `mouseDown` | `number` | Sent when the left mouse button is pressed. Contains the current yaw angle. Includes `worldX`, `worldY`, and `distance`. |
| `mouseUp` | `number` | Sent as `1` when the left mouse button is released. Includes `worldX`, `worldY`, and `distance`. |
| `mouseMoved` | `number` | Sent when the mouse moves (subject to `sendMouseMoveChance`). Contains the current yaw angle. Includes `worldX`, `worldY`, and `distance`. |
| `mouseMovedWhileDown` | `number` | Sent when the mouse moves while the left button is held. Contains the current yaw angle. Includes `worldX`, `worldY`, and `distance`. |
| `worldX` | `number` | The X-coordinate of the mouse in the world. |
| `worldY` | `number` | The Y-coordinate of the mouse in the world. |
| `distance` | `number` | The distance from the mouse to the center of the screen. |

::: info
The yaw angle is rounded and normalized to a 0-359 range before being sent to the server.
:::