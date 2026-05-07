# `PlacementIndicatorModel`

A model entity used to visually indicate whether a building can be placed at a specific location, typically displaying a red square when the location is occupied or invalid.

## `PlacementIndicatorModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `isOccupied` | `boolean` | Indicates whether the placement location is currently occupied. |
| `redSquare` | `DrawEntity` | The visual red square drawn when the location is occupied. |

### Methods

#### `constructor()`
```ts
function constructor(args: { width: number, height: number }): void
```
Initializes the placement indicator model and creates the semi-transparent red square `DrawEntity` based on the provided dimensions.

#### `setIsOccupied()`
```ts
function setIsOccupied(isOccupied: boolean): void
```
Updates the internal `isOccupied` state and toggles the visibility of the red square. If the placement location is occupied (`true`), the red square becomes visible; otherwise, it is hidden.
