---
title: localPlayer - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The LocalPlayer class represents the client's own player within the
        world. It holds a reference to the player's NetworkEntity.
  - - meta
    - name: 'og:description'
      content: >-
        The LocalPlayer class represents the client's own player within the
        world. It holds a reference to the player's NetworkEntity.
---
# `localPlayer`

The `LocalPlayer` class represents the client's own player within the world. It holds a reference to the player's `NetworkEntity`.

## `LocalPlayer` <Badge type="danger" text="private" />
Bound to `game.world` as `game.world.localPlayer`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `entity` | `NetworkEntity` | The network entity associated with the local player. |

### Methods

#### `setEntity()`
```ts
function setEntity(entity: NetworkEntity): void
```
Stores a reference to the player's `NetworkEntity`.

#### `getEntity()`
```ts
function getEntity(): NetworkEntity
```
Returns the player's `NetworkEntity`.

#### `setTargetTick()`
```ts
function setTargetTick(tick: object): void
```
Forwards the given tick data to the UI via `game.ui.setPlayerTick()`.
