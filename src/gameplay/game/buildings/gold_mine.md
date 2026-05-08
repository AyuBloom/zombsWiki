# Gold Mine
**Gold mine** is a type of Building. It doesn't deal damage or used to defend your base, but it is used to generate gold for you and your party members, which can allow you to upgrade your items, your base and refuel harvesters.

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/image/ui/entities/entities-gold-mine.svg" style="width:192px; display:block; margin:0 auto;">
    <div>Tier 1 Gold Mine</div>
  </div>
</div>

## Overview
- Description: `"Generates gold every second for your party."`
- They have the size of 2x2 in-game cells.
- Requires 5 Wood and 5 Stone to place.
- You can place 8 gold mines, regardless of the number of players inside your party.

## Stats
| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Gold<hr> Generation/s (1 Mine) | Generation/s (8 Mine) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 |  | 5 | 5 | - | 150 | 10s | 5 | 6 | 48 |
| 2 |  | 15 | 15 | 200 | 250 | 10s | 7 | 8 | 64 |
| 3 |  | 25 | 25 | 300 | 350 | 10s | 12 | 10.5 | 84 |
| 4 |  | 35 | 35 | 600 | 500 | 10s | 17 | 15 | 120 |
| 5 |  | 45 | 45 | 800 | 800 | 10s | 25 | 18 | 144 |
| 6 |  | 55 | 55 | 1200 | 1400 | 10s | 40 | 22.5 | 180 |
| 7 |  | 700 | 700 | 8000 | 1800 | 10s | 70 | 37.5 | 300 |
| 8 |  | 1600 | 1600 | 30000 | 2800 | 10s | 120 | 52.5 | 420 |


## Changelog

### July 11, 2023 - Minor Update
```md{2}
- Increase pickaxe harvest count from [1, 2, 2, 3, 3, 4, 6] to [1.5, 3, 3, 4.5, 4.5, 6, 9]
- Increase gold mine gold per second from [4, 6, 7, 10, 12, 15, 25, 35] to [6, 8, 10.5, 15, 18, 22.5, 37.5, 52.5]
- Increase harvester harvest amount from [2.5, 4.65, 4.55, 7.2, 8.25, 10, 13.5, 16] to [3.75, 6.975, 6.825, 10.8, 12.375, 15, 20.25, 24]
- Increase harvester max storage from [400, 800, 1200, 1600, 2000, 2400, 2800, 3600] to [800, 1600, 2400, 3200, 4000, 4800, 5600, 7200]
- Increase harvester max deposit from [800, 1200, 1400, 2000, 2400, 2800, 4800, 6000] to [1600, 2400, 2800, 4000, 4800, 4800, 9600, 12000]
- Remove stricter disconnects when the server is full and the player is dead
- Increase afk timer check from 3 minutes to 6 minutes
- Fix a few gold mine precision bugs which caused a lower rate of gold to be earned
```

### May 28, 2017 - Minor Update
```md{1}
- Minor text fixes: Gold mines are always capped at 8 but multiply gold income by the number of players in a party.
```
