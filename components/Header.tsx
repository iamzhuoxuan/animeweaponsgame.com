'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
  isHighlight?: boolean;
  isBeta?: boolean;
}

const navigationLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator', isHighlight: true },
  { href: '/codes', label: 'Codes' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/weapons', label: 'Weapons' },
  { href: '/worlds', label: 'Worlds' },
  { href: '/tier-list', label: 'TierList' },
  { href: '/value-list', label: 'ValueList' },
  { href: '/guides', label: 'Guides' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-av-purple/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Anime Weapons Home"
          >
            {!logoError && (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden ring-2 ring-av-purple/30 group-hover:ring-av-purple transition-all">
                <Image
                  src="/logo.png"
                  alt="Anime Weapons Logo"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-purple-pink hover:opacity-80 transition-opacity whitespace-nowrap">
              Anime Weapons
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationLinks.map((link) => {
              const badge = link.isBeta ? (
                <span className="ml-2 text-[10px] font-semibold text-av-pink px-2 py-0.5 rounded-full bg-av-purple/20 border border-av-purple/40">
                  Beta
                </span>
              ) : null;

              if (link.isHighlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative inline-flex items-center text-av-purple hover:text-av-pink font-bold transition-colors text-sm xl:text-base whitespace-nowrap group"
                  >
                    <span>{link.label}</span>
                    {badge}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-av-gradient-purple-pink opacity-70 group-hover:opacity-100 transition-opacity"></span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center text-gray-300 hover:text-av-purple font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  {badge}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:text-av-purple transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-4 space-y-4 animate-fade-in">
            {navigationLinks.map((link) => {
              const badge = link.isBeta ? (
                <span className="ml-2 text-[10px] font-semibold text-av-pink px-2 py-0.5 rounded-full bg-av-purple/20 border border-av-purple/40">
                  Beta
                </span>
              ) : null;

              if (link.isHighlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-av-purple hover:text-av-pink font-bold transition-colors py-2 border-l-2 border-av-purple pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="inline-flex items-center">
                      {link.label}
                      {badge}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-av-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="inline-flex items-center">
                    {link.label}
                    {badge}
                  </span>
                </Link>
              );
            })}
            <a
              href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 bg-av-gradient-purple-pink rounded-lg font-semibold text-center shadow-glow-purple"
            >
              Play
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
