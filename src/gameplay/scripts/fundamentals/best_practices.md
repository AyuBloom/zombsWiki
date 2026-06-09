---
title: Script Structure and Best Practices - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Script Structure and Best Practices - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        How to organise a zombs.io userscript, manage configuration, clean up
        handlers, and keep your code auditable.
  - - meta
    - property: 'og:description'
      content: >-
        How to organise a zombs.io userscript, manage configuration, clean up
        handlers, and keep your code auditable.
---
# Script Structure and Best Practices

## The standard userscript skeleton

```js
// ==UserScript==
// @name         My Script
// @match        *://zombs.io/*
// @match        *://*.zombs.io/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Wait until the game is live and we are in-world
  const ready = setInterval(() => {
    if (!game?.network || !game?.ui?.playerTick) return;
    clearInterval(ready);
    boot();
  }, 250);

  function boot() {
    registerHandlers();
  }

  function registerHandlers() {
    // Guard against double-registration across hot reloads
    if (game.__myScript) return;
    game.__myScript = true;

    game.network.addPacketHandler(0, onTick);
    game.network.addRpcHandler("Dead", onDead);
  }

  function onTick() {
    const p = game.ui.playerTick;
    if (!p) return;
    // continuous logic here
  }

  function onDead() {
    setTimeout(() => game.network.sendInput({ respawn: 1 }), 500);
  }
})();
```

## Guarding against double-registration

`game.network` is **rebuilt on every page reload**. If you track "already registered" in `localStorage` or any persistent store, your handlers will silently not be registered after a reload. Track the flag on the `game` object itself — it resets with the game:

```js
// Wrong — persists across reloads
if (localStorage.getItem("myScript.hooked")) return;
localStorage.setItem("myScript.hooked", "1");

// Correct — resets when game reloads
if (game.__myScript) return;
game.__myScript = true;
```

## Separating state from behaviour

Keep mutable state (on/off flags, last-action timestamps, target UIDs) separate from the logic that uses it. This makes toggling features clean:

```js
const state = {
  autoHeal: false,
  lastHealAt: 0,
};

game.network.addPacketHandler(0, () => {
  if (!state.autoHeal) return;
  const now = Date.now();
  if (now - state.lastHealAt < 400) return;
  const p = game.ui.playerTick;
  if (!p || p.health / p.maxHealth > 0.3) return;
  game.network.sendRpc({ name: "EquipItem", itemName: "HealthPotion", tier: 1 });
  state.lastHealAt = now;
});

// Toggle from elsewhere (UI button, keyboard shortcut, etc.)
state.autoHeal = true;
```

## One tick handler, not many

Each call to `addPacketHandler(0, fn)` registers an additional handler — they all fire every tick. Multiple small handlers are fine, but if your script has many features, consolidating them into one handler reduces overhead and makes execution order explicit:

```js
game.network.addPacketHandler(0, () => {
  tickAutoHeal();
  tickAutoUpgrade();
  tickAHRC();
});
```

## Persisting settings across reloads

For settings that should survive a page reload, use `localStorage`:

```js
// Save
localStorage.setItem("myScript.autoHeal", "true");

// Load (with a default)
const autoHeal = localStorage.getItem("myScript.autoHeal") === "true";
```

Use a namespaced key (`scriptName.settingName`) to avoid colliding with the game's own storage.

## Cleaning up

If your script supports being turned off at runtime without a page reload, clean up your intervals and remove handlers where possible:

```js
// Intervals are easy to clean up
const timer = setInterval(doThing, 2000);
// later:
clearInterval(timer);
```

Packet and RPC handlers registered with `addPacketHandler` / `addRpcHandler` have no built-in remove mechanism — gate them with a flag inside the handler instead:

```js
let active = true;
game.network.addPacketHandler(0, () => {
  if (!active) return;
  // ...
});
// To "remove" it:
active = false;
```

## Keeping things auditable

Scripts that run automatically against a live game can cause real consequences (spending gold, selling buildings, sending chat). A few habits help:

- **Log significant actions.** `console.log` before sending an upgrade or sell RPC, at least during development.
- **Add dry-run modes.** A `dryRun` flag that skips `sendRpc` calls while still logging what would happen is useful for testing.
- **Throttle destructive actions.** Selling or upgrading buildings should have a rate limit even if the server would accept them faster — it makes mistakes easier to catch and interrupt.
- **Test on a fresh base.** Automate on a disposable game before running on a high-wave session.
