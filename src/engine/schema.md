# Schemas

There are hard-coded schemas for buildings, spells, entities and items in the client.

## Client-defined Schemas

### Buildings

| ID | name | description | key | modelName | gridWidth | gridHeight | tiers | built | limit | disabled |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Wall` | Wall | Blocks enemies from reaching your towers. | 1 | WallModel | 1 | 1 | 1 | 0 | 250 | true |
| `Door` | Door | Allows party members to enter your base. | 2 | DoorModel | 1 | 1 | 1 | 0 | 40 | true |
| `SlowTrap` | Slow Trap | Slows enemies from entering your base. | 3 | SlowTrapModel | 1 | 1 | 1 | 0 | 12 | true |
| `ArrowTower` | Arrow Tower | Single target, fast firing tower. | 4 | ArrowTowerModel | 2 | 2 | 1 | 0 | 6 | true |
| `CannonTower` | Cannon Tower | Area of effect damage, slow firing tower. | 5 | CannonTowerModel | 2 | 2 | 1 | 0 | 6 | true |
| `MeleeTower` | Melee Tower | High damage, single target, close-range directional tower. | 6 | MeleeTowerModel | 2 | 2 | 1 | 0 | 6 | true |
| `BombTower` | Bomb Tower | Large area of effect damage, very slow firing tower. | 7 | BombTowerModel | 2 | 2 | 1 | 0 | 6 | true |
| `MagicTower` | Mage Tower | Multiple projectile, short range, fast firing tower. | 8 | MageTowerModel | 2 | 2 | 1 | 0 | 6 | true |
| `GoldMine` | Gold Mine | Generates gold every second for your party. | 9 | GoldMineModel | 2 | 2 | 1 | 0 | 8 | true |
| `Harvester` | Resource Harvester | Harvests resources automatically, fuelled by gold. | 0 | HarvesterModel | 2 | 2 | 1 | 0 | 2 | true |
| `GoldStash` | Gold Stash | Establishes your base and holds your gold. | - | GoldStashModel | 2 | 2 | 1 | 0 | 1 | false |

Raw schema: [buildings.json](/asset/engine/schema/buildings.json)

### Entities

| ID | model | gridSize.width | gridSize.height | args |
| :--- | :--- | :--- | :--- | :--- |
| `GamePlayer` | PlayerModel | - | - | - |
| `Stone` | RecoilModel | 3 | 3 | `name`: `/asset/image/map/map-stone.svg` |
| `Tree` | RecoilModel | 4 | 4 | `name`: `/asset/image/map/map-tree.svg` |
| `Wall` | WallModel | - | - | - |
| `Door` | DoorModel | - | - | - |
| `SlowTrap` | SlowTrapModel | - | - | - |
| `ArrowTower` | ArrowTowerModel | 2 | 2 | - |
| `CannonTower` | CannonTowerModel | 2 | 2 | - |
| `MeleeTower` | MeleeTowerModel | 2 | 2 | - |
| `BombTower` | BombTowerModel | 2 | 2 | - |
| `MagicTower` | MageTowerModel | 2 | 2 | - |
| `GoldMine` | GoldMineModel | 2 | 2 | - |
| `Harvester` | HarvesterModel | 2 | 2 | - |
| `GoldStash` | GoldStashModel | 2 | 2 | - |
| `ArrowProjectile` | ProjectileArrowModel | - | - | - |
| `CannonProjectile` | ProjectileCannonModel | - | - | - |
| `BowProjectile` | ProjectileArrowModel | - | - | - |
| `BombProjectile` | ProjectileBombModel | - | - | - |
| `FireballProjectile` | ProjectileMageModel | - | - | - |
| `HealTowersSpell` | HealTowersSpellModel | - | - | - |
| `PetCARL` | PetModel | - | - | - |
| `PetMiner` | PetModel | - | - | - |
| `ZombieGreenTier[1-10]` | ZombieModel | - | - | - |
| `ZombieRangedGreenTier1` | ZombieRangedModel | - | - | - |
| `ZombieBlueTier[1-10]` | ZombieModel | - | - | - |
| `ZombieRedTier[1-10]` | ZombieModel | - | - | - |
| `ZombieYellowTier[1-10]` | ZombieModel | - | - | - |
| `ZombiePurpleTier[1-10]` | ZombieModel | - | - | - |
| `ZombieOrangeTier[1-10]` | ZombieModel | - | - | - |
| `ZombieBossTier[1-40]` | ZombieBossModel | - | - | - |
| `NeutralCamp` | NeutralCampModel | - | - | - |
| `NeutralTier1` | NeutralModel | - | - | - |
| `PathNode` | PathNodeModel | - | - | - |

Raw schema: [entities.json](/asset/engine/schema/entities.json)

### Items

::: info

You cannot equip `Invulnurable` or `Pause` as an utility, even though they are listed here. `HatComingSoon` and `PetComingSoon` are placeholders.

:::

| ID | name | type | description | tiers | onToolbar | onBuffBar | canPurchase |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Pickaxe` | Pickaxe | Weapon | Harvests stone and wood. | 1 | true | false | true |
| `Spear` | Spear | Weapon | Melee weapon with high attack speed. | 1 | true | false | true |
| `Bow` | Bow | Weapon | Ranged weapon with high damage. | 1 | true | false | true |
| `Bomb` | Bomb | Weapon | Ranged AOE weapon with fuse delay. | 1 | true | false | true |
| `ZombieShield` | Shield | Armor | Protects you from zombies. | 1 | false | true | true |
| `HatHorns` | Horns | Hat | Makes you look cool... I think? | 1 | false | false | true |
| `HatComingSoon` | Coming Soon | Hat | More hats will be coming very soon! | 1 | false | false | true |
| `PetCARL` | C. A. R. L | Pet | Willing to fight by your side in close-range combat. | 1 | false | false | true |
| `PetMiner` | Woody | Pet | Harvests resources for you! | 1 | false | false | true |
| `PetComingSoon` | Coming Soon | Pet | More hats will be coming very soon! | 1 | false | false | true |
| `HealthPotion` | Health Potion | Utility | Heals your player to full health. | 1 | true | false | true |
| `PetHealthPotion` | Pet Potion | Utility | Heals your pet to full health. | 1 | true | false | true |
| `PetWhistle` | Pet Whistle | Utility | Blowing this whistle calls your pet back to you. | 1 | true | false | false |
| `PetRevive` | Pet Revive | Utility | Revive your pet for a small fee... | 1 | false | false | false |
| `Pause` | Timeout | Utility | Prevents zombies from spawning for one cycle. | 1 | false | true | false |
| `Invulnerable` | Invulnerable | Utility | You are temporarily immune to damage. | 1 | false | true | false |

Raw schema: [items.json](/asset/engine/schema/items.json)

### Spells

| ID | name | tiers |
| :--- | :--- | :--- |
| `HealTowersSpell` | Heal Towers | 1 |

::: info

Even though `Pause` / Timeout is a spell in the game, it is listed under Items, not Spells.

:::

Raw schema: [spells.json](/asset/engine/schema/spells.json)

## Server-served Schemas

<!--@include: ./main/network.md{485,516}-->