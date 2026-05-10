
# `UiShopItem`

The `UiShopItem` class is the base shop item component used for Weapon, Armor, and Utility items. It displays the item's name, current/next tier stats, cost, and handles purchase clicks. It serves as the parent class for `UiShopHatItem` and `UiShopPetItem`.

## `UiShopItem` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `.hud-shop-item` anchor element with `data-item` and `data-tier` attributes. |
| `itemId` | `string` | The schema ID of this shop item. |
| `itemTier` | `number` | The player's current tier for this item. Defaults to `1`. |
| `nextTier` | `number` | The next tier to purchase/upgrade to. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, itemId: string): void
```
Creates the shop item element, sets `data-type`, binds the click handler, and listens for `itemSchemaUpdate` and `inventoryUpdate` events.

#### `setOnCooldown()`
```ts
function setOnCooldown(cooldownInMs: number): void
```
Adds the `is-on-cooldown` CSS class and removes it after `cooldownInMs` milliseconds.

#### `update()`
```ts
function update(): void
```
Recalculates item display: determines current/next tier, max tier state, upgrade availability, computes stat comparisons (Damage, Harvest, Range, Attack Speed, Health, Recharge Delay), formats gold/token costs, and re-renders the component HTML. Toggles `is-disabled` when upgrade is unavailable.

#### `onClick()`
```ts
function onClick(event: MouseEvent): void
```
Emits `purchaseItem` with `itemId` and `nextTier` if not disabled or on cooldown.

#### `onItemSchemaUpdate()`
```ts
function onItemSchemaUpdate(): void
```
Calls `update()`.

#### `onInventoryUpdate()`
```ts
function onInventoryUpdate(): void
```
Calls `update()`.
