---
title: UiDayNightOverlay - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiDayNightOverlay - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiDayNightOverlay class renders a screen-wide dark overlay that
        fades in and out to simulate the day/night cycle. The overlay opacity is
        interpolated based on the current tick's position within the day or
        night phase.
  - - meta
    - property: 'og:description'
      content: >-
        The UiDayNightOverlay class renders a screen-wide dark overlay that
        fades in and out to simulate the day/night cycle. The overlay opacity is
        interpolated based on the current tick's position within the day or
        night phase.
---

# `UiDayNightOverlay`

The `UiDayNightOverlay` class renders a screen-wide dark overlay that fades in and out to simulate the day/night cycle. The overlay opacity is interpolated based on the current tick's position within the day or night phase.

## `UiDayNightOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-day-night-overlay` DOM element. Inherited from `UiComponent`. |
| `tickData` | `object \| undefined` | The latest `DayCycle` RPC response containing `dayEndTick`, `nightEndTick`, and `cycleStartTick`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the overlay, registers a renderer tick callback for continuous updates, and adds an RPC handler for `DayCycle`.

#### `update()`
```ts
function update(): void
```
Calculates the overlay opacity based on the current tick index relative to the day/night cycle data. During day, the overlay fades in/out in the first and last 20% of the day phase (dawn/dusk transition). During night, opacity ramps from 0.5 to 1.0 in the first 20%, holds at 1.0, and ramps back to 0.5 in the last 20%. Only recalculates every 10th tick for performance.

#### `onDayNightTickUpdate()`
```ts
function onDayNightTickUpdate(response: { dayEndTick: number, nightEndTick: number, cycleStartTick: number }): void
```
Handles the `DayCycle` RPC. Stores the tick data and triggers an `update()`.
