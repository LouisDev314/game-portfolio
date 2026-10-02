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
    id: 'popbox-studio',
    dates: 'March 2026 - Present',
    role: 'Founder & Full Stack Engineer',
    company: 'PopBox Studio',
    companyUrl: 'https://popboxstudio.com/',
    location: 'Calgary, AB',
    workType: 'Remote',
    tags: ['Product', 'Software'],
    contributions: [
      'Delivered the storefront, checkout, and order-management workflows end to end.',
      'Built tools for managing products, orders, and fulfillment.',
      'Worked through inventory and payment constraints to support reliable purchases.',
    ],
  },
  {
    id: 'bmo',
    dates: 'March 2025 - March 2026',
    role: 'Personal Banking Associate',
    company: 'Bank of Montreal',
    companyUrl: 'https://www.bmo.com/en-ca/main/personal/',
    location: 'Calgary, AB',
    workType: 'On-site',
    tags: ['Client Services'],
    contributions: [
      'Analyzed client information to support lending and credit decisions.',
      'Coordinated across internal systems and stakeholders under time constraints.',
      'Balanced accurate processing with risk controls and compliance requirements.',
    ],
  },
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
    id: 'vgt',
    dates: 'August 2023 - September 2024',
    role: 'Full Stack Developer',
    company: 'Virtual Gaming Technology',
    companyUrl: 'https://www.vgt.com.hk/en/',
    location: 'Hong Kong',
    workType: 'On-site',
    tags: ['Software'],
    contributions: [
      'Reworked the frontend to improve responsiveness and the user experience.',
      'Built services for real-time data and background processing.',
      'Improved performance and stability in a live production environment.',
    ],
  },
  {
    id: 'future-successors',
    dates: 'September 2022 - December 2022',
    role: 'Software Engineer Intern',
    company: 'Future Successors',
    companyUrl: 'https://futuresuccessors.org/',
    location: 'Atlanta, GA',
    workType: 'Remote/On-site',
    tags: ['Software'],
    contributions: [
      'Connected frontend features with backend and cloud services.',
      'Refined data models and queries to improve performance.',
      'Added validation and error handling to protect data integrity.',
    ],
  },
  {
    id: 'microsoft',
    dates: 'June 2022 - September 2022',
    role: 'Xbox Summer Camp Engineer',
    company: 'Microsoft · Xbox Game Camp',
    companyUrl: 'https://www.xbox.com/en-US/xbox-game-studios/game-camp',
    location: 'Atlanta, GA',
    workType: 'Remote/On-site',
    tags: ['Gameplay', 'Prototyping'],
    contributions: [
      'Rapidly prototyped and iterated on gameplay features.',
      'Implemented core systems for player interactions and game-state management.',
      'Established shared development and code-review practices for the engineering team.',
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
          My experience across game production and software helps me turn ideas into testable, practical design
          decisions.
        </p>
      </div>
      <Timeline data={data} />
    </section>
  );
}
