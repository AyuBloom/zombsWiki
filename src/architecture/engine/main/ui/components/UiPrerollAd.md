---
title: UiPrerollAd - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiPrerollAd - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiPrerollAd class is a minimal UI component that serves as a
        container for pre-roll advertisements. It has no additional logic beyond
        the base UiComponent.
  - - meta
    - property: 'og:description'
      content: >-
        The UiPrerollAd class is a minimal UI component that serves as a
        container for pre-roll advertisements. It has no additional logic beyond
        the base UiComponent.
---

# `UiPrerollAd`

The `UiPrerollAd` class is a minimal UI component that serves as a container for pre-roll advertisements. It has no additional logic beyond the base `UiComponent`.

## `UiPrerollAd` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-preroll-ad` DOM element. Inherited from `UiComponent`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the pre-roll ad container with an empty `#hud-preroll-ad` element.
