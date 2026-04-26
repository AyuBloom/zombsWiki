# `assetManager`

The `assetManager` class is simple: it is an abstraction over `pixi.js`'s asset loader and provides preloaded models.

## `AssetManager` <Badge type="tip" text="public" />

Bounded to `game` as `game.assetManager`. Alias: `game.assetManagerType`

### Methods

#### `load`
```ts
function load(files: Array<string>, callback?: boolean): void
```
Loads all files from an array by names. Is called once every time the game is loaded with every model names to preload assets.

#### `loadModel`
```ts
function loadModel(modelName: string, args?: object): void
```
Loads a model from preloaded assets.
