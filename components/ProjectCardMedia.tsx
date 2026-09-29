'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectCardMediaProps {
  video: string;
  poster: string;
}

export function ProjectCardMedia({ video, poster }: ProjectCardMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '200px' },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-video overflow-hidden bg-neutral-950 lg:aspect-auto lg:min-h-80">
      <video
        aria-hidden="true"
        className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.015]"
        src={isNearViewport && !prefersReducedMotion ? video : undefined}
        poster={poster}
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
      />
    </div>
  );
}
