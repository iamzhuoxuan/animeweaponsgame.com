import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { tradingValues } from '@/data/trading';
import { getEntityById, getWikiHref } from '@/data/wiki';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Value List - Trading Table & Links',
  description:
    'Central trading value list for Anime Weapons items with demand, volatility, and deep links back into the wiki.',
  alternates: {
    canonical: '/value-list',
  },
};

export default function ValueListPage() {
  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Value List' }]} />
        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">
            Silo D · Economy
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Value List (Emeralds)</h1>
          <p className="text-gray-300 text-lg">
            Trading values for weapons and accessories with backlinks to wiki stats. Keep players bouncing between economy and entity pages without losing context.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/codes"
              className="px-5 py-3 rounded-lg glass-effect border border-av-purple/30 font-semibold hover:border-av-purple"
            >
              Check Codes That Move Prices
            </Link>
            <Link
              href="/guides"
              className="px-5 py-3 rounded-lg bg-av-gradient-purple-pink font-semibold shadow-glow-purple hover:scale-105 transition-all"
            >
              Read Market Guides
            </Link>
          </div>
        </header>

        <div className="overflow-x-auto glass-effect border border-av-purple/20 rounded-2xl">
          <table className="min-w-full text-sm text-gray-200">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-av-purple">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Rarity</th>
                <th className="px-4 py-3">Floor</th>
                <th className="px-4 py-3">Average</th>
                <th className="px-4 py-3">Demand</th>
                <th className="px-4 py-3">Volatility</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {tradingValues.map((item) => {
                const entity = getEntityById(item.itemId);
                return (
                  <tr key={item.slug} className="border-t border-av-purple/10 hover:bg-av-blue/20">
                    <td className="px-4 py-3">
                      {entity ? (
                        <Link
                          href={getWikiHref(entity.category, entity.slug)}
                          className="font-semibold text-white hover:text-av-purple"
                        >
                          {item.itemName}
                        </Link>
                      ) : (
                        <span className="font-semibold text-white">{item.itemName}</span>
                      )}
                      <div>
                        <Link
                          href={`/trading/item/${item.slug}`}
                          className="text-xs text-av-purple hover:text-av-pink"
                        >
                          View valuation →
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.rarity}</td>
                    <td className="px-4 py-3">{item.floor}</td>
                    <td className="px-4 py-3">{item.average}</td>
                    <td className="px-4 py-3">{item.demand}</td>
                    <td className="px-4 py-3">{item.volatility}</td>
                    <td className="px-4 py-3">{item.lastUpdated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
