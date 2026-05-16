---
title: UiAnnouncementOverlay - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: UiAnnouncementOverlay - zombs.io Wiki
  - - meta
    - name: description
      content: >-
        The UiAnnouncementOverlay class displays temporary announcement messages
        on the HUD. Announcements are shown for 8 seconds before being
        automatically removed.
  - - meta
    - property: 'og:description'
      content: >-
        The UiAnnouncementOverlay class displays temporary announcement messages
        on the HUD. Announcements are shown for 8 seconds before being
        automatically removed.
---

# `UiAnnouncementOverlay`

The `UiAnnouncementOverlay` class displays temporary announcement messages on the HUD. Announcements are shown for 8 seconds before being automatically removed.

## `UiAnnouncementOverlay` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-announcement-overlay` DOM element. Inherited from `UiComponent`. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the announcement overlay with an empty `#hud-announcement-overlay` container element.

#### `showAnnouncement()`
```ts
function showAnnouncement(message: string): void
```
Creates a new `.hud-announcement-message` element containing the given message, appends it to the overlay container, and schedules its removal after 8000ms.
