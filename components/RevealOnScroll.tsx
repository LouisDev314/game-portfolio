'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function RevealOnScroll({ children, className = '', threshold = 0.1 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Expected on mount to sync client state
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.start('visible');
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Stacked mobile cards can make a section much taller than the viewport.
    // Reveal after a small viewport-sized portion enters, rather than waiting
    // for a fixed percentage of the entire section to become visible.
    const visibleThreshold = Math.min(threshold, (window.innerHeight * threshold) / element.offsetHeight);

    const observer = new IntersectionObserver(
      ([entry]) => {
        controls.start(entry.isIntersecting && entry.intersectionRatio >= visibleThreshold ? 'visible' : 'hidden');
      },
      {
        threshold: [0, visibleThreshold],
        rootMargin: '12% 0px -12% 0px',
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, prefersReducedMotion, threshold]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 12, transition: { duration: 0.5, ease: 'easeOut' } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
      }}
      className={className}>
      {children}
    </motion.div>
  );
}
