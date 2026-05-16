---
title: UiShopHatItem - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiShopHatItem class extends UiShopItem to handle hat-type shop
        items. It adds equip functionality, social media unlock flows (Twitter
        follow + Facebook like for HatHorns), and a "Coming Soon" placeholder
        state.
  - - meta
    - name: 'og:description'
      content: >-
        The UiShopHatItem class extends UiShopItem to handle hat-type shop
        items. It adds equip functionality, social media unlock flows (Twitter
        follow + Facebook like for HatHorns), and a "Coming Soon" placeholder
        state.
---

# `UiShopHatItem`

The `UiShopHatItem` class extends `UiShopItem` to handle hat-type shop items. It adds equip functionality, social media unlock flows (Twitter follow + Facebook like for `HatHorns`), and a "Coming Soon" placeholder state.

## `UiShopHatItem` <Badge type="danger" text="private" />

Extends `UiShopItem`.

### Properties

Inherits all properties from `UiShopItem`.

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, itemId: string): void
```
Calls the parent constructor and registers a listener for the `equippedHat` event to trigger updates.

#### `update()`
```ts
function update(): void
```
Overrides the parent `update()`. Handles three rendering states:
1. **Owned**: Shows the hat name and an Equip/Equipped button.
2. **Social unlock** (`HatHorns`): Shows Twitter Follow and Facebook Like buttons, checking completion states via `MenuShop`.
3. **Coming Soon** (`HatComingSoon`): Shows a disabled placeholder with the schema description.
4. **Default**: Shows name, "Hat" tier label, and gold/token cost.

#### `onClick()`
```ts
function onClick(event: MouseEvent): void
```
Overrides parent. Emits `purchaseItem` only if not disabled, on cooldown, owned, or in social-unlock state.

#### `onEquipItem()`
```ts
function onEquipItem(event: MouseEvent): void
```
Emits `equipItem` with the item ID and current tier.

#### `onTwitterFollow()`
```ts
function onTwitterFollow(event: MouseEvent): void
```
Disables the Twitter button and emits the `twitterFollow` event.

#### `onFacebookLike()`
```ts
function onFacebookLike(event: MouseEvent): void
```
Disables the Facebook button and emits the `facebookLike` event.
