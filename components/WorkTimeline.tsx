import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { LinkPreview } from '@/components/ui/link-preview';

type Experience = {
  id: string;
  dates: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  workType: string;
  tags: string[];
  contributions: string[];
};

// Preserve the original chronological order.
const experiences: Experience[] = [
  {
    id: 'earn-alliance',
    dates: 'September 2024 - March 2025',
    role: 'Project Manager',
    company: 'Earn Alliance',
    companyUrl: 'https://litepaper.earnalliance.com/',
    location: 'Hong Kong',
    workType: 'Remote',
    tags: ['Production', 'Playtesting'],
    contributions: [
      'Provided design feedback from playtests.',
      'Coordinated across art, design, development, and marketing.',
      'Tracked milestones and translated product requirements into actionable tasks.',
      'Resolved production bottlenecks to support delivery and iteration.',
    ],
  },
  {
    id: 'microsoft',
    dates: 'June 2022 - September 2022',
    role: 'Xbox Game Camp · Gameplay Prototyping',
    company: 'Microsoft · Xbox Game Camp',
    companyUrl: 'https://www.xbox.com/en-US/xbox-game-studios/game-camp',
    location: 'Atlanta, GA',
    workType: 'Remote/On-site',
    tags: ['Gameplay', 'Prototyping'],
    contributions: [
      'Rapidly prototyped and iterated on gameplay features.',
      'Implemented core systems for player interactions and game-state management.',
      'Collaborated on shared prototyping and iteration practices.',
    ],
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <>
      <article
        aria-labelledby={`${experience.id}-role`}
        className="min-w-0 rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
        <div className="mb-4">
          <h4
            id={`${experience.id}-role`}
            className="text-lg font-semibold leading-snug text-neutral-900 dark:text-neutral-100 sm:text-xl md:text-2xl">
            {experience.role}
          </h4>
          <LinkPreview
            url={experience.companyUrl}
            className="mt-1 inline-block max-w-full break-words text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 dark:text-neutral-300 dark:decoration-neutral-600 md:text-base">
            {experience.company}
          </LinkPreview>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {experience.location} · {experience.workType}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-white/5 dark:text-neutral-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed dark:text-neutral-300">
          {experience.contributions.map((contribution) => (
            <li key={contribution} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1.5 sm:size-1.75 shrink-0 rounded-full bg-amber-400" />
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export function WorkTimeline() {
  const data = experiences.map((experience) => ({
    title: experience.dates,
    content: <ExperienceCard key={experience.id} experience={experience} />,
  }));

  return (
    <section aria-labelledby="work-experience-heading" className="relative w-full">
      <div className="mt-12">
        <h2
          id="work-experience-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Work Experience
        </h2>
        <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
          My experience in game production, playtesting, and prototyping helps me turn ideas into practical design
          decisions.
        </p>
      </div>
      <Timeline data={data} />
    </section>
  );
}
