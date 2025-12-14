'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    if (!cursor || !cursorOuter) return;

    // Add class to hide system cursor only after custom cursor is ready
    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outerX = 0;
    let outerY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    // Animation loop - cursor follows mouse position directly
    const animate = () => {
      // Inner cursor follows mouse instantly (1:1 with system cursor)
      cursorX = mouseX;
      cursorY = mouseY;

      // Outer ring has slight trailing effect for visual appeal
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;

      animationId = requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animationId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Inner cursor - energy core */}
      <div
        ref={cursorRef}
        className={`
          custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`
            relative -translate-x-1/2 -translate-y-1/2
            transition-all duration-200 ease-out
            ${isHovering ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}
          `}
        >
          {/* Core */}
          <div
            className={`
              w-3 h-3 rounded-full
              ${isHovering ? 'bg-av-pink' : 'bg-white'}
              shadow-[0_0_10px_rgba(139,92,246,0.8),0_0_20px_rgba(139,92,246,0.4)]
              transition-colors duration-200
            `}
          />
        </div>
      </div>

      {/* Outer cursor - energy ring */}
      <div
        ref={cursorOuterRef}
        className={`
          custom-cursor-outer fixed top-0 left-0 pointer-events-none z-[9998]
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`
            relative -translate-x-1/2 -translate-y-1/2
            transition-all duration-300 ease-out
            ${isHovering ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-50' : ''}
          `}
        >
          {/* Ring */}
          <div
            className={`
              w-10 h-10 rounded-full border-2
              ${isHovering ? 'border-av-pink' : 'border-av-purple/60'}
              transition-all duration-200
              animate-cursor-pulse
            `}
          />

          {/* Click ripple effect */}
          {isClicking && (
            <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full border border-av-pink animate-cursor-ripple" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
