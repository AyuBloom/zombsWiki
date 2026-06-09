---
title: Entity and World State - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Entity and World State - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        How to read player data, entity positions, building health, and UIDs
        from the live world in a zombs.io script.
  - - meta
    - property: 'og:description'
      content: >-
        How to read player data, entity positions, building health, and UIDs
        from the live world in a zombs.io script.
---
# Entity and World State

State in zombs.io lives in two places: `game.ui` (your character, inventory, party, buildings) and `game.world.entities` (every visible entity on the map). Understanding both is essential for any script beyond a simple one-liner.

## Reading your own state — `game.ui.playerTick`

`game.ui.playerTick` is the per-tick snapshot of your own character. It is `null` when you are not in-world.

```js
const p = game.ui.playerTick;
if (!p) return; // not yet in-world

p.position   // { x, y } — your world coordinates
p.gold
p.wood
p.stone
p.token
p.health
p.maxHealth
p.wave       // current wave number
p.dead       // true if you are currently dead
```

Other useful `game.ui` reads:

```js
game.ui.getPlayerPartyId()          // your numeric party ID
game.ui.getPlayerPartyMembers()     // [{ playerUid, canSell, ... }, ...]
game.ui.getPlayerPartyShareKey()    // "XXXXXXXXXXXXXXXXXXXX"
game.ui.inventory                   // { Bow: { tier }, Pickaxe: { tier }, ... }
game.ui.buildings                   // { [uid]: { uid, type, tier, x, y, dead } }
```

## The entity map — `game.world.entities`

`game.world.entities` is a standard JavaScript `Map` containing every entity the client currently knows about. This includes players, zombies, buildings, resources (trees, stones), and neutral camps.

```js
game.world.entities           // Map
game.world.entities.size      // number of entities currently loaded
game.world.entities.get(uid)  // look up one entity by UID
game.world.entities.values()  // iterate all
```

### Entity shape

Each entry is an entity object with two tick snapshots:

```js
const entity = game.world.entities.get(uid);
entity.uid          // entity's unique ID (number)
entity.targetTick   // what the server says the entity is right now
entity.fromTick     // the previous tick state (used for interpolation)
```

`targetTick` is the one you read in scripts:

```js
const t = entity.targetTick;
t.uid
t.model         // string — see model names below
t.entityClass   // "GamePlayer" | "Building" | "Npc"
t.position      // { x, y }
t.dead          // boolean
t.partyId       // which party owns this entity
t.tier          // building/zombie tier (1–8 for buildings)
t.health
t.maxHealth
t.wood          // on Harvesters: stored wood
t.stone         // on Harvesters: stored stone
t.harvestMax    // on Harvesters: storage cap
```

### Model names

The `model` field identifies what kind of entity it is:

| `model` value | Entity |
| :--- | :--- |
| `"GamePlayer"` | Another player |
| `"Tree"` | Tree (resource) |
| `"Stone"` | Stone (resource) |
| `"GoldStash"` | Gold stash building |
| `"GoldMine"` | Gold mine building |
| `"Harvester"` | Harvester building |
| `"Wall"` | Wall |
| `"Door"` | Door |
| `"SlowTrap"` | Slow trap |
| `"ArrowTower"` | Arrow tower |
| `"CannonTower"` | Cannon tower |
| `"BombTower"` | Bomb tower |
| `"MagicTower"` | Mage tower |
| `"MeleeTower"` | Melee tower |
| `"NeutralTier1"` | Neutral camp demon |

Zombies use their own model strings and have `entityClass === "Npc"`.

## Common filtering patterns

### Find the nearest tree and stone

```js
const me = game.ui.playerTick?.position;
if (!me) return; // bail if not in-world yet

let nearestTree = null, nearestStone = null;
let treeDist = Infinity, stoneDist = Infinity;

for (const entity of game.world.entities.values()) {
  const t = entity.targetTick;
  if (!t?.position) continue; // skip entities without a known position

  const d = Math.hypot(t.position.x - me.x, t.position.y - me.y);

  // track the closest of each type independently
  if (t.model === "Tree"  && d < treeDist)  { treeDist  = d; nearestTree  = t; }
  if (t.model === "Stone" && d < stoneDist) { stoneDist = d; nearestStone = t; }
}
```

### Find all enemy players

```js
const myPartyId = game.ui.getPlayerPartyId(); // your party's numeric ID

const enemies = [];
for (const entity of game.world.entities.values()) {
  const t = entity.targetTick;
  if (!t) continue;
  // model "GamePlayer" covers all players; partyId check excludes your own party
  if (t.model === "GamePlayer" && t.partyId !== myPartyId && !t.dead)
    enemies.push(t);
}
```

### Find all zombies

```js
const zombies = [];
for (const entity of game.world.entities.values()) {
  const t = entity.targetTick;
  // all zombies and neutral demons share entityClass "Npc"
  if (t?.entityClass === "Npc" && !t.dead)
    zombies.push(t);
}
```

### Find your own buildings

```js
const myPartyId = game.ui.getPlayerPartyId();

const myBuildings = [];
for (const entity of game.world.entities.values()) {
  const t = entity.targetTick;
  // entityClass "Building" covers all placed structures; partyId scopes to yours
  if (t?.entityClass === "Building" && t.partyId === myPartyId && !t.dead)
    myBuildings.push(t);
}
```

### Get your Gold Stash

```js
const myPartyId = game.ui.getPlayerPartyId();

// spread into an array to use .find() — the Map itself doesn't have it
const stash = [...game.world.entities.values()]
  .map(e => e.targetTick)
  .find(t => t?.model === "GoldStash" && t.partyId === myPartyId);
```

## Your own UID

```js
game.world.myUid  // your entity's UID (number)
```

Useful for filtering yourself out of entity loops:

```js
if (t.uid === game.world.myUid) continue;
```

## Coordinate conversion

Entity positions are in **world coordinates**. To get the screen position of an entity (for example, to position a DOM overlay or aim at it):

```js
const screenPos = game.renderer.worldToScreen(t.position.x, t.position.y);
// screenPos.x and screenPos.y are CSS pixel coordinates
```
