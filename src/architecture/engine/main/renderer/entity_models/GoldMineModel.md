# `GoldMineModel`

<img src="/asset/image/ui/entities/entities-gold-mine.svg" style="float: right; width: 128px; margin-top: -50px;" />

Model implementation for the Gold Mine. Does not inherit from `TowerModel`.

## `GoldMineModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTier` | `number` | The current tier of the gold mine. Defaults to `1`. |
| `currentRotation` | `number` | The current rotation angle of the head. |
| `base` | `SpriteEntity` | The base sprite for the current tier. |
| `head` | `SpriteEntity` | The head (drill/rotating part) sprite. |
| `healthBar` | `HealthBar` | The health bar attachment. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Creates the initial tier 1 sprites and health bar, and attaches them at layers `2` (base), `3` (head), and `4` (health bar).

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Updates the tier, health bar, and increments the `currentRotation` by `currentTier / 2`.

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Updates the base and head sprites if the tier has changed. Supported tiers are `1` through `8`.

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Shows the health bar if the current health is not equal to the max health.
