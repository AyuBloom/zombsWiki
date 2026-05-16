---
title: UiResources - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiResources - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiResources class renders the top HUD resource bar showing the
        player's current wood, stone, gold, tokens, and wave number. Values are
        abbreviated using the number-abbreviate library. It also triggers
        walkthrough step 1 completion when wood and stone both reach ≥ 10.
  - - meta
    - property: 'og:description'
      content: >-
        The UiResources class renders the top HUD resource bar showing the
        player's current wood, stone, gold, tokens, and wave number. Values are
        abbreviated using the number-abbreviate library. It also triggers
        walkthrough step 1 completion when wood and stone both reach ≥ 10.
---

# `UiResources`

The `UiResources` class renders the top HUD resource bar showing the player's current wood, stone, gold, tokens, and wave number. Values are abbreviated using the `number-abbreviate` library. It also triggers walkthrough step 1 completion when wood and stone both reach ≥ 10.

## `UiResources` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-resources` DOM element. Inherited from `UiComponent`. |
| `woodElem` | `HTMLElement` | The `.hud-resources-wood` element. |
| `stoneElem` | `HTMLElement` | The `.hud-resources-stone` element. |
| `goldElem` | `HTMLElement` | The `.hud-resources-gold` element. |
| `tokensElem` | `HTMLElement` | The `.hud-resources-tokens` element. |
| `waveElem` | `HTMLElement` | The `.hud-resources-wave` element. |
| `lastPlayerTick` | `object` | Cached previous tick values for change detection. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the resource bar, queries all resource elements, and registers a listener for `playerTickUpdate`.

#### `onPlayerTickUpdate()`
```ts
function onPlayerTickUpdate(playerTick: { wood: number, stone: number, gold: number, token: number, wave: number }): void
```
Updates each resource display only when its value changes, using `numberAbbreviate` for formatting. Updates wave display when wave > 0 and changed. Marks walkthrough step 1 as completed when wood ≥ 10 and stone ≥ 10.
