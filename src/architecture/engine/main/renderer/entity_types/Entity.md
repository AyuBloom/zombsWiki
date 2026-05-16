---
title: Entity - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The base Entity class provides a wrapper around a PIXI.Container or
        other PIXI.DisplayObject. It implements a scene graph structure by
        allowing attachments (child entities) and providing common
        transformation methods like position, scale, rotation, and alpha.
  - - meta
    - name: 'og:description'
      content: >-
        The base Entity class provides a wrapper around a PIXI.Container or
        other PIXI.DisplayObject. It implements a scene graph structure by
        allowing attachments (child entities) and providing common
        transformation methods like position, scale, rotation, and alpha.
---
# `Entity`

The base `Entity` class provides a wrapper around a `PIXI.Container` or other `PIXI.DisplayObject`. It implements a scene graph structure by allowing attachments (child entities) and providing common transformation methods like position, scale, rotation, and alpha.

## `Entity`

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `node` | `PIXI.Container \| PIXI.DisplayObject` | `PIXI.Container` | The underlying PIXI display object. |
| `attachments` | `Entity[]` | `[]` | Array of child entities attached to this entity. |
| `parent` | `Entity \| null` | `null` | The parent entity that this entity is attached to. |
| `isVisible` | `boolean` | `true` | Whether the entity is marked as visible. |
| `shouldCull` | `boolean` | `false` | Whether to cull (hide) the entity when outside the camera viewport. |

### Methods

#### `isInViewport()`
```ts
function isInViewport(): boolean
```
Returns whether the entity's bounding box intersects with the current camera viewport.

#### `update()`
```ts
function update(dt: number, user: object): void
```
Updates the entity. Applies view culling if `shouldCull` is true, and calls `update` on all attachments.

### Getters and Setters

#### `getNode()`
```ts
function getNode(): PIXI.Container | PIXI.DisplayObject
```
Returns the underlying PIXI node.

#### `setNode()`
```ts
function setNode(node: PIXI.Container | PIXI.DisplayObject): void
```
Sets the underlying PIXI node.

#### `getParent()`
```ts
function getParent(): Entity | null
```
Returns the parent entity.

#### `setParent()`
```ts
function setParent(parent: Entity | null): void
```
Sets the parent entity.

#### `getAttachments()`
```ts
function getAttachments(): Entity[]
```
Returns the array of attached child entities.

#### `addAttachment()`
```ts
function addAttachment(attachment: Entity, zIndex?: number): void
```
Adds a child entity and its PIXI node. Optionally sets a `zHack` property for z-index sorting.

#### `removeAttachment()`
```ts
function removeAttachment(attachment: Entity): void
```
Removes a child entity and its PIXI node.

#### `getRotation()`
```ts
function getRotation(): number
```
Returns the rotation of the entity in degrees.

#### `setRotation()`
```ts
function setRotation(degrees: number): void
```
Sets the rotation of the entity in degrees.

#### `getAlpha()`
```ts
function getAlpha(): number
```
Returns the alpha transparency of the entity.

#### `setAlpha()`
```ts
function setAlpha(alpha: number): void
```
Sets the alpha transparency of the entity.

#### `getScale()`
```ts
function getScale(): PIXI.ObservablePoint
```
Returns the scale of the entity.

#### `setScale()`
```ts
function setScale(scale: number): void
```
Sets the x and y scale of the entity uniformly.

#### `getScaleX()`
```ts
function getScaleX(): number
```
Gets the x-axis scale of the entity.

#### `setScaleX()`
```ts
function setScaleX(scale: number): void
```
Sets the x-axis scale of the entity.

#### `getScaleY()`
```ts
function getScaleY(): number
```
Gets the y-axis scale of the entity.

#### `setScaleY()`
```ts
function setScaleY(scale: number): void
```
Sets the y-axis scale of the entity.

#### `getFilters()`
```ts
function getFilters(): PIXI.Filter[] | null
```
Gets the PIXI filters applied to the entity.

#### `setFilters()`
```ts
function setFilters(filters: PIXI.Filter[] | null): void
```
Sets the PIXI filters applied to the entity.

#### `getPosition()`
```ts
function getPosition(): PIXI.Point | PIXI.ObservablePoint
```
Returns the position of the entity.

#### `setPosition()`
```ts
function setPosition(x: number, y: number): void
```
Sets the position of the entity.

#### `getPositionX()`
```ts
function getPositionX(): number
```
Gets the x-axis position of the entity.

#### `setPositionX()`
```ts
function setPositionX(x: number): void
```
Sets the x-axis position of the entity.

#### `getPositionY()`
```ts
function getPositionY(): number
```
Gets the y-axis position of the entity.

#### `setPositionY()`
```ts
function setPositionY(y: number): void
```
Sets the y-axis position of the entity.

#### `getPivotPoint()`
```ts
function getPivotPoint(): PIXI.Point | PIXI.ObservablePoint
```
Gets the pivot point of the entity.

#### `setPivotPoint()`
```ts
function setPivotPoint(x: number, y: number): void
```
Sets the pivot point of the entity.

#### `getVisible()`
```ts
function getVisible(): boolean
```
Gets whether the entity is visible.

#### `setVisible()`
```ts
function setVisible(visible: boolean): void
```
Sets whether the entity is visible. Updates the underlying PIXI node's visibility.

#### `getShouldCull()`
```ts
function getShouldCull(): boolean
```
Gets whether the entity should be culled based on the viewport.

#### `setShouldCull()`
```ts
function setShouldCull(shouldCull: boolean): void
```
Sets whether the entity should be culled based on the viewport.
