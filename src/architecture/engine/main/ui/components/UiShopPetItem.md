
# `UiShopPetItem`

The `UiShopPetItem` class extends `UiShopItem` to handle pet-type shop items. It adds pet-specific features: equip/revive/evolve actions, XP/level tracking, evolution level requirements, social media unlock flows (Twitter share + Facebook share for `PetCARL`, YouTube subscribe for `PetMiner`), and a "Coming Soon" placeholder.

## `UiShopPetItem` <Badge type="danger" text="private" />

Extends `UiShopItem`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `inTimeoutAction` | `boolean` | Whether a revive/evolve timeout animation is in progress. |
| `facebookAppId` | `string` | Facebook app ID for share dialogs. `'413139982405300'`. |
| `health` | `number` | The pet's current health. |
| `experience` | `number` | The pet's current total experience. |
| `level` | `number` | The pet's current level (`Math.floor(experience / 100)`). |

Inherits all other properties from `UiShopItem`.

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui, itemId: string): void
```
Calls the parent constructor and registers listeners for `equippedPet` and `playerPetTickUpdate`.

#### `update()`
```ts
function update(): void
```
Overrides parent. Handles rendering states:
1. **Owned**: Shows level, XP bar, Equip/Equipped button, Evolve button (disabled until target level is reached). Shows Revive button if the pet is dead and equipped. Evolution levels: `[8, 16, 24, 32, 48, 64, 96]`.
2. **Social unlock** (`PetCARL`): Shows Tweet + Share buttons.
3. **Social unlock** (`PetMiner`): Shows YouTube Subscribe button.
4. **Coming Soon** (`PetComingSoon`): Disabled placeholder.
5. **Default**: Shows name, description, and cost.

#### `onClick()`
```ts
function onClick(event: MouseEvent): void
```
Overrides parent. Emits `purchaseItem` only if not disabled, on cooldown, owned, or social.

#### `onEquipPet()`
```ts
function onEquipPet(event: MouseEvent): void
```
Emits `equipItem` with the pet ID and current tier.

#### `onRevivePet()`
```ts
function onRevivePet(event: MouseEvent): void
```
Shows a "Reviving..." loading state for 3 seconds, then emits `purchaseItem` and `equipItem` for `PetRevive`.

#### `onEvolvePet()`
```ts
function onEvolvePet(event: MouseEvent): void
```
Shows an "Evolving..." loading state for 3 seconds, then emits `purchaseItem` for the next tier.

#### `onTwitterShare()`
```ts
function onTwitterShare(event: MouseEvent): void
```
Opens a Twitter tweet intent popup and emits `twitterShare`.

#### `onFacebookShare()`
```ts
function onFacebookShare(event: MouseEvent): void
```
Opens a Facebook share dialog and emits `facebookShare`.

#### `onYouTubeSubscribe()`
```ts
function onYouTubeSubscribe(event: MouseEvent): void
```
Disables the YouTube button and emits `youTubeSubscribe`.

#### `onPetTickUpdate()`
```ts
function onPetTickUpdate(tick: { model: string, health: number, experience: number }): void
```
Updates the pet's health, experience, and level when a matching pet tick is received, then calls `update()`.
