---
title: Disconnection Triggers - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Disconnection Triggers - zombs.io Wiki
  - - meta
    - name: description
      content: 'Related: network'
  - - meta
    - property: 'og:description'
      content: 'Related: network'
---
# Disconnection Triggers

Related: [`network`](/architecture/engine/main/network)

Below is a list of all wrong actions a player can do that will result in being disconnected from the server.

## Sending RPCs

### Max byte size

An RPC cannot exceed `256` bytes after encoding. If it does, you will be disconnected.

#### Sending a chat message larger than 250 bytes

Due to the limitation above, sending a chat message larger than 250 bytes (not characters, because some characters may be encoded as multiple bytes) via the `SendChatMessage` RPC will result in a disconnection.

```ts
// Does not disconnect
game.network.sendRpc({
    name: "SendChatMessage", 
    message: "a".repeat(249), 
    channel: "Local"
});

// Disconnects
game.network.sendRpc({
    name: "SendChatMessage", 
    message: "a".repeat(250), 
    channel: "Local"
});
```

<!--
### Sending a `CastSpell` RPC with tier > 1

Casting a spell via the `CastSpell` RPC with `tier` greater than 1 will result in a disconnection.

```ts
game.network.sendRpc({name: "CastSpell", spell: "HealTowersSpell", tier: 1, x: 500, y: 500}) // Does not disconnect
game.network.sendRpc({name: "CastSpell", spell: "HealTowersSpell", tier: 2, x: 500, y: 500}) // Disconnects
```
 -->

### Equipping a pet while evolving it
<span style="opacity:0.5">[Fact check needed]</span>

Evolving a pet involves buying the next tier of the pet via the `BuyItem` RPC. While the pet has not been evolved, its tier stays on the old tier. Sending an `EquipItem` RPC for the pet while it is evolving will result in a disconnection.

```ts
/* Does not disconnect */
game.network.sendRpc({name: "BuyItem", item: "PetCARL", tier: 1});
// Wait for evolution to complete
game.network.sendRpc({name: "EquipItem", item: "PetCARL", tier: 2});

/* Disconnects */
game.network.sendRpc({name: "BuyItem", item: "PetCARL", tier: 1});
// Equip while evolving
game.network.sendRpc({name: "EquipItem", item: "PetCARL", tier: 1});
```

## Sending opcode `8`

Related: [Skill Points](/architecture/exploit/inactive/skill_point)

Currenty, sending an opcode `8` packet will disconnect you immediately.
