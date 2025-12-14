import { v4 as uuid } from 'uuid';
import { gameCodes } from './codes';
import { wikiContent } from './wiki';

export type SupabaseCodeStatus = 'Active' | 'Expired' | 'Conditional';

export interface SupabaseCode {
  id: number;
  code_text: string;
  status: SupabaseCodeStatus;
  reward_json: Record<string, unknown>;
  source_ref?: string;
  verified_at?: string;
}

export interface SupabaseWeapon {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Secret';
  base_damage: number;
  damage_scaling: number;
  max_stars?: number;
  origin_world?: string;
  image_url?: string;
}

export interface SupabaseBoss {
  id: number;
  name: string;
  world_id?: string;
  hp_approx: number;
  defense_val?: number;
  location_desc?: string;
}

// Codes master list derived from the PRD; values like "variable" are kept as strings so you can refine later.
// Legacy seed list (kept for reference; unified export below derives from gameCodes)
export const supabaseCodesSeed: SupabaseCode[] = [
  {
    id: 1,
    code_text: '15MVISITS',
    status: 'Active',
    reward_json: {
      emeralds: 100,
      potions: { mastery: 2, damage: 2, yen: 2, drop: 1 },
      reset_tokens: 2,
    },
  },
  {
    id: 2,
    code_text: '70KLIKES',
    status: 'Active',
    reward_json: {
      potions: { mastery: 2, damage: 2, drop: 1 },
      reset_tokens: 1,
    },
  },
  {
    id: 3,
    code_text: '60KLIKES',
    status: 'Active',
    reward_json: {
      emeralds: 20,
      potions: { mastery: 1, damage: 1, drop: 1 },
      reset_tokens: 1,
    },
  },
  {
    id: 4,
    code_text: 'PATCHUPDT1',
    status: 'Active',
    reward_json: { emeralds: 40, potions: { mastery: 1, damage: 1 }, reset_tokens: 1 },
  },
  {
    id: 5,
    code_text: '50KLIKES',
    status: 'Active',
    reward_json: { potions: { mastery: 1, damage: 1, drop: 1 } },
  },
  {
    id: 6,
    code_text: 'UPDATE1',
    status: 'Active',
    reward_json: { emeralds: 100, potions: { mastery: 1, luck: 1, damage: 1 }, reset_tokens: 1 },
  },
  {
    id: 7,
    code_text: '5MVISITS',
    status: 'Active',
    reward_json: { emeralds: 40, potions: { mastery: 1, damage: 1 }, reset_tokens: 1 },
  },
  {
    id: 8,
    code_text: '40KLIKES',
    status: 'Active',
    reward_json: { potions: { mastery: 1, damage: 1, drop: 1 } },
  },
  {
    id: 9,
    code_text: '35KLIKES',
    status: 'Active',
    reward_json: { potions: { mastery: 1, damage: 1, drop: 1 } },
  },
  {
    id: 10,
    code_text: '30KCCU',
    status: 'Active',
    reward_json: { emeralds: 50, potions: { mastery: 3, luck: 3, damage: 3 }, reset_tokens: 2 },
  },
  {
    id: 11,
    code_text: '28KLIKES',
    status: 'Active',
    reward_json: { emeralds: 20, potions: { mastery: 1, drop: 1, damage: 1 }, reset_tokens: 1 },
  },
  {
    id: 12,
    code_text: 'RANKUP',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 13,
    code_text: '90KLIKES',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 14,
    code_text: 'SHADOWPORTALFIXED',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 15,
    code_text: 'UPDATE2',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 16,
    code_text: '80KLIKES',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 17,
    code_text: '20MVISITS',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 18,
    code_text: 'SORRYFORUPDATE',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 19,
    code_text: 'DEFENSEACHIEVEMENTSPATCH',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 20,
    code_text: '17KCCU',
    status: 'Active',
    reward_json: { emeralds: 'variable', potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 21,
    code_text: '10KLIKES',
    status: 'Active',
    reward_json: { potions: 'variable', reset_tokens: 1 },
  },
  {
    id: 22,
    code_text: 'GACHAROLLFIX',
    status: 'Active',
    reward_json: { potions: 'variable' },
  },
  {
    id: 23,
    code_text: '16KCCU',
    status: 'Active',
    reward_json: { potions: 'variable' },
  },
  {
    id: 24,
    code_text: 'BEPPBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 25,
    code_text: 'RLBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 26,
    code_text: 'SHIROBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 27,
    code_text: 'LENIBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 28,
    code_text: 'CRYOBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 29,
    code_text: 'BELABESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 30,
    code_text: 'KHAEZARBESTDEV',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 31,
    code_text: 'XOUBESTYT',
    status: 'Active',
    reward_json: { emeralds: 5 },
  },
  {
    id: 32,
    code_text: 'SORRY4PITYBUG',
    status: 'Expired',
    reward_json: { emeralds: 'variable' },
  },
  {
    id: 33,
    code_text: 'SORRYSHUTDOWN',
    status: 'Expired',
    reward_json: { rewards: 'unknown' },
  },
];

// Unified codes derived from gameCodes to avoid maintaining two sources.
export const supabaseCodes: SupabaseCode[] = gameCodes.map((code, index) => ({
  id: index + 1,
  code_text: code.code,
  status: code.status === 'active' ? 'Active' : 'Expired',
  reward_json: { rewards: code.rewards, category: code.category ?? 'unknown' },
  verified_at: code.addedDate,
}));

// Weapons table seed from PRD sample inserts (kept for reference; unified export below derives from wikiContent)
export const supabaseWeaponsSeed: SupabaseWeapon[] = [
  {
    id: uuid(),
    name: 'Water Sword',
    rarity: 'Rare',
    base_damage: 50,
    damage_scaling: 2.5,
    max_stars: 5,
    origin_world: 'World 1',
  },
  {
    id: uuid(),
    name: 'Shard Bedu Sword',
    rarity: 'Epic',
    base_damage: 120,
    damage_scaling: 2.5,
    max_stars: 5,
    origin_world: 'World 2',
  },
  {
    id: uuid(),
    name: 'Dragon Mythic',
    rarity: 'Mythic',
    base_damage: 500,
    damage_scaling: 2.5,
    max_stars: 5,
    origin_world: 'Planet Namek',
  },
];

// Unified weapons derived from wikiContent to keep a single source of truth.
export const supabaseWeapons: SupabaseWeapon[] = wikiContent.weapons.map((weapon) => ({
  id: weapon.id,
  name: weapon.name,
  rarity: weapon.rarity,
  base_damage: weapon.stats.baseMastery, // using baseMastery as the closest available baseline
  damage_scaling: Math.max(1, Math.round((weapon.stats.maxMastery - weapon.stats.baseMastery) / 10)),
  max_stars: 5,
  origin_world: weapon.worldId,
  image_url: undefined,
}));

// Bosses seeded with available HP from the existing wiki data to make the planner usable immediately (legacy).
export const supabaseBossesSeed: SupabaseBoss[] = [
  {
    id: 1,
    name: 'Itaxin',
    world_id: 'frosted_origins',
    hp_approx: 22000,
    defense_val: 0,
    location_desc: 'Hidden crack behind the spawn waterfall (World 1)',
  },
  {
    id: 2,
    name: 'Gekao',
    world_id: 'shattered_dunes',
    hp_approx: 98000,
    defense_val: 0,
    location_desc: 'Sand crevice behind the third wind tunnel (World 2)',
  },
  {
    id: 3,
    name: 'Leopardo',
    world_id: 'sky_citadel',
    hp_approx: 152000,
    defense_val: 0,
    location_desc: 'Glider cave above the Sky Forge (World 3)',
  },
  {
    id: 4,
    name: 'Alaza',
    world_id: 'demon_land',
    hp_approx: 286000,
    defense_val: 0,
    location_desc: 'Sunken pit east of the shrine (Demon Land)',
  },
  {
    id: 5,
    name: 'Obsidian Warden',
    world_id: 'celestial_rift',
    hp_approx: 426000,
    defense_val: 0,
    location_desc: 'Secret tunnel under the central bridge (World 5)',
  },
];

// Unified bosses derived from wikiContent to stay in sync.
export const supabaseBosses: SupabaseBoss[] = wikiContent.bosses.map((boss, idx) => ({
  id: idx + 1,
  name: boss.name,
  world_id: boss.worldId,
  hp_approx: boss.hp,
  defense_val: 0,
  location_desc: boss.location?.area,
}));
