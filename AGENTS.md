# Zombs.io Documentation Agent Guide

This project is a documentation website built for a 2D multiplayer survival game on the web called zombs.io.

## Technology Stack

- **Framework**: [VitePress](https://vitepress.dev/) (with plugins: [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms))
- **Package Manager**: `pnpm`

## Project Structure
```
zombsWiki/
├── .vitepress/           # VitePress configuration
│   ├── theme/                # VitePress themes
│   │   ├── custom.css            # Custom CSS styles for VitePress
│   │   └── index.ts              # Theme configuration for VitePress
│   └── config.mts            # General configuration for VitePress
├── scripts
│   └── generate-structure.mjs    # GitHub CI script to generate the project's strcture on commit in zombsWiki/README.md
└── src/                  # All the .md files on the website, presented as routes
    ├── .../                  # .md files en-route
    ├── index.md              # Homepage of the website
    └── public/               # Entry point of all public 
        └── assets/               # Entry point of all assets 
```

## Common Commands

- `pnpm run docs:dev`: Starts the development server.
- `pnpm run docs:build`: Builds the production application.

## Documentation Format

### Important Formatting Guidelines
- Do not use `---` to seperate each section.
- With every new page you create, add the page to the sidebar in `.vitepress/config.mts` if the user haven't already.

### Engine Documentation Format

The following page format is recommended, but not obligated as it does not handle edge cases.

```md
# `className` <!-- headers are case-sensitive -->

descriptionParagraph

## `ClassName`

Extends `ClassName`. <!-- if applicable -->

### Properties
<!-- ... -->

### Methods
<!-- ... -->

<!-- 
    more parts can be added here, or inbetween the two above:
    - "Getters & Setters" - only add this if there are too many getters and setters
    - "Emitters", "Event Handlers" - only add this if the class has many functions that emit internal game engine events / are event handlers for engine events
    - etc...
-->

```

### When writing methods

````md

#### `methodName()`
```ts
function methodName(parameter: type): returnValue
```

````

### When writing tables

```md
| Head1 | Head2 | ... |
| :--- | :--- | :--- |
| data1 | data2 | ... |
| ... | ... | ... |
```

## Containers
You may want to use these containers when addressing a property in detail, etc.

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

## Badges

You may want to use these badges when necessary.

```md

### Title <Badge type="info" text="info" />
### Title <Badge type="tip" text="tip" />
### Title <Badge type="warning" text="warning" />
### Title <Badge type="danger" text="danger" />

```

## Embedding content for LLMs only or Humans only

### LLMs-only content

```md

<llm-only>

## Section for LLMs

This content appears only in the generated LLMs files without the `<llm-only>` tag

</llm-only>

```
### Humans-only content

```md
Check out the Plugins API Guide for documentation about creating plugins.

<llm-exclude> Note only for humans </llm-exclude>
```
