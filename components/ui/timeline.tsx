'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // thickness controls
  const TRACK_W = 'w-[6px]'; // subtle container/track width (optional)
  const LINE_W = 'w-[6px]'; // actual progress line width

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const updateHeight = () => {
      setHeight(el.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height], { clamp: true });
  const opacityTransform = useTransform(scrollYProgress, [0, 0.01], [1, 1]);

  return (
    <div className="relative w-full font-sans md:px-10" ref={containerRef} style={{ position: 'relative' }}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          style={{
            y: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute left-8.75 top-0 z-50 -translate-x-1/2">
          <div className="relative size-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-md ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src="/pfp-1.jpg"
              alt="profile picture"
              fill
              draggable={false}
              sizes="40px"
              className="object-cover rounded-full border-2"
            />
          </div>
        </motion.div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:pb-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:gap-10 ${index === 0 ? 'pt-6' : 'pt-10 md:pt-24'}`}>
            {/* Remove per-item marker entirely */}
            <div className="hidden min-w-0 self-start md:block">
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative min-w-0 pl-20 pr-4 md:pl-0 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{' '}
            </div>
          </div>
        ))}

        {/* Track + animated progress */}
        <div
          style={{ height: height + 'px' }}
          className={[
            'absolute md:left-8 left-8 top-0 overflow-hidden rounded-full',
            TRACK_W,
            'bg-neutral-200/80 dark:bg-neutral-800/80',
            '[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]',
          ].join(' ')}>
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className={[
              'absolute left-1/2 -translate-x-1/2 top-0 rounded-full',
              LINE_W,
              'bg-gradient-to-t from-amber-500 via-amber-500 to-transparent',
              'from-[0%] via-[12%]',
            ].join(' ')}
          />
        </div>
      </div>
    </div>
  );
};
