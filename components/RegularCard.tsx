import { JSX } from 'react';
import { cn } from '@/lib/utils';

export default function RegularCard({ content, className }: { content: JSX.Element; className?: string }) {
  return (
    <div className="w-full transform-none">
      <div
        className={cn(
          'rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900',
          className,
        )}>
        {content}
      </div>
    </div>
  );
}
