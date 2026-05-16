---
title: UiToolbarItem - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiToolbarItem - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiToolbarItem class represents a single inventory item button in the
        toolbar. It displays the item's current tier via data-tier and toggles
        an is-empty state when the item is not owned. Clicking equips or uses
        the item.
  - - meta
    - property: 'og:description'
      content: >-
        The UiToolbarItem class represents a single inventory item button in the
        toolbar. It displays the item's current tier via data-tier and toggles
        an is-empty state when the item is not owned. Clicking equips or uses
        the item.
---

# `UiToolbarItem`

The `UiToolbarItem` class represents a single inventory item button in the toolbar. It displays the item's current tier via `data-tier` and toggles an `is-empty` state when the item is not owned. Clicking equips or uses the item.

## `UiToolbarItem` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The `.hud-toolbar-item` anchor element with `data-item` attribute. |
| `itemId` | `string` | The item schema ID. |
| `tooltip` | `UiTooltip` | The tooltip instance for this button. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, itemId: string): void
```
Creates the item button, attaches a `UiTooltip`, binds `mousedown`/`mouseup` listeners, and registers for `itemSchemaUpdate` and `inventoryUpdate` events.

#### `update()`
```ts
function update(): void
```
Sets `data-tier` from inventory data (defaults to `'1'`) and toggles the `is-empty` class based on whether the item is owned.

#### `onTooltipCreate()`
```ts
function onTooltipCreate(): string
```
Returns tooltip HTML showing the item name, tier, and description.

#### `onMouseDown()`
```ts
function onMouseDown(event: MouseEvent): void
```
Stops event propagation.

#### `onMouseUp()`
```ts
function onMouseUp(event: MouseEvent): void
```
Stops event propagation and emits `equipOrUseItem` with the item ID and tier.

#### `onItemSchemaUpdate()`
```ts
function onItemSchemaUpdate(): void
```
Calls `update()`.

#### `onInventoryUpdate()`
```ts
function onInventoryUpdate(): void
```
Calls `update()`.
