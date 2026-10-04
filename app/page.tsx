import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projects';
import Link from 'next/link';
import { ImagesBadge } from '@/components/ui/images-badge';
import RevealOnScroll from '@/components/RevealOnScroll';
import InfinitePicturesCarousel from '@/components/InfinitePicturesCarousel';
import ContactCard from '@/components/ContactCard';
import { HomeHeroMotion } from '@/components/HomeHeroMotion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { HomeExpandableCards } from '@/components/HomeExpandableCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-7xl px-6">
        {/* ── A) HERO ─────────────────────────────────────────────── */}
        <section className="min-h-svh overflow-x-clip justify-center py-24 flex flex-col items-center text-center">
          <h1 className="mb-8 text-[clamp(6rem,18vw,16rem)] font-black leading-[0.8] tracking-[-0.07em] wrap-break-word text-neutral-900 dark:text-neutral-100">
            Louis
          </h1>
          <TextGenerateEffect
            words="Game Designer"
            duration={1}
            className="text-md font-semibold uppercase tracking-[0.24em] text-neutral-600 dark:text-neutral-300 sm:text-xl md:text-2xl lg:text-3xl"
          />

          <HomeHeroMotion />
        </section>

        {/* ── B) Projects ────────────────────────────────────── */}
        <RevealOnScroll className="mt-8 sm:mt-10 lg:mt-8">
          <section className="mb-16">
            <div className="flex items-center justify-between mb-5 md:mb-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Projects
              </h2>
              <Link href="/projects" className="self-end">
                <ImagesBadge
                  text="View all →"
                  className="hover:underline"
                  images={['/lastremains.webp', '/paper-bridge-logo.webp', '/store-logo.png']}
                  folderSize={{ width: 24, height: 18 }}
                  teaserImageSize={{ width: 14, height: 10 }}
                  hoverImageSize={{ width: 36, height: 24 }}
                  hoverTranslateY={-28}
                  hoverSpread={14}
                />
              </Link>
            </div>

            <div className="space-y-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* ── About Me ────────────────────────────────────── */}
        <RevealOnScroll>
          <section className="mt-16 mb-12 space-y-8 sm:mt-28">
            {/* Title row */}
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl md:text-5xl">
              About Me
            </h2>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_26rem]">
              {/* Copy */}
              <div>
                <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
                  I’m Louis, a game designer focused on narrative, gameplay, level design, and emotional impact. I use
                  environmental storytelling to shape player experience, while my software engineering background helps
                  me prototype ideas and collaborate effectively with technical teams.
                </p>
              </div>

              <div className="w-full max-w-md justify-self-center lg:max-w-none">
                <HomeExpandableCards />
              </div>
            </div>

            {/* Carousel */}
            <div className="pt-2">
              <InfinitePicturesCarousel />
            </div>

            {/* Soft divider + compact CTA */}
            <div className="pt-4">
              <div className="h-px w-full bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
              <div className="pt-12 mx-auto max-w-4xl">
                <ContactCard />
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </main>

      {/* ── D) FOOTER ───────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
