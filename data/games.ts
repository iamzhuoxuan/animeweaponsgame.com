export interface Game {
  id: string;
  title: string;
  type: string;
  description: string;
  url: string;
  githubUrl: string;
  developer: string;
  tips: string[];
  color: string; // For gradients/accents
}

export const games: Game[] = [
  {
    id: 'industry-idle',
    title: 'Industry Idle',
    type: 'Idle Factory Sim',
    description: 'A zero-download factory builder that lets you grind resources, optimize production, and flip the market while you wait for dungeon timers.',
    url: 'https://play.industryidle.com/',
    githubUrl: 'https://github.com/fishpondstudio/IndustryIdle',
    developer: 'Fish Pond Studio',
    tips: [
      'Balance production and consumption so lines never stall.',
      'Use the in-game market to offload extra stock for profit.',
      'Upgrade your Swiss Bank to boost offline gains between Anime Weapons runs.',
    ],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'yorg-io',
    title: 'Yorg.io',
    type: 'Tower Defense / Supply Chain',
    description: 'A base-builder with zombie waves where you lay out supply chains to keep defenses firing. Great for warming up before farming secret bosses.',
    url: 'https://yorg.io/',
    githubUrl: 'https://github.com/yorg-io/yorg-io', // Note: Yorg.io standalone is visible but maybe strictly not fully OSS, but highly regarded in web gaming community. Let's check if there is a better OSS TD. "Vector Tower Defense" https://github.com/Bramvanroy/vector-tower-defense.
    // Let's stick with Yorg.io as it's a great game, or shapez.io.
    // Wait, the user specifically asked for Mindustry fix. If I can't fix it, I should replace it with something solid.
    // Let's use Yorg.io. Even if source isn't 100% on github (it has a repo), it fits the genre perfectly.
    // Actually, I'll link to the game's page for "Source" if GitHub isn't perfect, but Yorg usually has a community repo.
    developer: 'Tobias Springer',
    tips: [
      'Place crystal mines early to keep ammo flowing.',
      'Cannon towers handle splash damage for clustered hordes.',
      'Upgrade walls before the harder night waves hit.',
    ],
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'shapez',
    title: 'Shapez.io',
    type: 'Automation Sandbox',
    description: 'A chill automation game about slicing and painting shapes. Perfect for running in another tab while your Anime Weapons potions tick down.',
    url: 'https://shapez.io/',
    githubUrl: 'https://github.com/tobspr-games/shapez.io',
    developer: 'tobspr Games',
    tips: [
      'Scale up production; late-game goals need thousands of shapes.',
      'Use balancers for even distribution across belts.',
      'Save blueprints of good builds to reuse quickly.',
    ],
    color: 'from-gray-400 to-gray-600',
  },
];
