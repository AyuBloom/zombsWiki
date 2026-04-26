import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zombs.io Wiki",
  description: "Wiki for everything zombs.io",
  sitemap: {
    hostname: "https://ayubloom.github.io/zombsWiki/",
  },
  base: "/zombsWiki/",
  srcDir: "src",
  head: [
    ["link", { rel: "icon", href: "/zombsWiki/logo.svg" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    outline: "deep",

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/AyuBloom/zombsWiki/edit/main/src/:path",
    },

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Welcome", link: "/" },
          { text: "What is zombs.io?", link: "/intro/introduction" },
        ],
      },
      {
        text: "Engine",
        items: [
          { text: "Overview", link: "/engine/overview" },
          {
            text: "Main Components",
            items: [
              {
                text: "ui",
                items: [{ text: "ui", link: "/engine/main/ui/ui" }],
                collapsed: true,
              },
              { text: "world", link: "/engine/main/world" },
              { text: "network", link: "/engine/main/network" },
              { text: "renderer", link: "/engine/main/renderer" },
              { text: "inputManager", link: "/engine/main/inputManager" },
              {
                text: "inputPacketCreator",
                link: "/engine/main/inputPacketCreator",
              },
              {
                text: "inputPacketScheduler",
                link: "/engine/main/inputPacketScheduler",
              },
            ],
            collapsed: true,
          },
          {
            text: "Utility Components",
            items: [
              { text: "assetManager", link: "/engine/utils/assetManager" },
              { text: "debug", link: "/engine/utils/debug" },
              { text: "metrics", link: "/engine/utils/metrics" },
              { text: "platform", link: "/engine/utils/platform" },
              { text: "util", link: "/engine/utils/util" },
            ],
            collapsed: true,
          },
        ],
      },
      {
        text: "Game",
        items: [
          {
            text: "Buildings",
            items: [
              { text: "Overview", link: "/game/buildings/buildings.md" },
              { text: "Wall", link: "/game/buildings/wall.md" },
              { text: "Door", link: "/game/buildings/door.md" },
              { text: "Trap", link: "/game/buildings/slow_trap.md" },
              { text: "Arrow Tower", link: "/game/buildings/arrow_tower.md" },
              { text: "Cannon Tower", link: "/game/buildings/cannon_tower.md" },
              { text: "Melee Tower", link: "/game/buildings/melee_tower.md" },
              { text: "Bomb Tower", link: "/game/buildings/bomb_tower.md" },
              { text: "Mage Tower", link: "/game/buildings/mage_tower.md" },
              { text: "Gold Mine", link: "/game/buildings/gold_mine.md" },
              { text: "Harvester", link: "/game/buildings/harvester.md" },
              { text: "Gold Stash", link: "/game/buildings/gold_stash.md" },
            ],
            collapsed: true,
          },
        ],
      },
      {
        text: "MakeBlendField",
        items: [{ text: "Overview", link: "/mbf/overview" }],
      },
      {
        text: "Bugs",
        items: [
          { text: "Overview", link: "/bugs/overview" },
          {
            text: "Active Bugs",
            items: [
              {
                text: "Disappearing Resources",
                link: "/bugs/active/rss_go_poof",
              },
            ],
            collapsed: true,
          },
          {
            text: "Inactive / Old Bugs",
            items: [{ text: "Tower Heal", link: "/bugs/inactive/tower_heal" }],
            collapsed: true,
          },
        ],
      },
      {
        text: "Miscellaneous",
        items: [{ text: "World Records", link: "/misc/records" }],
      },
    ],

    logo: "/logo.svg",

    socialLinks: [
      { icon: "github", link: "https://github.com/AyuBloom/zombsWiki" },
      { icon: "discord", link: "https://discord.gg/Wm7khMgzUe" },
    ],

    lastUpdated: { formatOptions: { dateStyle: "long", timeStyle: "short" } },
  },
});
