# Bomb Tower
**Bomb Tower** is a type of Tower. This tower doesn't deal any knock back to the zombies, but they deal AOE damage within a pretty large radius. Bomb Tower has a pretty large radius, being useful to damage the zombies and players before they reach your base.

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/image/ui/entities/entities-bomb-tower.svg" style="width:192px; display:block; margin:0 auto;">
    <div>Tier 1 Bomb Tower</div>
  </div>
</div>

## Overview
- Description: `"Large area of effect damage, very slow firing tower."`
- They have the size of 2x2 in-game cells.
- Requires 10 Wood and 10 Stone to place.
- You can place 6 Bomb Towers (per party member, 24 total).

| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Damage<hr>to Zombies | Damage<hr>to Players | Damage<hr>to Pets | Damage<hr>to Neutral | Projectile<hr>Lifetime | Projectile<hr>Velocity | Projectile<hr>AOE Radius | Projectile<hr>Collision Radius | Others<hr>Range | Others<hr> Firerate |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | | 10 | 10 | - | 150 | 10 s | 2 | 30 | 9 | 10 | 250 | 1,000 ms | 20 | 250 px | 10 px | 1,000 px | 1/s |
| 2 |  | 25 | 25 | 100 | 200 | 10 s | 5 | 60 | 9 | 10 | 350 | 1,000 ms | 21 | 250 px | 10 px | 1,000 px | 1/s |
| 3 |  | 40 | 40 | 200 | 400 | 10 s | 10 | 100 | 10 | 10 | 450 | 1,000 ms | 22 | 250 px | 10 px | 1,000 px | 1/s |
| 4 |  | 50 | 50 | 600 | 800 | 10 s | 20 | 140 | 10 | 10 | 550 | 1,000 ms | 23 | 250 px | 10 px | 1,000 px | 1/s |
| 5 |  | 80 | 80 | 1,200 | 1,200 | 10 s | 40 | 250 | 11 | 10 | 650 | 1,000 ms | 24 | 250 px | 10 px | 1,000 px | 1/s |
| 6 |  | 120 | 120 | 2,000 | 1,600 | 10 s | 80 | 620 | 11 | 10 | 750 | 1,000 ms | 25 | 250 px | 10 px | 1,000 px | 1.11/s |
| 7 |  | 300 | 300 | 8,000 | 2,200 | 10 s | 110 | 1,300 | 12 | 10 | 850 | 1,000 ms | 26 | 250 px | 10 px | 1,000 px | 1.11/s |
| 8 |  | 800 | 800 | 35,000 | 3,600 | 10 s | 150 | 1,700 | 12 | 10 | 1,000 | 1,000 ms | 27 | 250 px | 10 px | 1000 px | 1.18/s |

## Changelog
### December 11, 2023 - Minor Update
```md{3}
- Magic towers now fire 4 projectiles at max tier
- Local bans are now cleared every hour (global bans still clear monthly)
- Bomb tower and melee tower received a buff
```

### November 20, 2021 - Minor Update
```md{5}
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
