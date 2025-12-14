import Image from 'next/image';
import { IconPlay, IconInfo, IconStar } from './icons';

const highlights = [
  { label: '4 Worlds', description: 'Shinobi, Saiyan, Pirate, Demon' },
  { label: 'Secret Bosses', description: 'Itaxin, Gekao, Leopardo, Alaza' },
  { label: 'Fuse to 3-Star', description: 'Boost damage & mastery' },
  { label: 'Co-op Loot Share', description: 'Rewards split in raids' },
];

export default function GameIntro() {
  return (
    <section id="game-intro" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-av-purple/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-av-purple/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-av-purple/10 border border-av-purple/30 mb-6">
            <IconInfo className="w-4 h-4 text-av-purple" />
            <span className="text-sm font-medium text-gray-400">About the Game</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            What is Anime Weapons?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Anime Weapons is a fast-paced Roblox experience where you grind through anime-inspired worlds, clear quests, and farm bosses for weapons, accessories, and avatars.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-start max-w-7xl mx-auto">
          {/* Left: Game Preview Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-av-purple/20 via-av-pink/20 to-av-purple/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-av-purple/30 shadow-glow-purple aspect-video sm:aspect-[16/9] lg:aspect-[16/10]">
                <Image
                  src="/anime-weapons-intro.webp"
                  alt="Anime Weapons promo art"
                  width={800}
                  height={480}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 lg:pl-4">
            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed-plus max-w-2xl">
              <p>
                <strong className="text-white text-xl">Anime Weapons</strong> blends action combat with a loot chase. Clear quests to unlock each world, defeat themed enemies, and fuse duplicate weapons into stronger 1-, 2-, and 3-star versions.
              </p>
              <p>
                Bosses and secret bosses drop exclusive loot like the Shark Sword, Scythe Rose, Hawk Sword, and Blood Art. Accessories boost mastery, damage, Yen gain, and crit chance, while avatars grant permanent stat bonuses after questing.
              </p>
              <p>
                Don&apos;t forget to check our <a href="#codes" className="text-av-purple hover:text-av-pink transition-colors underline">Anime Weapons codes</a> section for free potions and reset tokens before your next dungeon.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="glass-effect border border-av-purple/20 rounded-lg p-5 hover:border-av-purple/50 transition-colors hover:bg-av-purple/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconStar className="w-5 h-5 text-av-pink flex-shrink-0" />
                  <span className="font-bold text-white text-sm md:text-base">{item.label}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
