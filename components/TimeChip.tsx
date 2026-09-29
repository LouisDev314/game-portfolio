'use client';

import * as React from 'react';

export function TimeChip({ label }: { label: string }) {
  return (
    <div
      className="
        inline-flex items-center gap-3 rounded-full px-4 py-2
        border border-black/10 bg-white/70 text-neutral-900
        shadow-sm backdrop-blur-md
        dark:border-white/10 dark:bg-white/5 dark:text-neutral-100
      ">
      <span className="relative flex size-2.5">
        <span
          className="
            absolute inset-0 rounded-full bg-emerald-500/40
            [animation:pulse-ring_2.4s_cubic-bezier(0,0,0.2,1)_infinite]
          "
        />
        <span
          className="
            relative size-2.5 rounded-full bg-emerald-500
            shadow-[0_0_10px_rgba(16,185,129,0.55)]
          "
        />
      </span>

      <span className="text-sm font-medium tracking-tight">{label}</span>
    </div>
  );
}
