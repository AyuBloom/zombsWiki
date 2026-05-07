# Harvester
**Resource Harvester** is a type of building. It doesn't attack or defend the base, but it is used to harvest resources, such as wood and stone for the player. It must be placed next to a tree or rock, or both of them to be able to collect resources. It needs gold as fuel to start the harvesting process. You can collect the resources either by using the in game hud, or simply hit it with your pickaxe/spear.

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/image/ui/entities/entities-harvester.svg" style="width:192px; display:block; margin:0 auto;">
    <div>Tier 1 Harvester</div>
  </div>
</div>

## Overview
- Description: `"Harvests resources automatically, fuelled by gold. Hit with a pickaxe to collect."`
- They can be rotated with R.
- They have the size of 2x2 in-game cells.
- Requires 5 Wood and 5 Stone to place.
- You can place 2 harvesters (per party member, 8 total).
- It takes 10 refill button clicks to fully load the harvester with gold fuel.


## Stats
| Tier | Image | Cost<hr>Wood | Cost<hr>Stone | Cost<hr>Gold | Deposit<hr>Cost per Minute | Deposit<hr>Max Deposit| Health<hr>Max HP | Health<hr>Time before HP regeneration | Health<hr>HP/s | Harvest<hr>Ammount collected | Harvest<hr>Interval | Harvest<hr>Range | Harvest<hr>Max capacity | Others<hr>Max Yaw Deviation |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 |  | 5 | 5 | - | 200 | 1600 | 150 | 10s | 2 | 3.75 | 1.5s | 300 | 800 | 70 |
| 2 |  | 25 | 20 | 100 | 300 | 2400 | 200 | 10s | 5 | 6.975 | 1.4s | 300 | 1600 | 70 |
| 3 |  | 30 | 30 | 200 | 350 | 2800 | 400 | 10s | 10 | 6.825 | 1.3s | 300 | 2400 | 70 |
| 4 |  | 40 | 40 | 600 | 500 | 4000 | 800 | 10s | 20 | 10.8 | 1.2s | 300 | 3200 | 70 |
| 5 |  | 50 | 60 | 1200 | 600 | 4800 | 1200 | 10s | 40 | 12.375 | 1.1s | 300 | 4000 | 70 |
| 6 |  | 70 | 80 | 2000 | 700 | 4800 | 1600 | 10s | 80 | 15 | 1.0s | 300 | 4800 | 70 |
| 7 |  | 300 | 300 | 8000 | 1200 | 9600 | 2200 | 10s | 110 | 20.25 | 0.9s | 300 | 5600 | 70 |
| 8 |  | 600 | 600 | 10000 | 1400 | 12000 | 2800 | 10s | 130 | 24 | 0.8s | 300 | 7200 | 70 |

## Changelog

### July 11, 2023 - Minor Update
```md{3,4,5}
- Increase pickaxe harvest count from [1, 2, 2, 3, 3, 4, 6] to [1.5, 3, 3, 4.5, 4.5, 6, 9]
- Increase gold mine gold per second from [4, 6, 7, 10, 12, 15, 25, 35] to [6, 8, 10.5, 15, 18, 22.5, 37.5, 52.5]
- Increase harvester harvest amount from [2.5, 4.65, 4.55, 7.2, 8.25, 10, 13.5, 16] to [3.75, 6.975, 6.825, 10.8, 12.375, 15, 20.25, 24]
- Increase harvester max storage from [400, 800, 1200, 1600, 2000, 2400, 2800, 3600] to [800, 1600, 2400, 3200, 4000, 4800, 5600, 7200]
- Increase harvester max deposit from [800, 1200, 1400, 2000, 2400, 2800, 4800, 6000] to [1600, 2400, 2800, 4000, 4800, 4800, 9600, 12000]
- Remove stricter disconnects when the server is full and the player is dead
- Increase afk timer check from 3 minutes to 6 minutes
- Fix a few gold mine precision bugs which caused a lower rate of gold to be earned
```

### June 26, 2017 - Minor Update
```md{2}
- Fixed the melee tower graphics.
- Fixed harvester capacity bar overflowing.
- Potential fix for network delay issue.
```
### June 12, 2017 - Minor Update
```md{1}
- New Building - RESOURCE HARVESTERS. You can now place 2 harvesters anywhere on the map that will automatically harvest resources for you. They are fuelled by gold and require manual collection by hitting or clicking the Collect button.
- Added a fix for mouse buttons being held down blocking input.
- Added profanity filtering on usernames and party names.
```
