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
import { Terminal } from '@/components/ui/terminal';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-7xl px-6 pt-24">
        {/* ── A) HERO ─────────────────────────────────────────────── */}
        <section className="mt-24 sm:mt-48 lg:mt-40 flex flex-col items-center text-center">
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
        <RevealOnScroll className="mt-32 sm:mt-40 lg:mt-36">
          <section className="mb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Projects
              </h2>
              <Link href="/projects" className="self-end">
                <ImagesBadge
                  text="View all →"
                  className="hover:underline"
                  images={['/paper-bridge-logo.webp', '/store-logo.png', '/my-last-day-logo.webp']}
                  folderSize={{ width: 24, height: 18 }}
                  teaserImageSize={{ width: 14, height: 10 }}
                  hoverImageSize={{ width: 36, height: 24 }}
                  hoverTranslateY={-28}
                  hoverSpread={14}
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* ── Quick Glance ────────────────────────────────────── */}
        <RevealOnScroll>
          <section className="mt-16 mb-12 space-y-8 sm:mt-28">
            {/* Title row */}
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl md:text-5xl">
              Quick Glance
            </h2>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_23rem]">
              {/* Copy */}
              <div className="space-y-4">
                <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
                  I build production-ready systems by turning complex ideas into clear, reliable products. I focus on
                  software that feels simple to use, while being thoughtfully designed and robust under the hood.
                </p>

                <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
                  Beyond code, I value continuous growth through building and problem-solving—applying each experience to
                  improve how I design systems, make decisions, and execute in real-world environments.
                </p>
              </div>

              <div className="w-full max-w-sm justify-self-center lg:max-w-none">
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
              <div className="pt-6 mx-auto max-w-4xl">
                <ContactCard />
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* ── C) About Me ─────────────────────────────────────── */}
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-12">
            About Me
          </h2>
          <section className="mb-16">
            <Terminal
              commands={['whoami', 'focus', 'shipped', 'stack', 'values']}
              outputs={{
                0: ['Louis Chan — Full-Stack Developer'],
                1: ['Production-ready AI systems, e-commerce platforms, backend architecture'],
                2: [
                  'Paper Bridge — RAG document intelligence platform',
                  'PopBox Studio — Stripe-powered e-commerce platform',
                ],
                3: ['Next.js · Vercel · Node.js · TypeScript · FastAPI · PostgreSQL · Supabase · Stripe'],
                4: ['Clean architecture · Performance · Practical product thinking'],
              }}
              username="louis@portfolio"
              className="mt-6 max-w-2xl"
              typingSpeed={22}
              delayBetweenCommands={320}
              initialDelay={120}
              enableSound={false}
            />
          </section>
        </RevealOnScroll>
      </main>

      {/* ── D) FOOTER ───────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
