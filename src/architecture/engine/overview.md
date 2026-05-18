---
title: Engine Overview - zombs.io Wiki
---
# Engine Overview

::: tip Quick Navigation
- **[Main Components](#main-components)** — ui, world, network, renderer, input
- **[Utility Components](#utility-components)** — assetManager, debug, metrics, platform, util
- **[Schemas](#schemas)** · **[Data Interfaces](#data-interfaces)**
- **[UI Styles](/architecture/engine/main/ui/styles)** — shared CSS primitives (buttons, tooltips, animations, colors)
:::

## `game`

The game client exposes a global `game` variable that can be accessed through the console or via Tampermonkey / Greasemonkey user scripts. From now on, for convenience, Tampermonkey / Greasemonkey user scripts will simply be referred to as scripts.

![Game variable](/asset/architecture/engine/overview/game.png)

There are 3 types of things inside the `game` object:
- Game components: All of the components that make the client work.
- Game component classes: Keys that ends with `Type` are of this type, which can be used to create more instances of any game component.
- Miscellaneous: Includes server data, event listeners, ...

## Main Components

### `ui`
Class: `Ui` <Badge type="tip" text="public" />
<!--@include: ./main/ui/ui.md{21,23}-->

> See also: [UI Styles](/architecture/engine/main/ui/styles) for the shared CSS design system (buttons, tooltips, layout grid, state classes, and asset selectors).

### `world`
Class: `World` <Badge type="tip" text="public" />
<!--@include: ./main/world/world.md{23,25}-->

### `network`
Class: Game/`Network` <Badge type="danger" text="private" />
<!--@include: ./main/network/network.md{21,23}-->

> See also: [_MakeBlendField](/architecture/engine/main/network/mbf/overview) for the anti-bot mechanism.

### `renderer`
Class: Game/`Renderer` <Badge type="danger" text="private" />
<!--@include: ./main/renderer/renderer.md{21,23}-->

### Input

#### `inputManager`
Class: `InputManager` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputManager.md{25,27}-->

#### `inputPacketCreator`
Class: `InputPacketCreator` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputPacketCreator.md{23,25}-->

#### `inputPacketScheduler`
Class: `InputPacketScheduler` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputPacketScheduler.md{25,27}-->

## Utility Components

### `assetManager`
Class: `AssetManager` <Badge type="tip" text="public" />
<!--@include: ./utils/assetManager.md{19,21}-->

### `debug`
Class: `Debug` <Badge type="tip" text="public" />
<!--@include: ./utils/debug.md{23,25}-->

### `metrics`
Class: `Metrics` <Badge type="tip" text="public" />
<!--@include: ./utils/metrics.md{21,23}-->

### `platform`
Class: `Platform` <Badge type="tip" text="public" />
<!--@include: ./utils/platform.md{15,17}-->

### `util`
Class: `util` <Badge type="danger" text="private" /> (not accessible)
<!--@include: ./utils/util.md{19,21}-->

## Schemas

See [Schemas](/architecture/engine/schema) for every schema documentation.

## Data Interfaces

See [Data Interfaces](/architecture/engine/data_interfaces) for special data interfaces used in the engine.
