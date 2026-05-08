# `ExperienceBar`

Model implementation for the Experience Bar entity. It uses dynamically drawn shapes to render an experience bar and level indicator, and used by pets.

## `ExperienceBar`

Extends `Entity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `barColor` | `object` | The RGB color of the experience bar. Defaults to gold `{ r: 214, g: 170, b: 53 }`. |
| `width` | `number` | The width of the experience bar. Defaults to `76`. |
| `height` | `number` | The height of the experience bar. Defaults to `8`. |
| `offset` | `number` | The X-axis offset for the bar to make room for the level circle. Defaults to `20`. |
| `experiencePerLevel` | `number` | The amount of experience required to level up. Defaults to `100`. |
| `level` | `number` | The current level. Defaults to `1`. |
| `percent` | `number` | The current experience percentage towards the next level (from `0.0` to `1.0`). |
| `backgroundNode` | `DrawEntity` | The dark, semi-transparent background shape, which includes both the bar background and the level indicator circle. |
| `barNode` | `DrawEntity` | The colored shape representing current experience progress. |
| `levelEntity` | `TextEntity` | The text entity displaying the current level number. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Sets up the `backgroundNode` (drawing the rounded rectangle and the level circle), `barNode`, and `levelEntity`. Attaches them and defines a default pivot point of `(width / 2, -80)`. Sets default experience to `0`.

#### `setSize()`

```ts
function setSize(width: number, height: number): void
```

Reconfigures the width and height of the bar. Redraws the `backgroundNode` (including the level circle) and `barNode` using the `offset`, updates the pivot point, and reapplies the current percentage.

#### `setExperience()`

```ts
function setExperience(experience: number): void
```

Updates the current experience value. Calculates the percentage towards the next level using `(experience % experiencePerLevel) / 100` and determines the new level using `Math.floor(experience / 100) + 1`. Calls `setPercent` and `setLevel`.

#### `setPercent()`

```ts
function setPercent(percent: number): void
```

Updates the visual representation of the experience bar. Uses `setScaleX` on the `barNode` for efficient resizing without needing to redraw the shape.

#### `setLevel()`

```ts
function setLevel(level: number): void
```

Updates the internal level state and modifies the `levelEntity` string to reflect the new level.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Updates experience from `tick.experience`. Counter-rotates the experience bar to negate the parent entity's rotation, ensuring the bar always remains horizontal.
