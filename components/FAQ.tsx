'use client';

import { useState } from 'react';
import { IconInfo } from './icons';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Anime Weapons?',
    answer: 'Anime Weapons is a Roblox action grinder by AlphaXnewera where you clear anime-themed worlds, complete quests, and farm bosses for weapons, accessories, avatars, and mastery.',
  },
  {
    question: 'How do I redeem Anime Weapons codes?',
    answer: 'Open Anime Weapons, tap the Gift Box in the top-left, and paste a working code. If it is valid you will see a green Success message and the rewards will appear on the left side of your screen.',
  },
  {
    question: 'How do I unlock new worlds?',
    answer: 'Finish every quest in your current world to collect the key. Turn it in to open the next portal, then repeat the process in the new zone.',
  },
  {
    question: 'How do I get more Emeralds and potions?',
    answer: 'Run dungeon raids, clear quests, and redeem new codes from milestones and patches. Use Drop/Luck potions before raids to stack chances.',
  },
  {
    question: 'How does weapon fusion work?',
    answer: 'Three base weapons fuse into a 1-star, three 1-stars into a 2-star, and three 2-stars into a 3-star version. Each star tier boosts Mastery, and boss/secret boss weapons gain extra damage per tier.',
  },
  {
    question: 'Where do I find the secret bosses?',
    answer: 'Each world hides one. Look behind the Bijus NPC for a crack (W1 Itaxin), drop into the Frieza crevice (W2 Gekao), behind the blue building cave (W3 Leopardo), and a hole past the hill left of spawn (W4 Alaza).',
  },
  {
    question: 'Is there co-op?',
    answer: 'Yes. Servers hold 12 players and dungeon rewards are shared, so partying up is the quickest way to farm Emeralds and drops.',
  },
  {
    question: 'When do new codes release?',
    answer: 'Codes usually arrive with updates, milestones (likes/visits/CCU), and bug-fix compensation. We check daily and list the working ones here.',
  },
];

function FAQAccordion({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-av-purple/20 rounded-xl overflow-hidden hover:border-av-purple/40 transition-colors">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-av-navy/50 hover:bg-av-navy/80 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white pr-4">{item.question}</span>
        <span className={`text-av-purple transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-6 py-5 bg-av-blue/30 text-gray-300 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-24 bg-av-blue/20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-av-purple/10 border border-av-purple/30 mb-6">
            <IconInfo className="w-4 h-4 text-av-purple" />
            <span className="text-sm font-medium text-gray-400">Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            FAQ About Anime Weapons
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Got questions about Anime Weapons? Find answers to the most frequently asked questions below.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* More Questions CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="https://www.roblox.com/games/79189799490564/Anime-Weapons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect border border-av-purple/30 rounded-xl font-semibold hover:border-av-purple hover:bg-av-purple/10 transition-all"
          >
            <span>Join our Discord Community</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
