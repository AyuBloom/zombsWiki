---
title: UiSpellOverlay - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiSpellOverlay - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiSpellOverlay class manages the spell casting preview. When a spell
        is being cast, it renders a SpellIndicatorModel (circular range
        indicator) that follows the mouse cursor, and handles the actual spell
        casting via RPC.
  - - meta
    - property: 'og:description'
      content: >-
        The UiSpellOverlay class manages the spell casting preview. When a spell
        is being cast, it renders a SpellIndicatorModel (circular range
        indicator) that follows the mouse cursor, and handles the actual spell
        casting via RPC.
---

# `UiSpellOverlay`

The `UiSpellOverlay` class manages the spell casting preview. When a spell is being cast, it renders a `SpellIndicatorModel` (circular range indicator) that follows the mouse cursor, and handles the actual spell casting via RPC.

## `UiSpellOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `spellId` | `string \| null` | The ID of the spell currently being cast, or `null`. |
| `spellIndicatorModel` | `SpellIndicatorModel \| null` | The circular range indicator entity. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the spell overlay and registers a `cameraUpdate` listener.

#### `isActive()`
```ts
function isActive(): boolean
```
Returns `true` if a spell is currently being cast.

#### `getSpellId()`
```ts
function getSpellId(): string | null
```
Returns the ID of the spell being cast.

#### `update()`
```ts
function update(): void
```
Repositions the spell indicator to follow the mouse cursor (screen → world → UI coordinates).

#### `startCasting()`
```ts
function startCasting(spellId: string): void
```
Begins the casting flow: cancels any existing cast, loads the spell schema, creates a `SpellIndicatorModel` with the spell's range radius, adds it to the renderer UI layer, and calls `update()`.

#### `castSpell()`
```ts
function castSpell(): boolean
```
Sends a `CastSpell` RPC with the spell ID, world-space mouse position, and tier 1. Calls `cancelCasting()` and returns `true` on success. Returns `false` if no local player exists.

#### `cancelCasting()`
```ts
function cancelCasting(): void
```
Removes the spell indicator from the renderer and resets internal state.

#### `onCameraUpdate()`
```ts
function onCameraUpdate(): void
```
Calls `update()`.
