---
title: ModelEntity - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: ModelEntity - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The ModelEntity class is a lightweight wrapper around Entity designed
        specifically to handle preloaded assets and game models.
  - - meta
    - property: 'og:description'
      content: >-
        The ModelEntity class is a lightweight wrapper around Entity designed
        specifically to handle preloaded assets and game models.
---
# `ModelEntity`

The `ModelEntity` class is a lightweight wrapper around `Entity` designed specifically to handle preloaded assets and game models.

## `ModelEntity`

Extends `Entity`.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `wasPreloaded` | `boolean` | `false` | Indicates whether this model has been preloaded. |

### Methods

#### `preload()`
```ts
function preload(): void
```
Marks the model entity as having been preloaded by setting `wasPreloaded` to `true`.

#### `reset()`
```ts
function reset(): void
```
Resets the model entity by detaching it from its parent (`setParent(null)`).
