---
title: UiToolbarBuilding - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiToolbarBuilding class represents a single building button in the
        toolbar. It supports click-to-place and drag-to-place interactions,
        shows a tooltip with the building's name, description, cost, and
        built/limit count.
  - - meta
    - name: 'og:description'
      content: >-
        The UiToolbarBuilding class represents a single building button in the
        toolbar. It supports click-to-place and drag-to-place interactions,
        shows a tooltip with the building's name, description, cost, and
        built/limit count.
---

# `UiToolbarBuilding`

The `UiToolbarBuilding` class represents a single building button in the toolbar. It supports click-to-place and drag-to-place interactions, shows a tooltip with the building's name, description, cost, and built/limit count.

## `UiToolbarBuilding` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The `.hud-toolbar-building` anchor element with `data-building` and `draggable="true"`. |
| `buildingId` | `string` | The building type ID. |
| `tooltip` | `UiTooltip` | The tooltip instance for this button. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, buildingId: string): void
```
Creates the building button, attaches a `UiTooltip`, binds `mousedown`, `mouseup`, `dragstart`, `drag`, and `dragend` listeners, and registers for `buildingsUpdate` and `buildingSchemaUpdate` events.

#### `update()`
```ts
function update(): void
```
Sets the `data-key` attribute from the schema and toggles `is-disabled` based on the schema's `disabled` flag.

#### `onTooltipCreate()`
```ts
function onTooltipCreate(): string
```
Returns the tooltip HTML containing the building name, "Tier 1 Building" subtitle, built/limit count (highlighted red if at limit), description, and resource costs via `Util.createResourceCostString()`.

#### `onMouseDown()`
```ts
function onMouseDown(event: MouseEvent): void
```
Stops event propagation.

#### `onMouseUp()`
```ts
function onMouseUp(event: MouseEvent): void
```
Stops event propagation. Emits `startPlacingBuilding` if not disabled.

#### `onDragStart()`
```ts
function onDragStart(event: DragEvent): void
```
Sets a blank drag image, emits `startPlacingBuilding`, and hides the tooltip.

#### `onDrag()`
```ts
function onDrag(event: DragEvent): void
```
Forwards drag events to `inputManager` as `mouseMoved` for live placement preview updates.

#### `onDragEnd()`
```ts
function onDragEnd(event: DragEvent): void
```
Prevents default and emits `placeBuilding`.

#### `onBuildingsUpdate()`
```ts
function onBuildingsUpdate(): void
```
Calls `update()`.

#### `onBuildingSchemaUpdate()`
```ts
function onBuildingSchemaUpdate(): void
```
Calls `update()`.
