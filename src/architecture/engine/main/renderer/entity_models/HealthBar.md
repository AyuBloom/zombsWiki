# `HealthBar`

Model implementation for the Health Bar entity. It uses dynamically drawn shapes to render a health bar above entities like players, towers, and zombies.

## `HealthBar`

Extends `Entity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `barColor` | `object` | The RGB color of the health bar. Defaults to green `{ r: 100, g: 161, b: 10 }`. |
| `width` | `number` | The width of the health bar. Defaults to `84`. |
| `height` | `number` | The height of the health bar. Defaults to `12`. |
| `percent` | `number` | The current health percentage (from `0.0` to `1.0`). |
| `backgroundNode` | `DrawEntity` | The dark, semi-transparent background shape. |
| `barNode` | `DrawEntity` | The colored shape representing current health. |
| `health` | `number` | The current health value. |
| `maxHealth` | `number` | The maximum health value. |

### Methods

#### `constructor()`

```ts
function constructor(barColor?: object): void
```

Initializes the model. Sets up the `backgroundNode` and `barNode` drawing them as rounded rectangles, attaching them, and defining a default pivot point of `(width / 2, -64)`. Sets default health and max health to `100`. An optional `barColor` can be provided to override the default green.

#### `setSize()`

```ts
function setSize(width: number, height: number): void
```

Reconfigures the width and height of the bar. Redraws the `backgroundNode` and `barNode`, updates the pivot point, and reapplies the current percentage.

#### `setHealth()`

```ts
function setHealth(health: number): void
```

Updates the current health value and recalculates the percentage by calling `setPercent`.

#### `setMaxHealth()`

```ts
function setMaxHealth(max: number): void
```

Updates the maximum health value and recalculates the percentage by calling `setPercent`.

#### `setPercent()`

```ts
function setPercent(percent: number): void
```

Updates the visual representation of the health bar. Uses `setScaleX` on the `barNode` for efficient resizing without needing to redraw the shape.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Updates health and max health from `tick.health` and `tick.maxHealth`. Counter-rotates the health bar to negate the parent entity's rotation, ensuring the bar always remains horizontal.
