---
title: Scripting Fundamentals - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Scripting Fundamentals - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        A ground-up guide to scripting in zombs.io — from running your first
        snippet to writing structured userscripts that read game state and send
        actions safely.
  - - meta
    - property: 'og:description'
      content: >-
        A ground-up guide to scripting in zombs.io — from running your first
        snippet to writing structured userscripts that read game state and send
        actions safely.
---
# Scripting Fundamentals

zombs.io has no official scripting API. Every script works by reading and driving `game` — a single global object that the game client exposes in the browser. Because the game is fully client-authoritative on its own state (the server is authoritative on outcomes), almost everything a script needs is reachable through that object.

This section builds the knowledge from the ground up: how to run code in the first place, what the `game` object looks like, how the network layer works, and how to stay connected while doing it. Each article is self-contained but assumes the ones before it.

## Articles in this section

| Article | What you'll learn |
| :--- | :--- |
| [Script Setup](/gameplay/scripts/fundamentals/script_setup) | How to run code against the game — browser console, Tampermonkey userscripts, and DevTools snippets |
| [The `game` Object](/gameplay/scripts/fundamentals/game_object) | The structure of `game` and the subsystems every script touches |
| [Network Basics](/gameplay/scripts/fundamentals/network_basics) | Packets, opcodes, RPCs, and the difference between what the client knows and what the server decides |
| [RPC Reference](/gameplay/scripts/fundamentals/rpc_reference) | Every common RPC a script sends — chat, party, items, buildings, spells — with verified argument shapes |
| [Entity and World State](/gameplay/scripts/fundamentals/entity_world_state) | How to read player data, tower positions, health values, and UIDs out of the live world |
| [Timing, Ticks, and Intervals](/gameplay/scripts/fundamentals/timing) | The server tick, scheduling work, debouncing and throttling, and rate limits to respect |
| [Input and UI Automation](/gameplay/scripts/fundamentals/input_ui) | Sending movement, aim, and attack inputs; interacting with in-game menus |
| [Safety and Anti-Disconnect Practices](/gameplay/scripts/fundamentals/dc_triggers) | Actions that disconnect you and how to avoid them |
| [Debugging Scripts](/gameplay/scripts/fundamentals/debugging) | Logging, inspecting live state, monitoring network traffic, and diagnosing failures |
| [Script Structure and Best Practices](/gameplay/scripts/fundamentals/best_practices) | Organizing a script, managing configuration, cleaning up handlers, and keeping things auditable |
| [Common Script Features](/gameplay/scripts/fundamentals/common_features) | Conceptual patterns behind popular script functions — auto-heal, auto-farm, AHRC, base savers, and more |

## Prerequisites

These articles assume:
- Basic JavaScript (variables, functions, `setInterval`, Promises).
- A browser with DevTools (F12). Chrome or Firefox both work.
- You can reach [zombs.io](https://zombs.io/) and open the console while in-game.

No prior zombs.io scripting experience is required.
