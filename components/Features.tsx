import { ReactNode } from 'react';
import {
  IconTarget,
  IconStar,
  IconController,
  IconUsers,
  IconRefresh,
  IconTrophy,
  IconPlay,
} from './icons';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const features: Feature[] = [
  {
    icon: <IconTarget className="w-12 h-12 text-av-pink" />,
    title: 'Weapon Fusion',
    description: 'Fuse duplicate weapons into 1-, 2-, and 3-star variants to stack Mastery and damage bonuses.',
  },
  {
    icon: <IconStar className="w-12 h-12 text-av-purple" />,
    title: 'Secret Boss Hunts',
    description: 'Each world hides a secret boss with signature drops like Shark Sword, Scythe Rose, Hawk Sword, and Blood Art.',
  },
  {
    icon: <IconController className="w-12 h-12 text-av-pink" />,
    title: 'Co-op Dungeons',
    description: 'Join raids and dungeons with shared rewards. Stack potions before you queue for better drops.',
  },
  {
    icon: <IconUsers className="w-12 h-12 text-av-purple" />,
    title: 'Avatars & Auras',
    description: 'Unlock avatars by finishing quests for permanent mastery/damage boosts and track aura progress at the NPC.',
  },
  {
    icon: <IconRefresh className="w-12 h-12 text-av-pink" />,
    title: 'Potion Economy',
    description: 'Damage, Mastery, Yen, Luck, and Drop potions layer together. Codes hand out free stacks weekly.',
  },
  {
    icon: <IconTrophy className="w-12 h-12 text-av-purple" />,
    title: 'Weekly Updates',
    description: 'New worlds, fixes, and compensation codes land frequently from developer AlphaXnewera.',
  },
];

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div
      className="glass-effect border border-av-purple/20 rounded-xl p-8 card-hover hover:border-av-purple hover:shadow-glow-purple"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 flex justify-center text-av-pink/80">{feature.icon}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-av-purple">
        {feature.title}
      </h3>
      <p className="text-gray-400 leading-relaxed-plus">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-24 bg-av-blue/20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            Game Features
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Discover what makes Anime Weapons one of the fastest-growing Roblox anime grinders. Learn why players keep farming its worlds and secret bosses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* About Section */}
        <div id="about" className="max-w-4xl mx-auto">
          <div className="glass-effect border border-av-purple/30 rounded-xl p-8 lg:p-12 shadow-glow-purple">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient-purple-pink">
              About Anime Weapons
            </h3>
            <div className="space-y-6 text-gray-300 text-base md:text-lg">
              <p className="leading-relaxed-plus">
                <strong className="text-av-purple">Anime Weapons</strong> is a boss-focused Roblox grinder by <strong className="text-white">AlphaXnewera</strong>.
                Travel across four anime-inspired worlds, beat quests to unlock keys, and farm bosses for weapons, accessories, and avatars. Secret bosses
                like Itaxin, Gekao, Leopardo, and Alaza hide the strongest drops.
              </p>
              <p className="leading-relaxed-plus">
                The game currently sits at <strong className="text-av-pink">22M+ visits</strong>, <strong className="text-av-pink">87K+ favorites</strong>,
                and peaks over <strong className="text-av-pink">32K active players</strong>. Potions, Emeralds, and reset tokens from codes speed up fusion to 3-star gear.
                Accessories from bosses add big Mastery, Damage, Yen, and Crit bonuses.
              </p>
              <p className="leading-relaxed-plus">
                Server size is 12, and rewards are shared in co-op, making dungeons and raids the fastest way to progress with friends.
                Redeem the latest Anime Weapons codes below before you hop into your next run.
              </p>
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-av-gradient-purple-pink rounded-xl font-bold text-lg shadow-glow-purple hover:scale-105 hover:shadow-glow-purple-lg transition-all"
              >
                <IconPlay className="w-6 h-6" />
                <span>Start Playing Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
