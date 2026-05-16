---
title: UiTooltip - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiTooltip - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiTooltip class provides a reusable tooltip system. It attaches to a
        target element and displays a dynamically-generated HTML tooltip on
        mouseenter, positioned relative to the target using a configurable
        anchor direction.
  - - meta
    - property: 'og:description'
      content: >-
        The UiTooltip class provides a reusable tooltip system. It attaches to a
        target element and displays a dynamically-generated HTML tooltip on
        mouseenter, positioned relative to the target using a configurable
        anchor direction.
---

# `UiTooltip`

The `UiTooltip` class provides a reusable tooltip system. It attaches to a target element and displays a dynamically-generated HTML tooltip on `mouseenter`, positioned relative to the target using a configurable anchor direction.

::: info
Unlike other UI components, `UiTooltip` does **not** extend `UiComponent`. It is a standalone utility class.
:::

## `UiTooltip` <Badge type="danger" text="private" />

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `targetElem` | `HTMLElement` | The element the tooltip is attached to. |
| `callback` | `(elem: HTMLElement) => string` | A function that returns the tooltip's inner HTML content. Called on each `mouseenter`. |
| `anchor` | `string` | The anchor direction for positioning: `'top'`, `'bottom'`, `'left'`, or `'right'`. Defaults to `'top'`. |
| `tooltipElem` | `HTMLElement \| undefined` | The currently rendered tooltip DOM element, if visible. |

### Methods

#### `constructor()`
```ts
function constructor(targetElem: HTMLElement, callback: (elem: HTMLElement) => string, anchor?: string): void
```
Stores the target element, callback, and anchor. Calls `bindInputEvents()` to register mouse listeners.

#### `getTargetElem()`
```ts
function getTargetElem(): HTMLElement
```
Returns the target element.

#### `setAnchor()`
```ts
function setAnchor(anchor: string): void
```
Updates the anchor direction.

#### `hide()`
```ts
function hide(): void
```
Removes the tooltip element from the DOM and deletes the reference.

#### `bindInputEvents()`
```ts
function bindInputEvents(): void
```
Registers `mouseenter` and `mouseleave` listeners on the target element. On `mouseenter`, invokes the callback to generate tooltip HTML, inserts it into `document.body`, and positions it based on the anchor direction using the target's `getBoundingClientRect()`. On `mouseleave`, calls `hide()`.
