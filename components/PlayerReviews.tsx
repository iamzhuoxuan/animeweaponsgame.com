import { IconStar, IconUsers } from './icons';

interface Review {
  username: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  highlight?: string;
}

const reviews: Review[] = [
  {
    username: 'ShurikenStarter',
    avatar: 'SS',
    rating: 5,
    comment: 'The drop loop is super addicting. Once you learn where the secret bosses hide, you start printing mastery and damage boosts.',
    date: 'Nov 2025',
    highlight: 'Secret boss hunter',
  },
  {
    username: 'CoopRunner',
    avatar: 'CR',
    rating: 5,
    comment: 'Co-op dungeons are worth it—loot is shared and you blaze through waves. Pop potions before raids for easy multi-drops.',
    date: 'Nov 2025',
    highlight: 'Great co-op',
  },
  {
    username: 'CodeSaver',
    avatar: 'CS',
    rating: 5,
    comment: 'Redeeming codes before a long farm saves so much time. Free reset tokens mean I can experiment with builds.',
    date: 'Oct 2025',
    highlight: 'Codes = speed',
  },
  {
    username: 'WeaponHoarder',
    avatar: 'WH',
    rating: 4,
    comment: 'Feels rewarding to fuse up to 3-star and watch mastery spike. Wish the map teleport was faster, but updates keep landing.',
    date: 'Oct 2025',
    highlight: 'Rewarding grind',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <IconStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-effect border border-av-purple/20 rounded-xl p-6 hover:border-av-purple/40 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-av-gradient-purple-pink flex items-center justify-center text-white font-bold">
            {review.avatar}
          </div>
          <div>
            <h4 className="font-bold text-white">{review.username}</h4>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>

      {/* Highlight badge */}
      {review.highlight && (
        <div className="inline-block px-3 py-1 rounded-full bg-av-purple/20 border border-av-purple/30 text-av-purple text-xs font-medium mb-3">
          {review.highlight}
        </div>
      )}

      {/* Comment */}
      <p className="text-gray-300 text-sm leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>
    </div>
  );
}

export default function PlayerReviews() {
  return (
    <section id="reviews" className="py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-av-purple/10 border border-av-purple/30 mb-6">
            <IconUsers className="w-4 h-4 text-av-purple" />
            <span className="text-sm font-medium text-gray-400">Community Voices</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-purple-pink">
            What Players Say About Anime Weapons
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed-plus">
            Join the community farming shinobi, saiyan, pirate, and demon worlds. Here&apos;s what grinders say about Anime Weapons.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect border border-av-purple/30 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-purple-pink mb-1">22M+</div>
                <p className="text-gray-400 text-sm">Total Visits</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-purple-pink mb-1">32K+</div>
                <p className="text-gray-400 text-sm">Playing Now</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-purple-pink mb-1">4.7</div>
                <p className="text-gray-400 text-sm">Player Rating</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-purple-pink mb-1">40+</div>
                <p className="text-gray-400 text-sm">Weapons & Accessories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
