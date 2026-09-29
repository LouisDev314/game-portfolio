import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Links' };

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">Links</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          A curated collection of useful resources — coming soon.
        </p>
      </main>
      <Footer />
    </div>
  );
}
