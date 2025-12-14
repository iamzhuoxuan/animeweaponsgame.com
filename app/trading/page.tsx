import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Trading Hub - Values & Market Notes',
  description:
    'Trading values for Anime Weapons items with community sentiment, links to wiki stats, and codes to increase value.',
  alternates: {
    canonical: '/trading',
  },
  openGraph: {
    title: 'Anime Weapons Trading Hub',
    description:
      'Market hub for weapons and Demon Arts with links into wiki stats and drop sources.',
    url: 'https://animeweapons.org/trading',
  },
};

export default function TradingLandingPage() {
  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Trading' }]} />
        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">
            Silo D · Economy
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Trading Hub</h1>
          <p className="text-gray-300 text-lg">
            Player-driven values for weapons and Demon Arts with direct links back into the wiki. Keep prices fresh and
            bounce users between economy and entity pages.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/value-list"
              className="px-5 py-3 rounded-lg bg-av-gradient-purple-pink font-semibold shadow-glow-purple hover:scale-105 transition-all"
            >
              Open Value Table
            </Link>
            <Link
              href="/weapons"
              className="px-5 py-3 rounded-lg glass-effect border border-av-purple/30 font-semibold hover:border-av-purple"
            >
              Back to Weapons
            </Link>
          </div>
        </header>

        <section className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">Why this matters</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>UGC-ready value notes per item to keep pages updated and crawled.</li>
            <li>Canonical links back to wiki entities so PV flows between silos.</li>
            <li>Codes and drop changes instantly impact prices—surf the wave.</li>
          </ul>
          <div>
            <Link
              href="/codes"
              className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink"
            >
              Check active codes that move the market →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
