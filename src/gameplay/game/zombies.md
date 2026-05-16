---
title: Zombies - zombs.io Wiki
---
# Zombies

## Basics

### Zombie Types & Tiers

Each type of zombie is recognized by its color, and within each type there are 10 tiers of zombies with different sizes and shades of the same color: as zombies get darker and larger, they are higher tiered.

### Boss Waves

On wave 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97, 105 and 121, bosses will spawn at the start of the wave, replacing the regular zombie waves.

### Party Members

The more members are in a party, the more zombies spawn.

## Patterns

### Special Waves

Wave **51** and **98** are special because zombies spawn even during daytime. Especially with wave 51, it will the largest amount of zombies in any wave.

### Spawning Amount

After wave 140, zombies spawn with a pattern.

#### Wave 140 to 240

Zombies spawn at a **constant amount** every wave. Only **Orange Tier 1, 9 and 10 zombies** spawn in these waves, with a `50 : 20 : 40` ratio respectively per party member.

#### Wave 240 - 1000

The zombies enter a 10-wave cycle with the amount of zombies.
On wave `n % 5 === 1`, the amount of zombie spawned is the least in the cycle, increasing gradually each wave until it reaches the maximum on wave `n % 10 === 0`, after which it will repeat the cycle again.
The maximum amount of zombies (seen on wave `n % 10 === 0`) is the same as on waves 140 to 240.

Here is a table summarizing the zombie spawn amounts per wave by zombie tier (all of the Orange type) for 1 party member:
| Wave | Tier 1 | Tier 9 | Tier 10 |
| :--- | :--- | :--- | :--- |
| `n % 5 === 1` | 0 | 50 | 10 |
| `n % 5 === 2` | 50 | 0 | 20 |
| `n % 5 === 3` | 50 | 0 | 30 |
| `n % 5 === 4` | 50 | 10 | 30 |
| `n % 10 === 5` | 50 | 20 | 30 |
| `n % 10 === 0` | 50 | 20 | 40 |

#### After wave 1000

Zombie spawns stabilizes once again and spawns with the same amount and tier ratio as in wave 140 to 240.

## Scoring
::: warning
This section is heavily in research. The information provided here may not be accurate in the future, as it is based on the knowledge we (as the community) have so far.
:::

The table below shows the amount of score each player gets depending on the amount of players in the party, without any intervention from any player or the zombies dying of sunlight:
| # of players | Score |
| :--- | :--- |
| 3 | 2 199 780 |
| 4 | 2 200 000 |

The scoring system considers multiple different factors to award score:
- When an orange zombie dies to the base, the score is split between everyone in the base.
- When an orange zombie is hit by a pet, the score gain goes up by up to ?x.
- When an orange zombie is killed by a player, then the player gets full score, no one else in the party gets anything.
- When an orange zombie dies to sunlight, then no score is gained for any player.

## Pathfinding

Pathfinding is the algorithm used by zombies to navigate the map and find their way to the player. Zombies will try to navigate their way to the Gold Stash, avoiding obstacles along the way. However, the pathfinding algorithm does not simulate objects in the same positions as the physics engine. This gives zombs.io a unique enemy aggression against bases, and key to many strong base types today.

### Basics
Zombies will try to find its way to the Gold Stash and avoid obstacles in its way. However, if the pathfinding algorithm cannot find a short enough path to the Gold Stash, the zombie will simply move in a straight path towards the Gold Stash.

### Obstacles
Resources like Trees, Stones and Neutral Camps are detected as obstacles. These objects have their bounding boxes processed differently by the pathfinding algorithm compared to their actual collision hitboxes (especially with Neutral Camps, which we'll touch on later).

Towers and defensive buildings (Wall, Door) are also detected as obstacles, except for the Resource Harvester and Slow Trap.

#### Bounding Box Calculation
Zombies detect obstacles **differently** from their actual collision hitboxes. Obstacle positions are computed on a 48×48px tile grid. For each obstacle, the bounding box is derived differently depending on the type, then is shifted by half a cell on each axis.

##### Cell Range

A unique bounding box calculation is used for each kind of resource:
- **Trees** are expanded outward by a radius of **70px** before grid-snapping, meaning any tile the circle overlaps is included in the bounding box.
- **Stones** use the same method but with a smaller radius of **50px**.
- **Neutral Camps** occupy exactly the **single tile** their center falls on, with no radius expansion.

Buildings retain their actual collision hitboxes before the next step.

##### Shifting
Once the cell range is determined, it is converted back to pixel coordinates spanning the full extent of those tiles. The center of this bounding box is then offset by **24px to the right** and **24px to the bottom**, which accounts for the positional shift mentioned above.

::: tip
A script has been made to visualize the real bounding box for each obstacle type.
:::

## Spawning
::: warning
This section is under construction.
:::
