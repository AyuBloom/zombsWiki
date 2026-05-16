---
title: UiToolbar - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiToolbar class renders the bottom HUD toolbar containing inventory
        items (weapons/utilities) and building placement buttons. It delegates
        to UiToolbarItem for inventory items and UiToolbarBuilding for
        buildings.
  - - meta
    - name: 'og:description'
      content: >-
        The UiToolbar class renders the bottom HUD toolbar containing inventory
        items (weapons/utilities) and building placement buttons. It delegates
        to UiToolbarItem for inventory items and UiToolbarBuilding for
        buildings.
---

# `UiToolbar`

The `UiToolbar` class renders the bottom HUD toolbar containing inventory items (weapons/utilities) and building placement buttons. It delegates to `UiToolbarItem` for inventory items and `UiToolbarBuilding` for buildings.

## `UiToolbar` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-toolbar` DOM element. Inherited from `UiComponent`. |
| `inventoryElem` | `HTMLElement` | The `.hud-toolbar-inventory` container for item buttons. |
| `buildingsElem` | `HTMLElement` | The `.hud-toolbar-buildings` container for building buttons. |
| `toolbarInventory` | `Record<string, UiToolbarItem>` | Map of item IDs to their `UiToolbarItem` instances. |
| `toolbarBuildings` | `Record<string, UiToolbarBuilding>` | Map of building IDs to their `UiToolbarBuilding` instances. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Creates `UiToolbarItem` instances for all items with `onToolbar` set in the schema, and `UiToolbarBuilding` instances for all buildings in the building schema. Binds `equipOrUseItem`, `startPlacingBuilding`, and `placeBuilding` event listeners.

#### `onTriggerEquipOrUseItem()`
```ts
function onTriggerEquipOrUseItem(itemId: string, itemTier: number): void
```
Sends an `EquipItem` RPC and emits `itemEquippedOrUsed` on the `Ui` instance.

#### `onStartPlacingBuilding()`
```ts
function onStartPlacingBuilding(buildingId: string): void
```
Cancels all active overlays (`BuildingOverlay.stopWatching()`, `SpellOverlay.cancelCasting()`) and starts placement via `PlacementOverlay.startPlacing()`.

#### `onPlaceBuilding()`
```ts
function onPlaceBuilding(): void
```
Delegates to `PlacementOverlay.placeBuilding()`.
