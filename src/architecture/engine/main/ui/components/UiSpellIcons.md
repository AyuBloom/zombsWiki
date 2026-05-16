---
title: UiSpellIcons - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiSpellIcons - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiSpellIcons class renders the spell/utility icon bar containing the
        "Heal Towers" spell and the "Timeout" utility item. It handles casting
        spells, buying the Pause item, animated cooldown overlays, and tooltip
        display with resource costs.
  - - meta
    - property: 'og:description'
      content: >-
        The UiSpellIcons class renders the spell/utility icon bar containing the
        "Heal Towers" spell and the "Timeout" utility item. It handles casting
        spells, buying the Pause item, animated cooldown overlays, and tooltip
        display with resource costs.
---

# `UiSpellIcons`

The `UiSpellIcons` class renders the spell/utility icon bar containing the "Heal Towers" spell and the "Timeout" utility item. It handles casting spells, buying the Pause item, animated cooldown overlays, and tooltip display with resource costs.

## `UiSpellIcons` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-spell-icons` DOM element. Inherited from `UiComponent`. |
| `iconElems` | `Record<string, HTMLElement>` | Map of spell/item type strings to their `.hud-spell-icon` elements. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes spell icon elements for `HealTowersSpell` and `TimeoutItem`, binds click handlers and `UiTooltip` instances (anchored right, showing resource costs), and registers listeners for `wavePaused`, `inventoryUpdate`, `spellSchemaUpdate` events and the `CastSpellResponse` RPC.

#### `onIconClick()`
```ts
function onIconClick(type: string): (event: MouseEvent) => void
```
Returns a click handler that calls `useHealSpell()` or `useTimeoutItem()` based on type. No-op if disabled or on cooldown.

#### `useHealSpell()`
```ts
function useHealSpell(): void
```
Cancels all active overlays and starts casting via `SpellOverlay.startCasting('HealTowersSpell')`.

#### `useTimeoutItem()`
```ts
function useTimeoutItem(): void
```
Sends a `BuyItem` RPC for the `Pause` item.

#### `onWavePaused()`
```ts
function onWavePaused(): void
```
Starts the cooldown animation on the `TimeoutItem` icon using the Pause schema's `purchaseCooldown`.

#### `onInventoryUpdate()`
```ts
function onInventoryUpdate(): void
```
Toggles `is-disabled` on the `TimeoutItem` icon based on whether the `Pause` item is in inventory.

#### `onSpellSchemaUpdate()`
```ts
function onSpellSchemaUpdate(): void
```
Enables spell icons that have `cooldownTiers` defined in their schema.

#### `onCastSpellResponse()`
```ts
function onCastSpellResponse(response: { spell: string, cooldown: number, cooldownStartTick: number }): void
```
Handles the `CastSpellResponse` RPC. Calculates the start timestamp adjusted for tick lag and starts the cooldown animation.

#### `startCooldownForIcon()`
```ts
function startCooldownForIcon(type: string, duration: number, startTimestamp?: number | null): void
```
Animates a circular cooldown overlay using CSS `linear-gradient` rotation on the left/right cooldown half-elements. Uses `requestAnimationFrame` for smooth animation over the specified duration.
