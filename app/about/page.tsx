import Footer from '@/components/Footer';
import TechStackChips from '@/components/TechStackChips';
import { WorkTimeline } from '@/components/WorkTimeline';
import PageHeaderTitle from '@/components/PageHeaderTitle';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28 md:pb-16">
        <section className="mb-12">
          <PageHeaderTitle title="About Me" />
          <div className="mx-auto max-w-3xl text-center text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:mt-12 md:text-lg">
            <p>
              I’m Louis, a game designer focused on narrative, gameplay, level design, and emotional impact. I use
              environmental storytelling to shape player experience, while my software engineering background helps me
              prototype ideas and collaborate effectively with technical teams.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Skills
          </h2>
          <TechStackChips />
          <WorkTimeline />
        </section>
      </main>

      <Footer />
    </div>
  );
}
