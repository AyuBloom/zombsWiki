# `GoldStashModel`

<img src="/asset/image/ui/entities/entities-gold-stash.svg" style="float: right; width: 128px; margin-top: -50px;" />

Model implementation for the Gold Stash. Does not inherit from `TowerModel`.

## `GoldStashModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTier` | `number` | The current tier of the gold stash. Defaults to `1`. |
| `base` | `SpriteEntity` | The base sprite for the current tier. |
| `healthBar` | `HealthBar` | The health bar attachment. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Creates the initial tier 1 sprite and health bar, and attaches them at layers `2` (base) and `3` (health bar).

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Updates the tier and health bar.

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Updates the base sprite if the tier has changed. Supported tiers are `1` through `8`.

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Shows the health bar if the current health is not equal to the max health.
