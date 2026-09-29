'use client';

import { motion } from 'motion/react';
import TechStackChips from '@/components/TechStackChips';

export default function TechStack() {
  return (
    <div className="no-scrollbar relative w-full h-full rounded-3xl bg-white border border-amber-400 dark:bg-black overflow-y-auto p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          My Tech Stack
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I build scalable, production-ready applications with modern technologies.
        </p>
      </motion.div>
      <TechStackChips />
      <motion.div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-4">How I Work</h3>
        <div className="flex flex-wrap gap-3">
          {[
            'System thinking',
            'Performance & scalability focus',
            'Clear communication',
            'Ownership & execution',
            'Continuous learning',
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-xs rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
