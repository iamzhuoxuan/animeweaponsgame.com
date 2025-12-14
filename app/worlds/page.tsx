import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryListing from '@/components/wiki/CategoryListing';
import { listEntitiesByCategory, wikiCategoryConfig } from '@/data/wiki';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Worlds - Maps, NPCs, and Boss Routes',
  description: 'World progression overview with NPC hubs, bosses, and secret routes across Anime Weapons.',
  alternates: {
    canonical: '/worlds',
  },
  openGraph: {
    title: 'Anime Weapons Worlds - Maps, NPCs, and Boss Routes',
    description: 'Explore worlds with secret tunnels and boss spawns.',
    url: 'https://animeweapons.org/worlds',
  },
};

export default function WorldsPage() {
  const config = wikiCategoryConfig.worlds;
  const items = listEntitiesByCategory('worlds');

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: config.title }]} />
        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">
            {config.silo} · Worlds
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{config.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{config.description}</p>
        </header>

        <CategoryListing category="worlds" items={items} />
      </main>
      <Footer />
    </div>
  );
}
