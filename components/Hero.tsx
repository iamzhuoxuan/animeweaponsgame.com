import Image from 'next/image';
import { IconGift, IconPlay, IconUsers, IconStar, IconTrophy, IconController } from './icons';

// Game statistics
const gameStats = [
  { icon: <IconController className="w-5 h-5" />, label: 'Genre', value: 'Action / Boss Farming' },
  { icon: <IconStar className="w-5 h-5" />, label: 'Price', value: 'Free to Play' },
  { icon: <IconUsers className="w-5 h-5" />, label: 'Active Players', value: '32K+' },
  { icon: <IconTrophy className="w-5 h-5" />, label: 'Total Visits', value: '22M+' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/anime-weapons-hero.webp"
          alt="Anime Weapons cinematic background art"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-av-navy/95 via-av-navy/80 to-av-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-av-navy via-transparent to-av-navy/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-av-purple/20 border border-av-purple/40 mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-300">Roblox boss farming & weapon grind</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-5 text-gradient-multi animate-fade-in leading-[1.08] tracking-tight">
                Anime Weapons
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 font-semibold animate-slide-up">
                Slice through anime worlds, hunt secret bosses, and fuse rare weapons
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed-plus animate-slide-up">
                Clear quests across four anime-inspired worlds, collect accessories, and upgrade your mastery. Use the latest Anime Weapons codes for potions, emeralds, and reset tokens to speed up your grind.
              </p>

              {/* Game Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-slide-up">
                {gameStats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass-effect border border-av-purple/30 rounded-lg px-3 py-2.5 text-center hover:border-av-purple/60 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5 text-av-purple mb-1">
                      {stat.icon}
                      <span className="text-xs text-gray-400">{stat.label}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start mb-8">
                <a
                  href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-8 py-4 bg-av-gradient-purple-pink rounded-xl font-bold text-lg shadow-glow-purple hover:scale-105 hover:shadow-glow-purple-lg transition-all inline-flex items-center justify-center gap-3"
                >
                  <IconPlay className="w-6 h-6" />
                  <span>Play on Roblox</span>
                </a>
                <a
                  href="#codes"
                  className="w-full sm:w-auto px-8 py-4 bg-av-blue/80 border-2 border-av-purple rounded-xl font-bold text-lg hover:bg-av-purple/20 hover:border-av-pink transition-all inline-flex items-center justify-center gap-3"
                >
                  <IconGift className="w-6 h-6" />
                  <span>Get Free Codes</span>
                </a>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm animate-fade-in">
                <a href="#wiki" className="text-gray-400 hover:text-av-purple transition-colors link-underline">Wiki</a>
                <a href="#how-to-play" className="text-gray-400 hover:text-av-purple transition-colors link-underline">How to Play</a>
                <a href="#faq" className="text-gray-400 hover:text-av-purple transition-colors link-underline">FAQ</a>
              </div>
            </div>

            {/* Trailer */}
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-3 bg-gradient-to-r from-av-purple via-av-pink to-av-purple rounded-2xl opacity-20 blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-av-purple/40 shadow-glow-purple bg-av-blue/40">
                  <div className="absolute inset-0 bg-gradient-to-tr from-av-purple/10 via-transparent to-av-pink/20 pointer-events-none z-10" />
                  <Image
                    src="/anime-weapons-preview.webp"
                    alt="Anime Weapons boss arena preview"
                    width={960}
                    height={540}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Caption */}
                <p className="text-center text-sm text-gray-500 mt-3">Farm shinobi, saiyan, and demon worlds to unlock secret boss drops</p>
              </div>
            </div>
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#game-intro" aria-label="Scroll down" className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-av-purple hover:text-av-pink transition-colors"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
