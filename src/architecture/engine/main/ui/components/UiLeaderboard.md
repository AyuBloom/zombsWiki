
# `UiLeaderboard`

The `UiLeaderboard` class renders the in-game leaderboard showing player rankings with their name, score, and wave. It sanitizes display names with `xss` and `grawlix` (with `grawlix-racism` plugin) and highlights the local player's entry.

## `UiLeaderboard` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-leaderboard` DOM element. Inherited from `UiComponent`. |
| `playersElem` | `HTMLElement` | The `.hud-leaderboard-players` container for player rows. |
| `playerElems` | `HTMLElement[]` | Array of player row DOM elements. |
| `playerRankElems` | `HTMLElement[]` | Array of `.player-rank` span elements. |
| `playerNameElems` | `HTMLElement[]` | Array of `.player-name` strong elements. |
| `playerScoreElems` | `HTMLElement[]` | Array of `.player-score` span elements. |
| `playerWaveElems` | `HTMLElement[]` | Array of `.player-wave` span elements. |
| `playerNames` | `Record<number, string>` | Cache of sanitized player names keyed by UID. |
| `leaderboardData` | `Array` | The latest leaderboard data array from the `Leaderboard` RPC. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the leaderboard with a header row (Rank, Name, Score, Wave) and empty player container. Registers an RPC handler for `Leaderboard` and configures `grawlix` with the `grawlix-racism` plugin.

#### `update()`
```ts
function update(): void
```
Iterates over `leaderboardData` entries. For each player, lazily creates DOM elements if they don't exist yet, highlights the local player with the `is-active` class, and updates rank (`#N`), sanitized name, formatted score, and wave values. Hides excess elements if the data shrinks.

#### `onLeaderboardData()`
```ts
function onLeaderboardData(response: Array<{ uid: number, name: string, rank: number, score: number, wave: number }>): void
```
Handles the `Leaderboard` RPC. Stores the data and triggers an `update()`.
