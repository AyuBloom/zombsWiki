---
title: Common Script Features - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Common Script Features - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        Conceptual patterns behind the most common zombs.io script functions —
        auto-heal, AHRC, auto-upgrade, auto-aim, and more.
  - - meta
    - property: 'og:description'
      content: >-
        Conceptual patterns behind the most common zombs.io script functions —
        auto-heal, AHRC, auto-upgrade, auto-aim, and more.
---
# Common Script Features

These are the patterns behind the functions you see in most zombs.io scripts. Each one is chosen to demonstrate a different part of the game object — reading `playerTick`, iterating entities, using the renderer, listening for server events.

## Auto Heal

Demonstrates reading `playerTick` for health state and `inventory` to check item stock.

```js
let lastHealAt = 0;

game.network.addPacketHandler(0, () => {
  const p = game.ui.playerTick;
  if (!p) return;

  // buy a potion if we don't have one and can afford it
  if (!game.ui.inventory?.HealthPotion && p.gold >= 100)
    game.network.sendRpc({ name: "BuyItem", itemName: "HealthPotion", tier: 1 });

  // drink when below 30% health — throttle to once per 400ms to avoid burning the stack
  const now = Date.now();
  if (p.health / p.maxHealth <= 0.3 && now - lastHealAt > 400) {
    game.network.sendRpc({ name: "EquipItem", itemName: "HealthPotion", tier: 1 });
    lastHealAt = now;
  }
});
```

## Auto Respawn

Demonstrates `addRpcHandler` — reacting to a named server event rather than polling every tick.

```js
game.network.addRpcHandler("Dead", () => {
  // wait briefly for the respawn screen to appear before sending the input
  setTimeout(() => game.network.sendInput({ respawn: 1 }), 500);
});
```

## AHRC (Auto Harvester Refuel & Collect)

Demonstrates entity iteration filtered by `model` and `partyId`, combined with multiple RPCs per entity.

```js
game.network.addPacketHandler(0, () => {
  const myPartyId = game.ui.getPlayerPartyId();
  const gold = game.ui.playerTick?.gold ?? 0;

  for (const e of game.world.entities.values()) {
    const t = e.targetTick;
    // only act on your own live Harvesters
    if (!t || t.model !== "Harvester" || t.partyId !== myPartyId || t.dead) continue;

    // feed gold in to keep the harvester running
    if (gold > 1)
      game.network.sendRpc({ name: "AddDepositToHarvester", uid: t.uid, deposit: 1 });

    // collect whatever it has produced
    game.network.sendRpc({ name: "CollectHarvester", uid: t.uid });
  }
});
```

## Auto Upgrade

Demonstrates using `entityClass` and `tier` from entity state to drive upgrade decisions.

```js
const TARGET_TIER = 8; // upgrade everything to max

game.network.addPacketHandler(0, () => {
  const myPartyId = game.ui.getPlayerPartyId();

  for (const e of game.world.entities.values()) {
    const t = e.targetTick;
    if (!t || t.entityClass !== "Building") continue;
    if (t.partyId !== myPartyId || t.dead) continue;       // only your own buildings
    if ((t.tier ?? 1) >= TARGET_TIER) continue;             // already at or above target
    game.network.sendRpc({ name: "UpgradeBuilding", uid: t.uid });
  }
});
```

## Auto Aim

Demonstrates `game.world.entities` for target selection, `game.renderer.worldToScreen` for coordinate conversion, and `game.inputManager.onMouseMoved` to move the aim.

```js
game.network.addPacketHandler(0, () => {
  const me = game.ui.playerTick?.position;
  if (!me) return;
  const myPartyId = game.ui.getPlayerPartyId();

  // find the nearest enemy player
  let best = null, bestDist = Infinity;
  for (const e of game.world.entities.values()) {
    const t = e.targetTick;
    if (!t?.position || t.dead) continue;
    if (t.model !== "GamePlayer" || t.partyId === myPartyId) continue;
    const d = Math.hypot(t.position.x - me.x, t.position.y - me.y);
    if (d < bestDist) { bestDist = d; best = t; }
  }

  if (!best) return;

  // convert the target's world position to screen coordinates and move the crosshair there
  const screenPos = game.renderer.worldToScreen(best.position.x, best.position.y);
  game.inputManager.onMouseMoved({ clientX: screenPos.x, clientY: screenPos.y });
});
```

## Grant Sell Permissions

Demonstrates `getPlayerPartyMembers()` — reading party state and acting on each member.

```js
for (const member of game.ui.getPlayerPartyMembers()) {
  if (!member?.playerUid) continue;
  game.network.sendRpc({ name: "SetPartyMemberCanSell", uid: member.playerUid, canSell: 1 });
}
```
