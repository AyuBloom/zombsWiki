---
title: UiMap - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiMap class renders a minimap showing the positions of party member
        players and player-owned buildings relative to the world dimensions.
  - - meta
    - name: 'og:description'
      content: >-
        The UiMap class renders a minimap showing the positions of party member
        players and player-owned buildings relative to the world dimensions.
---

# `UiMap`

The `UiMap` class renders a minimap showing the positions of party member players and player-owned buildings relative to the world dimensions.

## `UiMap` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-map` DOM element. Inherited from `UiComponent`. |
| `playerElems` | `Record<string, { index: number, marker: HTMLElement }>` | Map of player UIDs to their marker data (party index + DOM element). |
| `buildingElems` | `Record<string, HTMLElement>` | Map of building UIDs to their `.hud-map-building` DOM elements. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the minimap, registers a renderer tick callback for player position updates, and listens for `buildingsUpdate` and `partyMembersUpdated` events.

#### `update()`
```ts
function update(): void
```
Updates player marker positions every frame. For each tracked player, retrieves their network entity, converts world position to a percentage of the map dimensions, and sets the marker's `left`/`top` CSS. Hides markers for players whose entities no longer exist.

#### `onBuildingsUpdate()`
```ts
function onBuildingsUpdate(buildings: Record<string, { x: number, y: number }>): void
```
Synchronizes building markers with the current buildings data. Creates new `.hud-map-building` elements for new buildings (positioned as a percentage of world dimensions) and removes elements for buildings that no longer exist.

#### `onPartyMembersUpdate()`
```ts
function onPartyMembersUpdate(partyMembers: Array<{ playerUid: number }>): void
```
Synchronizes player markers with the current party members. Creates new `.hud-map-player` elements with `data-index` attributes for new members and removes markers for members who have left the party.
