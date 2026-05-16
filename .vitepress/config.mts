import { defineConfig } from "vitepress";
import llmstxt, {
  copyOrDownloadAsMarkdownButtons,
} from "vitepress-plugin-llms";

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

    // seo stuff
    [
			'meta',
			{
				name: 'viewport',
				content: 'width=device-width,initial-scale=1,user-scalable=no'
			}
    ],
    [
      'link',
      {
        rel: "icon",
        href: "/zombsWiki/logo.svg"
      }
    ],
		[
			'meta',
			{
				property: 'og:image',
				content: '/zombsWiki/cover.png'
			}
		],
		[
			'meta',
			{
				property: 'og:image:width',
				content: '800'
			}
		],
		[
			'meta',
			{
				property: 'og:image:height',
				content: '384'
			}
		],
		[
			'meta',
			{
				property: 'twitter:card',
				content: 'summary_large_image'
			}
		],
		[
			'meta',
			{
				property: 'twitter:image',
				content: '/zombsWiki/cover.png'
			}
		],
		[
			'meta',
			{
				property: 'og:title',
				content: 'zombs.io Wiki'
			}
		],
		[
			'meta',
			{
				property: 'og:description',
				content: "Wiki for everything zombs.io"
			}
		],
		[
			'link',
			{
				rel: 'canonical',
				href: 'https://ayubloom.github.io/zombsWiki/'
			}
		]
  ],

  vite: {
    plugins: [llmstxt()],
  },

  markdown: {
    config(md) {
      md.use(copyOrDownloadAsMarkdownButtons);
    },
  },

  // ignoreDeadLinks: true,

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
        items: [{ text: "Welcome", link: "/" }],
      },
      {
        text: "Architecture",
        items: [
          {
            text: "Engine",
            items: [
              { text: "Overview", link: "/architecture/engine/overview" },
              { text: "game", link: "/architecture/engine/game" },
              {
                text: "Main Components",
                items: [
                  {
                    text: "ui",
                    items: [
                      { text: "ui", link: "/architecture/engine/main/ui/ui" },
                      {
                        text: "UI Styles",
                        link: "/architecture/engine/main/ui/styles",
                      },
                      {
                        text: "UI Components",
                        items: [
                          {
                            text: "UiComponent",
                            link: "/architecture/engine/main/ui/components/UiComponent",
                          },
                          {
                            text: "UiAnnouncementOverlay",
                            link: "/architecture/engine/main/ui/components/UiAnnouncementOverlay",
                          },
                          {
                            text: "UiBuffBar",
                            link: "/architecture/engine/main/ui/components/UiBuffBar",
                          },
                          {
                            text: "UiBuildingOverlay",
                            link: "/architecture/engine/main/ui/components/UiBuildingOverlay",
                          },
                          {
                            text: "UiChat",
                            link: "/architecture/engine/main/ui/components/UiChat",
                          },
                          {
                            text: "UiDayNightOverlay",
                            link: "/architecture/engine/main/ui/components/UiDayNightOverlay",
                          },
                          {
                            text: "UiDayNightTicker",
                            link: "/architecture/engine/main/ui/components/UiDayNightTicker",
                          },
                          {
                            text: "UiHealthBar",
                            link: "/architecture/engine/main/ui/components/UiHealthBar",
                          },
                          {
                            text: "UiIntro",
                            link: "/architecture/engine/main/ui/components/UiIntro",
                          },
                          {
                            text: "UiLeaderboard",
                            link: "/architecture/engine/main/ui/components/UiLeaderboard",
                          },
                          {
                            text: "UiMap",
                            link: "/architecture/engine/main/ui/components/UiMap",
                          },
                          {
                            text: "UiMenuIcons",
                            link: "/architecture/engine/main/ui/components/UiMenuIcons",
                          },
                          {
                            text: "UiMenuParty",
                            link: "/architecture/engine/main/ui/components/UiMenuParty",
                          },
                          {
                            text: "UiMenuSettings",
                            link: "/architecture/engine/main/ui/components/UiMenuSettings",
                          },
                          {
                            text: "UiMenuShop",
                            link: "/architecture/engine/main/ui/components/UiMenuShop",
                          },
                          {
                            text: "UiPartyIcons",
                            link: "/architecture/engine/main/ui/components/UiPartyIcons",
                          },
                          {
                            text: "UiPipOverlay",
                            link: "/architecture/engine/main/ui/components/UiPipOverlay",
                          },
                          {
                            text: "UiPlacementOverlay",
                            link: "/architecture/engine/main/ui/components/UiPlacementOverlay",
                          },
                          {
                            text: "UiPopupOverlay",
                            link: "/architecture/engine/main/ui/components/UiPopupOverlay",
                          },
                          {
                            text: "UiPrerollAd",
                            link: "/architecture/engine/main/ui/components/UiPrerollAd",
                          },
                          {
                            text: "UiReconnect",
                            link: "/architecture/engine/main/ui/components/UiReconnect",
                          },
                          {
                            text: "UiResources",
                            link: "/architecture/engine/main/ui/components/UiResources",
                          },
                          {
                            text: "UiRespawn",
                            link: "/architecture/engine/main/ui/components/UiRespawn",
                          },
                          {
                            text: "UiShieldBar",
                            link: "/architecture/engine/main/ui/components/UiShieldBar",
                          },
                          {
                            text: "UiShopItem",
                            link: "/architecture/engine/main/ui/components/UiShopItem",
                          },
                          {
                            text: "UiShopHatItem",
                            link: "/architecture/engine/main/ui/components/UiShopHatItem",
                          },
                          {
                            text: "UiShopPetItem",
                            link: "/architecture/engine/main/ui/components/UiShopPetItem",
                          },
                          {
                            text: "UiSpellIcons",
                            link: "/architecture/engine/main/ui/components/UiSpellIcons",
                          },
                          {
                            text: "UiSpellOverlay",
                            link: "/architecture/engine/main/ui/components/UiSpellOverlay",
                          },
                          {
                            text: "UiToolbar",
                            link: "/architecture/engine/main/ui/components/UiToolbar",
                          },
                          {
                            text: "UiToolbarBuilding",
                            link: "/architecture/engine/main/ui/components/UiToolbarBuilding",
                          },
                          {
                            text: "UiToolbarItem",
                            link: "/architecture/engine/main/ui/components/UiToolbarItem",
                          },
                          {
                            text: "UiTooltip",
                            link: "/architecture/engine/main/ui/components/UiTooltip",
                          },
                          {
                            text: "UiWalkthrough",
                            link: "/architecture/engine/main/ui/components/UiWalkthrough",
                          },
                        ],
                        collapsed: true,
                      },
                    ],
                    collapsed: true,
                  },
                  {
                    text: "world",
                    items: [
                      {
                        text: "world",
                        link: "/architecture/engine/main/world/world",
                      },
                      {
                        text: "entityGrid",
                        link: "/architecture/engine/main/world/entityGrid",
                      },
                      {
                        text: "localPlayer",
                        link: "/architecture/engine/main/world/localPlayer",
                      },
                      {
                        text: "replicator",
                        link: "/architecture/engine/main/world/replicator",
                      },
                    ],
                    collapsed: true,
                  },
                  {
                    text: "network",
                    link: "/architecture/engine/main/network",
                  },
                  {
                    text: "renderer",
                    items: [
                      {
                        text: "renderer",
                        link: "/architecture/engine/main/renderer/renderer",
                      },
                      {
                        text: "Entity Types",
                        items: [
                          {
                            text: "Entity",
                            link: "/architecture/engine/main/renderer/entity_types/Entity",
                          },
                          {
                            text: "NetworkEntity",
                            link: "/architecture/engine/main/renderer/entity_types/NetworkEntity",
                          },
                          {
                            text: "ModelEntity",
                            link: "/architecture/engine/main/renderer/entity_types/ModelEntity",
                          },
                          {
                            text: "GroundEntity",
                            link: "/architecture/engine/main/renderer/entity_types/GroundEntity",
                          },
                          {
                            text: "SpriteEntity",
                            link: "/architecture/engine/main/renderer/entity_types/SpriteEntity",
                          },
                          {
                            text: "DrawEntity",
                            link: "/architecture/engine/main/renderer/entity_types/DrawEntity",
                          },
                          {
                            text: "TextEntity",
                            link: "/architecture/engine/main/renderer/entity_types/TextEntity",
                          },
                        ],
                        collapsed: true,
                      },
                      {
                        text: "Entity Models",
                        items: [
                          {
                            text: "TowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/TowerModel",
                          },
                          {
                            text: "WallModel",
                            link: "/architecture/engine/main/renderer/entity_models/WallModel",
                          },
                          {
                            text: "DoorModel",
                            link: "/architecture/engine/main/renderer/entity_models/DoorModel",
                          },
                          {
                            text: "SlowTrapModel",
                            link: "/architecture/engine/main/renderer/entity_models/SlowTrapModel",
                          },
                          {
                            text: "ArrowTowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/ArrowTowerModel",
                          },
                          {
                            text: "CannonTowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/CannonTowerModel",
                          },
                          {
                            text: "MeleeTowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/MeleeTowerModel",
                          },
                          {
                            text: "BombTowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/BombTowerModel",
                          },
                          {
                            text: "MageTowerModel",
                            link: "/architecture/engine/main/renderer/entity_models/MageTowerModel",
                          },
                          {
                            text: "GoldMineModel",
                            link: "/architecture/engine/main/renderer/entity_models/GoldMineModel",
                          },
                          {
                            text: "HarvesterModel",
                            link: "/architecture/engine/main/renderer/entity_models/HarvesterModel",
                          },
                          {
                            text: "GoldStashModel",
                            link: "/architecture/engine/main/renderer/entity_models/GoldStashModel",
                          },
                          {
                            text: "CharacterModel",
                            link: "/architecture/engine/main/renderer/entity_models/CharacterModel",
                          },
                          {
                            text: "PlayerModel",
                            link: "/architecture/engine/main/renderer/entity_models/PlayerModel",
                          },
                          {
                            text: "HealthBar",
                            link: "/architecture/engine/main/renderer/entity_models/HealthBar",
                          },
                          {
                            text: "ShieldBar",
                            link: "/architecture/engine/main/renderer/entity_models/ShieldBar",
                          },
                          {
                            text: "ExperienceBar",
                            link: "/architecture/engine/main/renderer/entity_models/ExperienceBar",
                          },
                          {
                            text: "ZombieModel",
                            link: "/architecture/engine/main/renderer/entity_models/ZombieModel",
                          },
                          {
                            text: "ZombieBossModel",
                            link: "/architecture/engine/main/renderer/entity_models/ZombieBossModel",
                          },
                          {
                            text: "ZombieRangedModel",
                            link: "/architecture/engine/main/renderer/entity_models/ZombieRangedModel",
                          },
                          {
                            text: "HealTowersSpellModel",
                            link: "/architecture/engine/main/renderer/entity_models/HealTowersSpellModel",
                          },
                          {
                            text: "PlacementIndicatorModel",
                            link: "/architecture/engine/main/renderer/entity_models/PlacementIndicatorModel",
                          },
                          {
                            text: "RangeIndicatorModel",
                            link: "/architecture/engine/main/renderer/entity_models/RangeIndicatorModel",
                          },
                        ],
                        collapsed: true,
                      },
                    ],
                    collapsed: true,
                  },
                  {
                    text: "input",
                    items: [
                      {
                        text: "inputManager",
                        link: "/architecture/engine/main/input/inputManager",
                      },
                      {
                        text: "inputPacketCreator",
                        link: "/architecture/engine/main/input/inputPacketCreator",
                      },
                      {
                        text: "inputPacketScheduler",
                        link: "/architecture/engine/main/input/inputPacketScheduler",
                      },
                    ],
                    collapsed: true,
                  },
                ],
                collapsed: true,
              },
              {
                text: "Utility Components",
                items: [
                  {
                    text: "assetManager",
                    link: "/architecture/engine/utils/assetManager",
                  },
                  { text: "debug", link: "/architecture/engine/utils/debug" },
                  {
                    text: "metrics",
                    link: "/architecture/engine/utils/metrics",
                  },
                  {
                    text: "platform",
                    link: "/architecture/engine/utils/platform",
                  },
                  { text: "util", link: "/architecture/engine/utils/util" },
                ],
                collapsed: true,
              },
              {
                text: "_MakeBlendField",
                items: [
                  {
                    text: "Overview",
                    link: "/architecture/engine/mbf/overview",
                  },
                ],
                collapsed: true,
              },
              { text: "Schemas", link: "/architecture/engine/schema" },
              {
                text: "Data Interfaces",
                link: "/architecture/engine/data_interfaces",
              },
            ],
            collapsed: true,
          },
          {
            text: "Exploits",
            items: [
              { text: "Overview", link: "/architecture/exploit/overview" },
              {
                text: "Active Exploits",
                items: [
                  {
                    text: "Downgrading Items",
                    link: "/architecture/exploit/active/downgrade",
                  },
                ],
                collapsed: true,
              },
              {
                text: "Inactive / Patched Exploits",
                items: [
                  {
                    text: "Skill Points",
                    link: "/architecture/exploit/inactive/skill_point",
                  },
                  {
                    text: "Speed Pets",
                    link: "/architecture/exploit/inactive/pet_olympics",
                  },
                ],
                collapsed: true,
              },
            ],
            collapsed: true,
          },
        ],
      },
      {
        text: "Gameplay",
        items: [
          {
            text: "Game",
            items: [
              { text: "Introduction", link: "/gameplay/game/introduction" },
              { text: "Changelog", link: "/gameplay/game/changelog" },
              {
                text: "Buildings",
                items: [
                  {
                    text: "Overview",
                    link: "/gameplay/game/buildings/buildings",
                  },
                  { text: "Wall", link: "/gameplay/game/buildings/wall" },
                  { text: "Door", link: "/gameplay/game/buildings/door" },
                  {
                    text: "Trap",
                    link: "/gameplay/game/buildings/slow_trap",
                  },
                  {
                    text: "Arrow Tower",
                    link: "/gameplay/game/buildings/arrow_tower",
                  },
                  {
                    text: "Cannon Tower",
                    link: "/gameplay/game/buildings/cannon_tower",
                  },
                  {
                    text: "Melee Tower",
                    link: "/gameplay/game/buildings/melee_tower",
                  },
                  {
                    text: "Bomb Tower",
                    link: "/gameplay/game/buildings/bomb_tower",
                  },
                  {
                    text: "Mage Tower",
                    link: "/gameplay/game/buildings/mage_tower",
                  },
                  {
                    text: "Harvester",
                    link: "/gameplay/game/buildings/harvester",
                  },
                  {
                    text: "Gold Mine",
                    link: "/gameplay/game/buildings/gold_mine",
                  },
                  {
                    text: "Gold Stash",
                    link: "/gameplay/game/buildings/gold_stash",
                  },
                ],
                collapsed: true,
              },
              {
                text: "Zombies",
                link: "/gameplay/game/zombies",
              },
            ],
            collapsed: true,
          },
          {
            text: "Bugs",
            items: [
              { text: "Overview", link: "/gameplay/bugs/overview" },
              {
                text: "Active Bugs",
                items: [
                  {
                    text: "Disappearing Resources",
                    link: "/gameplay/bugs/active/rss_go_poof",
                  },
                  {
                    text: "Odd Zombie Spawning",
                    link: "/gameplay/bugs/active/odd_zombie_spawn",
                  },
                  {
                    text: "Minor Bugs",
                    link: "/gameplay/bugs/active/minor_bugs",
                  },
                ],
                collapsed: true,
              },
              {
                text: "Inactive / Old Bugs",
                items: [
                  {
                    text: "Tower Heal",
                    link: "/gameplay/bugs/inactive/tower_heal",
                  },
                  {
                    text: "Wave 14 - No zombies",
                    link: "/gameplay/bugs/inactive/blank_wave",
                  },
                  {
                    text: "C.A.R.L. Healing",
                    link: "/gameplay/bugs/inactive/carl_healing",
                  },
                  {
                    text: "Tower Buff",
                    link: "/gameplay/bugs/inactive/tower_buff",
                  },
                  {
                    text: "Tower Nerf",
                    link: "/gameplay/bugs/inactive/tower_nerf",
                  },
                  {
                    text: "Undying Zombies",
                    link: "/gameplay/bugs/inactive/undying_zombs",
                  },
                  {
                    text: "Minor Bugs",
                    link: "/gameplay/bugs/inactive/minor_bugs",
                  },
                ],
                collapsed: true,
              },
            ],
            collapsed: true,
          },
          {
            text: "Scripting",
            items: [
              {
                text: "Overview",
                link: "/gameplay/scripts/overview",
              },
              {
                text: "Fundamentals",
                items: [
                  {
                    text: "Disconnection Triggers",
                    link: "/gameplay/scripts/fundamentals/dc_triggers",
                  },
                ],
                collapsed: true,
              },
              {
                text: "Popular Scripts",
                items: [
                  {
                    text: "Overview",
                    link: "/gameplay/scripts/popular_scripts/overview",
                  },
                  {
                    text: "Xeraphinite",
                    link: "/gameplay/scripts/popular_scripts/xera",
                  },
                ],
                collapsed: true,
              },
            ],
            collapsed: true,
          },
        ],
      },
      {
        text: "Community",
        items: [
          { text: "World Records", link: "/community/records" },
          { text: "Common Terms", link: "/community/terms" },
        ],
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
