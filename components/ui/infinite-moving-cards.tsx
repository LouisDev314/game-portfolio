'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { CSSProperties } from 'react';

type PictureItem = {
  src: string; // "/photos/1.jpg" or "https://..."
  alt?: string; // accessibility
  href?: string; // optional click-through link
};

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  className,
  imageClassName,
}: {
  items: PictureItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  className?: string;
  imageClassName?: string;
}) => {
  const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
  const scrollerStyle = {
    '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
    '--animation-duration': duration,
  } as CSSProperties;
  const scrollingItems = [...items, ...items];

  return (
    <div
      style={scrollerStyle}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}>
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll">
        {scrollingItems.map((item, idx) => {
          const CardInner = (
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm',
                'dark:border-white/10',
                // card sizing (tweak as you like)
                'h-40 w-56 md:h-48 md:w-72',
              )}>
              <Image
                src={item.src}
                alt={item.alt ?? `image-${idx}`}
                fill
                sizes="(max-width: 768px) 224px, 288px"
                loading="lazy"
                className={cn(
                  'h-full w-full object-cover',
                  'transition-transform duration-300 ease-out hover:scale-[1.03]',
                  imageClassName,
                )}
              />
            </div>
          );

          return (
            <li key={`${item.src}-${idx}`} className="shrink-0">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  {CardInner}
                </a>
              ) : (
                CardInner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
