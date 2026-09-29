'use client';

import { motion } from 'motion/react';
import { FlipWords } from '@/components/ui/flip-words';

export function HomeHeroMotion() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { delayChildren: 0.15 } },
      }}
      className="flex flex-col items-center text-center">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
        }}
        className="mt-12 font-medium uppercase leading-relaxed tracking-widest text-neutral-400 dark:text-neutral-500">
        <div className="mx-auto uppercase tracking-[0.3em] text-neutral-500/80 dark:text-neutral-400/70 text-sm sm:text-base md:text-lg lg:text-xl">
          Designed to
          <FlipWords words={['immerse', 'surprise', 'resonate']} duration={1500} />
        </div>
      </motion.div>
    </motion.div>
  );
}
