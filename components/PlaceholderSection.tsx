import { ReactNode } from 'react';

interface PlaceholderSectionProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  comingSoon?: boolean;
}

export default function PlaceholderSection({
  id,
  title,
  description,
  icon,
  comingSoon = true
}: PlaceholderSectionProps) {
  return (
    <section id={id} className="py-20 lg:py-24 bg-av-navy/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-av-purple/15 border border-av-purple/40 text-av-pink">
            {icon}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple-pink">
            {title}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed-plus">
            {description}
          </p>
          {comingSoon && (
            <div className="inline-block px-6 py-3 bg-av-blue border-2 border-av-purple/50 rounded-xl">
              <span className="text-av-purple font-bold text-lg">Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
