import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Tier List - Planned Rankings',
  description:
    'Roadmap slot for Anime Weapons tier lists: rankings by world, class, and demon art synergy with links back into the wiki.',
  alternates: {
    canonical: '/tier-list',
  },
};

export default function TierListPage() {
  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tier List' }]} />

        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Phase 2</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Tier List Hub</h1>
          <p className="text-gray-300 text-lg">
            We&apos;re preparing strength rankings by world, class, and Demon Art synergy. Each row will deep-link into the wiki so players can jump straight to stats and routes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/weapons"
              className="px-5 py-3 rounded-lg bg-av-gradient-purple-pink font-semibold shadow-glow-purple hover:scale-105 transition-all"
            >
              Browse Weapons
            </Link>
            <Link
              href="/guides"
              className="px-5 py-3 rounded-lg glass-effect border border-av-purple/30 font-semibold hover:border-av-purple"
            >
              Read Guides
            </Link>
          </div>
        </header>

        <section className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">Planned Sections</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Overall meta tier list with patch notes and cadence.</li>
            <li>World-specific rankings so early and midgame players know what to chase.</li>
            <li>Synergy tiers pairing weapons with Demon Arts and accessories.</li>
            <li>Community voting hooks tied to the value list for fast updates.</li>
          </ul>
          <div className="pt-2">
            <Link
              href="/value-list"
              className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink text-sm"
            >
              Check current trading values →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
