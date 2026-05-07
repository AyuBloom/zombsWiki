# `HealTowersSpellModel`

A model entity representing the visual effects of the "Heal Towers" spell, including the pulsing circle and floating heart particles.

## `HealTowersSpellModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `hearts` | `{ [key: number]: SpriteEntity }` | A collection of heart sprites used in the spell animation. |
| `heartOffsets` | `{ [key: number]: number }` | Tracks the vertical offset of each heart sprite. |
| `currentRadius` | `number` | The current radius of the healing circle. |
| `currentPulse` | `number` | Controls the pulsing animation phase of the circle. |
| `heartMaxOffset` | `number` | The maximum distance a heart particle will travel upwards. |
| `heartSpawnTolerance` | `number` | The probability threshold for spawning a new heart particle per tick. |
| `heartTotal` | `number` | The maximum number of heart particles allowed at once. |
| `ui` | `any` | A reference to the game's UI manager. |
| `circle` | `DrawEntity` | The visual drawing entity for the pulsing circle. |

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Initializes the spell model, setting up properties like `heartMaxOffset` and `heartSpawnTolerance`. Fetches configuration from the game UI's spell schema to set the initial radius and creates the central pulsing circle `DrawEntity`.

#### `update()`
```ts
function update(dt: number, user: any): void
```
The main update loop for the spell model. If the `user` parameter is truthy, it triggers the visual animations by calling `updatePulse()` and `updateHearts()`. It then delegates to the parent class's `update` method.

#### `updatePulse()`
```ts
function updatePulse(): void
```
Animates the healing circle by incrementing the `currentPulse` property and adjusting the alpha (opacity) of the circle using a sine wave function, creating a throbbing visual effect.

#### `updateHearts()`
```ts
function updateHearts(): void
```
Manages the lifecycle of the heart particle sprites. It randomly spawns new hearts within the spell's radius and animates existing ones to float upwards while gradually fading out. Once a heart reaches `heartMaxOffset`, it is removed and destroyed.
