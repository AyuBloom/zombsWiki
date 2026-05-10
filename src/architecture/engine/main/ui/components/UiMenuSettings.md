
# `UiMenuSettings`

The `UiMenuSettings` class renders the in-game settings menu. It displays the controls reference, gameplay essentials/hints, and a button to restart the walkthrough tutorial.

## `UiMenuSettings` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-menu-settings` DOM element. Inherited from `UiComponent`. |
| `closeElem` | `HTMLElement` | The `.hud-menu-close` button. |
| `gridElem` | `HTMLElement` | The `.hud-settings-grid` content container. |
| `restartWalkthroughElem` | `HTMLElement` | The `.hud-settings-restart-walkthrough` button. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the settings menu with controls listing (WASD, mouse, hotkeys), gameplay essentials/hints, and a "Restart Walkthrough" button. Binds `mousedown`/`mouseup` propagation stoppers, close button, and walkthrough restart handler.

#### `onMouseDown()`
```ts
function onMouseDown(event: MouseEvent): void
```
Stops event propagation.

#### `onMouseUp()`
```ts
function onMouseUp(event: MouseEvent): void
```
Stops event propagation.

#### `onRestartWalkthrough()`
```ts
function onRestartWalkthrough(event: MouseEvent): void
```
Retrieves the `Walkthrough` component and calls `restart()` on it.
