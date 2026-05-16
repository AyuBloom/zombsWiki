---
title: UiPipOverlay - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiPipOverlay class renders floating "pip" indicators above entities
        — resource gain/loss numbers and damage numbers. Pips briefly appear at
        the entity's screen position and auto-remove after 500ms.
  - - meta
    - name: 'og:description'
      content: >-
        The UiPipOverlay class renders floating "pip" indicators above entities
        — resource gain/loss numbers and damage numbers. Pips briefly appear at
        the entity's screen position and auto-remove after 500ms.
---

# `UiPipOverlay`

The `UiPipOverlay` class renders floating "pip" indicators above entities — resource gain/loss numbers and damage numbers. Pips briefly appear at the entity's screen position and auto-remove after 500ms.

## `UiPipOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-pip-overlay` DOM element. Inherited from `UiComponent`. |
| `resourceGainElems` | `Record<number, HTMLElement>` | Map of IDs to active resource gain pip elements. |
| `damageElems` | `Record<number, HTMLElement>` | Map of IDs to active damage pip elements. |
| `lastPlayerTick` | `object` | Cached previous player tick resource values. |
| `lastPetWoodGain` | `number` | Last pet wood gain, to avoid double-counting. |
| `lastPetStoneGain` | `number` | Last pet stone gain, to avoid double-counting. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Registers listeners for `playerTickUpdate`, `playerDidDamage`, `petDidDamage`, `petGainedWood`, and `petGainedStone`.

#### `showResourceGain()`
```ts
function showResourceGain(uid: number, resourceName: string, value: number): void
```
Creates a floating pip showing the resource gain/loss above the entity. Filters values < 0.5. Auto-removes after 500ms.

#### `showDamage()`
```ts
function showDamage(uid: number, value: number): void
```
Creates a floating damage pip above the target entity. Auto-removes after 500ms.

#### `onPlayerTickUpdate()`
```ts
function onPlayerTickUpdate(playerTick: object): void
```
Computes resource deltas and shows pips. Excludes pet-attributed wood/stone gains.

#### `onPlayerDidDamage()`
```ts
function onPlayerDidDamage(playerTick: object): void
```
Shows a damage pip on the player's last damage target.

#### `onPetDidDamage()`
```ts
function onPetDidDamage(playerTick: object): void
```
Shows a damage pip on the pet's last damage target.

#### `onPetGainedWood()`
```ts
function onPetGainedWood(petTick: { uid: number, woodGain: number }): void
```
Records pet wood gain and shows a pip on the pet.

#### `onPetGainedStone()`
```ts
function onPetGainedStone(petTick: { uid: number, stoneGain: number }): void
```
Records pet stone gain and shows a pip on the pet.
