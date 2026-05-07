# `ZombieBossModel`

Model implementation for the Boss Zombie.

## `ZombieBossModel`

Extends `CharacterModel`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `healthBar` | `HealthBar` | The health bar attachment. |
| `base` | `SpriteEntity` | The base sprite of the boss zombie. |
| `weapon` | `SpriteEntity` | The weapon sprite currently wielded by the boss zombie. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Creates the `healthBar` with the specific color `{ r: 184, g: 70, b: 20 }` and adds it at layer `0`.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. If the `base` sprite is not yet initialized, it calls `updateModel` to construct the zombie visually. Afterwards, it calls `super.update(dt, user)`.

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Constructs the boss zombie's visual components based on `tick.model`. 
- Parses the model string (e.g., `ZombieBossTierX`). However, regardless of the parsed tier, the visual tier is hardcoded to `1`.
- Initializes the `base` and `weapon` sprites using the `/asset/image/entity/zombie-boss/` directory.
- Assigns the `weaponUpdateFunc` using `updateSwingingWeapon(500, 60)`.
- Adds the `weapon` at layer `1` and the `base` at layer `2`.
