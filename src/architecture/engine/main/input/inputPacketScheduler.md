# `inputPacketScheduler`

The `InputPacketScheduler` class manages the timing and delivery of input packets to the server by acting as a buffer between `InputPacketCreator` and `NetworkAdapter`. It ensures that input data is not sent faster than the server's tick rate (50ms+), providing a more consistent and synchronized input stream.

## `InputPacketScheduler` <Badge type="tip" text="public" />

Bounded to `game` as `game.inputPacketScheduler`. Alias: `game.inputPacketSchedulerType`

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `msElapsedSinceInputSent` | `number` | Time in milliseconds since the last input packet was successfully sent. |
| `currentPacket` | `object` | The most recent input data scheduled for transmission. |
| `shouldSendPacket` | `boolean` | Flag indicating whether there is a pending packet waiting to be sent. |

### Methods

#### `start()`
```ts
function start(): void
```
Initializes the scheduler by registering a tick callback with the renderer.

#### `scheduleInput()`
```ts
function scheduleInput(data: object): void
```
Updates the `currentPacket` with new input data and marks it as ready for transmission. It immediately attempts to send the packet via `sendInputKeys()`.

#### `onRendererTick()`
```ts
function onRendererTick(delta: number): void
```
Accumulates the time elapsed using the renderer's `delta` and attempts to send any pending packets.

#### `sendInputKeys()`
```ts
function sendInputKeys(): void
```
Checks if the time since the last packet exceeds the world's tick rate (`world.getMsPerTick()`). If a packet is pending and the time threshold is met, it dispatches the packet via `network.sendInput()` and resets the internal state.

::: info
If multiple inputs are scheduled within a single tick, only the latest input state will be sent when the next tick interval is reached.
:::
