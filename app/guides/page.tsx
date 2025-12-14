import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import { getTrendingWeapons, getLatestEntities } from '@/data/wiki';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Guides - Routes, Potions, Farming',
  description:
    'Long-form Anime Weapons guides that stitch together worlds, bosses, weapons, and trading strategies.',
  alternates: {
    canonical: '/guides',
  },
};

export default function GuidesPage() {
  const trending = getTrendingWeapons(3);
  const recent = getLatestEntities(3);

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />
        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Guides</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Deep Dive Guides</h1>
          <p className="text-gray-300 text-lg">
            Long-form strategies that link out to every wiki entity: routes, potion timing, trading pivots, and secret
            boss unlocks.
          </p>
        </header>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-3">
            <p className="text-xs text-av-purple uppercase tracking-[0.12em]">Route</p>
            <h2 className="text-xl font-bold text-white">World 1 → 3 Rush</h2>
            <p className="text-sm text-gray-300">
              Sprint from Frosted Origins to Sky Citadel by chaining secret bosses and cleave weapons.
            </p>
            <Link href="/wiki/worlds/frosted-origins" className="text-av-purple font-semibold hover:text-av-pink text-sm">
              Start in Frosted Origins →
            </Link>
          </article>

          <article className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-3">
            <p className="text-xs text-av-purple uppercase tracking-[0.12em]">Build</p>
            <h2 className="text-xl font-bold text-white">Bleed Stack Alaza</h2>
            <p className="text-sm text-gray-300">
              Use Blood Art plus Crimson Lotus to melt Alaza and loop trading value spikes.
            </p>
            <Link href="/wiki/weapons/blood-art" className="text-av-purple font-semibold hover:text-av-pink text-sm">
              Blood Art stats →
            </Link>
          </article>

          <article className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-3">
            <p className="text-xs text-av-purple uppercase tracking-[0.12em]">Economy</p>
            <h2 className="text-xl font-bold text-white">Value Flip: Rift Crescent</h2>
            <p className="text-sm text-gray-300">
              Farm Obsidian Warden windows, redeem codes, and flip Rift Crescent while demand rises.
            </p>
            <Link href="/trading/item/rift-crescent" className="text-av-purple font-semibold hover:text-av-pink text-sm">
              Check trading value →
            </Link>
          </article>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-3">
            <h2 className="text-xl font-bold text-white">Trending Builds</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {trending.map((weapon) => (
                <li key={weapon.id}>
                  <Link
                    href={`/wiki/weapons/${weapon.slug}`}
                    className="text-white font-semibold hover:text-av-purple"
                  >
                    {weapon.name}
                  </Link>
                  <span className="text-gray-400"> — {weapon.summary}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-3">
            <h2 className="text-xl font-bold text-white">Latest Updates</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {recent.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/wiki/${entry.category}/${entry.slug}`}
                    className="text-white font-semibold hover:text-av-purple"
                  >
                    {entry.name}
                  </Link>
                  <span className="text-gray-400"> — {entry.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
