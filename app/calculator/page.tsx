import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalculatorClient from '@/components/calculator/CalculatorClient';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: 'Anime Weapons Calculator - Damage, Buffs, Fusion & Codes',
  description:
    'Anime Weapons Calculator to model damage, potion stacks, gamepasses, boss time-to-kill, and 3-to-1 fusion costs. Tune inputs and prep faster clears.',
  keywords: ['Anime Weapons', 'Anime Weapons Calculator', 'damage calc', 'boss TTK', 'fusion planner', 'Roblox'],
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'Anime Weapons Calculator - Damage, Buffs, Fusion & Codes',
    description:
      'Model Anime Weapons damage, buffs, and fusion costs before running bosses. Adjustable inputs for potions, gamepasses, and boss HP.',
    url: 'https://animeweapons.org/calculator',
    type: 'website',
  },
  twitter: {
    title: 'Anime Weapons Calculator',
    description: 'Damage, buffs, TTK, and fusion planner for Anime Weapons.',
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Calculator' }]} />
        <CalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
