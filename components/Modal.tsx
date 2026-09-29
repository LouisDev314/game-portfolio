'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/Portal';
import { useScrollLock } from '@/hooks/use-scroll-lock';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Modal({ open, onClose, title, description, children, className, contentClassName }: ModalProps) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 isolate flex items-center justify-center transform-none pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60 pointer-events-auto"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <div className={cn('relative z-10 flex w-full justify-center p-4 pointer-events-none', className)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'pointer-events-auto w-full max-w-2xl flex flex-col overflow-hidden',
              'rounded-2xl border border-neutral-200 bg-white shadow-xl',
              'dark:border-neutral-800 dark:bg-neutral-950',
              contentClassName,
            )}>
            <div className="p-6 pb-4">
              <h2 id="modal-title" className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>

            <div className="p-6 pt-0">{children}</div>
          </motion.div>
        </div>
      </div>
    </Portal>
  );
}
