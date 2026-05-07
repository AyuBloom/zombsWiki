# `ShieldBar`

Model implementation for the Shield Bar entity. It uses dynamically drawn shapes to render a shield bar and only used by the player character.

## `ShieldBar`

Extends `Entity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `barColor` | `object` | The RGB color of the shield bar. Defaults to blue `{ r: 61, g: 161, b: 217 }`. |
| `width` | `number` | The width of the shield bar. Defaults to `76`. |
| `height` | `number` | The height of the shield bar. Defaults to `8`. |
| `percent` | `number` | The current shield percentage (from `0.0` to `1.0`). |
| `backgroundNode` | `DrawEntity` | The dark, semi-transparent background shape. |
| `barNode` | `DrawEntity` | The colored shape representing current shield strength. |
| `health` | `number` | The current shield health value. |
| `maxHealth` | `number` | The maximum shield health value. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Sets up the `backgroundNode` and `barNode`, attaching them, and defining a default pivot point of `(width / 2, -80)`. Sets default health and max health to `100`.

#### `setSize()`

```ts
function setSize(width: number, height: number): void
```

Reconfigures the width and height of the bar. Redraws the `backgroundNode`, updates the pivot point, and reapplies the current percentage.

#### `setHealth()`

```ts
function setHealth(health: number): void
```

Updates the current shield value and recalculates the percentage by calling `setPercent`.

#### `setMaxHealth()`

```ts
function setMaxHealth(max: number): void
```

Updates the maximum shield value and recalculates the percentage by calling `setPercent`.

#### `setPercent()`

```ts
function setPercent(percent: number): void
```

Updates the visual representation of the shield bar. Clears and completely redraws the `barNode` based on the calculated percentage width.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Updates health and max health from `tick.zombieShieldHealth` and `tick.zombieShieldMaxHealth`. Counter-rotates the shield bar to negate the parent entity's rotation, ensuring the bar always remains horizontal.
