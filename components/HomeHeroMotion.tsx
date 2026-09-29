'use client';

import { motion } from 'motion/react';
import { Cover } from '@/components/ui/cover';
import { FlipWords } from '@/components/ui/flip-words';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

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
        className="mt-12 text-xl font-medium uppercase leading-relaxed tracking-widest text-neutral-400 dark:text-neutral-500">
        <div className="mx-auto text-base uppercase tracking-[0.4em] text-neutral-500/80 dark:text-neutral-400/70 sm:text-lg md:text-xl lg:text-2xl">
          Technology as a
          <br className="sm:hidden" />
          <FlipWords words={['bridge', 'string', 'knot']} duration={2500} />
        </div>
      </motion.div>
      <br />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
        }}
        className="text-base font-medium uppercase italic leading-relaxed tracking-widest text-neutral-400 dark:text-neutral-500">
        <TextGenerateEffect
          words="Connect. Build. Impact."
          duration={1}
          textClassName="text-lg sm:text-xl font-medium tracking-[0.08em]"
        />
      </motion.div>

      <div className="mt-6">
        <Cover className="text-lg uppercase italic text-amber-400 sm:text-xl">sic itur ad astra</Cover>
      </div>
    </motion.div>
  );
}
