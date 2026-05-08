# `ZombieRangedModel`

Model implementation for Ranged Zombies, a type of zombie that was never implemented.

## `ZombieRangedModel`

Extends `CharacterModel`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `healthBar` | `HealthBar` | The health bar attachment. |
| `base` | `SpriteEntity` | The base sprite of the ranged zombie. |
| `weapon` | `SpriteEntity` | The bow sprite currently wielded by the ranged zombie. |

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

Updates the model every frame. If the `base` sprite is not yet initialized, it calls `updateModel` to construct the zombie visually. Afterwards, it calls `super.update(dt, user)`.

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Constructs the ranged zombie's visual components based on `tick.model`. 
- Parses the model string (e.g., `ZombieRangedGreenTierX`) to extract the tier.
- Initializes the `base` sprite corresponding to the parsed tier.
- Initializes the `weapon` sprite (a bow) and attaches an additional `bowHands` sprite to it.
- Assigns the `weaponUpdateFunc` using `updateBowWeapon()`.
- Adds the `weapon` at layer `1` and the `base` at layer `2`.
