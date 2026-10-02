'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogCategories, type BlogArticle, type BlogCategory } from '@/lib/blogs';
import { cn } from '@/lib/utils';

type BlogFilter = 'all' | BlogCategory;

const filters: { value: BlogFilter; label: string }[] = [{ value: 'all', label: 'All' }, ...blogCategories];

const emptyMessages: Record<BlogFilter, string> = {
  all: 'No articles published yet.',
  'design-notes': 'No design notes published yet.',
  'game-analysis': 'No game analysis published yet.',
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function BlogArticles({ articles }: { articles: BlogArticle[] }) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('all');
  const visibleArticles = articles.filter((article) => activeFilter === 'all' || article.category === activeFilter);

  return (
    <section aria-label="Blog articles">
      <div role="group" aria-label="Filter articles by category" className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map(({ value, label }) => {
          const active = activeFilter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              aria-controls="blog-results"
              onClick={() => setActiveFilter(value)}
              className={cn(
                'inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 dark:focus-visible:outline-amber-400',
                active
                  ? 'border-amber-500/80 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
                  : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-500',
              )}>
              {label}
            </button>
          );
        })}
      </div>

      <div id="blog-results">
        <p
          role="status"
          className={
            visibleArticles.length
              ? 'sr-only'
              : 'rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400'
          }>
          {visibleArticles.length
            ? `${visibleArticles.length} ${visibleArticles.length === 1 ? 'article' : 'articles'} shown.`
            : emptyMessages[activeFilter]}
        </p>
        {visibleArticles.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <article
                key={article.slug}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-200 hover:border-amber-500/90 hover:bg-neutral-50 hover:shadow-lg hover:shadow-black/5 motion-safe:hover:-translate-y-1 focus-within:border-amber-500/90 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-50 motion-reduce:transition-none dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-amber-400/50 dark:hover:shadow-black/30 dark:focus-within:border-amber-400/50 dark:focus-within:ring-offset-neutral-950">
                {article.thumbnail && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.thumbnail.src}
                      alt={article.thumbnail.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none"
                    />
                  </div>
                )}
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-neutral-300 px-3 py-1.5 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                      {blogCategories.find(({ value }) => value === article.category)?.label}
                    </span>
                    {article.publishedAt && (
                      <time dateTime={article.publishedAt} className="text-neutral-500 dark:text-neutral-400">
                        {dateFormatter.format(new Date(article.publishedAt))}
                      </time>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    <Link
                      href={`/blogs/${article.slug}`}
                      className="cursor-pointer rounded-sm after:absolute after:inset-0 group-hover:underline underline-offset-4 focus-visible:outline-none">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{article.summary}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
