'use client';

import { motion } from 'motion/react';
import TechStackChips from '@/components/TechStackChips';
import Badge from '@/components/Badge';

export default function TechStack() {
  return (
    <div className="no-scrollbar relative w-full h-full rounded-3xl bg-white border border-amber-500 dark:bg-black overflow-y-auto p-6 max-[360px]:p-3 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Skills & Toolkit
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I design and prototype player experiences through gameplay, levels, systems, and storytelling.
        </p>
      </motion.div>
      <TechStackChips />
      <motion.div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">How I Work</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Clear communication',
            'Cross-functional collaboration',
            'Creative problem-solving',
            'Open to feedback',
            'Ownership',
            'Adaptability',
          ].map((item) => (
            <Badge key={item} title={item} titleClassName="ml-0" fillClassName="bg-indigo-500/20" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
