---
title: UiMenuShop - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiMenuShop - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiMenuShop class manages the in-game shop menu. It renders
        purchasable items organized by tabs (Weapons, Armor, Hats, Pets,
        Utility), handles item purchases and equipment via RPCs, manages social
        media reward unlocks (Twitter, Facebook, YouTube), and displays in-shop
        advertisements.
  - - meta
    - property: 'og:description'
      content: >-
        The UiMenuShop class manages the in-game shop menu. It renders
        purchasable items organized by tabs (Weapons, Armor, Hats, Pets,
        Utility), handles item purchases and equipment via RPCs, manages social
        media reward unlocks (Twitter, Facebook, YouTube), and displays in-shop
        advertisements.
---

# `UiMenuShop`

The `UiMenuShop` class manages the in-game shop menu. It renders purchasable items organized by tabs (Weapons, Armor, Hats, Pets, Utility), handles item purchases and equipment via RPCs, manages social media reward unlocks (Twitter, Facebook, YouTube), and displays in-shop advertisements.

## `UiMenuShop` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-menu-shop` DOM element. Inherited from `UiComponent`. |
| `closeElem` | `HTMLElement` | The `.hud-menu-close` button. |
| `gridElem` | `HTMLElement` | The `.hud-shop-grid` container for shop item elements. |
| `adMedrecElem` | `HTMLElement` | The `.ad-unit-medrec-shop` ad container. |
| `adLeaderboardElem` | `HTMLElement` | The `.ad-unit-leaderboard-shop` ad container. |
| `tabElems` | `HTMLElement[]` | Array of `.hud-shop-tabs-link` tab elements. |
| `shopItems` | `Record<string, UiShopItem \| UiShopHatItem \| UiShopPetItem>` | Map of item IDs to their shop item component instances. |
| `medrecId` | `number` | Incrementing ID for ad medrec container uniqueness. Starts at `1000`. |
| `leaderboardId` | `number` | Incrementing ID for ad leaderboard container uniqueness. Starts at `1000`. |
| `activeType` | `string` | The currently selected tab type. Defaults to `'Weapon'`. |
| `twitterFollowed` | `boolean` | Whether the user has followed on Twitter. Persisted via `localStorage`. |
| `twitterShared` | `boolean` | Whether the user has shared on Twitter. Persisted via `localStorage`. |
| `facebookLiked` | `boolean` | Whether the user has liked on Facebook. Persisted via `localStorage`. |
| `facebookShared` | `boolean` | Whether the user has shared on Facebook. Persisted via `localStorage`. |
| `youTubeSubscribed` | `boolean` | Whether the user has subscribed on YouTube. Persisted via `localStorage`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the shop menu with tabs, creates `UiShopItem`, `UiShopHatItem`, or `UiShopPetItem` instances for each purchasable item in the schema, binds event listeners for purchase/equip/social actions, and registers for `itemConsumed`, `wavePaused`, `shouldEquipItem` events and the `enterWorld` network handler. Restores social link states from `localStorage`.

#### `show()`
```ts
function show(): void
```
Overrides `UiComponent.show()`. Creates fresh ad containers with unique IDs and initializes NitroAds units.

#### `hide()`
```ts
function hide(): void
```
Overrides `UiComponent.hide()`. Clears the ad container HTML.

#### `getTwitterFollowed()`
```ts
function getTwitterFollowed(): boolean
```
Returns the Twitter follow state.

#### `getTwitterShared()`
```ts
function getTwitterShared(): boolean
```
Returns the Twitter share state.

#### `getFacebookLiked()`
```ts
function getFacebookLiked(): boolean
```
Returns the Facebook like state.

#### `getFacebookShared()`
```ts
function getFacebookShared(): boolean
```
Returns the Facebook share state.

#### `getYouTubeSubscribed()`
```ts
function getYouTubeSubscribed(): boolean
```
Returns the YouTube subscribe state.

#### `update()`
```ts
function update(): void
```
Shows/hides shop items based on the currently active tab type.

#### `setTab()`
```ts
function setTab(type: string): void
```
Switches the active tab, updates `is-active` classes on tab elements, and calls `update()`.

#### `checkSocialLinks()`
```ts
function checkSocialLinks(): void
```
Checks social link completion states and auto-purchases reward items via `BuyItem` RPCs: `HatHorns` (requires Twitter follow + Facebook like), `PetCARL` (requires Twitter share + Facebook share), `PetMiner` (requires YouTube subscribe).

#### `onTabChange()`
```ts
function onTabChange(tabElem: HTMLElement): (event: MouseEvent) => void
```
Returns a click handler that reads `data-type` and calls `setTab()`.

#### `onItemConsumed()`
```ts
function onItemConsumed(itemName: string, itemTier: number): void
```
Handles the `itemConsumed` event. Sets a 2000ms cooldown on both `HealthPotion` and `PetHealthPotion` shop items when either is consumed.

#### `onWavePaused()`
```ts
function onWavePaused(): void
```
Handles the `wavePaused` event. Sets the `Pause` item's cooldown from its schema `purchaseCooldown`.

#### `onEnterWorld()`
```ts
function onEnterWorld(data: { allowed: boolean }): void
```
Handles the enter world response. If allowed, calls `checkSocialLinks()`.

#### `onShopItemPurchase()`
```ts
function onShopItemPurchase(itemId: string, itemTier: number): void
```
Sends a `BuyItem` RPC for the given item.

#### `onShopEquipItem()`
```ts
function onShopEquipItem(itemId: string, itemTier: number): void
```
Sends an `EquipItem` RPC and emits the `itemEquippedOrUsed` event on the `Ui` instance.

#### `onTwitterFollow()` / `onTwitterShare()` / `onFacebookLike()` / `onFacebookShare()` / `onYouTubeSubscribe()`
```ts
function onTwitterFollow(itemId: string): void
function onTwitterShare(itemId: string): void
function onFacebookLike(itemId: string): void
function onFacebookShare(itemId: string): void
function onYouTubeSubscribe(itemId: string): void
```
Each sets the corresponding social flag to `true`, persists it to `localStorage`, and calls `checkSocialLinks()`.
