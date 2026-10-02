'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { X } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/Portal';
import { useScrollLock } from '@/hooks/use-scroll-lock';

type IconProps = { className?: string };

export type CardItem = {
  id?: string;
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  iconColor?: string;
  modalClassName?: string;
  closeButtonClassName?: string;
  content: React.ReactNode | (() => React.ReactNode);
};

export interface ExpandableCardsProps {
  cards: CardItem[];
  className?: string;
}

function PresentContent({ children }: { children: React.ReactNode }) {
  const present = useIsPresent();
  return present ? children : null;
}

function ScrollLockedOverlay({ children }: { children: React.ReactNode }) {
  // AnimatePresence keeps this mounted until the shared layout exit finishes.
  // Unlocking earlier lets the moving dialog expand the mobile scroll viewport.
  useScrollLock(true);

  return (
    <motion.div layoutRoot className="fixed inset-0 z-[10000] grid place-items-center overflow-hidden">
      {children}
    </motion.div>
  );
}

export function ExpandableCard({ cards, className }: ExpandableCardsProps) {
  const [active, setActive] = useState<CardItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const baseId = useId();

  useEffect(() => {
    if (!active) return;
    const focusTarget = ref.current?.querySelector<HTMLElement>('[data-autofocus]') ?? ref.current;
    focusTarget?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActive(null);
      }
      if (event.key === 'Tab' && ref.current) {
        const focusable = Array.from(
          ref.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'),
        );
        if (!focusable.length) {
          event.preventDefault();
          ref.current.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <Portal>
        <AnimatePresence>
          {active ? (
            <ScrollLockedOverlay>
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
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                tabIndex={-1}
                className={cn(
                  'relative z-10 overflow-hidden rounded-3xl bg-white dark:bg-neutral-900',
                  active.modalClassName ?? 'h-3/4 w-[90%]',
                )}
                // trap scroll so it doesn't chain to body
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  aria-label={`Close ${active.title}`}
                  onClick={() => setActive(null)}
                  className={cn(
                    'absolute right-8 top-8 z-20 flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-sm hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800',
                    active.closeButtonClassName,
                  )}>
                  <X aria-hidden="true" className="size-5" />
                </button>
                {/* Scrollable content region */}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full max-h-[90dvh] min-h-0 overflow-y-auto overscroll-contain p-4 touch-pan-y"
                  // extra safety: prevent scroll chaining on desktop trackpads
                  onWheel={(e) => e.stopPropagation()}>
                  <PresentContent>
                    {typeof active.content === 'function' ? active.content() : active.content}
                  </PresentContent>
                </motion.div>
              </motion.div>
            </ScrollLockedOverlay>
          ) : null}
        </AnimatePresence>
      </Portal>
      <div className={cn('w-full mx-auto flex justify-around gap-4', className)}>
        {cards.map((card) => {
          const cardId = card.id || baseId;
          const Icon = card.icon;
          return (
            <motion.button
              type="button"
              layoutId={`card-${card.title}-${cardId}`}
              key={`card-${card.title}-${cardId}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActive(card);
              }}
              aria-label={`Open ${card.title}`}
              className="
                shrink-0 p-4 size-38
                flex flex-col justify-center items-center
                rounded-3xl relative z-0
                border-[1.5] border-amber-500/80 dark:border-amber-400/40

                transition-all duration-200 ease-out motion-reduce:transition-none
                cursor-pointer

                hover:-translate-y-1
                hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30
                hover:border-amber-500/90 dark:hover:border-amber-400/50
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
                    className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
