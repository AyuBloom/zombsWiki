# `HarvesterModel`

<img src="/asset/image/ui/entities/entities-harvester.svg" style="float: right; width: 128px; margin-top: -50px;" />

Model implementation for the Harvester. It manages complex multi-part sprite and shape combinations to simulate a mechanical arm with a claw. Does not inherit from `TowerModel`.

## `HarvesterModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTier` | `number` | The current tier of the harvester. |
| `colorMapping` | `object` | An object mapping each tier to its specific `arm` and `pivot` hex colors. |
| `barBackgrounds` | `DrawEntity` | The background shapes for the fill and fuel status bars. |
| `fillBar` | `DrawEntity` | A bar indicating how much harvested material the harvester is currently holding. |
| `fuelBar` | `DrawEntity` | A bar indicating the fuel/deposit level of the harvester. |
| `healthBar` | `HealthBar` | The health bar attachment. |
| `base`, `head`, `claw` | `SpriteEntity` | The sprites representing the harvester's base, head, and claw. |
| `pivotPointFar`, `armFar`, `pivotPointClose`, `armClose`, `pivotPointHead` | `DrawEntity` | Various shapes drawn dynamically to represent the harvester's complex mechanical arm. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Sets up the `colorMapping` for tiers 1-8. Creates the initial `barBackgrounds`, `fillBar`, `fuelBar`, and `healthBar`, setting their pivot points and attaching them at layer `4`. Initializes the model at tier 1.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Calls `updateModel`, `updateAnimation`, `updateStatusBars`, and `updateHealthBar`.

#### `updateModel()`

```ts
function updateModel(tier: number): void
```

Updates all visual components if the tier has changed. Supported tiers are `1` through `8`. Dynamically draws the multi-part arm (`armFar`, `armClose`, `pivotPointFar`, etc.) using colors from `colorMapping` based on the tier. Attachments are added at layers `2` (`base`, `pivotPointHead`) and `3` (`head`).

#### `updateAnimation()`

```ts
function updateAnimation(tick: ENTITY_DATA): void
```

Animates the harvester arm if `tick.firingTick` is present. The harvesting animation lasts for `750`ms and rotates `pivotPointHead` and `pivotPointClose` using a calculated ratio based on a sine wave.

#### `updateStatusBars()`

```ts
function updateStatusBars(tick: ENTITY_DATA): void
```

Calculates the `fillRatio` (total wood and stone relative to `harvestMax`) and `fuelRatio` (current deposit relative to `depositMax`). Redraws `barBackgrounds`, `fillBar` (yellow), and `fuelBar` (orange) dynamically based on these ratios.

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Toggles the visibility of the health bar based on damage taken, updates its `health` and `maxHealth`, and rotates it to `-tick.yaw`.
