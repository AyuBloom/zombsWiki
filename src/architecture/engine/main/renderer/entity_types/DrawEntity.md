---
title: DrawEntity - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The DrawEntity class extends the base Entity class and uses a
        PIXI.Graphics object to provide primitive shape rendering capabilities,
        such as drawing triangles, circles, rectangles, and ellipses.
  - - meta
    - name: 'og:description'
      content: >-
        The DrawEntity class extends the base Entity class and uses a
        PIXI.Graphics object to provide primitive shape rendering capabilities,
        such as drawing triangles, circles, rectangles, and ellipses.
---
# `DrawEntity`

The `DrawEntity` class extends the base `Entity` class and uses a `PIXI.Graphics` object to provide primitive shape rendering capabilities, such as drawing triangles, circles, rectangles, and ellipses.

## `DrawEntity`

Extends `Entity`.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `draw` | `PIXI.Graphics` | `new PIXI.Graphics()` | The underlying PIXI Graphics object used for drawing shapes. |

### Methods

#### `drawTriangle()`
```ts
function drawTriangle(point0: object, point1: object, point2: object, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws a triangle defined by three points. Optional parameters set the fill color, line color, and line width.

#### `drawArc()`
```ts
function drawArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, antiClockwise: boolean, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws an arc based on a center point, radius, and angles (in degrees).

#### `drawCircle()`
```ts
function drawCircle(x: number, y: number, radius: number, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws a circle at the given position and radius.

#### `drawRect()`
```ts
function drawRect(x1: number, y1: number, x2: number, y2: number, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws a rectangle between two coordinate points.

#### `drawRoundedRect()`
```ts
function drawRoundedRect(x1: number, y1: number, x2: number, y2: number, radius: number, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws a rounded rectangle between two coordinate points with the specified corner radius.

#### `drawEllipse()`
```ts
function drawEllipse(x: number, y: number, width: number, height: number, fill?: object, lineFill?: object, lineWidth?: number): void
```
Draws an ellipse at the given position.

#### `getTexture()`
```ts
function getTexture(): PIXI.Texture
```
Generates and returns a PIXI Texture from the current graphics drawn on this entity.

#### `clear()`
```ts
function clear(): void
```
Clears all graphics from the `PIXI.Graphics` object.
