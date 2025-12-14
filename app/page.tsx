import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { gameCodes } from '@/data/codes';
import { tradingValues } from '@/data/trading';
import { getLatestEntities, getTrendingWeapons } from '@/data/wiki';
import LazyVisible from '@/components/LazyVisible';

type LoadingPlaceholderProps = {
  id?: string;
};

// Minimal loading placeholder
const LoadingPlaceholder = ({ id }: LoadingPlaceholderProps = {}) => (
  <section id={id} className="py-16 lg:py-20">
    <div className="container mx-auto px-4 animate-pulse">
      <div className="h-6 bg-av-blue/20 rounded w-48 mx-auto mb-6" />
      <div className="h-4 bg-av-blue/10 rounded w-96 max-w-full mx-auto mb-8" />
      <div className="grid gap-4 max-w-4xl mx-auto">
        <div className="h-24 bg-av-blue/15 rounded-xl" />
        <div className="h-24 bg-av-blue/15 rounded-xl" />
      </div>
    </div>
  </section>
);

// Priority components - load immediately after Hero
const GameIntro = dynamic(() => import('@/components/GameIntro'), {
  loading: () => <LoadingPlaceholder id="game-intro" />,
});

const CodesSection = dynamic(() => import('@/components/CodesSection'), {
  loading: () => <LoadingPlaceholder id="codes" />,
});

// Secondary components - lazy load with SSR disabled for faster initial paint
const WikiGrid = dynamic(() => import('@/components/WikiGrid'), {
  loading: () => <LoadingPlaceholder id="wiki" />,
  ssr: false,
});

const HowToPlay = dynamic(() => import('@/components/HowToPlay'), {
  loading: () => <LoadingPlaceholder id="how-to-play" />,
  ssr: false,
});

const PopularUnits = dynamic(() => import('@/components/PopularUnits'), {
  loading: () => <LoadingPlaceholder id="popular-units" />,
  ssr: false,
});

const PlayerReviews = dynamic(() => import('@/components/PlayerReviews'), {
  loading: () => <LoadingPlaceholder id="reviews" />,
  ssr: false,
});

const SimilarGames = dynamic(() => import('@/components/SimilarGames'), {
  loading: () => <LoadingPlaceholder />,
  ssr: false,
});

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <LoadingPlaceholder id="features" />,
  ssr: false,
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <LoadingPlaceholder id="faq" />,
  ssr: false,
});

const Community = dynamic(() => import('@/components/Community'), {
  loading: () => <LoadingPlaceholder id="community" />,
  ssr: false,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-16" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Anime Weapons Codes & Wiki - Roblox Boss & Drop Guide',
  description:
    'Get all active Anime Weapons codes for free potions, emeralds, and reset tokens. Complete drop guide with weapon locations, secret bosses, and farming tips for this fast-growing Roblox game. Updated daily!',
  keywords: [
    'Anime Weapons',
    'Anime Weapons codes',
    'Anime Weapons wiki',
    'Anime Weapons drops',
    'Roblox',
    'boss guide',
    'codes',
    'guides',
    'weapons',
    'free rewards',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Anime Weapons Codes & Wiki - Roblox Boss & Drop Guide',
    description:
      'Get active Anime Weapons codes for free rewards plus secret boss locations and drop guides.',
    url: '/',
    type: 'website',
  },
  twitter: {
    title: 'Anime Weapons Codes & Wiki Guide',
    description:
      'Active Anime Weapons codes, drop tables, and complete guide for Roblox players.',
  },
};

export default function Home() {
  const trendingWeapons = getTrendingWeapons(3);
  const latestWiki = getLatestEntities(3);
  const activeCodes = gameCodes.filter((code) => code.status === 'active');
  const hotTrading = tradingValues.slice(0, 3);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Dashboard style quick links */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-effect border border-av-purple/20 rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Trending Weapons</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-200">
              {trendingWeapons.map((weapon) => (
                <li key={weapon.id} className="flex items-center justify-between">
                  <Link
                    href={`/wiki/weapons/${weapon.slug}`}
                    className="text-white font-semibold hover:text-av-purple"
                  >
                    {weapon.name}
                  </Link>
                  <span className="text-xs text-gray-400">{weapon.rarity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-effect border border-av-purple/20 rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Active Codes</p>
            <div className="text-3xl font-bold text-white mt-2">{activeCodes.length}</div>
            <p className="text-sm text-gray-400">Live redemption codes to boost farming.</p>
            <Link href="/codes" className="text-av-purple font-semibold hover:text-av-pink text-sm">
              Go to codes →
            </Link>
          </div>
          <div className="glass-effect border border-av-purple/20 rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Economy</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-200">
              {hotTrading.map((item) => (
                <li key={item.slug} className="flex items-center justify-between">
                  <Link href={`/trading/item/${item.slug}`} className="text-white font-semibold hover:text-av-purple">
                    {item.itemName}
                  </Link>
                  <span className="text-xs text-gray-400">{item.average} avg</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <GameIntro />
      <CodesSection title="Active Anime Weapons Codes" limit={3} highlightFirst={3} showMoreLink />

      <LazyVisible fallback={<LoadingPlaceholder id="wiki" />} rootMargin="900px">
        <WikiGrid />
      </LazyVisible>

      {/* Latest wiki updates with links */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Latest Wiki Updates</h2>
            <Link href="/wiki" className="text-av-purple font-semibold hover:text-av-pink text-sm">
              Explore wiki →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {latestWiki.map((entry) => (
              <Link
                key={entry.id}
                href={`/wiki/${entry.category}/${entry.slug}`}
                className="glass-effect border border-av-purple/20 rounded-xl p-4 hover:border-av-purple/50 card-hover"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-av-purple font-semibold">
                  {entry.category}
                </p>
                <h3 className="text-lg font-bold text-white">{entry.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LazyVisible fallback={<LoadingPlaceholder id="how-to-play" />} rootMargin="900px">
        <HowToPlay />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder id="popular-units" />} rootMargin="900px">
        <PopularUnits />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder id="reviews" />} rootMargin="900px">
        <PlayerReviews />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder />} rootMargin="1000px">
        <SimilarGames />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder id="features" />} rootMargin="1000px">
        <Features />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder id="faq" />} rootMargin="1100px">
        <FAQ />
      </LazyVisible>

      <LazyVisible fallback={<LoadingPlaceholder id="community" />} rootMargin="1100px">
        <Community />
      </LazyVisible>

      <LazyVisible fallback={<div className="h-16" />} rootMargin="1200px">
        <Footer />
      </LazyVisible>
    </main>
  );
}
