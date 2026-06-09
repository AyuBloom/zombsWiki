---
title: Network Basics - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Network Basics - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        How zombs.io's binary WebSocket protocol works — packets, opcodes, RPCs,
        and the split between client-known and server-authoritative state.
  - - meta
    - property: 'og:description'
      content: >-
        How zombs.io's binary WebSocket protocol works — packets, opcodes, RPCs,
        and the split between client-known and server-authoritative state.
---
# Network Basics

zombs.io communicates over a **binary WebSocket**. All traffic goes through `game.network`, which encodes and decodes packets using a compact binary codec (`BinCodec`). As a scripter you rarely touch the codec directly — you call `sendRpc` or `sendInput` and the network layer handles the rest.

## Packet types

Each packet has a numeric **opcode** that identifies its type:

| Opcode | Name | Direction |
| :---: | :--- | :--- |
| `0` | Entity update | Server → client (every tick) |
| `3` | Input | Client → server |
| `4` | Enter world | Both |
| `5` | MBF anti-bot challenge | Both |
| `6` | Enter world (phase 2) | Client → server |
| `7` | Ping | Both |
| `8` | — | **Sending this disconnects you instantly** |
| `9` | RPC | Both |

Scripts work with two of these: **inputs** (opcode 3) and **RPCs** (opcode 9).

## RPCs

An **RPC** is a named action sent to the server. Examples: placing a building, buying an item, sending a chat message. Send one with:

```js
game.network.sendRpc({ name: "RpcName", ...args });
```

The `name` field selects the action; the remaining fields are its arguments. See the [RPC Reference](/gameplay/scripts/fundamentals/rpc_reference) for every common RPC with its exact argument shapes.

The server also sends RPCs back to the client to push state changes. Listen for them with:

```js
game.network.addRpcHandler("Dead", (data) => {
  // called when the server tells you that you died
});

game.network.addRpcHandler("DayCycle", ({ isDay }) => {
  // called when day/night flips
});
```

Common server → client RPCs:

| Name | When it fires | Key data |
| :--- | :--- | :--- |
| `DayCycle` | Day/night flip | `{ isDay }` |
| `Dead` | You died | — |
| `PartyShareKey` | On join / share key change | `{ partyShareKey }` |
| `LocalBuilding` | Your base changes | `{ response: [{uid, type, x, y, tier, dead}] }` |
| `Leaderboard` | Periodic leaderboard push | scores array |
| `BuildingShopPrices` | On enter world | full price table |
| `ItemShopPrices` | On enter world | full item price table |

## Inputs

An **input** represents player movement, aim, or weapon use. Send one with:

```js
game.network.sendInput({ up: 1 });
game.network.sendInput({ mouseDown: 90, worldX: 500, worldY: 300, distance: 200 });
```

Inputs are rate-limited internally by `inputPacketScheduler` — only the latest state per tick is sent, so calling `sendInput` repeatedly in one tick doesn't flood the server.

See [Input and UI Automation](/gameplay/scripts/fundamentals/input_ui) for the full input field reference.

## The game loop — opcode 0

Opcode `0` fires **every entity-update tick** (approximately 20 times per second). Registering a handler for it gives you the closest thing to a game loop:

```js
game.network.addPacketHandler(0, () => {
  // runs ~20x per second, in sync with the server tick
  const p = game.ui.playerTick;
  if (!p) return;
  // read state, send inputs, fire RPCs...
});
```

`addEntityUpdateHandler` is a named shorthand for the same thing:

```js
game.network.addEntityUpdateHandler(() => { /* same */ });
```

::: tip
Use opcode `0` / `addEntityUpdateHandler` for anything that needs to run continuously — auto-aim, auto-farm, health checks. Use `addRpcHandler` for things that react to specific server events — respawn on death, act on day/night flip.
:::

## Client vs server authority

The client knows what the server last told it, interpolated smoothly between ticks. It does **not** simulate game logic — the server decides all outcomes (damage, deaths, resource gain, zombie movement). This means:

- Reading `game.ui.playerTick.gold` gives you your gold as of the last server tick.
- Sending `UpgradeBuilding` does not immediately change the building's tier in `game.world.entities` — the server confirms it and the next entity-update tick reflects the change.
- You cannot cheat values by writing to client-side state. Scripts can only read what the server sent and send requests; they cannot override server decisions.

## Packet size limit

RPCs are encoded before sending. If an encoded RPC exceeds **256 bytes**, the server disconnects you. In practice the most common way to hit this is a chat message that is too long. See [Safety and Anti-Disconnect Practices](/gameplay/scripts/fundamentals/dc_triggers) for the full list of disconnection triggers.
