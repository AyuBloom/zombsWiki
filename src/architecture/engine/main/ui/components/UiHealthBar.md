---
title: UiHealthBar - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiHealthBar - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiHealthBar class renders the player's health bar on the HUD. It
        listens for player tick updates and adjusts the inner bar width to
        reflect the current health percentage.
  - - meta
    - property: 'og:description'
      content: >-
        The UiHealthBar class renders the player's health bar on the HUD. It
        listens for player tick updates and adjusts the inner bar width to
        reflect the current health percentage.
---

# `UiHealthBar`

The `UiHealthBar` class renders the player's health bar on the HUD. It listens for player tick updates and adjusts the inner bar width to reflect the current health percentage.

## `UiHealthBar` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-health-bar` DOM element. Inherited from `UiComponent`. |
| `barElem` | `HTMLElement` | The `.hud-health-bar-inner` element whose width represents current health. |
| `lastPlayerTick` | `{ health: number, maxHealth: number }` | Cached previous player tick values. Initialized to `{ health: 100, maxHealth: 100 }`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the health bar, queries the inner bar element, and registers a listener for the `playerTickUpdate` event.

#### `onPlayerTickUpdate()`
```ts
function onPlayerTickUpdate(playerTick: { health: number, maxHealth: number }): void
```
Updates the bar width percentage when `health` or `maxHealth` changes compared to the last tick. Caches the current tick for comparison on the next update.
