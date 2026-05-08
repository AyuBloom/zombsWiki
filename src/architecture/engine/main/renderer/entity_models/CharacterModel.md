# `CharacterModel`

Base model implementation for character entities, such as players and zombies. It handles common animations including damage tinting and various weapon attack motions.

## `CharacterModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `lastDamagedTick` | `number` | Tracks the tick when the entity was last damaged. |
| `lastDamagedAnimationDone` | `boolean` | Flag indicating if the damage flash animation has completed. |
| `lastFiringTick` | `number` | Tracks the tick when the entity last fired or attacked. |
| `lastFiringAnimationDone` | `boolean` | Flag indicating if the firing/attack animation has completed. |
| `weaponUpdateFunc` | `Function` | A dynamically assigned function that handles the animation logic for the character's weapon. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model, setting default values for the animation tracking state variables.

#### `update()`

```ts
function update(dt: number, user: object): void
```

Updates the model every frame. Calls `updateDamageTint` and executes `weaponUpdateFunc` if it is defined.

#### `updateDamageTint()`

```ts
function updateDamageTint(tick: ENTITY_DATA): void
```

Checks if `tick.lastDamagedTick` has updated. If so, flashes the `base` and `weapon` (if present) sprites red for `100`ms to visually indicate taking damage.

#### `updatePunchingWeapon()`

```ts
function updatePunchingWeapon(punchLengthInMs?: number): Function
```

Returns an update function for punching weapons. Animates the `weapon`'s Y-position using a sine wave over the duration of `punchLengthInMs`.

#### `updateSwingingWeapon()`

```ts
function updateSwingingWeapon(swingLengthInMs?: number, swingAmplitude?: number): Function
```

Returns an update function for swinging weapons. Animates the `weapon`'s rotation using a sine wave over the duration of `swingLengthInMs` with the specified `swingAmplitude`.

#### `updateBowWeapon()`

```ts
function updateBowWeapon(pullLengthInMs?: number): Function
```

Returns an update function for bow weapons. Animates the bow's string attachment (assumed to be the first attachment) by modifying its Y-position over the duration of `pullLengthInMs`.
