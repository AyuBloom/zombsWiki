---
title: Debugging Scripts - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Debugging Scripts - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        Techniques for logging, inspecting live state, monitoring network
        traffic, and diagnosing failures in zombs.io scripts.
  - - meta
    - property: 'og:description'
      content: >-
        Techniques for logging, inspecting live state, monitoring network
        traffic, and diagnosing failures in zombs.io scripts.
---
# Debugging Scripts

## Inspecting live state in the console

The console is your first tool. While in-game, you can read any value directly:

```js
game.ui.playerTick              // your full character state
game.ui.playerTick.gold         // just your gold
game.ui.inventory               // what you're holding
game.world.entities.size        // how many entities are loaded
game.ui.getPlayerPartyMembers() // party member list
```

To explore an object interactively, just type its path and press Enter — DevTools renders it as a collapsible tree.

To watch a value continuously without writing a script:

```js
// run this in the console — logs your gold every second
setInterval(() => console.log("gold:", game.ui.playerTick?.gold), 1000);
```

## Logging from a tick handler

Inside a tick handler, avoid `console.log` on every tick — it will flood the console and slow the page down. Log only on change:

```js
let lastGold = null;
game.network.addPacketHandler(0, () => {
  const gold = game.ui.playerTick?.gold;
  if (gold !== lastGold) {
    console.log("gold changed:", lastGold, "→", gold);
    lastGold = gold;
  }
});
```

## Monitoring RPCs

To see every RPC the server sends you, intercept the handler map:

```js
const _addRpcHandler = game.network.addRpcHandler.bind(game.network);
game.network.addRpcHandler = (name, fn) => {
  _addRpcHandler(name, (data) => {
    console.log("[rpc in]", name, data);
    fn(data);
  });
};
```

Or more simply, just register a catch-all for a specific RPC you are investigating:

```js
game.network.addRpcHandler("LocalBuilding", (data) => {
  console.log("LocalBuilding", JSON.stringify(data));
});
```

## Checking entity state

To look at a specific entity by UID:

```js
game.world.entities.get(someUid)?.targetTick
```

To list all entities of a given model:

```js
[...game.world.entities.values()]
  .map(e => e.targetTick)
  .filter(t => t?.model === "Harvester")
```

## Diagnosing "my script does nothing"

Work through this list in order:

1. **Is `game.ui.playerTick` non-null?** If it is `null`, you are not in-world yet. Your tick handler is firing but all state reads return `null`.

2. **Did you register the handler before or after entering the world?** Handlers registered before entering the world survive the transition. Handlers that depend on in-world state must still guard on `playerTick`.

3. **Did the page reload and lose your handler?** `game.network` is rebuilt on every reload. If you stored an "already hooked" flag in `localStorage`, your handler was not re-registered. Store it on the `game` object instead:
   ```js
   if (game.__myHook) return;
   game.__myHook = true;
   game.network.addPacketHandler(0, myFn);
   ```

4. **Is the RPC name spelled correctly?** RPC names are case-sensitive. `"UpgradeBuilding"` works; `"upgradebuilding"` does not.

5. **Are you getting disconnected silently?** Add a close handler to find out:
   ```js
   game.network.addCloseHandler(() => console.warn("disconnected!"));
   ```
   If this fires right after your RPC, check [Safety and Anti-Disconnect Practices](/gameplay/scripts/fundamentals/dc_triggers).

6. **Are your coordinates in world space?** Entity positions and `MakeBuilding` use world coordinates. Screen pixel coordinates will place buildings in the wrong location or miss targets entirely.

## DevTools Sources panel

For longer scripts, use the **Sources** panel in DevTools:

- **Snippets** — paste your script, run with `Ctrl+Enter`. Persists across page loads.
- **Breakpoints** — click the line number in a snippet to set a breakpoint. Execution will pause there and let you inspect all local variables.
- **Call stack** — when paused, the call stack shows exactly how the code got to that point.

## Checking if a building UID is valid

A stale UID (from a building that has since been destroyed) will cause `UpgradeBuilding` to silently fail:

```js
const entity = game.world.entities.get(uid);
if (!entity || entity.targetTick?.dead) {
  console.warn("building", uid, "is dead or gone");
}
```
