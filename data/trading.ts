import { getEntityById, getWikiHref } from './wiki';

export interface TradingValue {
  slug: string;
  itemId: string;
  itemName: string;
  rarity: string;
  floor: number;
  average: number;
  demand: 'Rising' | 'Stable' | 'Falling';
  volatility: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
  notes?: string;
}

export const tradingValues: TradingValue[] = [
  {
    slug: 'blood-art',
    itemId: 'blood_art',
    itemName: 'Blood Art',
    rarity: 'Secret',
    floor: 120,
    average: 150,
    demand: 'Rising',
    volatility: 'Medium',
    lastUpdated: '2025-11-30',
    notes: 'Update 1 Pt.3 increased demand because of new bleed scaling.',
  },
  {
    slug: 'shark-sword',
    itemId: 'shark-sword',
    itemName: 'Shark Sword',
    rarity: 'Legendary',
    floor: 32,
    average: 40,
    demand: 'Stable',
    volatility: 'Low',
    lastUpdated: '2025-11-27',
    notes: 'Popular mid-game cleave; supply healthy from Gekao farms.',
  },
  {
    slug: 'sandstorm-rifle',
    itemId: 'sandstorm-rifle',
    itemName: 'Sandstorm Rifle',
    rarity: 'Epic',
    floor: 16,
    average: 22,
    demand: 'Falling',
    volatility: 'Low',
    lastUpdated: '2025-11-25',
    notes: 'Losing value as players push to Sky Citadel content.',
  },
  {
    slug: 'rift-crescent',
    itemId: 'rift-crescent',
    itemName: 'Rift Crescent',
    rarity: 'Secret',
    floor: 160,
    average: 188,
    demand: 'Rising',
    volatility: 'High',
    lastUpdated: '2025-11-30',
    notes: 'Cooldown refund builds spike demand; supply limited by Obsidian Warden timers.',
  },
  {
    slug: 'void-reaver',
    itemId: 'void-reaver',
    itemName: 'Void Reaver',
    rarity: 'Mythic Demon Art',
    floor: 140,
    average: 170,
    demand: 'Rising',
    volatility: 'High',
    lastUpdated: '2025-11-30',
    notes: 'Gacha pity is expensive; trading is faster for most players.',
  },
];

export function getTradingBySlug(slug: string) {
  return tradingValues.find((entry) => entry.slug === slug);
}

export function tradingWikiLink(slug: string) {
  const value = getTradingBySlug(slug);
  if (!value) return undefined;
  const entity = getEntityById(value.itemId);
  if (!entity) return undefined;
  return getWikiHref(entity.category, entity.slug);
}
