# zombs.io Wiki
Welcome to the zombs.io Wiki repository! Here are some things you should know before contributing to the project.

## Important Notes

### Credits
- Giving credits for others **must** be done if the content is not made by yourself.
- Noting yourself as the writer for your pages is recommended (but not a requirement).
- Writer / Credits notes should be at the end of a page.

### Using AI agents
Usage of AI agents to write documentation is permitted (and in fact, encouraged to speed up writing). This project provides an `AGENTS.md` to help your AI agents write more accurately without / with minor modifications afterwards.

## Contribution Guide

### Prerequisites
- Some knowledge of Markdown (.md) files
- Basic understanding of GitHub (making pull requests, resolving merge conflicts, etc.)

### Contributing

#### 0) Recommendations
- [GitHub Desktop](https://desktop.github.com/download/) is recommended to make `git` actions more friendly.

#### 1) Fork this repository
Click the "Fork" button right next to the "Star" button. (and you should also star this repo while you're at it, thank you :))

#### 2) Clone your fork to local
Use `git` on your machine to clone your fork.

#### 3.1) Start writing
- Markdown files for each page (adjacent to their actual route) are placed inside `/src`, and static assets are placed inside `/src/public` (see [Website layout](#website-layout)).
- If you are writing a new page, make sure to also change the configuration in `.vitepress/config.mts`.

#### 3.2) Run a preview of your work
- Dependencies required: [pnpm](https://pnpm.io/installation), [Node.js](https://nodejs.org/en/download).
- Run a local preview:
```sh
pnpm run docs:dev
```
- Navigate to the link provided by the command above to see the preview website.

#### 4) Create a pull request
Commit your edits to your fork, then go to your fork on GitHub and open a new pull request.

#### 5) Resolve merge conflicts (if any) and wait for PR approval

#### 6) Done!

### Writing tips
- Add badges to indicate classes being "public" or "private" while documenting the engine, if possible (use `type: tip` for public, `type: danger` for private).
- Keep the formatting consistent (check `AGENTS.md` for a more systematic format guideline).

#### Markdown extensions
Here are some markdown extensions that you can use to make your pages look even more perfect.

##### Tables

```md
| Head1 | Head2 | ... |
| :--- | :--- | :--- |
| data1 | data2 | ... |
| ... | ... | ... |
```

##### Containers
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

##### Badges
You may want to use these badges when necessary.

```md

### Title <Badge type="info" text="info" />
### Title <Badge type="tip" text="tip" />
### Title <Badge type="warning" text="warning" />
### Title <Badge type="danger" text="danger" />

```

## Project structure

### Website layout
```
src/
├── bugs
│   ├── active
│   │   ├── minor_bugs.md
│   │   ├── odd_zombie_spawn.md
│   │   └── rss_go_poof.md
│   ├── inactive
│   │   ├── blank_wave.md
│   │   ├── carl_healing.md
│   │   ├── minor_bugs.md
│   │   ├── tower_buff.md
│   │   ├── tower_heal.md
│   │   ├── tower_nerf.md
│   │   └── undying_zombs.md
│   └── overview.md
├── engine
│   ├── main
│   │   ├── input
│   │   │   ├── inputManager.md
│   │   │   ├── inputPacketCreator.md
│   │   │   └── inputPacketScheduler.md
│   │   ├── renderer
│   │   │   └── renderer.md
│   │   ├── ui
│   │   │   ├── components
│   │   │   │   ├── UiChat.md
│   │   │   │   └── UiComponent.md
│   │   │   └── ui.md
│   │   ├── network.md
│   │   └── world.md
│   ├── utils
│   │   ├── assetManager.md
│   │   ├── debug.md
│   │   ├── metrics.md
│   │   ├── platform.md
│   │   └── util.md
│   ├── game.md
│   ├── overview.md
│   └── schema.md
├── exploit
│   └── inactive
│       ├── pet_olympics.md
│       └── skill_point.md
├── game
│   └── buildings
│       ├── arrow_tower.md
│       ├── bomb_tower.md
│       ├── buildings.md
│       ├── cannon_tower.md
│       ├── door.md
│       ├── gold_mine.md
│       ├── gold_stash.md
│       ├── harvester.md
│       ├── mage_tower.md
│       ├── melee_tower.md
│       ├── slow_trap.md
│       └── wall.md
├── intro
│   └── introduction.md
├── mbf
│   └── overview.md
├── misc
│   └── records.md
└── index.md
```

### Website assets

```
src/public/
├── asset
│   ├── bugs
│   │   ├── active
│   │   │   ├── odd_zombie_spawn
│   │   │   │   ├── weird_spawn_again.png
│   │   │   │   └── weird_spawn.png
│   │   │   └── rss_go_poof
│   │   │       ├── rock.png
│   │   │       └── spotinfo.png
│   │   └── inactive
│   │       ├── blank_wave
│   │       │   └── no_zombs.png
│   │       ├── carl_healing
│   │       │   ├── healing_carl_2.png
│   │       │   └── healing_carl.png
│   │       ├── minor_bugs
│   │       │   └── harvester_overflow.png
│   │       ├── tower_buff
│   │       │   ├── buffed_corner.png
│   │       │   ├── buffed_env.png
│   │       │   ├── deathscore.png
│   │       │   ├── deathwave.png
│   │       │   ├── erokscore.png
│   │       │   ├── lowspw.png
│   │       │   ├── newbie.png
│   │       │   ├── tower_buff_proj.png
│   │       │   └── woodybuff.png
│   │       ├── tower_heal
│   │       │   ├── t1033_heal.png
│   │       │   └── t9_heal.png
│   │       └── undying_zombs
│   │           ├── 4_colours.png
│   │           ├── boss.png
│   │           ├── graph1.png
│   │           ├── graph2.png
│   │           ├── nohp.png
│   │           ├── undead_pile.png
│   │           └── zombies.png
│   ├── engine
│   │   ├── overview
│   │   │   └── game.png
│   │   ├── schema
│   │   │   ├── buildings.json
│   │   │   ├── entities.json
│   │   │   ├── items.json
│   │   │   └── spells.json
│   │   └── utils
│   │       └── assetManager
│   │           └── files.json
│   ├── exploit
│   │   └── inactive
│   │       └── skill_point
│   │           ├── jeremy_1.png
│   │           └── jeremy_2.png
│   ├── game
│   │   └── buildings
│   │       └── building_bar.png
│   ├── intro
│   │   └── introduction
│   │       ├── homepage.png
│   │       ├── party1.png
│   │       ├── party2.png
│   │       └── ui.png
│   └── mbf
│       └── overview
│           ├── error_1.png
│           └── mbf.jpg
├── logo.svg
└── robots.txt
```
