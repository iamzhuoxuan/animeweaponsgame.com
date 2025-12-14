export type WikiCategory = 'weapons' | 'bosses' | 'worlds' | 'demon-arts';
export type SiloKey = 'items' | 'entities' | 'geography' | 'economy';

interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

interface BaseEntity {
  id: string;
  slug: string;
  name: string;
  category: WikiCategory;
  summary: string;
  tags: string[];
  worldId?: string;
  silo: SiloKey;
  updatedAt: string;
  seo?: SeoMeta;
}

export interface Weapon extends BaseEntity {
  category: 'weapons';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Secret';
  class: 'Blade' | 'Katana' | 'Ranged' | 'Greatsword' | 'Support' | 'Hybrid';
  stats: {
    baseMastery: number;
    maxMastery: number;
    damageMultiplier: string;
    critBonus?: string;
  };
  acquisition: {
    type: 'boss' | 'world' | 'quest' | 'craft';
    id?: string;
    name: string;
    rate?: string;
    note?: string;
  };
  crafting?: {
    materials: { id?: string; name: string; quantity: number }[];
    note?: string;
  };
  tradingValue?: {
    low: number;
    high: number;
    currency: 'emeralds';
    trend: 'rising' | 'stable' | 'falling';
    lastUpdated: string;
    communityNote?: string;
  };
  recommendedBuild: {
    demonArtIds: string[];
    bestUse: string;
    synergyNotes?: string;
  };
}

export interface Boss extends BaseEntity {
  category: 'bosses';
  hp: number;
  respawnTime: string;
  levelRequirement: number;
  location: {
    worldId: string;
    area: string;
    isSecret?: boolean;
    coordinates?: string;
  };
  loot: { type: 'weapon' | 'material'; id?: string; name: string; chance?: string }[];
  tactics: string;
}

export interface World extends BaseEntity {
  category: 'worlds';
  order: number;
  region: string;
  mapImage?: string;
  bosses: string[];
  mobs: string[];
  npcs: string[];
  secretSpots: { title: string; description: string; relatedBossId?: string }[];
}

export interface DemonArt extends BaseEntity {
  category: 'demon-arts';
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Secret';
  acquisition: {
    method: 'gacha' | 'quest' | 'drop';
    worldId?: string;
    locationName?: string;
    rate?: string;
    pity?: string;
    relatedBossId?: string;
  };
  skills: { name: string; description: string; cooldown: string }[];
  synergyWeapons: string[];
}

export type WikiEntity = Weapon | Boss | World | DemonArt;

export const wikiCategoryConfig: Record<
  WikiCategory,
  { title: string; description: string; silo: SiloKey; slug: WikiCategory; filters?: string[] }
> = {
  weapons: {
    title: 'Weapons & Items',
    description: 'Stat tables, drop chances, and crafting materials for every weapon.',
    silo: 'items',
    slug: 'weapons',
    filters: ['world', 'rarity', 'class'],
  },
  bosses: {
    title: 'Bosses & Enemies',
    description: 'Spawn timers, HP, level requirements, and loot tables.',
    silo: 'entities',
    slug: 'bosses',
    filters: ['world'],
  },
  worlds: {
    title: 'Worlds & Maps',
    description: 'World progression with NPC hubs, mobs, and secret routes.',
    silo: 'geography',
    slug: 'worlds',
  },
  'demon-arts': {
    title: 'Demon Arts',
    description: 'Skill data, cooldowns, and gacha odds for every Demon Art.',
    silo: 'items',
    slug: 'demon-arts',
    filters: ['world', 'rarity'],
  },
};

const worlds: World[] = [
  {
    id: 'frosted_origins',
    slug: 'frosted-origins',
    name: 'World 1: Frosted Origins',
    category: 'worlds',
    silo: 'geography',
    summary: 'Starter world with short routes and a hidden cave behind the northern waterfall.',
    region: 'Early Game',
    order: 1,
    mapImage: undefined,
    bosses: ['itaxin'],
    mobs: ['Rogue Swordsman', 'Frost Bandit', 'Scavenger Mage'],
    npcs: ['Guide Rena', 'Quest Board', 'Potion Merchant Seyo'],
    secretSpots: [
      {
        title: 'Itaxin Crack',
        description: 'Climb the cracked ice wall behind the spawn waterfall to reach the hidden boss cave.',
        relatedBossId: 'itaxin',
      },
    ],
    tags: ['world 1', 'starter', 'secret crack'],
    updatedAt: '2025-11-30',
    seo: {
      title: 'Frosted Origins Map - World 1 secrets & NPCs',
      description: 'World 1 map with Itaxin secret crack route, NPC list, and mobs.',
    },
  },
  {
    id: 'shattered_dunes',
    slug: 'shattered-dunes',
    name: 'World 2: Shattered Dunes',
    category: 'worlds',
    silo: 'geography',
    summary: 'Wind tunnels connect dunes to the Gekao crevice where the sandstorm boss sits.',
    region: 'Mid Game',
    order: 2,
    bosses: ['gekao'],
    mobs: ['Sand Raider', 'Storm Archer', 'Ruined Automaton'],
    npcs: ['Scout Lio', 'Raid Caravan', 'Artifact Dealer'],
    secretSpots: [
      {
        title: 'Gekao Crevice',
        description: 'Drop into the cracked dune near the third wind tunnel to find Gekao.',
        relatedBossId: 'gekao',
      },
    ],
    tags: ['world 2', 'wind tunnel', 'desert'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'sky_citadel',
    slug: 'sky-citadel',
    name: 'World 3: Sky Citadel',
    category: 'worlds',
    silo: 'geography',
    summary: 'Floating bridges and gliders lead to Leopardo, a mobile aerial boss.',
    region: 'Mid Game',
    order: 3,
    bosses: ['leopardo'],
    mobs: ['Sky Lancer', 'Cloud Gunner', 'Glider Rogue'],
    npcs: ['Aviator Noel', 'Glide Instructor', 'Sky Forge'],
    secretSpots: [
      {
        title: 'Leopardo Cave',
        description: 'Ride the wind lift behind the forge and hook to the hanging cave to trigger the boss.',
        relatedBossId: 'leopardo',
      },
    ],
    tags: ['world 3', 'aerial', 'glider'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'demon_land',
    slug: 'demon-land',
    name: 'World 4: Demon Land',
    category: 'worlds',
    silo: 'geography',
    summary: 'A cursed valley with hidden pits. Alaza lurks in a sunk pit with 2% Blood Art drop.',
    region: 'Late Game',
    order: 4,
    bosses: ['alaza'],
    mobs: ['Cursed Swordsman', 'Demon Hound', 'Blood Caster'],
    npcs: ['Abyss Watcher', 'Demon Scholar', 'Shadow Broker'],
    secretSpots: [
      {
        title: 'Alaza Pit',
        description: 'Jump into the cracked pit east of the shrine; follow the torch path to Alaza.',
        relatedBossId: 'alaza',
      },
    ],
    tags: ['world 4', 'secret boss', 'demon'],
    updatedAt: '2025-11-30',
    seo: {
      title: 'Demon Land map & secret boss entrances',
      description: 'Find Alaza pit, Demon Land NPCs, and mob list for World 4.',
    },
  },
  {
    id: 'celestial_rift',
    slug: 'celestial-rift',
    name: 'World 5: Celestial Rift',
    category: 'worlds',
    silo: 'geography',
    summary: 'Endgame rift with layered platforms and a tunnel to the hidden Obsidian Warden.',
    region: 'End Game',
    order: 5,
    bosses: ['obsidian-warden'],
    mobs: ['Rift Sentinel', 'Celestial Sniper', 'Warped Monk'],
    npcs: ['Rift Cartographer', 'Banner Broker', 'Ascension Trainer'],
    secretSpots: [
      {
        title: 'World 5 Tunnel',
        description: 'Enter the cracked tunnel under the central bridge to find the Obsidian Warden door.',
        relatedBossId: 'obsidian-warden',
      },
    ],
    tags: ['world 5', 'endgame', 'tunnel'],
    updatedAt: '2025-11-30',
  },
];

const bosses: Boss[] = [
  {
    id: 'itaxin',
    slug: 'itaxin',
    name: 'Itaxin',
    category: 'bosses',
    silo: 'entities',
    summary: 'Intro boss with fast melee combos. Good for early mastery farming.',
    hp: 22000,
    respawnTime: '3m',
    levelRequirement: 10,
    worldId: 'frosted_origins',
    location: {
      worldId: 'frosted_origins',
      area: 'Hidden crack behind the spawn waterfall',
      isSecret: true,
    },
    loot: [
      { type: 'weapon', id: 'frost-dagger', name: 'Frost Dagger', chance: '12%' },
      { type: 'material', name: 'Cracked Ice Core', chance: '32%' },
    ],
    tactics: 'Circle strafe to dodge the triple slash, then punish during leap recovery.',
    tags: ['early', 'secret', 'frost'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'gekao',
    slug: 'gekao',
    name: 'Gekao',
    category: 'bosses',
    silo: 'entities',
    summary: 'Sandstorm boss in a wind-swept crevice. Drops the Shark Sword.',
    hp: 98000,
    respawnTime: '6m',
    levelRequirement: 32,
    worldId: 'shattered_dunes',
    location: {
      worldId: 'shattered_dunes',
      area: 'Sand crevice behind the third wind tunnel',
      isSecret: true,
    },
    loot: [
      { type: 'weapon', id: 'shark-sword', name: 'Shark Sword', chance: '9%' },
      { type: 'weapon', id: 'sandstorm-rifle', name: 'Sandstorm Rifle', chance: '6%' },
    ],
    tactics: 'Bait the sand geyser, then use ranged burst while Gekao recovers.',
    tags: ['midgame', 'wind', 'desert'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'leopardo',
    slug: 'leopardo',
    name: 'Leopardo',
    category: 'bosses',
    silo: 'entities',
    summary: 'Mobile aerial boss that dashes between islands. Requires ranged pressure.',
    hp: 152000,
    respawnTime: '8m',
    levelRequirement: 48,
    worldId: 'sky_citadel',
    location: {
      worldId: 'sky_citadel',
      area: 'Glider cave above the Sky Forge',
    },
    loot: [
      { type: 'weapon', id: 'sky-piercer', name: 'Sky Piercer', chance: '7%' },
      { type: 'material', name: 'Aether Wing', chance: '21%' },
    ],
    tactics: 'Stay mid-air with glider boosts, punish during storm dive recovery.',
    tags: ['aerial', 'ranged', 'midgame'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'alaza',
    slug: 'alaza',
    name: 'Alaza',
    category: 'bosses',
    silo: 'entities',
    summary: 'Secret Demon Land boss with a 2% Blood Art drop.',
    hp: 286000,
    respawnTime: '12m',
    levelRequirement: 80,
    worldId: 'demon_land',
    location: {
      worldId: 'demon_land',
      area: 'Sunken pit east of the shrine',
      isSecret: true,
    },
    loot: [
      { type: 'weapon', id: 'blood-art', name: 'Blood Art', chance: '2%' },
      { type: 'material', name: 'Cursed Ember', chance: '14%' },
    ],
    tactics: 'Use ranged weapons to avoid cleave, drop potions before enrage at 40% HP.',
    tags: ['late game', 'secret', 'demon'],
    updatedAt: '2025-11-30',
    seo: {
      title: 'Alaza location & drops - Demon Land secret boss',
      description: 'Find Alaza in Demon Land, spawn timer, loot table, and strategy tips.',
    },
  },
  {
    id: 'obsidian-warden',
    slug: 'obsidian-warden',
    name: 'Obsidian Warden',
    category: 'bosses',
    silo: 'entities',
    summary: 'Endgame tunnel boss guarding Rift Crescent with heavy cleaves.',
    hp: 426000,
    respawnTime: '15m',
    levelRequirement: 96,
    worldId: 'celestial_rift',
    location: {
      worldId: 'celestial_rift',
      area: 'Secret tunnel under the central bridge',
      isSecret: true,
    },
    loot: [
      { type: 'weapon', id: 'rift-crescent', name: 'Rift Crescent', chance: '3%' },
      { type: 'material', name: 'Obsidian Core', chance: '17%' },
    ],
    tactics: 'Stick to back legs to avoid frontal cleave; burst during shield break.',
    tags: ['endgame', 'secret', 'cleave'],
    updatedAt: '2025-11-30',
  },
];

const weapons: Weapon[] = [
  {
    id: 'blood_art',
    slug: 'blood-art',
    name: 'Blood Art',
    category: 'weapons',
    silo: 'items',
    summary: 'Secret-grade blade that stacks bleed ticks and pairs with burst Demon Arts.',
    rarity: 'Secret',
    class: 'Blade',
    stats: {
      baseMastery: 68,
      maxMastery: 120,
      damageMultiplier: '140%',
      critBonus: '+18% crit damage',
    },
    acquisition: {
      type: 'boss',
      id: 'alaza',
      name: 'Alaza',
      rate: '2%',
      note: 'Secret pit in Demon Land',
    },
    crafting: {
      materials: [
        { name: 'Cursed Ember', quantity: 8 },
        { name: 'Demon Core', quantity: 2 },
      ],
      note: 'Crafting unlocks after 15 Alaza kills.',
    },
    tradingValue: {
      low: 120,
      high: 150,
      currency: 'emeralds',
      trend: 'rising',
      lastUpdated: '2025-11-30',
      communityNote: 'Demand spiked after Update 1 Pt.3.',
    },
    recommendedBuild: {
      demonArtIds: ['void-reaver', 'crimson-lotus'],
      bestUse: 'Bleed-stacking boss melts in Demon Land and Celestial Rift.',
      synergyNotes: 'Pair with Drop potion before Alaza enrage for faster clears.',
    },
    worldId: 'demon_land',
    tags: ['secret', 'bleed', 'late game'],
    updatedAt: '2025-11-30',
    seo: {
      title: 'Blood Art stats & drop chance',
      description: 'Blood Art weapon stats, 2% Alaza drop chance, crafting costs, and trading value.',
      keywords: ['blood art', 'anime weapons blood art', 'blood art drop', 'blood art stats'],
    },
  },
  {
    id: 'shark-sword',
    slug: 'shark-sword',
    name: 'Shark Sword',
    category: 'weapons',
    silo: 'items',
    summary: 'Legendary cleave sword from Gekao with splash damage.',
    rarity: 'Legendary',
    class: 'Greatsword',
    stats: {
      baseMastery: 35,
      maxMastery: 90,
      damageMultiplier: '118%',
      critBonus: '+6% crit chance',
    },
    acquisition: {
      type: 'boss',
      id: 'gekao',
      name: 'Gekao',
      rate: '9%',
      note: 'Farm wind tunnel crevice in Shattered Dunes.',
    },
    tradingValue: {
      low: 34,
      high: 46,
      currency: 'emeralds',
      trend: 'stable',
      lastUpdated: '2025-11-27',
    },
    recommendedBuild: {
      demonArtIds: ['storm-dancer'],
      bestUse: 'AoE farming in Worlds 2-3 raids.',
      synergyNotes: 'Scale with Mastery potion before Sandstorm events.',
    },
    worldId: 'shattered_dunes',
    tags: ['cleave', 'aoe', 'midgame'],
    updatedAt: '2025-11-27',
  },
  {
    id: 'sandstorm-rifle',
    slug: 'sandstorm-rifle',
    name: 'Sandstorm Rifle',
    category: 'weapons',
    silo: 'items',
    summary: 'Burst rifle that gains extra projectiles inside sandstorms.',
    rarity: 'Epic',
    class: 'Ranged',
    stats: {
      baseMastery: 28,
      maxMastery: 84,
      damageMultiplier: '104%',
    },
    acquisition: {
      type: 'boss',
      id: 'gekao',
      name: 'Gekao',
      rate: '6%',
    },
    tradingValue: {
      low: 18,
      high: 24,
      currency: 'emeralds',
      trend: 'falling',
      lastUpdated: '2025-11-25',
    },
    recommendedBuild: {
      demonArtIds: ['storm-dancer'],
      bestUse: 'Range farming and early boss skipping with mobility Demon Arts.',
    },
    worldId: 'shattered_dunes',
    tags: ['ranged', 'burst', 'midgame'],
    updatedAt: '2025-11-25',
  },
  {
    id: 'sky-piercer',
    slug: 'sky-piercer',
    name: 'Sky Piercer',
    category: 'weapons',
    silo: 'items',
    summary: 'Aerial spear with bonus damage while airborne.',
    rarity: 'Mythic',
    class: 'Hybrid',
    stats: {
      baseMastery: 44,
      maxMastery: 108,
      damageMultiplier: '126%',
      critBonus: '+10% airborne crit',
    },
    acquisition: {
      type: 'boss',
      id: 'leopardo',
      name: 'Leopardo',
      rate: '7%',
      note: 'Glider cave above the Sky Forge.',
    },
    crafting: {
      materials: [
        { name: 'Aether Wing', quantity: 6 },
        { name: 'Sky Alloy', quantity: 12 },
      ],
    },
    recommendedBuild: {
      demonArtIds: ['storm-dancer', 'crimson-lotus'],
      bestUse: 'Hover burst vs aerial bosses and raids.',
    },
    worldId: 'sky_citadel',
    tags: ['aerial', 'mythic', 'burst'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'rift-crescent',
    slug: 'rift-crescent',
    name: 'Rift Crescent',
    category: 'weapons',
    silo: 'items',
    summary: 'Endgame curved blade that amplifies Demon Art cooldown reduction.',
    rarity: 'Secret',
    class: 'Katana',
    stats: {
      baseMastery: 78,
      maxMastery: 140,
      damageMultiplier: '152%',
      critBonus: '+12% cooldown refund chance',
    },
    acquisition: {
      type: 'boss',
      id: 'obsidian-warden',
      name: 'Obsidian Warden',
      rate: '3%',
      note: 'Tunnel under the Celestial Rift bridge.',
    },
    tradingValue: {
      low: 160,
      high: 190,
      currency: 'emeralds',
      trend: 'rising',
      lastUpdated: '2025-11-30',
      communityNote: 'High demand due to Demon Art synergy.',
    },
    recommendedBuild: {
      demonArtIds: ['void-reaver'],
      bestUse: 'Cooldown reduction builds for raid speedruns.',
    },
    worldId: 'celestial_rift',
    tags: ['secret', 'endgame', 'cdr'],
    updatedAt: '2025-11-30',
  },
  {
    id: 'frost-dagger',
    slug: 'frost-dagger',
    name: 'Frost Dagger',
    category: 'weapons',
    silo: 'items',
    summary: 'Fast dagger that slows targets, ideal for early bosses.',
    rarity: 'Rare',
    class: 'Blade',
    stats: {
      baseMastery: 12,
      maxMastery: 52,
      damageMultiplier: '92%',
    },
    acquisition: {
      type: 'boss',
      id: 'itaxin',
      name: 'Itaxin',
      rate: '12%',
    },
    recommendedBuild: {
      demonArtIds: ['crimson-lotus'],
      bestUse: 'Starter farming and mastery stacking in World 1.',
    },
    worldId: 'frosted_origins',
    tags: ['starter', 'slow', 'early'],
    updatedAt: '2025-11-24',
  },
];

const demonArts: DemonArt[] = [
  {
    id: 'void-reaver',
    slug: 'void-reaver',
    name: 'Void Reaver',
    category: 'demon-arts',
    silo: 'items',
    summary: 'Blink-heavy Demon Art with cooldown refund on crits.',
    rarity: 'Mythic',
    acquisition: {
      method: 'gacha',
      worldId: 'celestial_rift',
      locationName: 'Rift Conduit Banner',
      rate: '0.7%',
      pity: '90 pulls soft pity',
    },
    skills: [
      { name: 'Void Lunge', description: 'Dash forward and rend, refund 2s on crit.', cooldown: '16s' },
      { name: 'Phase Step', description: 'Short blink that grants i-frames.', cooldown: '9s' },
      { name: 'Rift Collapse', description: 'AoE implosion after a 1.5s delay.', cooldown: '28s' },
    ],
    synergyWeapons: ['blood_art', 'rift-crescent'],
    tags: ['blink', 'cdr', 'endgame'],
    updatedAt: '2025-11-30',
    seo: {
      title: 'Void Reaver Demon Art skills & pity',
      description: 'Void Reaver skill list, cooldowns, pity, and best weapon pairings.',
    },
  },
  {
    id: 'storm-dancer',
    slug: 'storm-dancer',
    name: 'Storm Dancer',
    category: 'demon-arts',
    silo: 'items',
    summary: 'Mobility art that buffs aerial and ranged damage.',
    rarity: 'Legendary',
    acquisition: {
      method: 'quest',
      worldId: 'sky_citadel',
      locationName: 'Sky Forge questline',
      rate: 'Guaranteed after quest',
    },
    skills: [
      { name: 'Gale Dash', description: 'Two mid-air dashes with brief i-frames.', cooldown: '14s' },
      { name: 'Tempest Field', description: 'Creates a storm zone that buffs ranged hits.', cooldown: '22s' },
      { name: 'Featherfall', description: 'Reduces fall speed and grants crit chance in air.', cooldown: '18s' },
    ],
    synergyWeapons: ['sandstorm-rifle', 'sky-piercer'],
    tags: ['mobility', 'ranged', 'aerial'],
    updatedAt: '2025-11-28',
  },
  {
    id: 'crimson-lotus',
    slug: 'crimson-lotus',
    name: 'Crimson Lotus',
    category: 'demon-arts',
    silo: 'items',
    summary: 'Bleed-focused art with self-heal from ticks.',
    rarity: 'Epic',
    acquisition: {
      method: 'drop',
      worldId: 'demon_land',
      locationName: 'Alaza',
      relatedBossId: 'alaza',
      rate: '5%',
    },
    skills: [
      { name: 'Lotus Bloom', description: 'Throw a spinning lotus that applies bleed.', cooldown: '15s' },
      { name: 'Blood Trail', description: 'Gain movement speed and heal from bleeds.', cooldown: '20s' },
      { name: 'Petal Storm', description: 'AoE petals around the player for 6s.', cooldown: '26s' },
    ],
    synergyWeapons: ['blood_art', 'frost-dagger'],
    tags: ['bleed', 'sustain', 'midgame'],
    updatedAt: '2025-11-29',
  },
];

export const wikiContent = {
  worlds,
  bosses,
  weapons,
  demonArts,
};

const allEntities: WikiEntity[] = [
  ...worlds,
  ...bosses,
  ...weapons,
  ...demonArts,
];

export const wikiCategoryList = Object.keys(wikiCategoryConfig) as WikiCategory[];

export function getCategoryLabel(category: WikiCategory) {
  return wikiCategoryConfig[category]?.title ?? category;
}

export function getWikiHref(category: WikiCategory, slug: string) {
  return `/wiki/${category}/${slug}`;
}

export function listEntitiesByCategory(category: WikiCategory): WikiEntity[] {
  return allEntities
    .filter((entry) => entry.category === category)
    .sort((a, b) => {
      if (category === 'worlds') {
        return (a as World).order - (b as World).order;
      }
      return a.name.localeCompare(b.name);
    });
}

export function getEntityById(id: string) {
  return allEntities.find((entity) => entity.id === id);
}

export function getWorldById(worldId?: string) {
  return worlds.find((world) => world.id === worldId);
}

export function getWikiEntity(category: WikiCategory, slug: string) {
  return listEntitiesByCategory(category).find((entry) => entry.slug === slug);
}

export function buildBreadcrumbs(entity: WikiEntity) {
  const items: { label: string; href?: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Wiki', href: '/wiki' },
    { label: getCategoryLabel(entity.category), href: `/wiki/${entity.category}` },
  ];

  if (entity.worldId) {
    const world = getWorldById(entity.worldId);
    if (world) {
      items.push({ label: world.name, href: `/wiki/worlds/${world.slug}` });
    }
  }

  items.push({ label: entity.name });
  return items;
}

export function getRecommendations(entity: WikiEntity) {
  const sameWorld = entity.worldId
    ? allEntities.filter(
        (entry) =>
          entry.worldId === entity.worldId &&
          entry.id !== entity.id &&
          entry.category !== 'worlds'
      )
    : [];

  const sameSilo = allEntities.filter(
    (entry) => entry.silo === entity.silo && entry.id !== entity.id
  );

  const crossLinks: WikiEntity[] = [];
  if (entity.category === 'weapons') {
    const weapon = entity as Weapon;
    if (weapon.acquisition?.id) {
      const source = getEntityById(weapon.acquisition.id);
      if (source) crossLinks.push(source);
    }
    weapon.recommendedBuild.demonArtIds.forEach((id) => {
      const art = demonArts.find((d) => d.id === id);
      if (art) crossLinks.push(art);
    });
  }

  if (entity.category === 'bosses') {
    (entity as Boss).loot.forEach((loot) => {
      if (loot.id) {
        const target = getEntityById(loot.id);
        if (target) crossLinks.push(target);
      }
    });
  }

  return {
    sameWorld: sameWorld.slice(0, 4),
    sameSilo: sameSilo.slice(0, 4),
    crossLinks: crossLinks.slice(0, 4),
  };
}

export function getTrendingWeapons(limit = 3) {
  const sorted = [...weapons].sort((a, b) => {
    const rarityWeight: Record<Weapon['rarity'], number> = {
      Common: 1,
      Rare: 2,
      Epic: 3,
      Legendary: 4,
      Mythic: 5,
      Secret: 6,
    };
    return rarityWeight[b.rarity] - rarityWeight[a.rarity];
  });
  return sorted.slice(0, limit);
}

export function getLatestEntities(limit = 4) {
  return [...allEntities]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}
