'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { games } from '@/data/games';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { IconPlay, IconLightbulb } from '@/components/icons';

// Lazy load Footer
const Footer = dynamic(() => import('@/components/Footer'));

export default function GamesPage() {
  const [activeGameId, setActiveGameId] = useState(games[0].id);
  const [isPlaying, setIsPlaying] = useState(false); // Don't auto-play initially

  const activeGame = games.find((g) => g.id === activeGameId) || games[0];

  const handleTabClick = (id: string) => {
    setActiveGameId(id);
    setIsPlaying(true); // Auto-play when switching games
  };

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Games' }]} />
        
        {/* Hero Section */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-purple-pink">
            Weapons Arcade
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Waiting for dungeon timers or potion cooldowns? Keep your grind going with browser strategy games—zero downloads, maximum action.
          </p>
        </div>

        {/* Game Console Area */}
        <div className="max-w-6xl mx-auto animate-slide-up delay-100">
          
          {/* 1. Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => handleTabClick(game.id)}
                className={`
                  px-6 py-3 rounded-t-xl font-bold transition-all border-b-2
                  ${activeGameId === game.id
                    ? 'bg-av-blue border-av-purple text-white shadow-[0_-4px_15px_rgba(139,92,246,0.3)] translate-y-0.5'
                    : 'bg-av-navy border-transparent text-gray-500 hover:bg-av-blue/30 hover:text-gray-300'
                  }
                `}
              >
                {game.title}
              </button>
            ))}
          </div>

          {/* 2. Main Game Screen Container */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-av-purple/30 aspect-video mb-8 group">
            
            {/* Screen Bezel / Glow Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20 rounded-2xl border-4 border-av-blue/20"></div>

            {isPlaying ? (
              /* Active Iframe */
              <div className="w-full h-full bg-black relative z-10">
                <iframe
                  src={activeGame.url}
                  title={activeGame.title}
                  className="w-full h-full border-0"
                  allow="fullscreen; autoplay"
                  loading="lazy"
                ></iframe>
                {/* Close Button Overlay */}
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-600 text-white px-3 py-1 rounded text-sm backdrop-blur-sm transition-colors"
                >
                  Exit Game
                </button>
              </div>
            ) : (
              /* Cover / Start Screen */
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br ${activeGame.color}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                
                <div className="relative z-20 text-center p-6">
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
                    {activeGame.title}
                  </h2>
                  <div className="inline-block px-4 py-1.5 bg-black/60 rounded-full text-white/90 font-mono text-sm mb-8 border border-white/20">
                    {activeGame.type}
                  </div>
                  
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative px-8 py-4 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  >
                    <span className="flex items-center gap-3">
                      <IconPlay className="w-6 h-6 fill-current" />
                      START GAME
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Info & Details Panel */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up delay-200">
            
            {/* Left: About */}
            <div className="md:col-span-2 glass-effect rounded-xl p-6 border border-av-purple/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">About {activeGame.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                {activeGame.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="font-semibold text-av-blue">Developer:</span>
                <span>{activeGame.developer}</span>
              </div>
            </div>

            {/* Right: Tips */}
            <div className="glass-effect rounded-xl p-6 border border-av-purple/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <IconLightbulb className="w-5 h-5 text-av-pink" />
                Quick Tips
              </h3>
              <ul className="space-y-3">
                {activeGame.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-av-purple font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* SEO / Bottom Text */}
        <div className="max-w-4xl mx-auto mt-20 text-center opacity-60 hover:opacity-100 transition-opacity">
          <h2 className="text-lg font-bold text-gray-400 mb-2">Why Open Source?</h2>
          <p className="text-sm text-gray-500">
            These games are community-driven projects, just like how the Anime Weapons community shares routes and codes. 
            Playing open-source games supports independent developers and keeps monetization fair.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
