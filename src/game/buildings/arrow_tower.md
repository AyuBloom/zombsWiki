# Arrow Tower
**Arrow Tower** is a type of Tower. It shoots one arrow projectile. It deals a fairly strong knockback to zombies, especially when multiple Arrow Towers are grouped together. It is supposed to hit only entity at a time, since it has no AOE damage or piercing, but sometimes it can hit more due to the fact that the projectile hitbox can interact with at least 2 zombies at once

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/image/ui/entities/entities-arrow-tower.svg" style="width:192px; display:block; margin:0 auto;">
    <div>Tier 1 Arrow Tower</div>
  </div>
</div>

## Overview
- Description: `"Single target, fast firing tower."`
- They have the size of 2x2 in-game cells.
- Requires 5 Wood and 5 Stone to place.
- You can place 6 Arrow Towers (per party member, 24 total).

## Stats
| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Damage<hr>to Zombies | Damage<hr>to Players | Damage<hr>to Pets | Damage<hr>to Neutral | Projectile<hr>Lifetime | Projectile<hr>Velocity | Projectile<hr>Collision Radius | Others<hr>Range | Others<hr>Firerate |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 |  | 5 | 5 | 0 | 150 | 10s | 2 | 20 | 5 | 5 | 250 | 1300ms | 60 | 10 | 600 | 2.5/s |
| 2 |  | 25 | 20 | 100 | 200 | 10s | 5 | 40 | 5 | 5 | 350 | 1300ms | 65 | 10 | 650 | 3.0/s |
| 3 |  | 30 | 30 | 200 | 400 | 10s | 10 | 70 | 6 | 5 | 450 | 1300ms | 70 | 10 | 700 | 3.5/s |
| 4 |  | 40 | 40 | 600 | 800 | 10s | 20 | 120 | 6 | 5 | 550 | 1300ms | 70 | 10 | 750 | 4.0/s |
| 5 |  | 50 | 60 | 1200 | 1200 | 10s | 40 | 180 | 7 | 5 | 650 | 1300ms | 75 | 10 | 800 | 4.0/s |
| 6 |  | 70 | 80 | 2000 | 1600 | 10s | 80 | 250 | 7 | 5 | 750 | 1300ms | 80 | 10 | 850 | 4.0/s |
| 7 |  | 300 | 300 | 8000 | 2200 | 10s | 110 | 400 | 8 | 6 | 850 | 1300ms | 120 | 10 | 900 | 4.0/s |
| 8 |  | 800 | 800 | 35000 | 3600 | 10s | 150 | 500 | 8 | 6 | 1000 | 1300ms | 140 | 10 | 1000 | 4.0/s |


## Changelog
### November 20, 2021 - Minor Update
```md{4}
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
