---
title: UiChat - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        The UiChat class manages the in-game chat interface. It handles sending,
        receiving, and displaying chat messages with built-in XSS sanitization
        (using xss) and profanity filtering (using grawlix and grawlix-racism).
  - - meta
    - name: 'og:description'
      content: >-
        The UiChat class manages the in-game chat interface. It handles sending,
        receiving, and displaying chat messages with built-in XSS sanitization
        (using xss) and profanity filtering (using grawlix and grawlix-racism).
---

# `UiChat`

The `UiChat` class manages the in-game chat interface. It handles sending, receiving, and displaying chat messages with built-in XSS sanitization (using `xss`) and profanity filtering (using `grawlix` and `grawlix-racism`).

## `UiChat` <Badge type="danger" text="private" />

Extends `UiComponent`.

### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| `ui` | `Ui` | Current `Ui` instance. Inherited from `UiComponent`. |
| `componentElem` | `HTMLElement` | The root `#hud-chat` DOM element. Inherited from `UiComponent`. |
| `messageInputElem` | `HTMLInputElement` | The `.hud-chat-input` text input element. Max length of 140 characters. |
| `messagesElem` | `HTMLElement` | The `.hud-chat-messages` container that holds all received message elements. |

### Methods

#### `constructor()`
```ts
function constructor(ui: Ui): void
```
Initializes the chat component with its HTML template, queries for the input and messages elements, binds event listeners for `blur` and `keyup`, registers the `ReceiveChatMessage` RPC handler, and configures `grawlix` with the `grawlix-racism` plugin.

#### `startTyping()`
```ts
function startTyping(): void
```
Activates the chat input by adding the `is-focused` CSS class to the component element and focusing the input field.

#### `cancelTyping()`
```ts
function cancelTyping(): void
```
Deactivates the chat input by removing the `is-focused` CSS class and blurring the input field.

#### `sendMessage()`
```ts
function sendMessage(message: string): void
```
Sends a chat message to the `Local` channel via the `SendChatMessage` RPC. If the message is empty or whitespace-only, typing is cancelled and no message is sent. After sending, typing is cancelled asynchronously.

::: tip Trivia

There used to be a "Global" chat channel but it was removed due to abuse. Check [Inactive / Old Bugs > Global Chat](/architecture/exploit/inactive/global_chat) for more info.

:::

#### `onMessageInputBlur()`
```ts
function onMessageInputBlur(event: FocusEvent): void
```
Handles the `blur` event on the message input. Calls `cancelTyping()`.

#### `onMessageKeyUp()`
```ts
function onMessageKeyUp(event: KeyboardEvent): void
```
Handles the `keyup` event on the message input. Pressing `Escape` cancels typing. Pressing `Enter` sends the current message and clears the input.

#### `onMessageReceived()`
```ts
function onMessageReceived(response: { displayName: string, message: string }): void
```
Handles incoming `ReceiveChatMessage` RPCs. Sanitizes both `displayName` and `message` with `xss` and `grawlix`, creates a new message element, appends it to the messages container, and scrolls to the bottom.
