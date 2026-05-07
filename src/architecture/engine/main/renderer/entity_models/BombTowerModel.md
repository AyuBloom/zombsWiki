# `BombTowerModel`

<img src="/asset/image/ui/entities/entities-bomb-tower.svg" style="float: right; width: 128px; margin-top: -50px;" />

Specific model implementation for the Bomb Tower.

## `BombTowerModel`

Extends `TowerModel`.

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the model by calling the `super({ name: 'bomb-tower' })`.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. If `user.firingTick` is present, animates the tower head by scaling it based on the time since it fired. The animation lasts for `500`ms with an amplitude of `0.6`. Calls `super.update(dt, user)`.
