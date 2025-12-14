'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  IconBell,
  IconBookmark,
  IconClock,
  IconCopy,
  IconGift,
  IconHome,
  IconLightbulb,
  IconPlay,
  IconQuestion,
  IconTarget,
} from '@/components/icons';
import { gameCodes, type GameCode } from '@/data/codes';

// Lazy load Footer
const Footer = dynamic(() => import('@/components/Footer'));

const formatDisplayDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

interface CodeCardProps {
  code: GameCode;
  onCopy: (code: string) => void;
  isCopied: boolean;
  isNew?: boolean;
}

function CodeCard({ code, onCopy, isCopied, isNew }: CodeCardProps) {
  const isActive = code.status === 'active';

  return (
    <div
      className={`
        relative rounded-xl p-6 border transition-all
        ${isActive
          ? 'glass-effect border-av-purple/30 shadow-glow-purple hover:border-av-purple hover:shadow-glow-purple-lg card-hover'
          : 'bg-av-blue/10 border-gray-700 opacity-60'
        }
      `}
    >
      {isNew && null}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          {/* Status and Level badges */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`
                px-3 py-1 rounded-full text-sm font-semibold border
                ${isActive
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                }
              `}
            >
              {isActive ? '✓ Active' : '✗ Expired'}
            </span>
            {code.level && (
              <span
                className={`
                  px-3 py-1 rounded-full text-sm border
                  ${isActive
                    ? 'bg-av-purple/20 text-av-purple border-av-purple/30'
                    : 'bg-gray-700 text-gray-400 border-gray-600'
                  }
                `}
              >
                Level {code.level}+
              </span>
            )}
          </div>

          {/* Code */}
          <div
            className={`
              text-2xl font-bold font-mono mb-2
              ${isActive ? 'text-white' : 'text-gray-400 line-through'}
            `}
          >
            {code.code}
          </div>

          {/* Rewards */}
          <div className={isActive ? 'text-gray-300' : 'text-gray-500'}>
            <span className={`font-semibold ${isActive ? 'text-av-pink' : ''}`}>
              Rewards:{' '}
            </span>
            {code.rewards}
          </div>
        </div>

        {/* Copy button (only for active codes) */}
        {isActive && (
          <button
            onClick={() => onCopy(code.code)}
            className="px-6 py-3 bg-av-gradient-purple-pink rounded-lg font-semibold hover:scale-105 transition-all shadow-glow-purple whitespace-nowrap inline-flex items-center gap-2"
            aria-label={`Copy code ${code.code}`}
          >
            <IconCopy className="w-5 h-5" />
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CodesPage() {
  const lastUpdatedLabel = useMemo(() => formatDisplayDate(new Date()), []);
  const activeCodes = useMemo(
    () => gameCodes.filter((code) => code.status === 'active'),
    []
  );
  const newSet = useMemo(
    () => new Set(activeCodes.slice(0, 3).map((code) => code.code)),
    [activeCodes]
  );
  const expiredCodes = useMemo(
    () => gameCodes.filter((code) => code.status === 'expired'),
    []
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showExpired, setShowExpired] = useState(false);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Codes' }]} />

        {/* Codes Section - Unified Hero & Codes List */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            {/* Last Updated Badge */}
            <div className="inline-block px-4 py-2 bg-av-purple/20 border border-av-purple/40 rounded-full mb-6">
              <span className="text-av-purple font-bold text-sm">Last Updated: {lastUpdatedLabel}</span>
            </div>

            {/* Page Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Anime Weapons Codes
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed-plus">
              Redeem these Anime Weapons codes for free potions, Emeralds, and reset tokens. Updated daily so you never miss a milestone drop.
            </p>

            {/* Active Codes Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              <span className="inline-flex items-center justify-center gap-3">
                <IconGift className="w-7 h-7 text-av-pink" />
                <span>Active Codes</span>
              </span>
            </h2>
          </div>

          {/* Active Codes List */}
          <div className="grid gap-4 md:gap-6 mb-8">
            {activeCodes.length === 0 && (
              <div className="text-center text-gray-500 border border-dashed border-gray-700 rounded-xl py-6">
                No active codes right now. Check the expired list below.
              </div>
            )}
            {activeCodes.map((code, index) => (
              <CodeCard
                key={index}
                code={code}
                onCopy={copyToClipboard}
                isCopied={copiedCode === code.code}
                isNew={newSet.has(code.code)}
              />
            ))}
          </div>

          {/* Expired Codes Toggle */}
          {expiredCodes.length > 0 && (
            <div className="flex flex-col items-center gap-6">
               <button
                onClick={() => setShowExpired(!showExpired)}
                className="px-6 py-3 glass-effect border border-av-purple/30 rounded-lg font-semibold hover:bg-av-purple/20 hover:border-av-purple transition-all"
                aria-expanded={showExpired}
              >
                {showExpired ? '▲ Hide' : '▼ Show'} Expired Codes ({expiredCodes.length})
              </button>

              {showExpired && (
                <div className="w-full grid gap-4 md:gap-6 animate-slide-up">
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                    <span className="inline-flex items-center justify-center gap-3">
                      <IconClock className="w-7 h-7 text-av-pink" />
                      <span>Expired Codes</span>
                    </span>
                  </h2>
                  {expiredCodes.map((code, index) => (
                    <CodeCard
                      key={index}
                      code={code}
                      onCopy={copyToClipboard}
                      isCopied={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* How to Redeem Section */}
        <section id="how-to-redeem" className="max-w-4xl mx-auto mb-20">
            <div className="glass-effect border border-av-purple/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                <span className="inline-flex items-center justify-center gap-3">
                  <IconGift className="w-7 h-7 text-av-pink" />
                  <span>How to Redeem Codes</span>
                </span>
              </h2>

              <div className="mb-10 overflow-hidden rounded-xl border border-av-purple/20 shadow-lg">
                <Image
                  src="/anime-weapons-redeem-codes.webp"
                  alt="Anime Weapons redeem codes menu screenshot"
                  width={768}
                  height={432}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed-plus">
                <p className="text-white font-semibold text-lg">
                  Now you&apos;ve got a gargantuan stack of Anime Weapons codes, follow these steps to redeem them:
                </p>
                <ol className="list-decimal list-inside space-y-3">
                  <li>Boot up Anime Weapons on Roblox, then look for a gift basket icon in the top left-hand corner of the screen.</li>
                  <li>Click this icon to bring up the codes bar.</li>
                  <li>Type your code into the bar or copy and paste it directly from this page, then hit enter.</li>
                  <li>If your code was valid, you&apos;ll see your rewards appear on the left-hand side of the screen.</li>
                </ol>
              </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              <span className="inline-flex items-center justify-center gap-3">
                <IconQuestion className="w-7 h-7 text-av-pink" />
                <span>Frequently Asked Questions</span>
              </span>
            </h2>

            <div className="space-y-6">
              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Why isn&apos;t my code working?
                </h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  Codes are case-sensitive and must be entered exactly as shown. Make sure the code hasn&apos;t expired,
                  and check that you meet any level requirements. Some codes also have redemption limits.
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  How often are new codes released?
                </h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  New codes are typically released during game updates, special events, milestones, and holidays.
                  Follow the official social media channels and bookmark this page for the latest codes!
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Can I redeem the same code multiple times?
                </h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  No, each code can only be redeemed once per account. Once you&apos;ve used a code,
                  it will be marked as redeemed and cannot be used again.
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  What should I do if I can&apos;t find the codes menu?
                </h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  Make sure you&apos;re in the main lobby and have completed the tutorial. The Profile button
                  should be visible on the right side of your screen. If you still can&apos;t find it, try restarting the game.
                </p>
              </div>
            </div>
        </section>

        {/* Tips Section */}
        <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              <span className="inline-flex items-center justify-center gap-3">
                <IconLightbulb className="w-7 h-7 text-av-pink" />
                <span>Tips for Redeeming Codes</span>
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <div className="mb-4 text-av-pink">
                  <IconBell className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Stay Updated</h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  Follow the game&apos;s social media for code announcements. Enable notifications
                  to never miss new codes!
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <div className="mb-4 text-av-pink">
                  <IconClock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Redeem Quickly</h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  Some codes have limited redemptions or short expiration periods.
                  Redeem them as soon as possible!
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <div className="mb-4 text-av-pink">
                  <IconBookmark className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Bookmark This Page</h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  We update this page regularly with the latest codes.
                  Add it to your bookmarks for quick access!
                </p>
              </div>

              <div className="glass-effect border border-av-purple/20 rounded-xl p-6">
                <div className="mb-4 text-av-pink">
                  <IconTarget className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Check Requirements</h3>
                <p className="text-gray-400 leading-relaxed-plus">
                  Some codes require a minimum level. Level up your account
                  to unlock all available rewards!
                </p>
              </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              <span className="inline-flex items-center justify-center gap-3">
                <IconPlay className="w-7 h-7 text-av-pink" />
                <span>Ready to Claim Your Rewards?</span>
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Start playing Anime Weapons now and redeem all available codes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-av-gradient-purple-pink rounded-xl font-bold text-lg shadow-glow-purple hover:scale-105 hover:shadow-glow-purple-lg transition-all inline-flex items-center justify-center gap-3"
              >
                <IconPlay className="w-6 h-6" />
                <span>Play on Roblox</span>
              </a>
              <Link
                href="/"
                className="px-10 py-4 bg-av-blue border-2 border-av-purple rounded-xl font-bold text-lg hover:bg-av-purple/20 hover:border-av-pink transition-all inline-flex items-center justify-center gap-3"
              >
                <IconHome className="w-6 h-6" />
                <span>Back to Home</span>
              </Link>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
