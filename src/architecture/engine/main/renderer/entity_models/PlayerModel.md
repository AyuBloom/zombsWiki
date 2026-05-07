# `PlayerModel`

<img src="/asset/image/ui/entities/lilbowtie.svg" style="float: right; width: 192px; height: 136px;margin-top: -25px;" />

Model implementation for the Player. It manages the dynamic rendering of the player character, including their base sprite, equipped weapons, hats, health/shield bars, and nametag filtering.

## `PlayerModel`

Extends `CharacterModel`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `base` | `SpriteEntity` | The base sprite for the player. |
| `healthBar` | `HealthBar` | The health bar attachment. |
| `shieldBar` | `ShieldBar` | The shield bar attachment. |
| `nameEntity` | `TextEntity` | The nametag text entity, rendered with custom font styling. |
| `weapon` | `SpriteEntity` | The currently equipped weapon sprite. |
| `hat` | `SpriteEntity` | The currently equipped hat sprite. |
| `weaponUpdateFunc` | `Function` | A dynamically assigned function that handles the animation logic for the currently equipped weapon. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model. Creates the `base`, `healthBar`, `shieldBar`, and `nameEntity`. Sets up font styling for the nametag. Attachments are added at layer `2` (base) and `0` (health, shield, nametag). Also initializes the `grawlix` profanity filter with racism plugins.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. Handles rotation with local data, nametag updates, dynamic swapping of weapons and hats if they changed, hat rotation, shield bar visibility based on `tick.zombieShieldMaxHealth`, and overall player visibility based on death state.

#### `updateRotationWithLocalData()`

```ts
function updateRotationWithLocalData(entity: NetworkEntity): void
```

If the entity is the local player, this overrides the `aimingYaw` with the latest yaw from the `inputPacketCreator` to ensure instantaneous rotation updates visually.

#### `updateNameEntity()`

```ts
function updateNameEntity(tick: ENTITY_DATA): void
```

Filters the player's name using `grawlix` to censor profanity and updates the `nameEntity` text. Also rotates the nametag to always remain horizontal.

#### `updateWeapon()`

```ts
function updateWeapon(tick: ENTITY_DATA, entity: NetworkEntity): void
```

Swaps the `weapon` sprite based on `tick.weaponName` and `tick.weaponTier`. Supports `Pickaxe`, `Spear`, `Bow`, and `Bomb`. Assigns the appropriate animation function to `weaponUpdateFunc` (`updateSwingingWeapon` or `updateBowWeapon`). Added to layer `1`.

::: info

This function does not use the correct swinging / bowing interval for each weapon for each tier. Instead, it uses a 250ms interval for all weapons.

:::

#### `updateHat()`

```ts
function updateHat(tick: ENTITY_DATA, entity: NetworkEntity): void
```

Swaps the `hat` sprite based on `tick.hatName` (e.g., `HatHorns`). Added to layer `3`.

#### `updateHatRotation()`

```ts
function updateHatRotation(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Calculates the interpolated `aimingYaw` and sets the hat rotation to follow the player's aim.

#### `updateSwingingWeapon()`

```ts
function updateSwingingWeapon(swingLengthInMs?: number, swingAmplitude?: number): Function
```

Returns an update function that animates a swinging weapon (like Pickaxe, Spear, or Bomb). The animation uses a sine wave based on `tick.firingTick` and the defined swing length/amplitude. Also applies a slight rotation offset to the hat during the swing.

#### `updateBowWeapon()`

```ts
function updateBowWeapon(pullLengthInMs?: number, releaseLengthInMs?: number): Function
```

Returns an update function specifically for the Bow. Animates the drawing (pull) of the bowstring when `tick.startChargingTick` is present, and the release when `tick.firingTick` is present, by dynamically adjusting the position of the bow hands attachment.
