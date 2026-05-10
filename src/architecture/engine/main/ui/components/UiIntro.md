
# `UiIntro`

The `UiIntro` class manages the game's main menu / intro screen. It handles player name input, server selection, connection flow, ad display, canvas rendering toggle, leaderboard data fetching, and party invitation deep linking.

## `UiIntro` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The pre-existing `.hud-intro` DOM element (not created from template). |
| `adMedrecElem` | `HTMLElement` | The `.ad-unit-medrec` ad container. |
| `adLeaderboardElem` | `HTMLElement` | The `.ad-unit-leaderboard` ad container. |
| `nameInputElem` | `HTMLInputElement` | The `.hud-intro-name` player name text input. Persisted via `localStorage`. |
| `serverElem` | `HTMLSelectElement` | The `.hud-intro-server` server selection dropdown. |
| `submitElem` | `HTMLElement` | The `.hud-intro-play` play/submit button. |
| `errorElem` | `HTMLElement` | The `.hud-intro-error` error message display element. |
| `canvasInputElem` | `HTMLInputElement` | The `.hud-intro-canvas` checkbox for forcing canvas rendering. |
| `leaderboardCategoryInputElem` | `HTMLSelectElement` | The `.hud-intro-leaderboard-category` dropdown (score/wave). |
| `leaderboardTimeInputElem` | `HTMLSelectElement` | The `.hud-intro-leaderboard-time` dropdown (time frame). |
| `leaderboardPartiesElem` | `HTMLElement` | The `.hud-intro-leaderboard-parties` container for leaderboard entries. |
| `connecting` | `boolean` | Whether a connection attempt is currently in progress. |
| `connectionTimer` | `number \| undefined` | Timeout ID for the 5-second connection timeout. |
| `partyShareKey` | `string \| undefined` | Share key extracted from the URL hash for party invitations. |
| `reconnectKey` | `string \| undefined` | Key for reconnection, if applicable. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the intro screen by querying the pre-existing `.hud-intro` element (bypasses template creation), restores the player name and canvas preference from `localStorage`, conditionally creates a leaderboard ad unit if the viewport height is ≥ 820px, binds input event listeners, and registers network handlers for `connect`, `error`, and `enterWorld`. Calls `checkForPartyInvitation()`.

#### `hide()`
```ts
function hide(): void
```
Overrides `UiComponent.hide()`. Clears the ad unit containers' HTML before hiding.

#### `onNameInputKeyUp()`
```ts
function onNameInputKeyUp(event: KeyboardEvent): void
```
Handles `keyup` on the name input. Triggers the play button click when Enter is pressed.

#### `onSubmitClick()`
```ts
function onSubmitClick(event: MouseEvent): void
```
Initiates the connection flow: saves the player name to `localStorage`, sets a 5-second connection timeout (shows an anti-virus error message on timeout), displays a loading spinner, sets the nickname and server ID options, and calls `network.connect()`.

#### `onCanvasInputChange()`
```ts
function onCanvasInputChange(event: Event): void
```
Handles the canvas checkbox change. Persists the `forceCanvas` preference to `localStorage` and reloads the page.

#### `onConnectionStart()`
```ts
function onConnectionStart(): void
```
Handles the network connect event. Sends the `enterWorld` request with the player's display name.

#### `onConnectionError()`
```ts
function onConnectionError(): void
```
Handles the network error event. Resets the connecting state, clears the timeout, restores the play button text, and displays an error message.

#### `onEnterWorld()`
```ts
function onEnterWorld(data: { allowed: boolean }): void
```
Handles the enter world response. If `allowed`, hides the intro screen. If not allowed, shows a "server full" error.

#### `onFetchLeaderboardData()`
```ts
function onFetchLeaderboardData(): void
```
Fetches leaderboard data from `/leaderboard/data` via `browser-request`, filtering by category (`score`/`wave`) and time frame. Sanitizes player names with `xss` and renders the results into the leaderboard parties container.

#### `checkForPartyInvitation()`
```ts
function checkForPartyInvitation(): void
```
Parses the URL hash for a party invitation in the format `#/<serverId>/<shareKey>`. If found, auto-selects the server, disables the server dropdown, stores the share key, and registers an enter world handler that sends a `JoinPartyByShareKey` RPC.
