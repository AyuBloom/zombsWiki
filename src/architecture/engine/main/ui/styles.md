---
title: UI Styles - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The game's visual presentation is defined in a single app.css file
        (~3950 lines). Rather than a CSS framework, it uses a flat, hand-written
        stylesheet with consistent conventions. This page documents the shared
        CSS primitives that are reused across multiple UI components.
  - - meta
    - name: 'og:description'
      content: >-
        The game's visual presentation is defined in a single app.css file
        (~3950 lines). Rather than a CSS framework, it uses a flat, hand-written
        stylesheet with consistent conventions. This page documents the shared
        CSS primitives that are reused across multiple UI components.
---
# UI Styles

The game's visual presentation is defined in a single `app.css` file (~3950 lines). Rather than a CSS framework, it uses a flat, hand-written stylesheet with consistent conventions. This page documents the shared CSS primitives that are reused across multiple UI components.

## Global Defaults

| Property | Value |
| :--- | :--- |
| Font Family | `'Open Sans', sans-serif` |
| Heading Font | `'Hammersmith One', sans-serif` |
| Background | `#111` |
| Box Sizing | `border-box` (all elements) |
| User Select | Disabled globally |

## Layouts

### HUD Layout

The `.hud` element is a fixed full-screen container that positions all in-game HUD components using a **9-region grid** layout. Each region is absolutely positioned with `20px` inset from its respective edge.

| Region | Class | Position | Notes |
| :--- | :--- | :--- | :--- |
| Top-Left | `.hud-top-left` | `top: 20px; left: 20px` | Map, Day/Night Ticker |
| Top-Center | `.hud-top-center` | `top: 20px; left: 50%` | Centered, `z-index: 10` |
| Top-Right | `.hud-top-right` | `top: 20px; right: 20px` | Leaderboard |
| Center-Left | `.hud-center-left` | `left: 20px; top: 50%` | Spell Icons, `z-index: 10` |
| Center-Right | `.hud-center-right` | `right: 20px; top: 50%` | Menu Icons, `z-index: 10` |
| Bottom-Left | `.hud-bottom-left` | `bottom: 20px; left: 20px` | Chat, `flex-direction: column-reverse` |
| Bottom-Center | `.hud-bottom-center` | `bottom: 20px; left: 50%` | Toolbar, `z-index: 10` |
| Bottom-Right | `.hud-bottom-right` | `bottom: 20px; right: 20px` | Buff Bar, `flex-direction: column-reverse` |

::: tip
The bottom-left and bottom-right regions use `flex-direction: column-reverse`, meaning new children stack upward from the bottom.
:::

### Intro Layout

The intro / main menu screen (`.hud-intro`) uses a separate layout system from the in-game HUD. It is a fixed full-screen overlay (`z-index: 30`) with its own region structure. See [`UiIntro`](/architecture/engine/main/ui/components/UiIntro) for the component logic.

The center content is placed inside `.hud-intro-wrapper` (a flex-centered column) containing the title, the `.hud-intro-main` 3-column float layout (ad, form, guide — each 300px wide), and a conditional leaderboard ad.

| Region | Class | Position | Content |
| :--- | :--- | :--- | :--- |
| Center | `.hud-intro-wrapper` | Flex-centered (full height) | Title, main panels, leaderboard ad |
| Top-Left | `.hud-intro-corner-top-left` | `top: 20px; left: 20px` | Featured YouTuber link |
| Top-Right | `.hud-intro-corner-top-right` | `top: 20px; right: 20px` | Global leaderboard with category/time dropdowns |
| Bottom-Left | `.hud-intro-corner-bottom-left` | `bottom: 20px; left: 20px` | Social media icon buttons |
| Bottom-Right | `.hud-intro-corner-bottom-right` | `bottom: 20px; right: 20px` | "More Games" link |
| Footer | `.hud-intro-footer` | `bottom: 20px; left: 300px; right: 300px` | Links separated by `·` delimiters |

::: info
The bottom-left corner and social button styles are shared with the `UiRespawn` screen.
:::

## Common Components

### Buttons

The `.btn` class provides the base button styling. Color variants are applied as modifier classes.

#### Base `.btn`

```css
.btn {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background: #444;
    color: #eee;
    border: 0;
    font-size: 14px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transition: all 0.15s ease-in-out;
}
```

#### Color Variants

| Class | Background | Hover | Usage |
| :--- | :--- | :--- | :--- |
| `.btn` | `#444` | `#555` | Default / generic actions |
| `.btn-green` | `#47950d` | `#64b820` | Play, Upgrade, Equip |
| `.btn-red` | `#b3353c` | `#cb575b` | Sell, Kick, Delete |
| `.btn-blue` | `#1d8dee` | `#4fa7ee` | General actions |
| `.btn-purple` | `#7237e4` | `#8259e4` | Deposit Harvester |
| `.btn-gold` | `#bf6509` | `#bf7b3c` | Collect Harvester |

#### Social Buttons

Social buttons use the same `.btn` base but are styled with brand colors and icon backgrounds.

| Class | Background | Hover | Icon |
| :--- | :--- | :--- | :--- |
| `.btn-twitter` | `#1b95e0` | `#0c7abf` | `twitter-icon.png` |
| `.btn-facebook` | `#4267b2` | `#365899` | `facebook-icon.png` |
| `.btn-google` | `#dd4b39` | `#ba3f31` | — |
| `.btn-discord` | `#7289da` | `#5a6db0` | `discord-icon.png` |
| `.btn-youtube` | `#e52d27` | `#ba2521` | `youtube-icon-btn.png` |

::: info
In the social sections of `UiIntro` and `UiRespawn`, social buttons are rendered as `40×40` icon-only squares with the icon as a `background-image`.
:::

### Loading Spinner

The `.hud-loading` class creates a CSS-only spinning loader used in `UiReconnect`, `UiIntro` (leaderboard), and `UiMenuShop` (pet actions).

```css
.hud-loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-top: 0.4em solid rgba(255, 255, 255, 0.2);
    border-right: 0.4em solid rgba(255, 255, 255, 0.2);
    border-bottom: 0.4em solid rgba(255, 255, 255, 0.2);
    border-left: 0.4em solid #eee;
    border-radius: 50%;
    animation: hud-loading 1.1s linear infinite;
}
```

The `UiReconnect` component overrides the size to `64×64` with a thicker `0.6em` border for a larger loading indicator.

### Tooltip System

The `.hud-tooltip` class provides shared tooltip styling used by `UiTooltip`, `UiBuildingOverlay`, `UiToolbar`, and `UiSpellIcons`.

#### Base Tooltip

```css
.hud-tooltip {
    position: absolute;
    top: -1000px;         /* hidden offscreen by default */
    left: -1000px;
    max-width: 360px;
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 4px;
}
```

#### Directional Arrows

Tooltips use directional modifier classes to add a CSS arrow pointing toward the anchor element.

| Class | Arrow Position | Description |
| :--- | :--- | :--- |
| `.hud-tooltip-top` | Bottom edge | Arrow points **down** (tooltip is above anchor) |
| `.hud-tooltip-bottom` | Top edge | Arrow points **up** (tooltip is below anchor) |
| `.hud-tooltip-left` | Right edge | Arrow points **right** (tooltip is left of anchor) |
| `.hud-tooltip-right` | Left edge | Arrow points **left** (tooltip is right of anchor) |

All arrows are `6px` CSS border triangles colored `rgba(0, 0, 0, 0.4)` to match the tooltip background.

#### Tooltip Variants

| Class | Used by | Purpose |
| :--- | :--- | :--- |
| `.hud-tooltip-building` | `UiBuildingOverlay` | Building info panel (340px wide) |
| `.hud-tooltip-spell-icon` | `UiSpellIcons` | Spell cost/description tooltip |
| `.hud-tooltip-party` | `UiPartyIcons` | Party member actions (kick, allow sell) |
| `.hud-tooltip-toolbar` | `UiToolbar` | Building/item tooltips with built count |

## State Classes

These CSS classes are toggled by JavaScript to control visual state across multiple components.

| Class | Effect | Used by |
| :--- | :--- | :--- |
| `is-active` | Highlights selected/current element | `UiLeaderboard`, `UiMenuParty` tabs, `UiMenuShop` tabs |
| `is-disabled` | Reduces `opacity` to `0.4`, sets `cursor: not-allowed` | `UiToolbarBuilding`, `UiSpellIcons`, `UiBuildingOverlay`, `UiMenuParty` |
| `is-focused` | Shows background on chat container, reveals input | `UiChat` |
| `is-on-cooldown` | Shows cooldown overlay, blocks interaction | `UiSpellIcons`, `UiShopItem` |
| `is-empty` | Hides content, reduces opacity, disables pointer events | `UiPartyIcons`, `UiToolbarItem` |
| `is-visible` | Triggers show animation | `UiPopupOverlay` |
| `is-private` | Switches party visibility button to red | `UiMenuParty` |
| `has-error` | Adds red border to server select | `UiIntro` |
| `has-icon` | Adds left padding for popup icon | `UiPopupOverlay` |

## Keyframe Animations

| Animation | Duration | Used by | Effect |
| :--- | :--- | :--- | :--- |
| `hud-loading` | `1.1s` (infinite) | `.hud-loading` | 360° rotation spinner |
| `hud-pip-resource-gain` | `500ms` | `UiPipOverlay` | Float up 20px + fade out |
| `hud-pip-damage` | `500ms` | `UiPipOverlay` | Float up 20px + fade out (red text) |
| `hud-popup-message` | `500ms` | `UiPopupOverlay` | Expand height + fade in |
| `hud-popup-message-hide` | `500ms` | `UiPopupOverlay` | Collapse height + fade out |
| `hud-announcement-message` | `8000ms` | `UiAnnouncementOverlay` | Fade in, hold, drift up + fade out |

## Shared Color Tokens

The game uses a consistent (but not formally tokenized) color palette across the stylesheet:

### Player Colors

Used for minimap dots and party member icons.

| Player Index | Color | Hex |
| :--- | :--- | :--- |
| Player 0 | Purple | `#8473d4` |
| Player 1 | Yellow | `#d6ab35` |
| Player 2 | Green | `#76bd2f` |
| Player 3 | Orange | `#d67820` |

### UI Colors

| Purpose | Hex | Usage |
| :--- | :--- | :--- |
| Health bar | `#64a10a` | `UiHealthBar`, `UiBuildingOverlay` health |
| Shield bar | `#3da1d9` | `UiShieldBar` |
| Low resource | `#c9523c` | `.hud-resource-low` text, error messages |
| Damage text | `#f0958c` | `UiPipOverlay` damage pips |
| Chat name | `#a79aef` | Chat message sender highlight |
| Active player (leaderboard) | `#d8bf49` | `UiLeaderboard` self-highlight |
| Gold currency dot | `#fbb13b` | `UiMenuShop` gold indicator |
| Token currency dot | `#d44613` | `UiMenuShop` token indicator |
| XP bar | `#d6aa35` | `UiMenuShop` pet XP |
| Night overlay | `rgba(17, 8, 56, 0.4)` | `UiDayNightOverlay` |

## Asset Selectors

The CSS maps `data-building` and `data-item` attributes to SVG icon backgrounds using `::after` pseudo-elements. These are used by `UiToolbar`, `UiMenuShop`, `UiBuildingOverlay`, and `UiBuffBar`.

### Building Icons

| Selector | Asset Path |
| :--- | :--- |
| `[data-building=Wall]` | `/asset/image/ui/entities/entities-wall.svg` |
| `[data-building=Door]` | `/asset/image/ui/entities/entities-door.svg` |
| `[data-building=SlowTrap]` | `/asset/image/ui/entities/entities-slow-trap.svg` |
| `[data-building=ArrowTower]` | `/asset/image/ui/entities/entities-arrow-tower.svg` |
| `[data-building=CannonTower]` | `/asset/image/ui/entities/entities-cannon-tower.svg` |
| `[data-building=MeleeTower]` | `/asset/image/ui/entities/entities-melee-tower.svg` |
| `[data-building=BombTower]` | `/asset/image/ui/entities/entities-bomb-tower.svg` |
| `[data-building=MagicTower]` | `/asset/image/ui/entities/entities-mage-tower.svg` |
| `[data-building=GoldMine]` | `/asset/image/ui/entities/entities-gold-mine.svg` |
| `[data-building=Harvester]` | `/asset/image/ui/entities/entities-harvester.svg` |
| `[data-building=GoldStash]` | `/asset/image/ui/entities/entities-gold-stash.svg` |

### Item Icons

Items use a `[data-item=Name][data-tier='N']` pattern, where each tier maps to a unique SVG variant.

| Item | Tiers | Path Pattern |
| :--- | :--- | :--- |
| `Pickaxe` | 1–7 | `inventory-pickaxe-t{N}.svg` |
| `Spear` | 1–7 | `inventory-spear-t{N}.svg` |
| `Bow` | 1–7 | `inventory-bow-t{N}.svg` |
| `Bomb` | 1–7 | `inventory-bomb-t{N}.svg` |
| `ZombieShield` | 1–10 | `inventory-shield-t{N}.svg` |
| `PetCARL` | 1–8 | `inventory-pet-carl-t{N}.svg` |
| `PetMiner` | 1–8 | `inventory-pet-miner-t{N}.svg` |

### Single-Tier Items

| Selector | Asset Path |
| :--- | :--- |
| `[data-item=HatHorns]` | `inventory-hat-horns.svg` |
| `[data-item=HealthPotion]` | `inventory-health-potion.svg` |
| `[data-item=PetHealthPotion]` | `inventory-pet-health-potion.svg` |
| `[data-item=PetWhistle]` | `inventory-whistle.svg` |
| `[data-item=Pause]` | `inventory-timeout.svg` |
| `[data-item=Invulnerable]` | `inventory-invulnerable.svg` |

::: info
All item icon assets are located under `/asset/image/ui/inventory/` and all building icons under `/asset/image/ui/entities/`.
:::
