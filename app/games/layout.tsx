import type { Metadata } from 'next';

const siteUrl = 'https://animeweapons.org';

export const metadata: Metadata = {
  title: 'Free Strategy Games - Anime Weapons Arcade',
  description:
    'Play free browser-based strategy games while your Anime Weapons potions tick. No downloads required—perfect for grinders between dungeon runs.',
  keywords: [
    'Anime Weapons',
    'strategy games',
    'tower defense',
    'browser games',
    'free games',
    'idle games',
    'no download games',
  ],
  alternates: {
    canonical: '/games',
  },
  openGraph: {
    title: 'Free Strategy Games - Anime Weapons Arcade',
    description:
      'Play free browser strategy games while waiting for Anime Weapons timers. Tower defense and idle games, no downloads.',
    url: `${siteUrl}/games`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Strategy Games - Anime Weapons Arcade',
    description:
      'Play free browser strategy games while waiting for Anime Weapons timers.',
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Weapons Arcade - Free Strategy Games',
    description: 'Collection of free browser-based strategy and idle games',
    url: `${siteUrl}/games`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Anime Weapons',
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
