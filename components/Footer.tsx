import { ReactNode } from 'react';
import {
  IconBird,
  IconChat,
  IconPlay,
  IconReddit,
} from './icons';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const socialLinks: FooterLink[] = [
  { label: 'Roblox Game', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true, icon: <IconPlay className="w-5 h-5" /> },
  { label: 'Codes Tracker', href: 'https://www.rockpapershotgun.com/roblox-anime-weapons-codes', external: true, icon: <IconBird className="w-5 h-5" /> },
  { label: 'Discord (via Socials)', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true, icon: <IconChat className="w-5 h-5" /> },
  { label: 'YouTube Guides', href: 'https://www.youtube.com/results?search_query=Anime+Weapons+Roblox', external: true, icon: <IconReddit className="w-5 h-5" /> },
];

const footerSections: FooterSection[] = [
  {
    title: 'Play Anime Weapons',
    links: [
      { label: 'Play Anime Weapons', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true },
      { label: 'Active Codes', href: '/codes' },
      { label: 'Drop & Boss Guide', href: '/wiki#drops' },
      { label: 'How to Redeem Codes', href: '/codes' },
      { label: 'Secret Boss Locations', href: '/wiki#secret-bosses' },
      { label: 'Features', href: '/#features' },
    ],
  },
  {
    title: 'Guides & Resources',
    links: [
      { label: 'Weapons & Accessories', href: '/wiki#drops' },
      { label: 'Avatars & Auras', href: '/wiki#avatars' },
      { label: 'Farming Tips', href: '/wiki#farming' },
      { label: 'Potion Stacking', href: '/wiki#potions' },
      { label: 'Beginner Guide', href: '/wiki#beginner-guide' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Codes & Updates',
    links: [
      { label: 'Latest Codes', href: '/codes' },
      { label: 'Expired Codes', href: '/codes' },
      { label: 'Patch Tracker (RPS)', href: 'https://www.rockpapershotgun.com/roblox-anime-weapons-codes', external: true },
      { label: 'Roblox Updates', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Roblox Page', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true },
      { label: 'Discord (via Socials)', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true },
      { label: 'YouTube Guides', href: 'https://www.youtube.com/results?search_query=Anime+Weapons+Roblox', external: true },
      { label: 'Support Dev AlphaX', href: 'https://www.roblox.com/games/79189799490564/Anime-Weapons', external: true },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-av-navy border-t border-av-purple/20 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-purple-pink">
              Anime Weapons Codes & Wiki
            </h3>
            <p className="text-gray-400 leading-relaxed-plus">
              Deep-dive guides for Anime Weapons codes, boss drops, fusion, and farming routes. Explore the wiki to stay ahead of every update.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  className="p-2 rounded-full border border-av-purple/30 text-gray-300 hover:text-av-pink hover:border-av-pink transition-colors"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-bold mb-4 text-av-purple">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                      className="text-gray-400 hover:text-av-pink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-av-purple/20 pt-8">
          <div className="text-center text-gray-400 space-y-2">
            <p className="text-sm leading-relaxed-plus">
              This is an unofficial fan-made website. Anime Weapons is created by AlphaXnewera on Roblox.
            </p>
            <p className="text-sm">
              © {currentYear} Anime Weapons Guide. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
