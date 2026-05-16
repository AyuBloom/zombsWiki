---
title: NetworkEntity - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: NetworkEntity - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The NetworkEntity class extends Entity and is the core class
        representing objects synchronized from the server. It manages the
        entity's UID, interpolation state between server ticks, and dynamic
        model attachment based on data from the network.
  - - meta
    - property: 'og:description'
      content: >-
        The NetworkEntity class extends Entity and is the core class
        representing objects synchronized from the server. It manages the
        entity's UID, interpolation state between server ticks, and dynamic
        model attachment based on data from the network.
---
# `NetworkEntity`

The `NetworkEntity` class extends `Entity` and is the core class representing objects synchronized from the server. It manages the entity's UID, interpolation state between server ticks, and dynamic model attachment based on data from the network.

## `NetworkEntity`

Extends `Entity`.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `uid` | `number` | `0` | The unique identifier of the entity assigned by the server. |
| `currentModel` | `ModelEntity \| null` | `null` | The current visual model attached to this entity. |
| `entityClass` | `string \| null` | `null` | The class/type string defining this entity from the server. |
| `fromTick` | `object \| null` | `null` | The starting server tick data for interpolation. |
| `targetTick` | `object \| null` | `null` | The target server tick data for interpolation. |

### Methods

#### `constructor()`
```ts
function constructor(tick: object): void
```
Initializes the entity with the given starting tick data. Assigns the `uid`, disables culling by default, ensures visibility, and sets the target tick.

#### `reset()`
```ts
function reset(): void
```
Clears the entity's data (`uid`, `currentModel`, `entityClass`, ticks) to prepare it for recycling into the object pool.

#### `isLocal()`
```ts
function isLocal(): boolean
```
Returns `true` if this entity's UID matches the local player's UID.

#### `getTargetTick()`
```ts
function getTargetTick(): object | null
```
Returns the target server tick data.

#### `getFromTick()`
```ts
function getFromTick(): object | null
```
Returns the initial (from) server tick data.

#### `setTargetTick()`
```ts
function setTargetTick(tick: object): void
```
Advances the tick data. The old `targetTick` becomes the new `fromTick`, and the provided `tick` becomes the new `targetTick`. Missing fields are copied over from the previous tick. Also handles scaling, updates `entityClass`, and triggers `refreshModel` if the model type changed.

#### `overrideFromTick()`
```ts
function overrideFromTick(tick: object): void
```
Manually overrides the `fromTick` data.

#### `overrideTargetTick()`
```ts
function overrideTargetTick(tick: object): void
```
Manually overrides the `targetTick` data.

#### `tick()`
```ts
function tick(msInThisTick: number, msPerTick: number): void
```
Linearly interpolates the entity's position (`x`, `y`) and rotation (`yaw`) based on the progress between `fromTick` and `targetTick`.

#### `update()`
```ts
function update(dt: number, user: object): void
```
Updates the entity frame-by-frame. Sets the interpolated yaw on `fromTick`, updates the `currentModel`, and manages node visibility through viewport culling.

#### `refreshModel()`
```ts
function refreshModel(networkModelName: string): void
```
Creates or fetches a new model for the entity. Pulls from the asset manager or entity pool if pooling is enabled, and replaces `currentModel`.

#### `addMissingTickFields()`
```ts
function addMissingTickFields(tick: object, lastTick: object): void
```
Copies missing fields from the previous tick into the new tick to ensure state continuity.
