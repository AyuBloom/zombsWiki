# Engine Overview

The game client exposes a global `game` variable that can be accessed through the console or via Tampermonkey / Greasemonkey user scripts. From now on, for convenience, Tampermonkey / Greasemonkey user scripts will simply be referred to as scripts.

![Game variable](/asset/engine/overview/game.png)

There are 3 types of things inside the `game` object:
- Game components: All of the components that make the client work.
- Game component classes: Keys that ends with `Type` are of this type, which can be used to create more instances of any game component.
- Miscellaneous: Includes server data, event listeners, ...

## Main Components

### `ui`
Class: `Ui` <Badge type="tip" text="public" />
<!--@include: ./main/ui/ui.md{2,4}-->

### `world`
Class: `World` <Badge type="tip" text="public" />
<!--@include: ./main/world/world.md{2,4}-->

### `network`
Class: Game/`Network` <Badge type="danger" text="private" />
<!--@include: ./main/network.md{2,4}-->

### `renderer`
Class: Game/`Renderer` <Badge type="danger" text="private" />
<!--@include: ./main/renderer/renderer.md{2,4}-->

### `inputManager`
Class: `InputManager` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputManager.md{2,4}-->

### `inputPacketCreator`
Class: `InputPacketCreator` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputPacketCreator.md{2,4}-->

### `inputPacketScheduler`
Class: `InputPacketScheduler` <Badge type="tip" text="public" />
<!--@include: ./main/input/inputPacketScheduler.md{2,4}-->

## Utility Components

### `assetManager`
Class: `AssetManager` <Badge type="tip" text="public" />
<!--@include: ./utils/assetManager.md{2,4}-->

### `debug`
Class: `Debug` <Badge type="tip" text="public" />
<!--@include: ./utils/debug.md{2,4}-->

### `metrics`
Class: `Metrics` <Badge type="tip" text="public" />
<!--@include: ./utils/metrics.md{2,4}-->

### `platform`
Class: `Platform` <Badge type="tip" text="public" />
<!--@include: ./utils/platform.md{2,4}-->

### `util`
Class: `util` <Badge type="danger" text="private" /> (not accessible)
<!--@include: ./utils/util.md{2,4}-->

## Schemas

See [Schemas](/engine/schema.md) for every schema documentation.

## Data Interfaces

See [Data Interfaces](/engine/data_interfaces.md) for special data interfaces used in the engine.