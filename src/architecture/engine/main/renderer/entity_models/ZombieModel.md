# `ZombieModel`

Model implementation for the standard melee Zombie. It dynamically manages the visual representation of zombies across different colors and tiers.

## `ZombieModel`

Extends `CharacterModel`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `healthBar` | `HealthBar` | The health bar attachment, initialized with a dark red/orange color. |
| `base` | `SpriteEntity` | The base sprite of the zombie, determined by its tier and color. |
| `weapon` | `SpriteEntity` | The weapon sprite currently wielded by the zombie. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Creates the `healthBar` with the specific color `{ r: 184, g: 70, b: 20 }`, sets its position and scales it to `0.6`. Adds the health bar at layer `0`.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. If the `base` sprite is not yet initialized, it calls `updateModel` to construct the zombie visually. Afterwards, it calls `super.update(dt, user)` to handle general character animations (like damage tinting).

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Constructs the zombie's visual components based on `tick.model`. 
- Parses the model string (e.g., `ZombieGreenTier1`, `ZombieRedTier5`) to extract the color (`Green`, `Blue`, `Red`, `Yellow`, `Purple`, `Orange`) and the `tier`.
- Initializes the `base` and `weapon` sprites corresponding to the parsed color and tier.
- Assigns the `weaponUpdateFunc` based on the tier:
  - **Tier 1**: `updatePunchingWeapon()`
  - **Tiers 2-3**: `updateSwingingWeapon(300, 100)`
  - **Tiers 4-6**: `updateSwingingWeapon(400, 90)`
  - **Tiers 7+**: `updateSwingingWeapon(500, 80)`
- Adds the `weapon` at layer `1` and the `base` at layer `2`.
