---
title: UiMenuParty - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiMenuParty - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiMenuParty class manages the party management menu. It displays the
        player's current party members, open parties available to join, party
        tag/name editing, share link, and visibility toggle. It handles party
        joining, kicking members, toggling sell permissions, and applicant
        approval flows.
  - - meta
    - property: 'og:description'
      content: >-
        The UiMenuParty class manages the party management menu. It displays the
        player's current party members, open parties available to join, party
        tag/name editing, share link, and visibility toggle. It handles party
        joining, kicking members, toggling sell permissions, and applicant
        approval flows.
---

# `UiMenuParty`

The `UiMenuParty` class manages the party management menu. It displays the player's current party members, open parties available to join, party tag/name editing, share link, and visibility toggle. It handles party joining, kicking members, toggling sell permissions, and applicant approval flows.

## `UiMenuParty` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-menu-party` DOM element. Inherited from `UiComponent`. |
| `closeElem` | `HTMLElement` | The `.hud-menu-close` button. |
| `serverElem` | `HTMLElement` | The `.hud-party-server` element showing the current server. |
| `gridElem` | `HTMLElement` | The `.hud-party-grid` container for open party listings. |
| `gridJoiningElem` | `HTMLElement` | The `.hud-party-joining` "Requesting to join..." status element. |
| `gridEmptyElem` | `HTMLElement` | The `.hud-party-empty` "No parties available" message element. |
| `membersElem` | `HTMLElement` | The `.hud-party-members` container for current party member listings. |
| `tagInputElem` | `HTMLInputElement` | The `.hud-party-tag` input for the party name (max 12 chars). |
| `shareInputElem` | `HTMLInputElement` | The `.hud-party-share` input showing the party share link. |
| `visibilityElem` | `HTMLElement` | The `.hud-party-visibility` toggle button (Private/Public). |
| `tabElems` | `HTMLElement[]` | Array of `.hud-party-tabs-link` tab elements (Members / Open). |
| `partyElems` | `Record<string, HTMLElement>` | Map of party IDs to their `.hud-party-link` DOM elements. |
| `memberElems` | `HTMLElement[]` | Array of current party member `.hud-member-link` DOM elements. |
| `activeType` | `string` | The currently active tab type (`'Members'` or `'Open'`). Defaults to `'Members'`. |
| `maxPartySize` | `number` | Maximum number of players per party. Defaults to `4`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the party menu, queries all sub-elements, binds tab/close/input/visibility event listeners, registers `Ui` event listeners for `partyJoined`, `partyMembersUpdated`, `partiesUpdated`, and network RPC handlers for `PartyApplicant`, `PartyApplicantDenied`, and `PartyApplicantExpired`. Configures `grawlix` with the `grawlix-racism` plugin.

#### `update()`
```ts
function update(): void
```
Synchronizes the menu UI: iterates all parties to create/update/remove party listing elements (with sanitized names, member counts, active/disabled/full states), rebuilds the members list with kick/can-sell controls (leader-only), updates the tag input, share link, and visibility button based on the player's party role.

#### `setTab()`
```ts
function setTab(type: string): void
```
Switches the active tab between `'Members'` and `'Open'`, toggling the `is-active` class on tab elements and showing/hiding the grid vs. members container.

#### `onTabChange()`
```ts
function onTabChange(tabElem: HTMLElement): (event: MouseEvent) => void
```
Returns a click handler that reads `data-type` and calls `setTab()`.

#### `onPartyJoined()`
```ts
function onPartyJoined(partyId: number): void
```
Handles the `partyJoined` event. Removes the "joining" disabled state and updates the UI.

#### `onPartyMembersUpdated()`
```ts
function onPartyMembersUpdated(partyId: number): void
```
Handles the `partyMembersUpdated` event. Calls `update()`.

#### `onPartiesUpdated()`
```ts
function onPartiesUpdated(): void
```
Handles the `partiesUpdated` event. Calls `update()`.

#### `onTagChange()`
```ts
function onTagChange(event: KeyboardEvent): void
```
Handles `keyup` on the tag input. Sends a `SetPartyName` RPC with the trimmed input value (falls back to the player's name if empty).

#### `onShareFocus()`
```ts
function onShareFocus(event: FocusEvent): void
```
Handles `focus` on the share input. Selects all text for easy copying.

#### `onVisibilityToggle()`
```ts
function onVisibilityToggle(event: MouseEvent): void
```
Toggles the party visibility between public and private by sending a `SetOpenParty` RPC. Only functional for party leaders.

#### `onPartyMemberKick()`
```ts
function onPartyMemberKick(i: number): (event: MouseEvent) => void
```
Returns a click handler that shows a confirmation popup and, if accepted, sends a `KickParty` RPC for the member at index `i`.

#### `onPartyMemberCanSellToggle()`
```ts
function onPartyMemberCanSellToggle(i: number): (event: MouseEvent) => void
```
Returns a click handler that sends a `SetPartyMemberCanSell` RPC toggling the sell permission for the member at index `i`.

#### `onPartyJoinRequestHandler()`
```ts
function onPartyJoinRequestHandler(partyId: number): (event: MouseEvent) => void
```
Returns a click handler for joining a party. If the player has no buildings, sends a `JoinParty` RPC immediately. Otherwise, shows a confirmation popup warning that the existing base will be destroyed.

#### `onPartyApplicant()`
```ts
function onPartyApplicant(response: { displayName: string, applicantUid: number }): void
```
Handles the `PartyApplicant` RPC. Shows a confirmation popup with the applicant's sanitized name and sends a `PartyApplicantDecide` RPC (accepted/denied) based on the user's choice.

#### `onPartyApplicantDenied()`
```ts
function onPartyApplicantDenied(response: object): void
```
Handles the `PartyApplicantDenied` RPC. Re-enables the party grid and hides the "joining" message.

#### `onPartyApplicantExpired()`
```ts
function onPartyApplicantExpired(response: object): void
```
Handles the `PartyApplicantExpired` RPC. Re-enables the party grid and hides the "joining" message.
