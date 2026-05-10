
# `UiComponent`

The `UiComponent` class serves as the base class for all UI components in the game engine. It extends `EventEmitter` to support event-driven interactions and provides standard methods for managing the visibility and retrieval of the component's underlying DOM element.

## `UiComponent` <Badge type="danger" text="private" />

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. |
| `componentElem` | `HTMLElement` | The root DOM element of the component, created from a template. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, template: string): void
```
Initializes the component and creates its DOM element via the current `Ui` instance.

#### `getComponentElem()`
```ts
function getComponentElem(): HTMLElement
```
Returns the root DOM element of the UI component.

#### `show()`
```ts
function show(): void
```
Makes the component visible by setting its `display` style to `block`.

#### `hide()`
```ts
function hide(): void
```
Hides the component by setting its `display` style to `none`.

#### `isVisible()`
```ts
function isVisible(): boolean
```
Returns a boolean indicating whether the component is currently visible in the DOM.
