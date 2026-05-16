---
title: assetManager - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: assetManager - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The assetManager class is simple: it is an abstraction over pixi.js's
        asset loader and provides preloaded models.
  - - meta
    - property: 'og:description'
      content: >-
        The assetManager class is simple: it is an abstraction over pixi.js's
        asset loader and provides preloaded models.
---
# `assetManager`

The `assetManager` class is simple: it is an abstraction over `pixi.js`'s asset loader and provides preloaded models.

## `AssetManager` <Badge type="tip" text="public" />

Bounded to `game` as `game.assetManager`. Alias: `game.assetManagerType`

### Methods

#### `load`
```ts
function load(files: Array<{ name: string, url: string }>, callback?: Function): void
```
Loads all files from an array by names. Is called once every time the game is loaded with every model names to preload assets.

::: info

Parameter `files` has the data structure as shown in [Data Interfaces](#data-interfaces). You can see the current parameter [here](/asset/architecture/engine/utils/assetManager/files.json).

:::

#### `loadModel`
```ts
function loadModel(modelName: string, args?: object): void
```
Loads a model from preloaded assets.
