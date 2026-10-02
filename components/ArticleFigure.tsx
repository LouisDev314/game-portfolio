import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ArticleVisual } from '@/lib/blogs';

/** Shared single/comparison layout; capture instructions remain in the content data. */
export function ArticleFigure({
  visual,
  hero = false,
  children,
}: {
  visual: ArticleVisual;
  hero?: boolean;
  children?: ReactNode;
}) {
  const comparison = visual.images.length > 1;
  return (
    <div data-article-visual={visual.id} className={hero ? 'my-2' : 'my-10 lg:-mx-24'}>
      <div className={comparison ? 'grid gap-6 sm:grid-cols-2' : ''}>
        {visual.images.map((image, index) => (
          <figure key={`${visual.id}-${index}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={1080}
              sizes={
                comparison
                  ? '(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 45vw, 456px'
                  : '(max-width: 1024px) calc(100vw - 48px), 960px'
              }
              priority={hero}
              className="h-auto w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
            />
            {(image.caption || children) && (
              <figcaption className="mt-3 text-center font-sans text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {children ?? image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
