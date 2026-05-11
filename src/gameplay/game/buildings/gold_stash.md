# Gold Stash
**Gold Stash** is a type of Building. This building is the heart of every base and defines the area where you can place towers. The area where you can place towers is 36x36, or even 38x38 for towers, since the game allows you to partially place towers outside that area.

Once you upgrade the Gold Stash, it allows you to upgrade the rest of your towers to the stash's tier.

The zombies target the gold stash. Be sure to defend it, otherwise you'll regret.

<ImageWithDescription image="/asset/image/ui/entities/entities-gold-stash.svg" description="Tier 1 Gold Stash" />

## Overview
- Description: `"Establishes your base and holds your gold. Protect this!"`
- They have the size of 2x2 in-game cells.
- This is the only Free building.
- You can only place 1 building of this type.


## Stats
| Tier | Image | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | <img src="/asset/image/entity/gold-stash/gold-stash-t1-base.svg" width="72" height="72" style="margin:auto;"> | - | 1500 | 10s | 50 |
| 2 | <img src="/asset/image/entity/gold-stash/gold-stash-t2-base.svg" width="72" height="72" style="margin:auto;"> | 5000 | 1800 | 10s | 60 |
| 3 | <img src="/asset/image/entity/gold-stash/gold-stash-t3-base.svg" width="72" height="72" style="margin:auto;"> | 10000 | 2300 | 10s | 70 |
| 4 | <img src="/asset/image/entity/gold-stash/gold-stash-t4-base.svg" width="72" height="72" style="margin:auto;"> | 16000 | 3000 | 10s | 90 |
| 5 | <img src="/asset/image/entity/gold-stash/gold-stash-t5-base.svg" width="72" height="72" style="margin:auto;"> | 20000 | 5000 | 10s | 110 |
| 6 | <img src="/asset/image/entity/gold-stash/gold-stash-t6-base.svg" width="72" height="72" style="margin:auto;"> | 32000 | 8000 | 10s | 150 |
| 7 | <img src="/asset/image/entity/gold-stash/gold-stash-t7-base.svg" width="72" height="72" style="margin:auto;"> | 100000 | 12000 | 10s | 400 |
| 8 | <img src="/asset/image/entity/gold-stash/gold-stash-t8-base.svg" width="72" height="72" style="margin:auto;"> | 400000 | 20000 | 10s | 700 |

## Changelog

### June 19, 2020 - Minor Update
```md{3}
- Reduce building walking time from 15 seconds to 3 seconds
- Reduce spawn invulnerability from 30 seconds to 3 seconds
- Prevent selling gold stash
- Delay leaderboard sending to help guard against scanning bots
```

### May 14, 2017 - Minor Update
```md{3}
- [PERFORMANCE] Network and frame rates optimized for lower-end systems.
- [WEAPONS] Bombs now collide with buildings.
- [BASE] You can no longer place a gold stash too close to another player's stash.
- [PLAYER] You are now given 30s of invulnerability when you respawn.
- [PLAYER] Added F key to use a health potion.
```
