---
title: UiPlacementOverlay - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiPlacementOverlay - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiPlacementOverlay class manages the building placement preview
        system. It renders a ghost model of the building being placed, grid cell
        indicators (green/red for valid/occupied), border exclusion zones, and a
        "Press R to rotate" text prompt for rotatable buildings.
  - - meta
    - property: 'og:description'
      content: >-
        The UiPlacementOverlay class manages the building placement preview
        system. It renders a ghost model of the building being placed, grid cell
        indicators (green/red for valid/occupied), border exclusion zones, and a
        "Press R to rotate" text prompt for rotatable buildings.
---

# `UiPlacementOverlay`

The `UiPlacementOverlay` class manages the building placement preview system. It renders a ghost model of the building being placed, grid cell indicators (green/red for valid/occupied), border exclusion zones, and a "Press R to rotate" text prompt for rotatable buildings.

## `UiPlacementOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `buildingId` | `string \| null` | The type ID of the building currently being placed. |
| `placeholderEntity` | `ModelEntity \| null` | The ghost model entity rendered at 50% alpha. |
| `placeholderTints` | `PlacementIndicatorModel[]` | Array of grid cell placement indicators. |
| `borderTints` | `PlacementIndicatorModel[]` | Array of four border exclusion zone indicators. |
| `placeholderText` | `TextEntity` | "Press R to rotate..." text entity. |
| `direction` | `BuildingDirection` | Current rotation direction (UP=0, RIGHT=1, DOWN=2, LEFT=3). |
| `disableDirection` | `boolean` | Whether rotation is disabled for the current building. |
| `maxPlayerDistance` | `number` | Max grid-cell distance from player for placement. Defaults to `12`. |
| `maxStashDistance` | `number` | Max grid-cell distance from Gold Stash. Defaults to `18`. |
| `minWallDistance` | `number` | Min grid-cell distance from map borders. Defaults to `4`. |
| `goldStash` | `object \| null` | Cached Gold Stash building data. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Creates the "Press R to rotate" `TextEntity`, adds it to the renderer UI layer, and listens for `cameraUpdate`.

#### `isActive()`
```ts
function isActive(): boolean
```
Returns `true` if a building is currently being placed.

#### `getBuildingId()`
```ts
function getBuildingId(): string | null
```
Returns the type ID of the building being placed.

#### `update()`
```ts
function update(): void
```
Repositions all placement indicators and the ghost model based on the current mouse position, converting screen → world → grid coordinates.

#### `startPlacing()`
```ts
function startPlacing(buildingId: string): void
```
Begins the placement flow: cancels any existing placement, caches the Gold Stash, enables rotation for `MeleeTower`/`Harvester`, loads the building's model at 50% alpha, creates grid cell `PlacementIndicatorModel` instances, creates four border exclusion zones, and calls `update()`.

#### `placeBuilding()`
```ts
function placeBuilding(): boolean
```
Attempts to place the building. Validates all cells are unoccupied, computes the average grid position, sends a `MakeBuilding` RPC with the position, type, and yaw. Cancels placement if the building limit is reached. Returns `true` on success, `false` on failure.

#### `cancelPlacing()`
```ts
function cancelPlacing(): void
```
Removes all preview entities (ghost model, cell indicators, border tints, text) from the renderer and resets internal state.

#### `cycleDirection()`
```ts
function cycleDirection(): void
```
Rotates the building preview by 90° clockwise. No-op if rotation is disabled.

#### `checkIsOccupied()`
```ts
function checkIsOccupied(cellIndex: number, cellPos: { x: number, y: number }): boolean
```
Returns `true` if a cell is invalid for placement. Checks for: existing non-Projectile entities, proximity to map borders (< `minWallDistance`), distance from player (> `maxPlayerDistance`), and distance from Gold Stash (> `maxStashDistance`, Harvester exempt).

#### `onCameraUpdate()`
```ts
function onCameraUpdate(): void
```
Calls `update()`.
