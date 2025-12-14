import Link from 'next/link';
import { IconStar, IconTrophy } from './icons';

interface Drop {
  name: string;
  source: string;
  rarity: 'Secret Boss' | 'World Boss' | 'Avatar';
  tier: 'S+' | 'S' | 'A';
  color: string;
  bonus: string;
}

const popularUnits: Drop[] = [
  { name: 'Shark Sword', source: 'W1 Secret Boss: Itaxin', rarity: 'Secret Boss', tier: 'S+', color: 'from-cyan-400 to-blue-500', bonus: '+50% damage, up to 108 Mastery at 3★' },
  { name: 'Scythe Rose', source: 'W2 Secret Boss: Gekao', rarity: 'Secret Boss', tier: 'S+', color: 'from-rose-400 to-purple-500', bonus: '+70% damage, up to 160 Mastery at 3★' },
  { name: 'Hawk Sword', source: 'W3 Secret Boss: Leopardo', rarity: 'Secret Boss', tier: 'S', color: 'from-amber-400 to-orange-500', bonus: '+90% damage, up to 212 Mastery at 3★' },
  { name: 'Blood Art', source: 'W4 Secret Boss: Alaza', rarity: 'Secret Boss', tier: 'S+', color: 'from-red-500 to-pink-500', bonus: '+140% damage, up to 272 Mastery at 3★' },
  { name: 'Angel Staff', source: 'Bubu (W2 Boss)', rarity: 'World Boss', tier: 'A', color: 'from-indigo-400 to-sky-500', bonus: '+40% damage, up to 72 Mastery at 3★' },
  { name: 'Purple Skeleton', source: 'Itaxin Secret Boss Accessory', rarity: 'Avatar', tier: 'S', color: 'from-violet-400 to-fuchsia-500', bonus: '+60% Mastery & +10% damage' },
];

const rarityColors: Record<Drop['rarity'], string> = {
  'Secret Boss': 'text-amber-300 border-amber-400/50 bg-amber-300/10',
  'World Boss': 'text-sky-300 border-sky-400/50 bg-sky-300/10',
  Avatar: 'text-purple-300 border-purple-400/50 bg-purple-300/10',
};

const tierColors = {
  'S+': 'text-amber-400',
  'S': 'text-purple-400',
  'A': 'text-blue-400',
};

function UnitCard({ unit }: { unit: Drop }) {
  return (
    <div className="group glass-effect border border-av-purple/20 rounded-xl overflow-hidden hover:border-av-purple/50 hover:shadow-glow-purple transition-all card-hover">
      {/* Unit Avatar Placeholder */}
      <div className={`h-32 bg-gradient-to-br ${unit.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold">
            {unit.name.charAt(0)}
          </div>
        </div>
        {/* Tier badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm font-bold text-sm ${tierColors[unit.tier]}`}>
          {unit.tier}
        </div>
      </div>

      {/* Unit Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-av-purple transition-colors">
          {unit.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{unit.source}</p>
        <p className="text-gray-300 text-xs mb-3">{unit.bonus}</p>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${rarityColors[unit.rarity]}`}>
          <IconStar className="w-3 h-3" />
          {unit.rarity}
        </div>
      </div>
    </div>
  );
}

export default function PopularUnits() {
  return (
    <section id="popular-units" className="py-20 lg:py-24 bg-av-blue/20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-av-purple/10 border border-av-purple/30 mb-6">
            <IconTrophy className="w-4 h-4 text-av-pink" />
            <span className="text-sm font-medium text-gray-400">Chase Drops</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            Popular Drops in Anime Weapons
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            These boss and secret boss drops define the Anime Weapons meta. Grab them early to snowball mastery and damage gains.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 max-w-7xl mx-auto mb-12">
          {popularUnits.map((unit, index) => (
            <UnitCard key={index} unit={unit} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/wiki#drops"
            className="inline-flex items-center gap-3 px-8 py-4 bg-av-gradient-purple-pink rounded-xl font-bold text-lg shadow-glow-purple hover:scale-105 hover:shadow-glow-purple-lg transition-all"
          >
            <IconTrophy className="w-6 h-6" />
            <span>View Drop Guide</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
