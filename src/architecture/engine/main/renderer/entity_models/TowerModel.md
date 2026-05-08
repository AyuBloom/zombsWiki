# `TowerModel`

Base model for tower entities. Manages the visual representation of a tower by composing a base sprite, a rotatable head sprite, and a health bar. The model dynamically swaps its sprites when the tower's tier changes.

## `TowerModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | The tower type name (e.g. `"ArrowTower"`). Used to resolve sprite asset paths. |
| `healthBar` | `HealthBar` | The health bar attachment, sized `82×16` with pivot `(41, -25)`. Hidden by default and shown when the tower is damaged. |
| `base` | `SpriteEntity` | The base sprite for the current tier. Attached at layer `2`. |
| `head` | `SpriteEntity` | The head (turret) sprite for the current tier. Attached at layer `3`. Rotates to face `towerYaw`. |
| `currentTier` | `number` | The currently rendered tier. Used to avoid redundant sprite swaps. |

### Methods

#### `constructor()`

```ts
function constructor(args: { name: string }): TowerModel
```

Initializes the tower model. Creates and attaches a `HealthBar` at layer `4`, then calls `updateModel(1)` to load the tier-1 sprites.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Called every frame. Reads `tier`, `towerYaw`, `health`, and `maxHealth` from the `user` tick data. Updates the model's tier sprites if the tier has changed, refreshes the health bar visibility, and rotates the head to `towerYaw - 90`.

#### `updateModel()`

```ts
function updateModel(tier: number): void
```

Swaps the base and head sprites to match the given `tier` (valid range: `1`–`8`). Removes the old `base` and `head` attachments, creates new `SpriteEntity` instances from the resolved asset paths, and re-attaches them at layers `2` and `3` respectively. Throws an error if the tier is out of range.

::: details Asset path format
```
/asset/image/entity/{name}/{name}-t{tier}-base.svg
/asset/image/entity/{name}/{name}-t{tier}-head.svg
```
:::

#### `updateHealthBar()`

```ts
function updateHealthBar(tick: ENTITY_DATA, networkEntity: NetworkEntity): void
```

Shows the health bar when `tick.health !== tick.maxHealth`, hides it otherwise.
