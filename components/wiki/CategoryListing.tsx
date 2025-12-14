'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Boss,
  DemonArt,
  Weapon,
  WikiCategory,
  WikiEntity,
  World,
  getCategoryLabel,
  getWikiHref,
} from '@/data/wiki';

interface CategoryListingProps {
  category: WikiCategory;
  items: WikiEntity[];
  worldFilters?: { id: string; name: string; slug: string }[];
}

const isWeapon = (item: WikiEntity): item is Weapon => item.category === 'weapons';
const isBoss = (item: WikiEntity): item is Boss => item.category === 'bosses';
const isWorld = (item: WikiEntity): item is World => item.category === 'worlds';
const isDemonArt = (item: WikiEntity): item is DemonArt => item.category === 'demon-arts';

function EntityCard({ entity }: { entity: WikiEntity }) {
  return (
    <Link
      href={getWikiHref(entity.category, entity.slug)}
      className="block glass-effect border border-av-purple/20 rounded-xl p-5 hover:border-av-purple/60 card-hover"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs uppercase tracking-[0.12em] text-av-purple font-semibold">
          {getCategoryLabel(entity.category)}
        </div>
        {entity.worldId && !isWorld(entity) && (
          <span className="text-[11px] px-2 py-1 rounded-full bg-av-purple/15 text-av-purple border border-av-purple/30">
            {entity.worldId.replace('_', ' ')}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{entity.name}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{entity.summary}</p>

      {/* Category-specific meta */}
      {isWeapon(entity) && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="px-2 py-1 rounded-full bg-av-blue/40 border border-av-blue/40">
            {entity.rarity}
          </span>
          <span className="px-2 py-1 rounded-full bg-av-purple/20 border border-av-purple/30">
            {entity.class}
          </span>
          <span className="px-2 py-1 rounded-full bg-av-purple/10 border border-av-purple/20">
            {entity.stats.damageMultiplier} dmg
          </span>
        </div>
      )}

      {isBoss(entity) && (
        <div className="text-xs text-gray-300 space-y-1">
          <div>HP: {entity.hp.toLocaleString()} • Respawn: {entity.respawnTime}</div>
          <div>Level {entity.levelRequirement}+</div>
        </div>
      )}

      {isWorld(entity) && (
        <div className="text-xs text-gray-300 space-y-1">
          <div>NPCs: {entity.npcs.length} • Bosses: {entity.bosses.length}</div>
          <div>Secret Spots: {entity.secretSpots.length}</div>
        </div>
      )}

      {isDemonArt(entity) && (
        <div className="text-xs text-gray-300 space-y-1">
          <div>Rarity: {entity.rarity}</div>
          <div>Skills: {entity.skills.length}</div>
        </div>
      )}
    </Link>
  );
}

export default function CategoryListing({
  category,
  items,
  worldFilters = [],
}: CategoryListingProps) {
  const [worldFilter, setWorldFilter] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (worldFilter !== 'all' && item.worldId && item.worldId !== worldFilter) {
        return false;
      }

      if (search) {
        const text = (item.name + item.summary + item.tags.join(' ')).toLowerCase();
        if (!text.includes(search.toLowerCase())) return false;
      }

      if (rarityFilter !== 'all') {
        if (isWeapon(item) && item.rarity !== rarityFilter) return false;
        if (isDemonArt(item) && item.rarity !== rarityFilter) return false;
      }

      if (classFilter !== 'all') {
        if (isWeapon(item) && item.class !== classFilter) return false;
      }

      return true;
    });
  }, [items, worldFilter, rarityFilter, classFilter, search]);

  const showRarity = category === 'weapons' || category === 'demon-arts';
  const showClass = category === 'weapons';
  const showWorld = worldFilters.length > 0 && category !== 'worlds';

  return (
    <div className="space-y-8">
      <div className="glass-effect border border-av-purple/20 rounded-xl p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-gray-400 mb-1">Search</label>
          <input
            type="text"
            className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
            placeholder={`Search ${getCategoryLabel(category)}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {showWorld && (
          <div className="min-w-[160px]">
            <label className="block text-xs text-gray-400 mb-1">World</label>
            <select
              className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
              value={worldFilter}
              onChange={(e) => setWorldFilter(e.target.value)}
            >
              <option value="all">All</option>
              {worldFilters.map((world) => (
                <option key={world.id} value={world.id}>
                  {world.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showRarity && (
          <div className="min-w-[160px]">
            <label className="block text-xs text-gray-400 mb-1">Rarity</label>
            <select
              className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
              <option value="Mythic">Mythic</option>
              <option value="Secret">Secret</option>
            </select>
          </div>
        )}

        {showClass && (
          <div className="min-w-[160px]">
            <label className="block text-xs text-gray-400 mb-1">Class</label>
            <select
              className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Blade">Blade</option>
              <option value="Katana">Katana</option>
              <option value="Ranged">Ranged</option>
              <option value="Greatsword">Greatsword</option>
              <option value="Support">Support</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <EntityCard key={item.id} entity={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 glass-effect border border-av-purple/20 rounded-xl p-6">
          No results match your filters. Clear filters to see all entries.
        </div>
      )}
    </div>
  );
}
