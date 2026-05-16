---
title: Minor Bugs - zombs.io Wiki
head:
  - - meta
    - name: description
      content: >-
        This article contains some bugs that are not too impactful to the game,
        but enough to cause some annoyance. These bugs were present at some
        point in the game.
  - - meta
    - name: 'og:description'
      content: >-
        This article contains some bugs that are not too impactful to the game,
        but enough to cause some annoyance. These bugs were present at some
        point in the game.
---
# Minor Bugs

This article contains some bugs that are not too impactful to the game, but enough to cause some annoyance. These bugs were present at some point in the game.

## Harvester Overflow

### Phenomenon

Back when the Harvester was first introduced, there was no limit to how many resources it can store.

### Example

A screenshot from a video made by iX demonstrates the bug:

<ImageWithDescription image="/asset/gameplay/bugs/inactive/minor_bugs/harvester_overflow.png" description="An overflowing harvester, appearing with a yellow bar longer than expected." />

### Changelog

#### June 26, 2017 - Minor Update

```md{2}
- Fixed the melee tower graphics.
- Fixed harvester capacity bar overflowing.
- Potential fix for network delay issue.
```

## Shield Health

### Phenomenon

The shield, no matter which tier you have, would only give you 500 health points worth of protection against zombies.

### Cause

The shield was not being auto-equipped when bought, causing the shield to remain at tier 1.

### Changelog

#### January 8, 2022 - Minor Update
```md{10}
- Pets now keep their health percent when leveling up. Evolution remains the same. This fixes a pet invulnerability issue.
- Add missing token rewards to some bosses
- Remove Crossbow, which was invisible and never added to the game
- Fix party applications being acceptable by non leaders
- Fix towers and traps not attacking when players are attacked directly by players
- Fix pet damage not adding to hostility detection for buildings and players
- Pets now do zero damage to buildings without a gold stash
- Fix buildings not regenning when a 0 damage attack occurs
- Remove hostility from a player when it joins the party to stop towers from attacking the joining player
- Fix shield not being auto equipped, which made shields above tier 1 useless
- Add a "Can Sell Buildings" toggle cooldown of 100 ms to fix a party disconnection exploit
```
