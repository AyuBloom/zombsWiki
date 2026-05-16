---
title: UiPopupOverlay - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiPopupOverlay class manages popup notifications and confirmation
        dialogs. Popups are stacked vertically, automatically dismissed after a
        timeout, and support optional icons.
  - - meta
    - name: 'og:description'
      content: >-
        The UiPopupOverlay class manages popup notifications and confirmation
        dialogs. Popups are stacked vertically, automatically dismissed after a
        timeout, and support optional icons.
---

# `UiPopupOverlay`

The `UiPopupOverlay` class manages popup notifications and confirmation dialogs. Popups are stacked vertically, automatically dismissed after a timeout, and support optional icons.

## `UiPopupOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-popup-overlay` DOM element. Inherited from `UiComponent`. |
| `popupElems` | `Record<number, HTMLElement>` | Map of popup IDs to DOM elements. |
| `popupTimers` | `Record<number, number>` | Map of popup IDs to timeout IDs. |
| `popupMessages` | `Record<number, string>` | Map of popup IDs to message strings (prevents duplicate hints). |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the popup overlay with empty tracking maps.

#### `showHint()`
```ts
function showHint(message: string, timeoutInMs?: number, icon?: string | null): number | false
```
Displays a hint popup. Returns `false` if a popup with the same message already exists (deduplication). Otherwise creates a `.hud-popup-hint` element, optionally with an icon, schedules auto-removal after `timeoutInMs` (default 8000ms), and returns the popup ID.

#### `showConfirmation()`
```ts
function showConfirmation(message: string, timeoutInMs?: number, acceptCallback?: Function | null, declineCallback?: Function | null): number
```
Displays a confirmation popup with Yes/No buttons. Clicking "Yes" calls `acceptCallback`, clicking "No" calls `declineCallback`. Both remove the popup. Auto-dismissed after `timeoutInMs` (default 30000ms). Returns the popup ID.

#### `removePopup()`
```ts
function removePopup(popupId: number): void
```
Removes a popup by ID: clears its timeout, removes it from tracking maps, transitions out with `is-visible` class removal, and removes the DOM element after 500ms.
