'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let rafId = 0;
    function configure() {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = undefined;
      if (motionPreference.matches) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      if (!document.hidden) rafId = requestAnimationFrame(raf);
    }

    function raf(time: number) {
      if (!lenis || document.hidden) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    function visibility() {
      cancelAnimationFrame(rafId);
      if (!document.hidden && lenis) rafId = requestAnimationFrame(raf);
    }
    configure();
    motionPreference.addEventListener('change', configure);
    document.addEventListener('visibilitychange', visibility);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      motionPreference.removeEventListener('change', configure);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return null;
}
