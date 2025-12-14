'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface LazyVisibleProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  once?: boolean;
}

export default function LazyVisible({
  children,
  fallback = null,
  rootMargin = '700px',
  once = true,
}: LazyVisibleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;
    if (!ref.current) return;

    // If IntersectionObserver is unavailable, render immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, once, rootMargin]);

  return <div ref={ref}>{isVisible ? children : fallback}</div>;
}
