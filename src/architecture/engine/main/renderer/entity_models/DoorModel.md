# `DoorModel`

<img src="/asset/image/ui/entities/entities-door.svg" style="float: right; width: 128px; margin-top: -50px;" />

Model implementation for the Door. Does not inherit from `TowerModel`.

## `DoorModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTier` | `number` | The current tier of the door. Defaults to `1`. |
| `base` | `SpriteEntity` | The base sprite for the current tier. |
| `healthBar` | `HealthBar` | The health bar attachment, sized `35x10`. |

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

Updates the model every frame. Calls `updateModel`, `updateVisibility`, and `updateHealthBar`.

#### `updateModel()`

```ts
function updateModel(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Updates the base sprite if the tier has changed. Supported tiers are `1` through `8`.

#### `updateVisibility()`

```ts
function updateVisibility(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Checks if the door belongs to the local player's party by comparing `tick.partyId` with `LocalPlayer.getMyPartyId()`. If it belongs to the player's party, the `base` sprite alpha is set to `0.5`, making it transparent.

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Shows the health bar if the current health is not equal to the max health.
