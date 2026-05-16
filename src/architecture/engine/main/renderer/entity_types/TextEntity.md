---
title: TextEntity - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: TextEntity - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The TextEntity class extends Entity to render text strings on the
        canvas. It uses an internal PIXITextFix (a subclass of PIXI.Text) to
        handle text rendering correctly across WebGL and Canvas modes.
  - - meta
    - property: 'og:description'
      content: >-
        The TextEntity class extends Entity to render text strings on the
        canvas. It uses an internal PIXITextFix (a subclass of PIXI.Text) to
        handle text rendering correctly across WebGL and Canvas modes.
---
# `TextEntity`

The `TextEntity` class extends `Entity` to render text strings on the canvas. It uses an internal `PIXITextFix` (a subclass of `PIXI.Text`) to handle text rendering correctly across WebGL and Canvas modes.

## `TextEntity`

Extends `Entity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `text` | `PIXI.Text` (`PIXITextFix`) | The underlying PIXI Text object. |

### Methods

#### `constructor()`
```ts
function constructor(text: string, fontName: string, fontSize: number): void
```
Creates a new text entity with the specified text string, font family, and font size. Sets the text resolution to `2 * devicePixelRatio` to keep it sharp on high-DPI displays.

#### `setColor()`
```ts
function setColor(r: number, g: number, b: number): void
```
Sets the fill color of the text using RGB values (0-255).

#### `setStroke()`
```ts
function setStroke(r: number, g: number, b: number, thickness: number): void
```
Sets the stroke color and thickness of the text using RGB values.

#### `setFontWeight()`
```ts
function setFontWeight(weight: string | number): void
```
Sets the font weight (e.g. `'bold'`, `700`).

#### `setLetterSpacing()`
```ts
function setLetterSpacing(spacing: number): void
```
Sets the letter spacing between text characters.

#### `setAnchor()`
```ts
function setAnchor(x: number, y: number): void
```
Sets the anchor point of the text.

#### `setString()`
```ts
function setString(text: string): void
```
Updates the string content of the text entity.
