
# `UiRespawn`

The `UiRespawn` class manages the death/respawn screen. It is shown when the player or their Gold Stash dies, displaying the cause, final wave/score, social share buttons (Twitter/Facebook), and a respawn button. It also manages a medrec ad unit.

## `UiRespawn` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-respawn` DOM element. Inherited from `UiComponent`. |
| `adMedrecElem` | `HTMLElement` | The `.ad-unit-medrec-respawn` ad container. |
| `respawnTextElem` | `HTMLElement` | The `.hud-respawn-text` paragraph for death info. |
| `submitElem` | `HTMLElement` | The `.hud-respawn-btn` respawn button. |
| `shareElem` | `HTMLElement` | The `.hud-respawn-share` social share button container. |
| `twitterElem` | `HTMLElement` | The `.hud-respawn-twitter-btn` Twitter share button. |
| `facebookElem` | `HTMLElement` | The `.hud-respawn-facebook-btn` Facebook share button. |
| `facebookAppId` | `string` | The Facebook app ID for share dialogs. `'413139982405300'`. |
| `medrecId` | `number` | Incrementing ID for ad uniqueness. Starts at `2000`. |
| `deadResponse` | `object \| undefined` | The latest `Dead` RPC response. |
| `lastTick` | `object \| undefined` | The player's tick data at time of death. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Queries DOM elements, binds event listeners for mouse propagation, social share clicks, respawn button, and registers the `Dead` RPC handler.

#### `show()`
```ts
function show(): void
```
Overrides `UiComponent.show()`. Creates a fresh ad container and initializes NitroAds.

#### `hide()`
```ts
function hide(): void
```
Overrides `UiComponent.hide()`. Clears the ad container.

#### `onTwitterSendIntent()`
```ts
function onTwitterSendIntent(event: MouseEvent): void
```
Opens a Twitter intent popup pre-filled with the player's wave and score.

#### `onFacebookSendIntent()`
```ts
function onFacebookSendIntent(event: MouseEvent): void
```
Opens a Facebook share dialog pre-filled with the player's wave and score.

#### `onRespawnClick()`
```ts
function onRespawnClick(event: MouseEvent): void
```
Schedules a respawn input via `inputPacketScheduler`, re-checks social links after 2 seconds, and hides the respawn screen.

#### `onPlayerDeath()`
```ts
function onPlayerDeath(response: { stashDied: boolean }): void
```
Handles the `Dead` RPC. Captures the player's last tick data. If the Gold Stash died, shows the full death summary with wave/score and share buttons. Otherwise shows a simpler "you got killed" message. Calls `show()`.
