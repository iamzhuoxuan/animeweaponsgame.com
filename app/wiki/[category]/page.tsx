import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryListing from '@/components/wiki/CategoryListing';
import {
  listEntitiesByCategory,
  wikiCategoryConfig,
  wikiCategoryList,
  wikiContent,
  type WikiCategory,
} from '@/data/wiki';

const Footer = dynamic(() => import('@/components/Footer'));

interface PageParams {
  params: { category: WikiCategory };
}

export function generateStaticParams() {
  return wikiCategoryList.map((category) => ({ category }));
}

export function generateMetadata({ params }: PageParams): Metadata {
  const categoryKey = params.category;
  if (categoryKey === 'weapons') {
    return { robots: { index: false, follow: false } };
  }
  if (categoryKey === 'worlds') {
    return { robots: { index: false, follow: false } };
  }
  const config = wikiCategoryConfig[categoryKey];
  if (!config) return {};

  return {
    title: `${config.title} - Anime Weapons Wiki`,
    description: config.description,
    alternates: {
      canonical: `/wiki/${config.slug}`,
    },
    openGraph: {
      title: `${config.title} - Anime Weapons Wiki`,
      description: config.description,
      url: `https://animeweapons.org/wiki/${config.slug}`,
    },
  };
}

export default function WikiCategoryPage({ params }: PageParams) {
  const categoryKey = params.category;
  if (categoryKey === 'weapons') return redirect('/weapons');
  if (categoryKey === 'worlds') return redirect('/worlds');
  const config = wikiCategoryConfig[categoryKey];
  if (!config) return notFound();

  const items = listEntitiesByCategory(categoryKey);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Wiki', href: '/wiki' },
    { label: config.title },
  ];

  const worldFilters = wikiContent.worlds.map((world) => ({
    id: world.id,
    name: world.name,
    slug: world.slug,
  }));

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">
            {config.silo} · {config.slug}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{config.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{config.description}</p>
        </header>

        <CategoryListing
          category={categoryKey}
          items={items}
          worldFilters={worldFilters}
        />
      </main>
      <Footer />
    </div>
  );
}
