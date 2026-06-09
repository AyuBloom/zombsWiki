---
title: Script Setup - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Script Setup - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        How to run JavaScript against zombs.io — browser console, Tampermonkey
        userscripts, and DevTools snippets.
  - - meta
    - property: 'og:description'
      content: >-
        How to run JavaScript against zombs.io — browser console, Tampermonkey
        userscripts, and DevTools snippets.
---
# Script Setup

There are three main ways to run JavaScript against zombs.io. Each has different trade-offs around persistence, convenience, and structure.

## Browser Console

The simplest method. Open DevTools with `F12`, go to the **Console** tab, and type directly.

```js
game.ui.playerTick.wood  // read your current wood
```

::: tip
Type `game` and press Enter to inspect the full object tree in the console. This is the fastest way to explore what's available.
:::

The console is good for one-off commands and quick experiments, but nothing you type is saved — it's gone on reload. Use it to test snippets before putting them somewhere permanent.

## DevTools Snippets

Snippets are small scripts saved inside DevTools itself. They persist across reloads and are a good middle ground before committing to a full userscript.

1. Open DevTools (`F12`)
2. Go to **Sources** → **Snippets** (you may need to click `>>` to find it)
3. Click **+ New snippet**, give it a name
4. Paste your code and press `Ctrl+Enter` to run it

Snippets run once when you execute them — they don't auto-run on page load. If you need something to run automatically every time the page loads, use a userscript instead.

## Userscripts (Tampermonkey / Violentmonkey)

Userscripts are the standard method for anything persistent. They inject into the page automatically on load, so your script runs every time you open zombs.io without any manual steps.

**Install a userscript manager:**
- [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge)
- [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox)

Either works. Create a new script and use this as the base:

```js
// ==UserScript==
// @name         My zombs.io script
// @match        *://zombs.io/*
// @match        *://*.zombs.io/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ready = setInterval(() => {
    if (!game?.network || !game?.ui?.playerTick) return;
    clearInterval(ready);
    main();
  }, 250);

  function main() {
    // game is live and you are in-world — put your code here
  }
})();
```

### Why the `ready` loop?

The `ready` loop is only necessary if your script might run before the player enters the game — which is exactly what happens with userscripts, since they inject at page load. `game` exists shortly after load, but `game.ui.playerTick` only exists once you have actually entered the world (picked a name and spawned). If you access it before then, it's `null`.

The `setInterval` polls every 250ms and clears itself once both are present. Everything after that runs against a live, in-world game state. If you are running code manually from the console or a snippet while already in-game, you can skip the loop entirely and just call your function directly.

::: warning
Do not store an "already hooked" flag in `localStorage` to skip re-registering handlers. `game.network` is rebuilt on every page reload, so a persisted flag will silently skip re-registration and your script will do nothing after reload. Store any such flags on the `game` object itself (e.g. `game.__myScript = true`) so they reset with the game.
:::
