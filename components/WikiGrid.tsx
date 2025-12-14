import Link from 'next/link';
import { ReactNode } from 'react';
import {
  IconUsers,
  IconStar,
  IconTrophy,
  IconTarget,
  IconController,
  IconGift,
  IconRefresh,
  IconInfo,
} from './icons';

interface WikiItem {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}

const wikiItems: WikiItem[] = [
  {
    icon: <IconTarget className="w-8 h-8" />,
    title: 'Weapons & Items',
    description: 'Stats, mastery curves, drop chances, and trading hooks.',
    href: '/weapons',
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    icon: <IconTrophy className="w-8 h-8" />,
    title: 'Secret Bosses',
    description: 'Routes to Itaxin, Gekao, Leopardo, Alaza, and Obsidian Warden.',
    href: '/wiki/bosses',
    color: 'from-amber-500/20 to-amber-600/10',
  },
  {
    icon: <IconGift className="w-8 h-8" />,
    title: 'Codes',
    description: 'Latest working Anime Weapons codes for potions, emeralds, and resets.',
    href: '/codes',
    color: 'from-pink-500/20 to-pink-600/10',
  },
  {
    icon: <IconController className="w-8 h-8" />,
    title: 'Worlds & Maps',
    description: 'Secret tunnels, NPC hubs, and boss spawn locations.',
    href: '/wiki/worlds',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    icon: <IconStar className="w-8 h-8" />,
    title: 'Demon Arts',
    description: 'Skill data, cooldowns, pity odds, and best weapon pairings.',
    href: '/wiki/demon-arts',
    color: 'from-green-500/20 to-green-600/10',
  },
  {
    icon: <IconUsers className="w-8 h-8" />,
    title: 'Beginner Guide',
    description: 'Starter tips, recommended routes, and potion priority for new players.',
    href: '/wiki#beginner-guide',
    color: 'from-red-500/20 to-red-600/10',
  },
  {
    icon: <IconRefresh className="w-8 h-8" />,
    title: 'Trading',
    description: 'Economy silo with floor, average, and volatility per item.',
    href: '/value-list',
    color: 'from-cyan-500/20 to-cyan-600/10',
  },
  {
    icon: <IconInfo className="w-8 h-8" />,
    title: 'Potion Stacking',
    description: 'Best order to use Damage, Mastery, Yen, Luck, and Drop potions.',
    href: '/wiki#potions',
    color: 'from-indigo-500/20 to-indigo-600/10',
  },
];

function WikiCard({ item }: { item: WikiItem }) {
  return (
    <Link
      href={item.href}
      className="group glass-effect border border-av-purple/20 rounded-xl p-6 hover:border-av-purple/50 hover:shadow-glow-purple transition-all card-hover"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-av-purple group-hover:text-av-pink transition-colors`}>
        {item.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-av-purple transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {item.description}
      </p>
      <div className="mt-4 text-av-purple text-sm font-medium group-hover:text-av-pink transition-colors">
        Learn more &rarr;
      </div>
    </Link>
  );
}

export default function WikiGrid() {
  return (
    <section id="wiki" className="py-20 lg:py-24 bg-av-blue/20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            Anime Weapons Wiki
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Your complete resource for Anime Weapons codes, drops, boss routes, and farming strategies. Everything you need to dominate the game!
          </p>
        </div>

        {/* Wiki Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {wikiItems.map((item, index) => (
            <WikiCard key={index} item={item} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/wiki"
            className="inline-flex items-center gap-3 px-8 py-4 glass-effect border-2 border-av-purple rounded-xl font-bold text-lg hover:bg-av-purple/20 hover:border-av-pink transition-all"
          >
            <span>Explore Full Wiki</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
