import { ReactNode } from 'react';
import { IconBird, IconChat, IconReddit, IconPlay } from './icons';

interface CommunityLink {
  name: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
  members?: string;
}

const communityLinks: CommunityLink[] = [
  {
    name: 'Roblox Game Page',
    description: 'Favorite and follow Anime Weapons to grab social links and join servers with friends.',
    href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons',
    icon: <IconPlay className="w-8 h-8" />,
    color: 'from-emerald-500 to-green-600',
    members: '87K+ favorites',
  },
  {
    name: 'Discord (linked in-game)',
    description: 'Open the Social Links on the Roblox page to join the official Discord for code pings and patch notes.',
    href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons',
    icon: <IconChat className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Code Tracker',
    description: 'Rock Paper Shotgun keeps a running list of newly tested Anime Weapons codes.',
    href: 'https://www.rockpapershotgun.com/roblox-anime-weapons-codes',
    icon: <IconBird className="w-8 h-8" />,
    color: 'from-sky-400 to-blue-500',
  },
  {
    name: 'YouTube Guides',
    description: 'Watch farming routes, boss locations, and accessory showcases from the community.',
    href: 'https://www.youtube.com/results?search_query=Anime+Weapons+Roblox',
    icon: <IconReddit className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
  },
];

function CommunityCard({ link }: { link: CommunityLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-effect border border-av-purple/20 rounded-xl p-6 hover:border-av-purple/50 hover:shadow-glow-purple transition-all card-hover block"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
          {link.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-av-purple transition-colors">
              {link.name}
            </h3>
            {link.members && (
              <span className="text-xs text-gray-500 bg-av-navy/50 px-2 py-1 rounded">
                {link.members} members
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {link.description}
          </p>
          <div className="mt-3 text-av-purple text-sm font-medium group-hover:text-av-pink transition-colors">
            Join now &rarr;
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Community() {
  return (
    <section id="community" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-av-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            Join the Anime Weapons Community
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Connect with fellow players, stay updated on the latest codes and updates, and become part of our growing community!
          </p>
        </div>

        {/* Community Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {communityLinks.map((link, index) => (
            <CommunityCard key={index} link={link} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="glass-effect border border-av-purple/30 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-glow-purple">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Chase Every Drop?
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Start your Anime Weapons adventure today! Farm bosses, redeem codes, and unlock every secret drop.
            </p>
            <a
              href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-av-gradient-purple-pink rounded-xl font-bold text-xl shadow-glow-purple hover:scale-105 hover:shadow-glow-purple-lg transition-all"
            >
              <IconPlay className="w-7 h-7" />
              <span>Play Anime Weapons Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
