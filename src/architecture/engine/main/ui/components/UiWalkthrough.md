
# `UiWalkthrough`

The `UiWalkthrough` class manages the new-player tutorial walkthrough. It guides players through 4 sequential steps using hint popups, tracking completion and persisting progress via `localStorage`.

## `UiWalkthrough` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `hasCompleted` | `Record<number, boolean>` | Map of step numbers to their completion status. |
| `stepPopupIds` | `Record<number, number>` | Map of step numbers to their active popup IDs. |
| `currentStep` | `number` | The currently active step number. Starts at `1`. |
| `inWalkthrough` | `boolean` | Whether the walkthrough is currently active. |
| `steps` | `Record<string, { message: string, icon: string }>` | The four tutorial steps with their messages and icon paths. |

### Walkthrough Steps

| Step | Message | Icon |
| :--- | :--- | :--- |
| 1 | Gather 10 wood and stone using WASD + Left Click. | `entities-tree.svg` |
| 2 | Place your Gold Stash — zombies will spawn at night. | `entities-gold-stash.svg` |
| 3 | Build an Arrow Tower from the toolbar. | `entities-arrow-tower.svg` |
| 4 | Build a Gold Mine to generate gold passively. | `entities-gold-mine.svg` |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the walkthrough with step definitions and registers the `enterWorld` network handler.

#### `restart()`
```ts
function restart(): void
```
Clears `localStorage` completion flag, resets to step 1, sets `inWalkthrough` to `true`, and shows the first step's hint popup (30-second timeout).

#### `markStepAsCompleted()`
```ts
function markStepAsCompleted(step: number): void
```
Marks a step as completed. If it's the current step, removes its popup and advances to the next uncompleted step (showing its hint). If all steps are completed, sets `walkthroughCompleted` in `localStorage`.

#### `onEnterWorld()`
```ts
function onEnterWorld(data: { allowed: boolean }): void
```
Handles the enter world response. If allowed and `localStorage` doesn't have `walkthroughCompleted` set, calls `restart()` to begin the tutorial.
