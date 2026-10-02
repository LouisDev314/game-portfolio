import Link from 'next/link';
import { blogCategories, articleReadTime, type ArticleContent } from '@/lib/blogs';
import { ArticleFigure } from '@/components/ArticleFigure';

export default function BlogArticleDetail({ article }: { article: ArticleContent }) {
  return (
    <article className="mx-auto max-w-5xl px-6 pt-28 pb-20 text-neutral-900 dark:text-neutral-100">
      <Link href="/blogs" className="text-sm text-neutral-600 underline underline-offset-4 dark:text-neutral-400">
        ← All articles
      </Link>
      <header className="py-10">
        <p className="mb-5 text-sm font-medium text-amber-500 dark:text-amber-400">
          {blogCategories.find((category) => category.value === article.category)?.label}
        </p>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">{article.summary}</p>
        <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
          By Louis Chan <span aria-hidden="true">·</span> {articleReadTime(article)} min read
        </p>
      </header>
      {article.heroVisual && (
        <ArticleFigure visual={article.heroVisual} hero>
          <a href={article.heroSource} className="underline underline-offset-4">
            {article.heroCredit}
          </a>
        </ArticleFigure>
      )}
      <div className="mx-auto mt-12 max-w-3xl">
        <nav aria-label="Article contents" className="my-10 border-y border-neutral-200 py-6 dark:border-neutral-800">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">In this analysis</p>
          <ol className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            {article.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-amber-500 hover:underline dark:hover:text-amber-400">
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#design-takeaways" className="hover:underline">
                Design takeaways
              </a>
            </li>
          </ol>
        </nav>
        <div
          data-article-body
          className="font-serif text-lg leading-8 text-neutral-800 sm:text-xl sm:leading-9 dark:text-neutral-200">
          {article.intro.map((paragraph) => (
            <p key={paragraph} className="mb-6">
              {paragraph}
            </p>
          ))}
          <aside
            aria-label="Play experience"
            className="my-8 border-l-2 border-amber-500 pl-4 font-sans text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            {article.experienceNote}
          </aside>
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-16 scroll-mt-28">
              <h2 className="mb-7 text-2xl leading-snug font-semibold tracking-tight font-sans text-neutral-900 sm:text-3xl dark:text-neutral-100">
                {section.title}
              </h2>
              {section.blocks.map((block, index) =>
                block.type === 'paragraph' ? (
                  <p key={index} className="mb-6">
                    {block.text}
                  </p>
                ) : (
                  <ArticleFigure key={block.visual.id} visual={block.visual} />
                ),
              )}
              <aside className="my-8 text-lg leading-8 italic">
                <strong className="mb-2 block font-sans text-sm font-semibold not-italic text-neutral-900 dark:text-neutral-100">
                  Design takeaway
                </strong>
                {section.takeaway}
              </aside>
            </section>
          ))}
          <section id="design-takeaways" className="mt-16 scroll-mt-28">
            <h2 className="mb-7 font-sans text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              Design takeaways
            </h2>
            <ul className="list-disc space-y-4 pl-5">
              {article.takeaways.map((takeaway) => (
                <li key={takeaway.title}>
                  <strong className="text-neutral-900 dark:text-neutral-100">{takeaway.title}</strong> {takeaway.text}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section
          aria-label="Sources and credits"
          className="mt-14 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-lg font-semibold">Sources & credits</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
            Mechanics and encounter details were checked against the sources below. Interpretations of player behavior
            and design tradeoffs are my analysis.
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-6">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} className="underline underline-offset-4">
                  {source.title}
                </a>
                <p className="text-neutral-500 dark:text-neutral-400">{source.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
