---
title: ui - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: ui - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The ui component is the central manager for the game's HUD. It
        orchestrates multiple components, handles user input (keyboard/mouse)
        and synchronizes game state (inventory, buildings, parties).
  - - meta
    - property: 'og:description'
      content: >-
        The ui component is the central manager for the game's HUD. It
        orchestrates multiple components, handles user input (keyboard/mouse)
        and synchronizes game state (inventory, buildings, parties).
---
# `ui`

The `ui` component is the central manager for the game's HUD. It orchestrates multiple components, handles user input (keyboard/mouse) and synchronizes game state (inventory, buildings, parties).

## `Ui` <Badge type="tip" text="public" />

Bounded to `game` as `game.ui`. Extends `EventEmitter`, alias: `game.uiType`.

The `Ui` class initializes the HUD structure, appends it to the DOM, and manages the lifecycle of all HUD components. It also serves as the primary event bus for UI-related updates.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `components` | `object` | Map of registered UI components. |
| `buildings` | `object` | Currently placed buildings owned by the player/party. |
| `buildingSchema` | `object` | Data defining building costs, health, and limits. |
| `inventory` | `object` | Current items held by the player. |
| `itemSchema` | `object` | Data defining item costs and tiers. |
| `spellSchema` | `object` | Data defining spell costs and cooldowns. |
| `parties` | `object` | Information about all parties in the game. |
| `playerTick` | `object` | The most recent tick data for the local player. |
| `mousePosition` | `object` | Current `{x, y}` coordinates of the mouse. |
| `isMouseDown` | `boolean` | Whether the primary mouse button is currently held down. |

### Core Methods

#### `constructor()`
```ts
function constructor(): void
```
Initializes the UI system, sets up HUD containers, registers all components, and binds event listeners for input and network updates.

#### `addComponent()`
```ts
function addComponent(name: string, component: object, anchor: number = null): void
```
Registers a new UI component and appends its element to the specified `UiAnchor`.

#### `getComponent()`
```ts
function getComponent(name: string): object
```
Returns the component instance registered under the given name.

#### `createElement()`
```ts
function createElement(html: string): HTMLElement
```
Helper method to convert an HTML string into a DOM element.

### Getters & Setters

#### `getBuildings()`
```ts
function getBuildings(): object
```
Returns the map of placed buildings.

#### `getBuildingSchema()`
```ts
function getBuildingSchema(): object
```
Returns the building metadata schema.

#### `getInventory()`
```ts
function getInventory(): object
```
Returns the player's current inventory.

#### `getItemSchema()`
```ts
function getItemSchema(): object
```
Returns the item metadata schema.

#### `getSpellSchema()`
```ts
function getSpellSchema(): object
```
Returns the spell metadata schema.

#### `getParties()`
```ts
function getParties(): object
```
Returns the list of active parties.

#### `getPlayerTick()`
```ts
function getPlayerTick(): object
```
Returns the latest player state tick.

#### `setPlayerTick()`
```ts
function setPlayerTick(tick: object): void
```
Updates the local player state. Triggers logic for party changes, weapon/hat/pet updates, and invulnerability status. Emits `playerTickUpdate`.

#### `getPlayerWeaponName()`
```ts
function getPlayerWeaponName(): string
```
Returns the name of the equipped weapon.

#### `getPlayerHatName()`
```ts
function getPlayerHatName(): string
```
Returns the name of the equipped hat.

#### `getPlayerPetUid()`
```ts
function getPlayerPetUid(): number
```
Returns the UID of the equipped pet.

#### `getPlayerPetName()`
```ts
function getPlayerPetName(): string
```
Returns the name of the equipped pet.

#### `getPlayerPetTick()`
```ts
function getPlayerPetTick(): object
```
Returns the latest state tick for the pet.

#### `getPlayerPartyId()`
```ts
function getPlayerPartyId(): number
```
Returns the player's current party ID.

#### `getPlayerPartyMembers()`
```ts
function getPlayerPartyMembers(): Array
```
Returns the list of party members.

#### `getPlayerPartyShareKey()`
```ts
function getPlayerPartyShareKey(): string
```
Returns the party's private share key.

#### `getPlayerPartyLeader()`
```ts
function getPlayerPartyLeader(): boolean
```
Returns true if the player is the party leader.

#### `getPlayerPartyCanSell()`
```ts
function getPlayerPartyCanSell(): boolean
```
Returns true if the player has permission to sell buildings.

#### `getOption()`
```ts
function getOption(key: string): any
```
Retrieves a value from the UI options.

#### `setOption()`
```ts
function setOption(key: string, value: any): void
```
Sets a value in the UI options.

#### `getMousePosition()`
```ts
function getMousePosition(): object
```
Returns the current mouse `{x, y}` position.

#### `getIsMouseDown()`
```ts
function getIsMouseDown(): boolean
```
Returns true if the mouse button is pressed.

#### `getIsWavePaused()`
```ts
function getIsWavePaused(): boolean
```
Returns true if the game wave is currently paused.

### Utility Helpers

#### `useHealthPotion()`
```ts
function useHealthPotion(): void
```
Emits a request to equip/use a Health Potion if available in the inventory.

#### `cycleWeapon()`
```ts
function cycleWeapon(): void
```
Cycles through available weapons in the inventory (Pickaxe → Spear → Bow → Bomb).

### Input Handlers

These methods handle raw input events from the `InputManager`.

| Method | Description |
| :--- | :--- |
| `onMouseDown()` | Handles building placement if `PlacementOverlay` is active. |
| `onMouseUp()` | Handles building selection/watching and spell casting. |
| `onMouseRightUp()` | Cancels current placement, casting, or building watching. |
| `onMouseMoved()` | Updates mouse coordinates and notifies overlays. |
| `onMouseMovedWhileDown()` | Handles continuous building placement during drag. |
| `onKeyPress()` | Handles `Shift` key state for "Upgrade All" and continuous placement while moving. |
| `onKeyRelease()` | Maps keys to UI actions. |

::: details Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| **Esc** | Cancels current actions (placing, casting) and hides menus. |
| **Enter** | Starts chat typing. |
| **P** | Toggles the Party menu. |
| **B / O** | Toggles the Shop menu. |
| **R** | Cycles building direction. |
| **E** | Upgrades the currently watched building. |
| **T** | Sells the currently watched building. |
| **F** | Uses a Health Potion. |
| **Q** | Cycles weapons. |
| **Shift** | Toggles "Upgrade All" mode in the `BuildingOverlay`. |
| **0-9** | Shortcuts for placing buildings as defined in the building schema. |

:::

### Network & State Listeners

These methods synchronize the UI with network RPCs and game events.

| Method | Description |
| :--- | :--- |
| `onConnectionOpen()` / `onConnectionClose()` | Handles the visibility of the `Reconnect` overlay. |
| `onEnterWorld()` | Resets UI state (inventory, buildings, parties) when successfully joining a server. |
| `onServerShuttingDown()` | Displays a high-priority announcement overlay. |
| `onLocalBuildingUpdate()` | Synchronizes the local `buildings` list and updates building limits based on stash status. |
| `onLocalItemUpdate()` | Updates the local `inventory` object. |
| `onBuildingSchemaUpdate()` / `onItemSchemaUpdate()` / `onSpellSchemaUpdate()` | Parses JSON data from the server to populate the respective schemas (costs, health, damage, etc.). |
| `onPartyInfoUpdate()` | Updates party membership, leader status, and recalculates building limits based on party size. |
| `onPartyShareKeyUpdate()` | Updates the party's share key. |
| `onAddParty()` / `onRemoveParty()` / `onSetPartyList()` | Manages the global list of parties available in the world. |
| `onGenericFailure()` | Displays localized error hints (e.g., "Too far from stash", "Not enough resources") via the `PopupOverlay`. |
| `onPlayerDeath()` | Hides active menus and cancels overlays when the player dies. |
| `onItemEquippedOrUsed()` | Cancels building/spell overlays when a new weapon is equipped. |
| `onDragOver()` | Prevents default browser drag behavior. |
| `onBeforeUnload()` | Prompts the user for confirmation if they try to leave the page while alive in the world. |

## Enumerations

### `UiAnchor` <Badge type="danger" text="private" />

An enumeration used to position components within the HUD containers.

| Constant | Value |
| :--- | :--- |
| `TOP_LEFT` | `1` |
| `TOP_CENTER` | `2` |
| `TOP_RIGHT` | `3` |
| `BOTTOM_LEFT` | `4` |
| `BOTTOM_CENTER` | `5` |
| `BOTTOM_RIGHT` | `6` |
| `CENTER_LEFT` | `7` |
| `CENTER_RIGHT` | `8` |
