---
title: Metrics - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Metrics - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The Metrics class is responsible for collecting and reporting
        performance data to the server. It tracks various indicators such as
        FPS, ping, and client-side lag.
  - - meta
    - property: 'og:description'
      content: >-
        The Metrics class is responsible for collecting and reporting
        performance data to the server. It tracks various indicators such as
        FPS, ping, and client-side lag.
---
# Metrics

The `Metrics` class is responsible for collecting and reporting performance data to the server. It tracks various indicators such as FPS, ping, and client-side lag.

## `Metrics` <Badge type="tip" text="public" />

Bounded to `game` as `game.metrics`. Alias: `game.metricsType`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `msElapsedSinceMetricsSent` | `number` | Time in milliseconds since the last metrics update was sent. |
| `metrics` | `object` | The current collection of performance metrics. |
| `pingSum` | `number` | Sum of all ping samples for calculating average. |
| `pingSamples` | `number` | Number of ping samples collected. |
| `shouldSend` | `boolean` | Whether metrics collection and reporting is active. |
| `fpsSum` | `number` | Sum of all FPS samples for calculating average. |
| `fpsSamples` | `number` | Number of FPS samples collected. |

::: details `metrics` Object

The `metrics` object contains the following fields sent to the server:

| Field | Description |
| :--- | :--- |
| `name` | Constant set to `"Metrics"`. |
| `minFps` | Minimum FPS observed. |
| `maxFps` | Maximum FPS observed. |
| `currentFps` | Most recent FPS value. |
| `averageFps` | Calculated average FPS. |
| `framesRendered` | Total frames rendered since reset. |
| `framesInterpolated` | Total frames rendered using interpolation. |
| `framesExtrapolated` | Total frames rendered using extrapolation. |
| `allocatedNetworkEntities` | Total of tick entities and pooled network entities. |
| `currentClientLag` | Difference between server time and client time. |
| `minClientLag` | Minimum client lag observed. |
| `maxClientLag` | Maximum client lag observed. |
| `currentPing` | Most recent ping value. |
| `minPing` | Minimum ping observed. |
| `maxPing` | Maximum ping observed. |
| `averagePing` | Calculated average ping. |
| `longFrames` | Number of frames that took longer than expected to render. |
| `stutters` | Count of frame stutters detected. |
| `isMobile` | Boolean flag (0 or 1) indicating if the client is mobile. |
| `group` | Group identifier. |
| `timeResets` | Number of times client time was reset. |
| `maxExtrapolationTime` | Maximum time spent in extrapolation. |
| `totalExtrapolationTime` | Cumulative time spent in extrapolation. |
| `extrapolationIncidents` | Number of extrapolation occurrences. |
| `differenceInClientTime` | Discrepancy in client time synchronization. |

:::

### Methods

#### `constructor()`
```ts
function constructor(): void
```
Initializes the metrics state and sets up event handlers for network status (`close`, `error`), server response (`PACKET_ENTER_WORLD`) and renderer ticks.

#### `getFramesExtrapolated()`
```ts
function getFramesExtrapolated(): number
```
Returns the number of frames that have been extrapolated.

#### `reset()`
```ts
function reset(): void
```
Resets all metrics counters and samples to their initial state.

#### `updateMetrics()`
```ts
function updateMetrics(): boolean
```
Updates the internal `metrics` object with the latest data from the `world` and `network`. Returns `true` if the update was successful.

#### `sendMetrics()`
```ts
function sendMetrics(): void
```
Sends the current metrics to the server via an RPC call if at least 5 seconds have passed since the last report.
