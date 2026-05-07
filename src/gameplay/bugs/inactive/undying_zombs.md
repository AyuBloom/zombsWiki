# Undying Zombies

## Phenomenon
Zombies have a specific mechanic so when the in game time goes to day, the zombies begin losing health. The way it worked: zombies lost health until it appeared that they had no HP, but they were still alive. Bosses were also affected.

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/nohp.png" style="width:300px; display:block; margin:0 auto;">
    <div>~0 HP zombies</div>
  </div>
</div>

## Cause
Overlook in the code. The zombie health loss during day mechanic was implemented wrong. The zombie health loss % was based on the current health, instead of the max health, which lead to an hp that asymptotes to 0.

As an example you can view some simulations, in the following examples:


::: details
### Before the patch

As an example, let's assume a zombie has 100HP, and has a 1% HP decay per tick, calculated on the current HP, as in the following table & graph. Note how the HP drop per tick gets lower and lower, until it's unsignificant.

| Tick | HP |
| :---: | :---: |
| 0 | 100 |
| 1 | 99 |
| 2 | 98.01 |
| 3 | 97.0299 |
| 4 | 96.0596 |
| 5 | 95.099 |
| ... | ... | 
| 100 | 36.6032 |
| 101 | 36.2372 |
| 102 | 35.8748 |
| ... | ... | 
| 998 | 0.00440478 |
| 999 | 0.00436073 |
| 1000 | 0.00431712 |

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/graph1.png" style="width:400px; display:block; margin:0 auto;">
    <div>Example: Zombie health loss over time.<br>x: tick, y: hp</div>
  </div>
</div>

The zombies or bosses never died. They could last indefinitely.
:::

::: details
### After the patch
Once again, as an example, let's assume a zombie has 100HP, and has a 1% HP decay per tick, calculated on the max HP, as in the following table & graph. Note how the hp drops linerarly.

| Tick | HP |
| :---: | :---: |
| 0 | 100 |
| 1 | 99 |
| 2 | 98 |
| 3 | 97 |
| ... | ... | 
| 50 | 50 |
| 51 | 49 |
| 52 | 48 |
| ... | ... | 
| 98 | 2 |
| 99 | 1 |
| 100 | 0 |

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/graph2.png" style="width:400px; display:block; margin:0 auto;">
    <div>Example: Zombie health loss over time.<br>x: tick, y: hp</div>
  </div>
</div>

Once reaching 0 HP, the zombie or the boss dies. 🫡
:::

## Example

### Large pile of orange zombies

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/undead_pile.png" style="width:400px; display:block; margin:0 auto;">
    <div>Large pile of zombies with ~0 HP</div>
  </div>
</div>

<hr>

### 14+ bosses

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/boss.png" style="width:300px; display:block; margin:0 auto;">
    <div>A lot of bosses, and a green T1 zombie at purple waves.</div>
  </div>
</div>

<hr>

### 4 zombie colours

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/4_colours.png" style="width:400px; display:block; margin:0 auto;">
    <div>4 different zombie colours at the same base.</div>
  </div>
</div>

## Impact

### Lag Bases
Zombies didn't die during the day, or at all, unless a player or tower killed them. This led to what people called lag bases or "wall" bases. These bases used all 1000 walls placed around the stash, fully upgraded, with no towers. Weaker zombies would spawn first and slowly chew through the walls, but the damage dealt was insignificant, compared to a T8 wall's HP. Stronger zombies spawned later but couldn't reach the walls because the weaker ones were blocking them. Since no zombies were dying, they kept piling up until the server started lagging badly within 30 minutes, causing delays for everyone and disconnecting players.

This was used as a way to ruin someone's wave or score attempt, or simply just to mess with someone's run in a server that wasn't full.

<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/undying_zombs/zombies.png" style="width:400px; display:block; margin:0 auto;">
    <div>Lag base at wave 27. Ping: +47 seconds<br>You can see all tiers of Green and Blue zombies.</div>
  </div>
</div>

## Changelog
### August 23, 2021 - Minor Update
```md{3}
- Extend hostility detection to work on individual players to stop scripts that start new partys and kick themselves to undo the old hostility detection
- Fix one method of pet invulnerability
- Zombie day time damage is now based on % of max health instead of % of current health to fix max tier walls + low level waves from lagging out the server
- Lower party change cooldown to 1 second from 15 seconds because the disconnection exploit has been fixed for a while now
- Remove cooldowns for open party toggle and party names because the disconnection exploit has been fixed for a while now
```
