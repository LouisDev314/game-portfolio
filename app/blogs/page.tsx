import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import PageHeaderTitle from '@/components/PageHeaderTitle';

export const metadata: Metadata = { title: 'Blogs' };

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <PageHeaderTitle title="My Blogs" />
        <p className="text-neutral-500 dark:text-neutral-400">
          Coming soon — writing about tech, design, and building things.
        </p>
      </main>
      <Footer />
    </div>
  );
}
