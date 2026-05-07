# `SpriteEntity`

The `SpriteEntity` class extends `Entity` to render 2D images. It wraps a standard `PIXI.Sprite` or a `PIXI.extras.TilingSprite` for repeating patterns.

## `SpriteEntity`

Extends `Entity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `sprite` | `PIXI.Sprite \| PIXI.extras.TilingSprite` | The underlying PIXI sprite object. |

### Methods

#### `constructor()`
```ts
function constructor(texture: string | PIXI.Texture, tiled?: boolean): void
```
Creates a new sprite entity. If `texture` is a string URL, it is converted into a `PIXI.Texture`. If `tiled` is `true`, it uses a `TilingSprite` with `NEAREST` scaling. The sprite's anchor is centered at `(0.5, 0.5)` by default.

#### `getAnchor()`
```ts
function getAnchor(): PIXI.ObservablePoint
```
Returns the anchor point of the sprite.

#### `setAnchor()`
```ts
function setAnchor(x: number, y: number): void
```
Sets the anchor point of the sprite.

#### `getTint()`
```ts
function getTint(): number
```
Returns the tint color of the sprite.

#### `setTint()`
```ts
function setTint(tint: number): void
```
Sets the tint color of the sprite.

#### `getBlendMode()`
```ts
function getBlendMode(): number
```
Returns the blend mode of the sprite.

#### `setBlendMode()`
```ts
function setBlendMode(blendMode: number): void
```
Sets the blend mode of the sprite.

#### `getMask()`
```ts
function getMask(): PIXI.Graphics | PIXI.Sprite
```
Returns the mask applied to the sprite.

#### `setMask()`
```ts
function setMask(entity: Entity): void
```
Sets an entity to act as a mask for this sprite.

#### `setDimensions()`
```ts
function setDimensions(x: number, y: number, width: number, height: number): void
```
Explicitly sets the x/y position and width/height dimensions of the sprite.
