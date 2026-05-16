---
title: UiMenuIcons - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiMenuIcons class renders the top-right menu icon bar containing
        buttons for Shop (B), Party (P), and Settings. Clicking an icon toggles
        the corresponding menu panel while closing the others, and cancels any
        active building/spell overlays.
  - - meta
    - name: 'og:description'
      content: >-
        The UiMenuIcons class renders the top-right menu icon bar containing
        buttons for Shop (B), Party (P), and Settings. Clicking an icon toggles
        the corresponding menu panel while closing the others, and cancels any
        active building/spell overlays.
---

# `UiMenuIcons`

The `UiMenuIcons` class renders the top-right menu icon bar containing buttons for Shop (`B`), Party (`P`), and Settings. Clicking an icon toggles the corresponding menu panel while closing the others, and cancels any active building/spell overlays.

## `UiMenuIcons` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-menu-icons` DOM element. Inherited from `UiComponent`. |
| `iconElems` | `HTMLElement[]` | Array of `.hud-menu-icon` button elements. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the menu icons bar with Shop, Party, and Settings buttons. Binds `mousedown`/`mouseup` propagation stoppers, attaches click handlers and `UiTooltip` instances (anchored left) to each icon.

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

#### `onIconClick()`
```ts
function onIconClick(i: number): (event: MouseEvent) => void
```
Returns a click handler for the icon at index `i`. Reads the `data-type` attribute, cancels all active overlays (`BuildingOverlay.stopWatching()`, `PlacementOverlay.cancelPlacing()`, `SpellOverlay.cancelCasting()`), and toggles the corresponding menu (Shop/Party/Settings) while hiding the other two.
