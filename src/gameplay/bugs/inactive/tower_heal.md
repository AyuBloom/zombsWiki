# Tower Heal

## Phenomenon

If you sent an RPC for `HealTowersSpell` but with a different tier, there would be various effects:
| Tier | Effect |
| :--- | :--- |
| 9 | Instantly heal every tower (Arrow, Cannon, Mage, Melee, Bomb) near you with no cost and no timeout. |
| 1033 | Makes every tower near you have negative health (the effect would be reversed if you upgraded the tower) with no cost and no timeout. |
| 99999 | Gives you around 45 million gold with no cost and no timeout. |
| 999999+ | Crashes the server. This disconnects everyone in the server before the server auto-restarts with a completely new layout and restarts the party id's back to 1. |

## Cause

> The reason the tower heal bug worked was because of the low level language that the game is made in. The data type that was meant to be in the tier is capped at 8, therefore anything in that limit works normally and anything over that breaches other parts of the server. If the tier was in a list of specific numbers, the leakage would affect other things like cost, radius, any many others. A tier being too high would cause total failure in the server.

Explains a community member, [Apex](https://www.youtube.com/@Apex-ti1dm).

## Examples

### Tier 9 
<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/tower_heal/t9_heal.png" style="width:400px; display:block; margin:0 auto;">
    <div>Tier 9 heal spell.</div>
  </div>
</div>

### Tier 1033
<div style="text-align:center;">
  <div style="display:inline-block; text-align:center; border:1px solid #666; padding:10px;">
    <img src="/asset/bugs/inactive/tower_heal/t1033_heal.png" style="width:400px; display:block; margin:0 auto;">
    <div>Tier 1033 heal spell.<br>Notice how towers appear to not have health.</div>
  </div>
</div>

## Changelog

### May 7, 2019 - Minor Update
```md{1}
- Fix healing spell invulnerability bug
```
