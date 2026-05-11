# Cannon Tower
**Cannon Tower** is a type of Tower. It has a medium range, good firerate and knockback, being able to knockback multiple zombies. It also deals AOE damage.


<ImageWithDescription image="/asset/image/ui/entities/entities-cannon-tower.svg" description="Tier 1 Cannon Tower" />

## Overview
- Description: `"Area of effect damage, slow firing tower."`
- They have the size of 2x2 in-game cells.
- Requires 15 Wood and 15 Stone to place.
- You can place 6 Cannon Towers (per party member, 24 total).

## Stats
| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Damage<hr>to Zombies | Damage<hr>to Players | Damage<hr>to Pets | Damage<hr>to Neutral | Projectile<hr>Lifetime | Projectile<hr>Velocity | Projectile<hr>AOE Radius | Projectile<hr>Collision Radius | Others<hr>Range | Others<hr> Firerate |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 |  | 15 | 15 | 0 | 150 | 10s | 2 | 20 | 5 | 5 | 250 | 1000ms | 60 | 250 | 10 | 500 | 1.0/s |
| 2 |  | 25 | 25 | 100 | 200 | 10s | 5 | 30 | 5 | 5 | 350 | 1000ms | 65 | 250 | 10 | 500 | 1.3/s |
| 3 |  | 30 | 40 | 200 | 400 | 10s | 10 | 50 | 6 | 5 | 450 | 1000ms | 70 | 250 | 10 | 500 | 1.6/s |
| 4 |  | 40 | 50 | 600 | 800 | 10s | 20 | 70 | 6 | 5 | 550 | 1000ms | 70 | 250 | 10 | 500 | 2.0/s |
| 5 |  | 60 | 80 | 1200 | 1200 | 10s | 40 | 120 | 7 | 5 | 650 | 1000ms | 75 | 250 | 10 | 600 | 2.5/s |
| 6 |  | 80 | 120 | 2000 | 1600 | 10s | 80 | 150 | 7 | 5 | 750 | 1000ms | 80 | 250 | 10 | 600 | 2.9/s |
| 7 |  | 300 | 300 | 8000 | 2200 | 10s | 110 | 200 | 8 | 6 | 850 | 1000ms | 100 | 250 | 10 | 600 | 4.0/s |
| 8 |  | 800 | 800 | 35000 | 3600 | 10s | 150 | 300 | 8 | 8 | 1000 | 1000ms | 140 | 250 | 10 | 600 | 4.0/s |


## Changelog
### November 20, 2021 - Minor Update
```md{3}
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
