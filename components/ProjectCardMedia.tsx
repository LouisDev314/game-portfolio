'use client';

import { useEffect, useRef } from 'react';

interface ProjectCardMediaProps {
  video: string;
  poster: string;
}

export function ProjectCardMedia({ video, poster }: ProjectCardMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = videoRef.current;
    if (!container || !media) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    function updatePlayback() {
      if (disposed || !media) return;
      if (!visible || document.hidden || motion.matches) {
        media.pause();
        return;
      }
      // Attach once, then retain the resource/time when leaving the viewport.
      // Removing src on every exit caused reload/decode churn on upward scrolling.
      if (!media.getAttribute('src')) media.src = video;
      void media
        .play()
        .then(() => {
          // A pending play may resolve after an exit/preference change.
          if (disposed || !visible || document.hidden || motion.matches) media.pause();
        })
        .catch(() => {
          /* The poster remains available if autoplay is blocked. */
        });
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hysteresis: start at 15% visible, stop only at a full exit.
        if (entry.intersectionRatio >= 0.15) visible = true;
        else if (!entry.isIntersecting) visible = false;
        updatePlayback();
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(container);
    motion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
      media.pause();
    };
  }, [video]);

  return (
    <div ref={containerRef} className="relative aspect-video overflow-hidden bg-neutral-950 lg:aspect-auto lg:min-h-80">
      <video
        ref={videoRef}
        aria-hidden="true"
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.015]"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
      />
    </div>
  );
}
