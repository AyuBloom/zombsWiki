# Mage Tower
**Mage Tower** is a type of Tower. This tower shoots 3 projectiles at once at a distance of 4-5 tiles, dealing very high knockback to zombies. Only Tier 8 Mage can shoot an extra projectile. Mage towers are pretty effective with a couple larger zombies but will struggle against large waves.

<ImageWithDescription image="/asset/image/ui/entities/entities-mage-tower.svg" description="Tier 1 Mage Tower" />

## Overview

- Description: `"Multiple projectile, short range, fast firing tower."`
- They have the size of 2x2 in-game cells.
- Requires 15 Wood and 15 Stone to place.
- You can place 6 Mages (per party member, 24 total).
- They shoot 3 projectiles at once; tier 8 shoots 4.

## Stats
| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Damage<hr>to Zombies | Damage<hr>to Players | Damage<hr>to Pets | Damage<hr>to Neutral | Projectile<hr>Lifetime | Projectile<hr>Velocity | Projectile<hr>AOE Radius | Projectile<hr>Collision Radius | Others<hr>Range | Others<hr> Firerate |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 |  | 15 | 15 | - | 150 | 10s | 2 | 10 | 5 | 5 | 250 | 500ms | 45 | 100px | 10px | 400px | 1.25/s  |
| 2 |  | 25 | 25 | 100 | 200 | 10s | 5 | 20 | 5 | 5 | 350 | 500ms | 45 | 100px | 10px | 400px | 1.25/s  |
| 3 |  | 40 | 40 | 200 | 400 | 10s | 10 | 40 | 5 | 5 | 450 | 500ms | 45 | 100px | 10px | 400px | 1.42/s  |
| 4 |  | 50  | 50 | 600 | 800 | 10s | 20 | 50 | 6 | 5 | 550 | 500ms | 45 | 100px | 10px | 400px | 1.66/s  |
| 5 |  | 70 | 70 | 1,200 | 1,200 | 10s | 40 | 70 | 6 | 5 | 650 | 500ms | 45 | 100px | 10px | 400px | 2/s  |
| 6 |  | 100 | 100 | 2,000 | 1,600 | 10s | 80 | 80 | 6 | 5 | 750 | 500ms | 45 | 100px | 10px | 400px | 2.5/s  |
| 7 |  | 300 | 300 | 8,000 | 2,200 | 10s | 110 | 120 | 7 | 5 | 850 | 500ms | 45 | 100px | 10px | 400px | 3.33/s  |
| 8 |  | 800 | 800 | 35,000 | 3,600 | 10s | 150 | 160 | 7 | 5 | 1,000 | 500ms | 45 | 100px | 10px | 400px | 3.33/s  |

## Changelog

### December 11, 2023 - Minor Update
```md{1}
- Magic towers now fire 4 projectiles at max tier
- Local bans are now cleared every hour (global bans still clear monthly)
- Bomb tower and melee tower received a buff
```

### November 20, 2021 - Minor Update
```md{6}
- Decrease spear damage to buildings from [3, 3.5, 4, 4.5, 5, 5.5, 5.5] to [0.75, 1.50, 2.25, 3, 3.75, 4.5, 5.25]
- Increase spear gold costs from [100, 400, 3000, 5000, 25000, 35000, 90000] to [1400, 2800, 5600, 11200, 22500, 45000, 90000]
- Cannon tower damage to players increased from [5, 5, 5, 5, 5, 5, 6, 8] to [5, 5, 6, 6, 7, 7, 8, 8]
- Arrow tower damage to players increased from [5, 5, 5, 5, 5, 5, 6, 6] to [5, 5, 6, 6, 7, 7, 8, 8]
- Bomb tower damage to players increased from [10, 10, 10, 10, 10, 10, 10, 10] to [9, 9, 10, 10, 11, 11, 12, 12]
- Magic tower damage to players increased from [5, 5, 5, 5, 5, 5, 5, 5] to [5, 5, 5, 6, 6, 6, 7, 7]
- Melee tower damage to players increased from [5, 5, 5, 5, 5, 5, 6, 6] to [5, 6, 7, 8, 9, 10, 11, 12]
- Increase distance between bases slightly because bomb towers can reach into other players bases
- Disallow damage to player objects if no gold stash is owned
- Minor security fixes
```

### Unknown, 2017
```md{1}
Mages do not require 100 gold to place.
```

### Unknown, 2017
```md{1}
Mages require 100 gold to place.
```

<ImageWithDescription image="/asset/gameplay/game/buildings/mage.png" description="Mage needing 100 gold." />
