---
title: UiPartyIcons - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiPartyIcons - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiPartyIcons class renders the party member icons on the HUD — four
        slots showing the first two characters of each member's name, with
        leader highlighting. Clicking any icon opens the Party menu to the
        Members tab. Tooltips show the member's full (sanitized) name and role.
  - - meta
    - property: 'og:description'
      content: >-
        The UiPartyIcons class renders the party member icons on the HUD — four
        slots showing the first two characters of each member's name, with
        leader highlighting. Clicking any icon opens the Party menu to the
        Members tab. Tooltips show the member's full (sanitized) name and role.
---

# `UiPartyIcons`

The `UiPartyIcons` class renders the party member icons on the HUD — four slots showing the first two characters of each member's name, with leader highlighting. Clicking any icon opens the Party menu to the Members tab. Tooltips show the member's full (sanitized) name and role.

## `UiPartyIcons` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-party-icons` DOM element. Inherited from `UiComponent`. |
| `iconElems` | `HTMLElement[]` | Array of four `.hud-party-member` elements (indexed 0–3). |
| `partyMembers` | `Array` | The current party members data from the latest `partyMembersUpdated` event. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the four party member slots, attaches click handlers and `UiTooltip` instances (displaying sanitized name + role), registers a listener for `partyMembersUpdated`, and configures `grawlix` with the `grawlix-racism` plugin.

#### `update()`
```ts
function update(): void
```
Iterates the four icon slots. For occupied slots, removes `is-empty`, sets the icon text to the first two characters of the member's display name, and toggles `is-leader`. For empty slots, adds `is-empty` and clears content.

#### `onIconClick()`
```ts
function onIconClick(i: number): (event: MouseEvent) => void
```
Returns a click handler that cancels all active overlays, hides the shop menu, opens the party menu, and sets it to the "Members" tab.

#### `onPartyMembersUpdate()`
```ts
function onPartyMembersUpdate(partyMembers: Array): void
```
Stores the party members data and calls `update()`.
