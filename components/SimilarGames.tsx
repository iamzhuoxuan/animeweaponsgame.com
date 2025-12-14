'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { games } from '@/data/games';
import { IconPlay, IconLightbulb, IconExternalLink } from './icons';

export default function SimilarGames() {
  const [isPlaying, setIsPlaying] = useState(false); // Start as false
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredGame = games[0]; // First game from the games page

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            // Auto-play when scrolled into view
            setTimeout(() => setIsPlaying(true), 300);
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 25% of component is visible
        rootMargin: '50px', // Start loading slightly before it comes into view
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            Similar Strategy Games
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Need something to play while your potions tick in Anime Weapons? These browser-friendly strategy grinders scratch the same optimization itch.
          </p>
        </div>

        {/* Featured Game Card */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-effect border border-av-purple/30 rounded-2xl overflow-hidden shadow-glow-purple hover:border-av-purple hover:shadow-glow-purple-lg transition-all">

            {/* Game Preview Area */}
            <div className="relative bg-black aspect-video">
              {/* Screen Bezel / Glow Effect */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20"></div>

              {isPlaying ? (
                /* Active Iframe */
                <div className="w-full h-full bg-black relative z-10">
                  <iframe
                    src={featuredGame.url}
                    title={featuredGame.title}
                    className="w-full h-full border-0"
                    allow="fullscreen; autoplay"
                    loading="lazy"
                  ></iframe>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm backdrop-blur-sm transition-colors z-30"
                  >
                    Exit Game
                  </button>
                </div>
              ) : (
                /* Cover / Start Screen */
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br ${featuredGame.color}`}>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                  <div className="relative z-20 text-center p-6">
                    <div className="inline-block px-4 py-1.5 bg-black/60 rounded-full text-white/90 font-mono text-sm mb-4 border border-white/20">
                      {featuredGame.type}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                      {featuredGame.title}
                    </h3>

                    <button
                      onClick={() => setIsPlaying(true)}
                      className="group relative px-8 py-4 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      <span className="flex items-center gap-3">
                        <IconPlay className="w-6 h-6 fill-current" />
                        PLAY NOW
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="p-8 lg:p-10">
              <div className="grid md:grid-cols-3 gap-8">

                {/* Left: Description */}
                <div className="md:col-span-2">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    About {featuredGame.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {featuredGame.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-semibold text-av-blue">Developer:</span>
                    <span>{featuredGame.developer}</span>
                  </div>
                </div>

                {/* Right: Tips */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <IconLightbulb className="w-5 h-5 text-av-pink" />
                    Quick Tips
                  </h4>
                  <ul className="space-y-3">
                    {featuredGame.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-300">
                        <span className="text-av-purple font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* View More Link */}
              <div className="mt-8 pt-8 border-t border-av-purple/20 text-center">
                <Link
                  href="/games"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-av-gradient-purple-pink rounded-lg font-semibold hover:scale-105 transition-all shadow-glow-purple"
                >
                  <IconExternalLink className="w-5 h-5" />
                  <span>Explore More Strategy Games</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
