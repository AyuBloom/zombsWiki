---
title: Input and UI Automation - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: Input and UI Automation - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        How to send movement, aim, and attack inputs in zombs.io scripts, and
        how to interact with in-game UI elements.
  - - meta
    - property: 'og:description'
      content: >-
        How to send movement, aim, and attack inputs in zombs.io scripts, and
        how to interact with in-game UI elements.
---
# Input and UI Automation

Player actions — movement, aiming, attacking — are sent via `game.network.sendInput()`. These are distinct from RPCs: inputs represent continuous physical actions, RPCs represent discrete commands.

## `sendInput` fields

```js
game.network.sendInput(fields);
```

| Field | Type | Meaning |
| :--- | :--- | :--- |
| `up` / `down` / `left` / `right` | `0` or `1` | Movement keys. `1` means the key is held down, `0` means released. Send only the keys that changed — you don't need to include all four every time. |
| `mouseDown` | yaw `0–359` | Starts (and holds) a left-click attack. The value is the angle to swing toward: `0` = up/north, `90` = right/east, `180` = down/south, `270` = left/west. Must include `worldX`, `worldY`, and `distance` to reliably hit a target. |
| `mouseUp` | `1` | Releases the left click, stopping any held attack. |
| `mouseMoved` | yaw `0–359` | Updates the aim direction without clicking. Used to track where the player is looking. |
| `mouseMovedWhileDown` | yaw `0–359` | Same as `mouseMoved` but sent while the mouse button is held — allows tracking aim during a held attack. |
| `worldX`, `worldY` | number | The world coordinates of the cursor target. The server uses these to determine what the attack connects with. |
| `distance` | number | Distance in world units from the player's position to the cursor target. Sent alongside `worldX`/`worldY`. |
| `space` | `0` or `1` | The spacebar. `1` = pressed, `0` = released. Triggers the active ranged weapon (bow shot, bomb throw, spear lunge). |
| `respawn` | `1` | Sends the respawn request. Only meaningful when the player is dead. |

## Movement

Send only the directions that are active. Stop all movement by setting all directions to `0`:

```js
// move right
game.network.sendInput({ right: 1 });

// move diagonally up-right
game.network.sendInput({ up: 1, right: 1 });

// stop
game.network.sendInput({ up: 0, down: 0, left: 0, right: 0 });
```

**Direction → key mapping:**

| Degrees | Keys |
| :---: | :--- |
| 0 (up) | `up: 1` |
| 45 | `up: 1, right: 1` |
| 90 (right) | `right: 1` |
| 135 | `down: 1, right: 1` |
| 180 (down) | `down: 1` |
| 225 | `down: 1, left: 1` |
| 270 (left) | `left: 1` |
| 315 | `up: 1, left: 1` |

## Attacking — `mouseDown`

`mouseDown` takes a **yaw** (0 = up, increases clockwise). It must also include `worldX`, `worldY`, and `distance` for the hit to register on a target:

```js
function attackToward(targetX, targetY) {
  const me = game.ui.playerTick.position;
  const yaw = (Math.atan2(targetY - me.y, targetX - me.x) * 180 / Math.PI + 450) % 360;
  const dist = Math.hypot(targetX - me.x, targetY - me.y);
  game.network.sendInput({
    mouseDown: Math.round(yaw),
    worldX: targetX | 0,
    worldY: targetY | 0,
    distance: dist | 0,
  });
}

// release the attack
game.network.sendInput({ mouseUp: 1 });
```

::: tip
A bare `sendInput({ mouseDown: yaw })` without `worldX`/`worldY`/`distance` will animate the swing but may not reliably connect with a target.
:::

## Aiming without attacking

To point at a world position without clicking (for example, to drive the game's built-in aim display), use `inputManager.onMouseMoved`:

```js
const screenPos = game.renderer.worldToScreen(targetX, targetY);
game.inputManager.onMouseMoved({ clientX: screenPos.x, clientY: screenPos.y });
```

## Weapon fire — `space`

The `space` field triggers the active ranged weapon (bow, bomb, or spear). Toggle it off then on each tick to produce continuous fire:

```js
game.network.addPacketHandler(0, () => {
  game.network.sendInput({ space: 0 });
  game.network.sendInput({ space: 1 });
});
```

## Respawn

```js
game.network.addRpcHandler("Dead", () => {
  setTimeout(() => game.network.sendInput({ respawn: 1 }), 500);
});
```

Or, if the respawn screen is visible, click the button directly:

```js
const btn = document.querySelector("#hud-respawn > div > div > div > button:nth-child(3)");
if (btn) btn.click();
```

## UI element selectors

Useful DOM selectors for interacting with the game's own UI (used by most scripts):

| Selector | Element |
| :--- | :--- |
| `#hud-menu-settings` | Settings panel container — where most scripts mount their UI |
| `#hud-respawn` | Respawn screen |
| `.hud-chat-message` | Individual chat message elements |

## Notifications

`PopupOverlay` handles all in-game notifications. It supports simple hints, typed toasts, and confirmation dialogs:

```js
const popup = game.ui.components.PopupOverlay;

// Simple hint — appears briefly at the top of the screen
popup.showHint("message here");

// Typed toast — use "success", "error", "warning", or "info"
popup.showToast("message here", "success");
popup.showToast("something went wrong", "error");
popup.showToast("heads up", "warning");
popup.showToast("just so you know", "info");

// Confirmation dialog — presents the player with Yes / No buttons
popup.showConfirm("Are you sure?", () => {
  // called when the player clicks Yes
}, () => {
  // called when the player clicks No (optional)
});
```
