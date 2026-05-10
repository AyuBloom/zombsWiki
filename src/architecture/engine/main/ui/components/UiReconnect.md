
# `UiReconnect`

The `UiReconnect` class displays a reconnection overlay when the player loses connection to the server. It shows a loading spinner and a message indicating that reconnection is being attempted.

## `UiReconnect` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-reconnect` DOM element. Inherited from `UiComponent`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the reconnect overlay with a wrapper containing a loading spinner and "attempting to reconnect" message.
