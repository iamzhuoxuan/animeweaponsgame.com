import type { Metadata } from 'next';

const siteUrl = 'https://animeweapons.org';

export const metadata: Metadata = {
  title: 'Anime Weapons Codes - Free Rewards & Redeem Guide',
  description:
    'Active Anime Weapons codes for free potions, Emeralds, and reset tokens. Updated daily with working codes and a simple redeem walkthrough.',
  keywords: [
    'Anime Weapons codes',
    'Anime Weapons',
    'codes',
    'free codes',
    'working codes',
    'Roblox codes',
    'redeem codes',
    'active codes',
  ],
  alternates: {
    canonical: '/codes',
  },
  openGraph: {
    title: 'Anime Weapons Codes - Free Rewards & Redeem Guide',
    description:
      'Get active Anime Weapons codes for free potions, Emeralds, and reset tokens with a full redemption guide.',
    url: `${siteUrl}/codes`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/anime-weapons-redeem-codes.webp`,
        width: 1280,
        height: 720,
        alt: 'Anime Weapons codes redeem screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime Weapons Codes - Free Rewards',
    description:
      'Get active Anime Weapons codes for free potions, Emeralds, and reset tokens. Updated daily.',
    images: [`${siteUrl}/anime-weapons-redeem-codes.webp`],
  },
};

export default function CodesLayout({ children }: { children: React.ReactNode }) {
  // Structured Data for FAQ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I redeem Anime Weapons codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open Anime Weapons, tap the Gift Box icon in the top-left, paste a working code, then press the arrow to redeem.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Anime Weapons codes expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Anime Weapons codes expire quickly after milestones or patches. Redeem them as soon as possible and check this page for verified working codes.',
        },
      },
    ],
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
