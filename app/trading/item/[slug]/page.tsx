import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getTradingBySlug } from '@/data/trading';
import { getEntityById, getWikiHref } from '@/data/wiki';

const Footer = dynamic(() => import('@/components/Footer'));

interface PageParams {
  params: { slug: string };
}

export function generateMetadata({ params }: PageParams): Metadata {
  const item = getTradingBySlug(params.slug);
  if (!item) return {};

  return {
    title: `${item.itemName} Trading Value - Anime Weapons`,
    description: `${item.itemName} trading value, floor ${item.floor}, average ${item.average}, demand ${item.demand}.`,
    alternates: {
      canonical: `/trading/item/${item.slug}`,
    },
  };
}

export default function TradingItemPage({ params }: PageParams) {
  const item = getTradingBySlug(params.slug);
  if (!item) return notFound();

  const wikiEntity = getEntityById(item.itemId);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Value List', href: '/value-list' },
    { label: item.itemName },
  ];

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Trading Value</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{item.itemName}</h1>
          <p className="text-gray-300 text-lg">
            {item.itemName} market snapshot with demand, volatility, and backlinks to the wiki entity.
          </p>
          {wikiEntity && (
            <Link
              href={getWikiHref(wikiEntity.category, wikiEntity.slug)}
              className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink"
            >
              View wiki stats →
            </Link>
          )}
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="glass-effect border border-av-purple/20 rounded-xl p-5 space-y-3">
            <h2 className="text-xl font-bold text-white">Price</h2>
            <div className="text-sm text-gray-200 space-y-1">
              <div>Floor: {item.floor} emeralds</div>
              <div>Average: {item.average} emeralds</div>
              <div>Demand: {item.demand}</div>
              <div>Volatility: {item.volatility}</div>
              <div>Last Updated: {item.lastUpdated}</div>
            </div>
          </div>

          <div className="glass-effect border border-av-purple/20 rounded-xl p-5 space-y-3">
            <h2 className="text-xl font-bold text-white">Notes</h2>
            <p className="text-sm text-gray-300">
              {item.notes ?? 'Player sentiment not yet recorded. Add UGC notes via community comments soon.'}
            </p>
            <Link
              href="/codes"
              className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink text-sm"
            >
              Check codes to boost value →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
