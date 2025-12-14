'use client';

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-av-purple transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-semibold">{item.label}</span>
            )}
            {!isLast && <span className="text-av-purple/60">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
