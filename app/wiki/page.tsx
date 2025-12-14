import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import {
  getLatestEntities,
  getTrendingWeapons,
  wikiCategoryConfig,
  wikiCategoryList,
} from '@/data/wiki';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Wiki - Deep Links, Maps, Bosses, and Drops',
  description:
    'Entity-based Anime Weapons wiki with deep routes for weapons, bosses, worlds, and Demon Arts. Built for long-tail SEO with siloed links and breadcrumb navigation.',
  keywords: [
    'Anime Weapons wiki',
    'Anime Weapons drops',
    'Anime Weapons bosses',
    'Demon Land map',
    'Anime Weapons Blood Art',
  ],
  alternates: {
    canonical: '/wiki',
  },
  openGraph: {
    title: 'Anime Weapons Wiki - Deep Routes & Drop Tables',
    description:
      'Navigate weapons, bosses, worlds, and Demon Arts with deep wiki routing and contextual links.',
    url: 'https://animeweapons.org/wiki',
    type: 'website',
  },
  twitter: {
    title: 'Anime Weapons Wiki - Drops & Secret Boss Routes',
    description: 'Weapons, bosses, worlds, Demon Arts, and trading routes in one deep wiki.',
  },
};

export default function WikiPage() {
  const trending = getTrendingWeapons(4);
  const latest = getLatestEntities(6);

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-14">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wiki' }]} />
        <header className="text-center space-y-6">
          <p className="inline-flex px-4 py-2 rounded-full border border-av-purple/30 bg-av-purple/10 text-av-purple font-semibold">
            Entity as a Page · Deep Wiki Routing
          </p>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-purple-pink">
              Anime Weapons Wiki v2.0
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed-plus">
              Every entity gets its own page. Drill into weapons, bosses, worlds, and Demon Arts with
              breadcrumb trails, silo links, and contextual sidebars to boost PV and crawl depth.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/weapons"
              className="px-5 py-3 rounded-lg bg-av-gradient-purple-pink font-semibold shadow-glow-purple hover:scale-105 transition-all"
            >
              Browse Weapons
            </Link>
            <Link
              href="/value-list"
              className="px-5 py-3 rounded-lg glass-effect border border-av-purple/30 font-semibold hover:border-av-purple"
            >
              Value List
            </Link>
          </div>
        </header>

        {/* Category grid */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wikiCategoryList.map((categoryKey) => {
              const config = wikiCategoryConfig[categoryKey];
              return (
                <Link
                  key={categoryKey}
                  href={`/wiki/${config.slug}`}
                  className="glass-effect border border-av-purple/20 rounded-2xl p-6 hover:border-av-purple/60 card-hover flex flex-col gap-3"
                >
                  <span className="text-sm font-semibold text-av-purple uppercase tracking-[0.14em]">
                    {config.silo}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{config.description}</p>
                  <span className="text-av-purple font-semibold">View {config.slug} →</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Trending weapons */}
        <section className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">
                Silo A · Items
              </p>
              <h2 className="text-3xl font-bold text-white">Top Trending Weapons</h2>
            </div>
            <Link href="/weapons" className="px-4 py-2 rounded-lg bg-av-purple/20 border border-av-purple/40 text-sm font-semibold hover:border-av-pink">
              Weapon Index
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((weapon) => (
              <Link
                key={weapon.id}
                href={`/wiki/weapons/${weapon.slug}`}
                className="glass-effect border border-av-purple/20 rounded-xl p-4 hover:border-av-purple/50 card-hover"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-av-purple/15 text-av-purple border border-av-purple/30">
                    {weapon.rarity}
                  </span>
                  <span className="text-xs text-gray-400">{weapon.class}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{weapon.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{weapon.summary}</p>
                <div className="text-xs text-gray-300">
                  <div>Mastery: {weapon.stats.baseMastery} → {weapon.stats.maxMastery}</div>
                  <div>Damage: {weapon.stats.damageMultiplier}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest updates */}
        <section className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Latest Wiki Updates</h2>
              <span className="text-xs text-av-purple">Structured Breadcrumbs · Canonical ready</span>
            </div>
            <div className="space-y-4">
              {latest.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/wiki/${entry.category}/${entry.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-av-purple/15 rounded-xl p-4 hover:border-av-purple/40"
                >
                  <div>
                    <p className="text-xs text-av-purple uppercase tracking-[0.12em]">
                      {entry.category}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1">{entry.summary}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated {new Date(entry.updatedAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">Content Silos</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <span className="text-av-pink font-semibold">Silo A · Items:</span> Weapons, Demon
                Arts, accessories with stats and trading hooks.
              </li>
              <li>
                <span className="text-av-pink font-semibold">Silo B · Entities:</span> Bosses, mobs,
                NPCs with location links.
              </li>
              <li>
                <span className="text-av-pink font-semibold">Silo C · Geography:</span> Worlds,
                maps, and secret tunnels.
              </li>
              <li>
                <span className="text-av-pink font-semibold">Silo D · Economy:</span> Trading
                values and codes tie-ins.
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/value-list"
                className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink"
              >
                View trading table →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
