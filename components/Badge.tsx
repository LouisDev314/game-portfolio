import { cn } from '@/lib/utils';
import { AnimatedBadge } from '@/components/AnimatedBadge';
import type { ReactNode } from 'react';

export default function Badge({
  title,
  icon,
  titleClassName,
  fillClassName,
  hasAnim = true,
}: {
  title: string;
  icon?: ReactNode;
  titleClassName?: string;
  fillClassName?: string;
  hasAnim?: boolean;
}) {
  if (!hasAnim)
    return (
      <div className="flex justify-center items-center">
        {icon ?? <></>}
        <span
          className={cn(
            'px-3 py-1.5 text-xs rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
            titleClassName,
          )}>
          {title}
        </span>
      </div>
    );

  return (
    <AnimatedBadge title={title} icon={icon} titleClassName={titleClassName} fillClassName={fillClassName} />
  );
}
