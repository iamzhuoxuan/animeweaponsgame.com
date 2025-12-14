'use client';

import Link from 'next/link';
import { WikiEntity, getWikiHref, getCategoryLabel } from '@/data/wiki';

interface ContextualSidebarProps {
  sameWorld?: WikiEntity[];
  sameSilo?: WikiEntity[];
  crossLinks?: WikiEntity[];
}

function LinkList({
  title,
  entities,
}: {
  title: string;
  entities?: WikiEntity[];
}) {
  if (!entities || entities.length === 0) return null;

  return (
    <div className="glass-effect border border-av-purple/20 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-av-pink mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-2">
        {entities.map((entity) => (
          <li key={entity.id}>
            <Link
              href={getWikiHref(entity.category, entity.slug)}
              className="flex flex-col gap-0.5 text-sm text-gray-200 hover:text-av-purple"
            >
              <span className="font-semibold">{entity.name}</span>
              <span className="text-xs text-gray-500">
                {getCategoryLabel(entity.category)}
                {entity.worldId ? ' • ' + (entity.worldId?.replace('_', ' ') ?? '') : ''}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContextualSidebar({
  sameWorld,
  sameSilo,
  crossLinks,
}: ContextualSidebarProps) {
  return (
    <aside className="space-y-4">
      <div className="glass-effect border border-av-purple/20 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white">You Might Like</h3>
        <p className="text-xs text-gray-400">
          Explore tightly linked pages to keep the wiki crawl depth shallow and PV high.
        </p>
      </div>
      <LinkList title="Same World" entities={sameWorld} />
      <LinkList title="Same Silo" entities={sameSilo} />
      <LinkList title="Cross Links" entities={crossLinks} />
    </aside>
  );
}
