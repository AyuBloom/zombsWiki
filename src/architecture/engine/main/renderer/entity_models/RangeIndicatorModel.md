# `RangeIndicatorModel`

A model entity that visualizes the range of a tower or building, displaying either a circular or rectangular gold region based on its configuration.

## `RangeIndicatorModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `isCircular` | `boolean` | Whether the range indicator is circular (`true`) or rectangular (`false`). |
| `goldRegion` | `DrawEntity` | The visual gold region drawn to indicate range. |

### Methods

#### `constructor()`
```ts
function constructor(args: { isCircular?: boolean, radius?: number, width?: number, height?: number }): void
```
Initializes the range indicator model and creates the corresponding gold region `DrawEntity`. Draws either a circular region based on `args.radius` or a rectangular region based on `args.width` and `args.height`.
