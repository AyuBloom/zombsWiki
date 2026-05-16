---
title: UiShieldBar - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiShieldBar class renders the zombie shield health bar on the HUD.
        It auto-hides when no shield is active and auto-shows when one is
        present.
  - - meta
    - name: 'og:description'
      content: >-
        The UiShieldBar class renders the zombie shield health bar on the HUD.
        It auto-hides when no shield is active and auto-shows when one is
        present.
---

# `UiShieldBar`

The `UiShieldBar` class renders the zombie shield health bar on the HUD. It auto-hides when no shield is active and auto-shows when one is present.

## `UiShieldBar` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-shield-bar` DOM element. Inherited from `UiComponent`. |
| `barElem` | `HTMLElement` | The `.hud-shield-bar-inner` element whose width represents shield health. |
| `lastPlayerTick` | `object` | Cached previous tick values for `zombieShieldHealth` and `zombieShieldMaxHealth`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the shield bar, queries the inner bar element, and registers a listener for `playerTickUpdate`.

#### `onPlayerTickUpdate()`
```ts
function onPlayerTickUpdate(playerTick: { zombieShieldHealth: number, zombieShieldMaxHealth: number }): void
```
If `zombieShieldMaxHealth` is `null` or `0`, hides the bar. Otherwise, updates the bar width percentage when values change and calls `show()`.
