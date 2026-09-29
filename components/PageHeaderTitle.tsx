import React from 'react';

export default function PageHeaderTitle({ title }: { title: string }) {
  return (
    <h1
      className="text-center
            mt-12
            text-[clamp(4.5rem,10vw,9rem)]
            font-black
            tracking-[-0.04em]
            leading-[0.85]
            break-words
            text-neutral-900 dark:text-neutral-100
            mb-12">
      {title}
    </h1>
  );
}
