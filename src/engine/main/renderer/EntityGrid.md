# `EntityGrid`

The `EntityGrid` class acts as a spatial partitioning grid to efficiently keep track of entity locations in the world. It maps entities into grid cells based on their positions and bounding sizes.

## `EntityGrid`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `cellEntities` | `Array<Record<string, boolean>>` | An array of cells, each containing a map of UIDs to `true` for entities within the cell. |
| `entityMap` | `Record<string, number[]>` | A map mapping each entity UID to an array of cell indexes it occupies. |
| `oneGridSize` | `object` | Default grid size object: `{ width: 1, height: 1 }`. |
| `width` | `number` | Total width of the grid. |
| `height` | `number` | Total height of the grid. |
| `cellSize` | `number` | Size of each grid cell. |
| `rows` | `number` | Total number of rows in the grid. |
| `columns` | `number` | Total number of columns in the grid. |
| `totalCells` | `number` | Total number of cells (`rows * columns`). |

### Methods

#### `constructor()`
```ts
function constructor(width: number, height: number, cellSize: number): void
```
Initializes the grid structure based on world dimensions and cell size.

#### `getEntitiesInCell()`
```ts
function getEntitiesInCell(index: number): Record<string, boolean> | false
```
Returns a map of entity UIDs present in the given cell index, or `false` if the index does not exist.

#### `updateEntity()`
```ts
function updateEntity(entity: NetworkEntity): void
```
Updates the entity's position within the grid. Computes the cells the entity should occupy and updates the cell mappings if it has moved to different cells.

#### `removeEntity()`
```ts
function removeEntity(uid: string): void
```
Removes the specified entity UID from the grid.

#### `getCellIndexes()`
```ts
function getCellIndexes(x: number, y: number, gridSize: object): (number | false)[]
```
Calculates and returns the array of cell indexes that intersect with the given position and size. Out-of-bounds cells return `false`.

#### `getCellCoords()`
```ts
function getCellCoords(index: number): { x: number, y: number }
```
Converts a 1D cell index into 2D grid coordinates (x, y).

#### `getCellSize()`
```ts
function getCellSize(): number
```
Returns the cell size.

#### `getRows()`
```ts
function getRows(): number
```
Returns the number of rows.

#### `getColumns()`
```ts
function getColumns(): number
```
Returns the number of columns.

#### `removeEntityFromCells()`
```ts
function removeEntityFromCells(uid: string, indexes: number[]): void
```
Removes an entity UID from the specified cell indexes and the `entityMap`.

#### `addEntityToCells()`
```ts
function addEntityToCells(uid: string, indexes: number[]): void
```
Adds an entity UID to the specified cell indexes and updates the `entityMap`.
