'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

type IconProps = { className?: string };

export type CardItem = {
  id?: string;
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  iconColor?: string;
  content: React.ReactNode | (() => React.ReactNode);
};

export interface ExpandableCardsProps {
  cards: CardItem[];
  className?: string;
}

export function ExpandableCard({ cards, className }: ExpandableCardsProps) {
  const [active, setActive] = useState<CardItem | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/5 dark:bg-black/20"
              // prevents wheel/touch from reaching the page behind
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            />

            {/* Modal */}
            <motion.div
              layoutId={`card-${active.title}-${active.id || baseId}`}
              ref={ref as React.RefObject<HTMLDivElement>}
              className="h-3/4 w-[90%] overflow-hidden rounded-3xl bg-white z-10 dark:bg-neutral-900"
              // trap scroll so it doesn't chain to body
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}>
              {/* Scrollable content region */}
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-0 px-4 py-4 overflow-y-auto overscroll-contain touch-pan-y"
                // extra safety: prevent scroll chaining on desktop trackpads
                onWheel={(e) => e.stopPropagation()}>
                {typeof active.content === 'function' ? active.content() : active.content}
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className={cn('w-full mx-auto flex justify-around gap-4', className)}>
        {cards.map((card) => {
          const cardId = card.id || baseId;
          const Icon = card.icon;
          return (
            <motion.div
              layoutId={`card-${card.title}-${cardId}`}
              key={`card-${card.title}-${cardId}`}
              onClick={() => setActive(card)}
              className="
                p-4 size-38
                flex flex-col justify-center items-center
                rounded-3xl relative z-0
                border-[1.5] border-amber-400/80 dark:border-amber-400/40

                transition-all duration-200 ease-out
                cursor-pointer

                hover:-translate-y-1
                hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30
                hover:border-amber-400/90 dark:hover:border-amber-400/50
                hover:bg-neutral-50 dark:hover:bg-neutral-900

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                ">
              <div className="flex gap-4 flex-col items-center justify-center">
                <motion.div layoutId={`image-${card.title}-${cardId}`} className="flex justify-center">
                  <Icon className={cn('size-6', card.iconColor)} />
                </motion.div>
                <div className="flex flex-col justify-center items-center">
                  <motion.h3
                    layoutId={`title-${card.title}-${cardId}`}
                    className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${cardId}`}
                    className="text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </ul>
    </>
  );
}
