import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleDetail from '@/components/BlogArticleDetail';
import Footer from '@/components/Footer';
import { blogArticles } from '@/lib/blogs';

type Props = { params: Promise<{ slug: string }> };

async function getArticle(params: Props['params']) {
  const { slug } = await params;
  const article = blogArticles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params);
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/blogs/${article.slug}` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getArticle(params);
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main>
        <BlogArticleDetail article={article} />
      </main>
      <Footer />
    </div>
  );
}
