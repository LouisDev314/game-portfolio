import Link from 'next/link';
import type { ReactNode } from 'react';

export function ProjectCardMotionShell({
  children,
  slug,
  title,
}: {
  children: ReactNode;
  slug: string;
  title: string;
}) {
  return (
    <article>
      <Link
        href={`/projects/${slug}`}
        aria-label={`View ${title} project`}
        className="group grid overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {children}
      </Link>
    </article>
  );
}
