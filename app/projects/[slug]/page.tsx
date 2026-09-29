import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.name ?? 'Project' };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-4xl px-6 pt-28">
        <Link href="/projects" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">
          ← All Projects
        </Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
          Detailed project breakdown coming soon.
        </p>
      </main>
      <Footer />
    </div>
  );
}
