---
title: UiBuildingOverlay - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiBuildingOverlay - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiBuildingOverlay class renders a tooltip overlay on top of a
        selected building, showing its tier, health bar, stats (current vs. next
        tier), and action buttons for upgrading, selling, depositing, and
        collecting. It supports an "Upgrade All" mode and attaches a
        RangeIndicatorModel for buildings with range stats or for the Gold Stash
        build radius.
  - - meta
    - property: 'og:description'
      content: >-
        The UiBuildingOverlay class renders a tooltip overlay on top of a
        selected building, showing its tier, health bar, stats (current vs. next
        tier), and action buttons for upgrading, selling, depositing, and
        collecting. It supports an "Upgrade All" mode and attaches a
        RangeIndicatorModel for buildings with range stats or for the Gold Stash
        build radius.
---

# `UiBuildingOverlay`

The `UiBuildingOverlay` class renders a tooltip overlay on top of a selected building, showing its tier, health bar, stats (current vs. next tier), and action buttons for upgrading, selling, depositing, and collecting. It supports an "Upgrade All" mode and attaches a `RangeIndicatorModel` for buildings with range stats or for the Gold Stash build radius.

## `UiBuildingOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-building-overlay` DOM element. Inherited from `UiComponent`. |
| `shouldUpgradeAll` | `boolean` | Whether the overlay operates in "Upgrade All" mode. Defaults to `false`. |
| `maxStashDistance` | `number` | Maximum grid-cell distance from the Gold Stash that buildings can be placed. Defaults to `18`. |
| `buildingUid` | `number \| null` | The UID of the currently watched building, or `null`. |
| `buildingId` | `string \| null` | The type identifier of the currently watched building. |
| `buildingTier` | `number \| null` | The current tier of the watched building. |
| `rangeIndicator` | `RangeIndicatorModel \| undefined` | The range indicator rendered on the ground layer, if applicable. |
| `tierElem` | `HTMLElement` | The `.hud-building-tier` span showing the current tier number. |
| `healthBarElem` | `HTMLElement` | The `.hud-tooltip-health-bar` span representing the health bar fill. |
| `statsElem` | `HTMLElement` | The `.hud-building-stats` container for current/next stat values. |
| `actionsElem` | `HTMLElement` | The `.hud-building-actions` container for action buttons. |
| `depositElem` | `HTMLElement` | The `.hud-building-deposit` button (Harvester-only). |
| `dualBtnElem` | `HTMLElement` | The `.hud-building-dual-btn` wrapper for deposit/collect (Harvester-only). |
| `collectElem` | `HTMLElement` | The `.hud-building-collect` button (Harvester-only). |
| `upgradeElem` | `HTMLElement` | The `.hud-building-upgrade` button. |
| `sellElem` | `HTMLElement` | The `.hud-building-sell` button. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the overlay, binds `mousedown`/`mouseup` event propagation stoppers, registers a renderer tick callback, and listens for `cameraUpdate`, `buildingsUpdate`, and `buildingSchemaUpdate` events.

#### `isActive()`
```ts
function isActive(): boolean
```
Returns `true` if the overlay is currently watching a building.

#### `getBuildingUid()`
```ts
function getBuildingUid(): number | null
```
Returns the UID of the currently watched building.

#### `getShouldUpgradeAll()`
```ts
function getShouldUpgradeAll(): boolean
```
Returns whether the "Upgrade All" mode is enabled.

#### `setShouldUpgradeAll()`
```ts
function setShouldUpgradeAll(shouldUpgradeAll: boolean): void
```
Sets the "Upgrade All" mode and triggers an `update()`.

#### `update()`
```ts
function update(): void
```
Recalculates and re-renders the overlay content: positions the overlay relative to the building's screen coordinates, computes health percentage, determines current/next tier stats using a stat map (`health`, `damage`, `range`, `gps`, `harvest`, `harvestCapacity`), computes upgrade costs and sell refunds via `Util.createResourceCostString()` / `Util.createResourceRefundString()`, toggles action button states, and updates the range indicator position.

#### `startWatching()`
```ts
function startWatching(buildingUid: number): void
```
Begins watching a building by UID. Populates the overlay HTML with the building name, tier, health bar, stats, and action buttons. Creates a `RangeIndicatorModel` if the building is a Gold Stash (rectangular) or has `rangeTiers` (circular). Calls `show()` and `update()`.

#### `stopWatching()`
```ts
function stopWatching(): void
```
Stops watching the current building. Removes the range indicator from the ground layer, clears the overlay HTML, resets internal state, and calls `hide()`.

#### `depositIntoBuilding()`
```ts
function depositIntoBuilding(): void
```
Sends an `AddDepositToHarvester` RPC for the watched Harvester building. In "Upgrade All" mode, iterates all buildings of the same type and sends the RPC for each.

#### `collectFromBuilding()`
```ts
function collectFromBuilding(): void
```
Sends a `CollectHarvester` RPC for the watched building.

#### `upgradeBuilding()`
```ts
function upgradeBuilding(): void
```
Sends an `UpgradeBuilding` RPC. In "Upgrade All" mode, iterates all buildings of the same type and tier and sends the RPC for each.

#### `sellBuilding()`
```ts
function sellBuilding(): void
```
Sends a `DeleteBuilding` RPC for the watched building. Returns early without action if the building is a Gold Stash.

#### `getGoldStashTier()`
```ts
function getGoldStashTier(): number
```
Scans the player's buildings to find the Gold Stash and returns its tier. Defaults to `1` if no Gold Stash is found.

### Event Handlers

#### `onMouseDown()`
```ts
function onMouseDown(event: MouseEvent): void
```
Stops event propagation to prevent clicks from reaching the game world.

#### `onMouseUp()`
```ts
function onMouseUp(event: MouseEvent): void
```
Stops event propagation to prevent clicks from reaching the game world.

#### `onTick()`
```ts
function onTick(): void
```
Renderer tick callback. Updates the health bar percentage and Harvester deposit button disabled state each frame. Calls `stopWatching()` if the entity no longer exists.

#### `onCameraUpdate()`
```ts
function onCameraUpdate(): void
```
Handles the `cameraUpdate` event. Calls `update()`.

#### `onBuildingsUpdate()`
```ts
function onBuildingsUpdate(): void
```
Handles the `buildingsUpdate` event. Calls `update()`.

#### `onBuildingSchemaUpdate()`
```ts
function onBuildingSchemaUpdate(): void
```
Handles the `buildingSchemaUpdate` event. Calls `update()`.
