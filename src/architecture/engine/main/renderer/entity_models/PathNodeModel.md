---
title: PathNodeModel - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: PathNodeModel - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        An unused model entity that visualizes zombie pathfinding by displaying
        path cost and movement direction at a fixed position, presumably for
        internal testing uses.
  - - meta
    - property: 'og:description'
      content: >-
        An unused model entity that visualizes zombie pathfinding by displaying
        path cost and movement direction at a fixed position, presumably for
        internal testing uses.
---
# `PathNodeModel`

An unused model entity that visualizes zombie pathfinding by displaying path cost and movement direction at a fixed position, presumably for internal testing uses.

## `PathNodeModel`

Extends `ModelEntity`.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `lastCost` | `number` | Path cost of the last tick. |
| `lastDirection` | `number` | Number representing movement direction of the last tick. |
| `text` | `TextEntity` | The text entity displaying path cost. |
| `text2` | `TextEntity` | The text entity displaying movement direction. |

### Methods

#### `constructor()`

```ts
function constructor(): void
```

Initializes the path node model and creates `text` and `text2`. Defaults `lastCost` and `lastDirection` to `-1`.

#### `update()`

```ts
function update(dt: number, user: any): void
```

Updates the model every frame. If `tick.pathCost` or `tick.direction` is different from `lastCost` or `lastDirection`, it updates `text` and `lastCost` from `tick.pathCost`, and `text2` and `lastDirection` from `tick.direction`.  
Conversion between `tick.direction` and text displayed in `text2` is shown as follows:
| `tick.direction` | Displayed Text |
| :--- | :--- |
| `0` | `→` |
| `1` | `←` |
| `2` | `↓` |
| `3` | `↑` |
| `4` | `↘` |
| `5` | `↙` |
| `6` | `↖` |
| `7` | `↗` |
