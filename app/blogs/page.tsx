import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import PageHeaderTitle from '@/components/PageHeaderTitle';
import BlogArticles from '@/components/BlogArticles';
import { blogArticles } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Design notes from my own work and analysis of the games I study.',
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <section className="mb-12">
          <PageHeaderTitle title="Blogs" />
          <p className="text-center text-lg text-neutral-600 dark:text-neutral-400">
            Design notes from my own work and analysis of the games I study.
          </p>
        </section>
        <BlogArticles articles={blogArticles} />
      </main>
      <Footer />
    </div>
  );
}
