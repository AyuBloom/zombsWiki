---
title: UiBuffBar - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiBuffBar class manages the buff bar HUD element, which displays
        active buff items the player currently has in their inventory. Each buff
        icon includes a UiTooltip showing the item name, tier, and description.
  - - meta
    - name: 'og:description'
      content: >-
        The UiBuffBar class manages the buff bar HUD element, which displays
        active buff items the player currently has in their inventory. Each buff
        icon includes a UiTooltip showing the item name, tier, and description.
---

# `UiBuffBar`

The `UiBuffBar` class manages the buff bar HUD element, which displays active buff items the player currently has in their inventory. Each buff icon includes a `UiTooltip` showing the item name, tier, and description.

## `UiBuffBar` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-buff-bar` DOM element. Inherited from `UiComponent`. |
| `buffElems` | `Record<string, HTMLElement>` | Map of item IDs to their corresponding buff bar DOM elements. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the buff bar and registers event listeners for `inventoryUpdate` and `itemSchemaUpdate` on the `Ui` instance.

#### `update()`
```ts
function update(): void
```
Synchronizes the buff bar with the current inventory and item schema. Removes buff elements for items no longer in the inventory (stacks of 0), updates the `data-tier` attribute for multi-tier items, and creates new `.hud-buff-bar-item` elements (with `UiTooltip`) for newly acquired buff items that have `onBuffBar` set in their schema.

#### `onInventoryUpdate()`
```ts
function onInventoryUpdate(): void
```
Handles the `inventoryUpdate` event. Calls `update()`.

#### `onItemSchemaUpdate()`
```ts
function onItemSchemaUpdate(): void
```
Handles the `itemSchemaUpdate` event. Calls `update()`.
