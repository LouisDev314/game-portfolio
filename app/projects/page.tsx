import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projects';
import type { Metadata } from 'next';
import PageHeaderTitle from '@/components/PageHeaderTitle';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects and work by Louis Chan.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28">
        <section className="mb-12">
          <PageHeaderTitle title="Projects" />

          <div className="text-center text-neutral-600 dark:text-neutral-400 text-lg">
            Building what matters — not just what works
          </div>

          <div className="text-center text-neutral-500 dark:text-neutral-500 text-sm mt-2">
            where ideas become products, and technology creates impact
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              imageLoading={project.name === 'My Last Day' ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
