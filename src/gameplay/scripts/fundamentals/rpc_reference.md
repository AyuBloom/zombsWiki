---
title: RPC Reference - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: RPC Reference - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        Every common RPC a script sends — chat, party, items, buildings, and
        spells — with verified argument shapes.
  - - meta
    - property: 'og:description'
      content: >-
        Every common RPC a script sends — chat, party, items, buildings, and
        spells — with verified argument shapes.
---
# RPC Reference

All RPCs are sent with:

```js
game.network.sendRpc({ name: "RpcName", ...args });
```

Field names matter — use the exact names listed below.

## Chat

### `SendChatMessage`
```js
game.network.sendRpc({
  name: "SendChatMessage",
  channel: "Local",
  message: "hello"
});
```

| Field | Type | Notes |
| :--- | :--- | :--- |
| `channel` | `"Local"` | Must be `"Local"` — other values are rejected by the codec |
| `message` | string | **Must be under 250 bytes** (not characters). Exceeding this disconnects you. |

## Items

### `BuyItem`
```js
game.network.sendRpc({ name: "BuyItem", itemName: "Bow", tier: 1 });
```

### `EquipItem`
```js
game.network.sendRpc({ name: "EquipItem", itemName: "Bow", tier: 1 });
```

| `itemName` values | |
| :--- | :--- |
| `"Pickaxe"` | Harvesting tool |
| `"Bow"` | Ranged weapon |
| `"Spear"` | Melee weapon |
| `"Bomb"` | AoE weapon |
| `"Shield"` | Extra HP |
| `"HealthPotion"` | Consumable heal |
| `"PetCARL"` | Combat pet |
| `"PetMiner"` | Harvester pet |
| `"HatHorns"` | Hat |

::: warning
Do not send `EquipItem` for a pet immediately after `BuyItem` for the next tier. The server is still processing the evolution — sending equip while it is mid-evolve will disconnect you. Wait for the evolution to resolve first.
:::

## Buildings

### `MakeBuilding`
Places a new tier-1 building.
```js
game.network.sendRpc({
  name: "MakeBuilding",
  type: "Wall",
  x: 1000,
  y: 1000,
  yaw: 0
});
```

| Field | Type | Notes |
| :--- | :--- | :--- |
| `type` | string | Building type (see table below) |
| `x`, `y` | number | World coordinates |
| `yaw` | number | Rotation in degrees — only relevant for Melee Tower |

| `type` values | |
| :--- | :--- |
| `"GoldStash"` | Core building |
| `"GoldMine"` | Passive gold |
| `"Harvester"` | Converts gold to wood/stone |
| `"Wall"` | Barrier |
| `"Door"` | Party-walkable barrier |
| `"SlowTrap"` | Slows enemies, always walkable |
| `"ArrowTower"` | Single-target ranged tower |
| `"CannonTower"` | AoE ranged tower |
| `"BombTower"` | Large AoE tower |
| `"MagicTower"` | Multi-projectile tower |
| `"MeleeTower"` | Directional close-range tower |

### `UpgradeBuilding`
Upgrades a building one tier. You must be within range of the building.
```js
game.network.sendRpc({ name: "UpgradeBuilding", uid: buildingUid });
```

The building's UID comes from `game.world.entities` or `game.ui.buildings`. Maximum tier is 8.

## Harvesters

### `AddDepositToHarvester`
Feeds gold into a Harvester so it starts producing wood/stone.
```js
game.network.sendRpc({ name: "AddDepositToHarvester", uid: harvesterUid, deposit: 1 });
```

### `CollectHarvester`
Collects the produced wood/stone from a Harvester.
```js
game.network.sendRpc({ name: "CollectHarvester", uid: harvesterUid });
```

## Party

### `JoinPartyByShareKey`
Joins a party using its 20-character share key.
```js
game.network.sendRpc({ name: "JoinPartyByShareKey", partyShareKey: "XXXXXXXXXXXXXXXXXXXX" });
```

Pass an empty string to leave your current party and start a solo one.

### `SetPartyMemberCanSell`
Grants or revokes a party member's permission to sell buildings.
```js
game.network.sendRpc({ name: "SetPartyMemberCanSell", uid: memberUid, canSell: 1 });
```

| `canSell` | Effect |
| :---: | :--- |
| `1` | Grant sell permission |
| `0` | Revoke sell permission |

The member UID comes from `game.ui.getPlayerPartyMembers()` — each member object has a `playerUid` field.

## Spells

### `CastSpell`
```js
game.network.sendRpc({ name: "CastSpell", spell: "HealTowersSpell", tier: 1, x: 0, y: 0 });
```

| Field | Notes |
| :--- | :--- |
| `spell` | Spell name (e.g. `"HealTowersSpell"`, `"TimeoutSpell"`) |
| `tier` | Must be `1` — higher tiers disconnect you |
| `x`, `y` | World position for targeted spells |

## Respawn

Respawn is **not** an RPC — it is an input packet:

```js
game.network.sendInput({ respawn: 1 });
```

Trigger it from an `addRpcHandler("Dead", ...)` callback. See [Input and UI Automation](/gameplay/scripts/fundamentals/input_ui).
