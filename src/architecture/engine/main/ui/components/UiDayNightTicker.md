---
title: UiDayNightTicker - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiDayNightTicker class renders a small progress bar indicating the
        current position in the day/night cycle. It also triggers an
        announcement warning when nightfall is approaching.
  - - meta
    - name: 'og:description'
      content: >-
        The UiDayNightTicker class renders a small progress bar indicating the
        current position in the day/night cycle. It also triggers an
        announcement warning when nightfall is approaching.
---

# `UiDayNightTicker`

The `UiDayNightTicker` class renders a small progress bar indicating the current position in the day/night cycle. It also triggers an announcement warning when nightfall is approaching.

## `UiDayNightTicker` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-day-night-ticker` DOM element. Inherited from `UiComponent`. |
| `barElem` | `HTMLElement` | The `.hud-ticker-bar` element whose `background-position` is animated to show cycle progress. |
| `markerElem` | `HTMLElement` | The `.hud-ticker-marker` indicator element. |
| `announcedZombies` | `boolean` | Whether the nightfall warning has been announced for the current day phase. Defaults to `false`. |
| `announcementOffsetMs` | `number` | Milliseconds before night starts when the warning triggers. Defaults to `20000`. |
| `tickData` | `object \| undefined` | The latest `DayCycle` RPC response. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the ticker, queries bar/marker elements, registers a renderer tick callback for updates, and adds an RPC handler for `DayCycle`.

#### `update()`
```ts
function update(): void
```
Calculates the day and night progress ratios, updates the bar's `background-position` to reflect the cycle position, and triggers a nightfall announcement via `AnnouncementOverlay.showAnnouncement()` when the remaining day time drops below `announcementOffsetMs`. The `announcedZombies` flag is reset at the start of each night phase. Only recalculates every 10th tick.

#### `onDayNightTickUpdate()`
```ts
function onDayNightTickUpdate(response: { dayEndTick: number, nightEndTick: number, cycleStartTick: number }): void
```
Handles the `DayCycle` RPC. Stores the tick data and triggers an `update()`.
