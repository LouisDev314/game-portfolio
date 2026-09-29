'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function RevealOnScroll({ children, className = '' }: RevealOnScrollProps) {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.10) {
          controls.start('visible');
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.06) {
          controls.start('hidden');
        }
      },
      {
        threshold: [0, 0.06, 0.10],
        rootMargin: '12% 0px -12% 0px',
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
