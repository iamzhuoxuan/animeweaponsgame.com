import { ReactNode } from 'react';
import { IconTarget, IconUsers, IconStar, IconTrophy, IconGift, IconController } from './icons';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Pick a Starter',
    description: 'Choose Shuriken or Kunai, finish the tutorial quests, and learn your basic combo and dash timing.',
    icon: <IconStar className="w-8 h-8" />,
  },
  {
    number: '02',
    title: 'Farm & Quest',
    description: 'Clear enemies to earn Emeralds, potions, and weapon drops while completing the world quests for keys.',
    icon: <IconTarget className="w-8 h-8" />,
  },
  {
    number: '03',
    title: 'Fuse Upgrades',
    description: 'Combine duplicate weapons into 1-, 2-, and 3-star versions for higher mastery and damage bonuses.',
    icon: <IconTrophy className="w-8 h-8" />,
  },
  {
    number: '04',
    title: 'Hunt Bosses',
    description: 'Beat world bosses and secret bosses like Itaxin, Gekao, Leopardo, and Alaza to grab the rarest loot.',
    icon: <IconGift className="w-8 h-8" />,
  },
];

const tips = [
  { icon: <IconUsers className="w-5 h-5" />, tip: 'Play co-op raids—loot is shared and clears are faster.' },
  { icon: <IconStar className="w-5 h-5" />, tip: 'Use potions before dungeon runs to stack drop chances.' },
  { icon: <IconController className="w-5 h-5" />, tip: 'Talk to the Aura NPC to track boosts after clearing mobs.' },
  { icon: <IconGift className="w-5 h-5" />, tip: 'Redeem codes before long farms to max potion timers.' },
];

export default function HowToPlay() {
  return (
    <section id="how-to-play" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-av-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-av-pink/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            How to Play Anime Weapons
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            New to Anime Weapons? Follow these steps to unlock every world, push mastery, and start farming boss drops fast.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative glass-effect border border-av-purple/20 rounded-xl p-6 hover:border-av-purple/50 hover:shadow-glow-purple transition-all group"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-2 text-6xl font-black text-av-purple/10 group-hover:text-av-purple/20 transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-av-gradient-purple-pink flex items-center justify-center mb-4 text-white shadow-glow-purple">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-av-purple transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-av-purple/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect border border-av-purple/30 rounded-2xl p-8 shadow-glow-purple">
            <h3 className="text-2xl font-bold text-center text-white mb-6">
              Pro Tips for New Players
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {tips.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-av-navy/50 border border-av-purple/10 hover:border-av-purple/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-av-purple/20 flex items-center justify-center text-av-pink shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-gray-300 text-sm">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
