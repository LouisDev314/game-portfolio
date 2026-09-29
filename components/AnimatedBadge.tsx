'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function AnimatedBadge({
  title,
  icon,
  titleClassName,
  fillClassName,
}: {
  title: string;
  icon?: ReactNode;
  titleClassName?: string;
  fillClassName?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      variants={{
        hover: {
          y: -3,
          transition: {
            y: { delay: 0.15, type: 'spring', stiffness: 300, damping: 20 },
          },
        },
      }}
      className="relative inline-flex cursor-default overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300">
      <motion.span
        variants={{
          hover: {
            scaleY: 1,
            transition: { duration: 0.25, ease: 'easeOut' },
          },
        }}
        initial={{ scaleY: 0 }}
        className={cn('absolute inset-0 origin-bottom bg-neutral-200 dark:bg-indigo-500/20', fillClassName)}
        style={{ zIndex: 0 }}
      />

      <div className="flex items-center justify-center">
        {icon}
        <span
          className={cn(
            'relative z-10 ml-1.5 transition-colors duration-200 group-hover:text-neutral-900 dark:group-hover:text-neutral-100',
            titleClassName,
          )}>
          {title}
        </span>
      </div>
    </motion.span>
  );
}
