'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { IconCopy, IconGift } from './icons';
import { gameCodes, type GameCode } from '@/data/codes';

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
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div
              className={`
                text-2xl font-bold font-mono
                ${isActive ? 'text-white' : 'text-gray-400 line-through'}
              `}
            >
              {code.code}
            </div>
            {isNew && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-av-purple/20 text-av-purple border border-av-purple/30">
                New
              </span>
            )}
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

interface CodesSectionProps {
  title?: string;
  limit?: number;
  highlightFirst?: number;
  showMoreLink?: boolean;
}

export default function CodesSection({ title, limit, highlightFirst = 0, showMoreLink }: CodesSectionProps) {
  const activeCodes = useMemo(
    () => gameCodes.filter((code) => code.status === 'active'),
    []
  );
  const expiredCodes = useMemo(
    () => gameCodes.filter((code) => code.status === 'expired'),
    []
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showExpired, setShowExpired] = useState(false);

  const displayActive = useMemo(
    () => (limit ? activeCodes.slice(0, limit) : activeCodes),
    [activeCodes, limit]
  );

  const newSet = useMemo(() => {
    const take = highlightFirst > 0 ? activeCodes.slice(0, highlightFirst) : [];
    return new Set(take.map((code) => code.code));
  }, [activeCodes, highlightFirst]);

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
    <section id="codes" className="pb-20 pt-8 lg:pb-24 lg:pt-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title (Optional) */}
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
              {title}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
              Redeem these active Anime Weapons codes for free potions, emeralds, and reset tokens. We update this list as soon as new milestones drop so you can keep farming faster.
            </p>
          </div>
        )}

        {/* Active Codes List */}
        <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
          {displayActive.length === 0 && (
            <div className="text-center text-gray-500 border border-dashed border-gray-700 rounded-xl py-6">
              No active codes right now. Check the expired list below.
            </div>
          )}
          {displayActive.map((code, index) => (
            <CodeCard
              key={index}
              code={code}
              onCopy={copyToClipboard}
              isCopied={copiedCode === code.code}
              isNew={newSet.has(code.code)}
            />
          ))}
        </div>

        {!limit && (
          <>
            {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/codes#codes"
              className="px-6 py-3 bg-av-gradient-purple-pink rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>More active codes</span>
            </Link>
            <Link
              href="/codes#how-to-redeem"
              className="px-6 py-3 glass-effect border border-av-purple/30 rounded-lg font-semibold hover:bg-av-purple/20 hover:border-av-purple transition-all inline-flex items-center gap-2"
            >
              <IconGift className="w-5 h-5" />
              <span>How to Redeem Codes</span>
            </Link>
            {expiredCodes.length > 0 && (
              <button
                onClick={() => setShowExpired(!showExpired)}
                className="px-6 py-3 glass-effect border border-av-purple/30 rounded-lg font-semibold hover:bg-av-purple/20 hover:border-av-purple transition-all"
                aria-expanded={showExpired}
              >
                {showExpired ? 'Hide Expired Codes' : `Show Expired Codes (${expiredCodes.length})`}
              </button>
            )}
          </div>

            {/* Expired Codes List */}
            {showExpired && expiredCodes.length > 0 && (
              <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-400 text-center mb-4">
                  Expired Codes
                </h3>
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
          </>
        )}

        {showMoreLink && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/codes#codes"
              className="px-6 py-3 bg-av-gradient-purple-pink rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>More active codes</span>
            </Link>
            <Link
              href="/codes#how-to-redeem"
              className="px-6 py-3 glass-effect border border-av-purple/30 rounded-lg font-semibold hover:bg-av-purple/20 hover:border-av-purple transition-all inline-flex items-center gap-2"
            >
              <IconGift className="w-5 h-5" />
              <span>How to Redeem Codes</span>
            </Link>
            <button
              onClick={() => setShowExpired(!showExpired)}
              className="px-6 py-3 glass-effect border border-av-purple/30 rounded-lg font-semibold hover:bg-av-purple/20 hover:border-av-purple transition-all"
              aria-expanded={showExpired}
            >
              {showExpired ? 'Hide Expired Codes' : `Show Expired Codes (${expiredCodes.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
