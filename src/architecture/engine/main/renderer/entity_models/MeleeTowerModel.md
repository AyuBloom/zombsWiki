# `MeleeTowerModel`

<img src="/asset/image/ui/entities/entities-melee-tower.svg" style="float: right; width: 128px; margin-top: -50px;" />

Specific model implementation for the Melee Tower.

## `MeleeTowerModel`

Extends `TowerModel`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTier` | `number` | The current tier of the melee tower. |
| `base` | `SpriteEntity` | The base sprite for the current tier. |
| `middle` | `SpriteEntity` | The middle (arm) sprite for the current tier. |
| `head` | `SpriteEntity` | The head (glove/fist) sprite for the current tier. |
| `middleMask` | `DrawEntity` | A masking rectangle used to hide the back of the punching arm. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model by calling the `super({ name: 'melee-tower' })`. Creates the `middleMask` and initializes the model at tier 1.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Calls `updateModel`, `updateAnimation`, and `updateHealthBar`.

#### `updateModel()`

```ts
function updateModel(tier: number): void
```

Updates the `base`, `middle`, and `head` sprites if the tier has changed. Supported tiers are `1` through `8`. Applies the `middleMask` to the `middle` attachment. Attachments are added at layers `1` (base), `2` (middle), and `3` (head).

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Calls the superclass `updateHealthBar`, then updates the `health` and `maxHealth` of the health bar and rotates it based on `tick.yaw`.

#### `updateAnimation()`

```ts
function updateAnimation(tick: ENTITY_DATA): void
```

Animates the punching action if `tick.firingTick` is present. The punch animation lasts for `250`ms and adjusts the position of the `middle` sprite. Also handles the rotation of the `head`, `middle`, and `middleMask` to face `tick.towerYaw`.
