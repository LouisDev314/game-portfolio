import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Briefcase, MapPin } from 'lucide-react';
import Badge from '@/components/Badge';
import { LinkPreview } from '@/components/ui/link-preview';

function MetaPill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
      {icon}
      <span className="leading-none">{children}</span>
    </span>
  );
}

function CompanyHeader({
  company,
  companyUrl,
  role,
  location,
  workType,
}: {
  company: string;
  companyUrl: string;
  role: string;
  location: string;
  workType: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-1">
        <LinkPreview
          url={companyUrl}
          className="text-base underline md:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {company}
        </LinkPreview>
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">{role}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <MetaPill icon={<MapPin className="size-3.5 opacity-80" />}>{location}</MetaPill>
        <MetaPill icon={<Briefcase className="size-3.5 opacity-80" />}>{workType}</MetaPill>
      </div>
    </div>
  );
}

export function WorkTimeline() {
  const data = [
    {
      title: 'March 2026 - Present',
      content: (
        <div
          key="popbox-studio"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="PopBox Studio"
            companyUrl="https://popboxstudio.com/"
            location="Calgary, AB"
            role="Founder & Full Stack Engineer"
            workType="Remote"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Built a production-ready e-commerce platform for anime collectibles with a server-rendered storefront,
            Stripe checkout, and a complete order lifecycle. Implemented inventory reservation, guest checkout, and
            admin workflows for products, orders, and fulfillment. Designed a scalable PostgreSQL/Supabase backend with
            strong validation, idempotent order handling, and reliable payment integration.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge title="Next.js" hasAnim={false} />
            <Badge title="Tailwind CSS" hasAnim={false} />
            <Badge title="Vercel" hasAnim={false} />
            <Badge title="Node.js" hasAnim={false} />
            <Badge title="Express" hasAnim={false} />
            <Badge title="TypeScript" hasAnim={false} />
            <Badge title="PostgreSQL" hasAnim={false} />
            <Badge title="Supabase" hasAnim={false} />
            <Badge title="Docker" hasAnim={false} />
            <Badge title="Stripe" hasAnim={false} />
            <Badge title="GitHub Actions (CI/CD)" hasAnim={false} />
            <Badge title="TanStack Query" hasAnim={false} />
          </div>
        </div>
      ),
    },
    {
      title: 'March 2025 - March 2026',
      content: (
        <div
          key="bmo"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="Bank of Montreal"
            companyUrl="https://www.bmo.com/en-ca/main/personal/"
            location="Calgary, AB"
            role="Personal Banking Associate"
            workType="On-site"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Analyzed client financial data and requirements to support lending and credit workflows in a high-volume
            banking environment. Ensured accurate processing and compliance with risk controls while coordinating across
            internal systems and stakeholders. Applied structured problem-solving to improve workflow efficiency and
            decision accuracy in time-sensitive, production-like conditions.
          </p>
        </div>
      ),
    },
    {
      title: 'September 2024 - March 2025',
      content: (
        <div
          key="earn-alliance"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="Earn Alliance"
            companyUrl="https://litepaper.earnalliance.com/"
            location="Hong Kong"
            role="Project Manager"
            workType="Remote"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Led Agile delivery across cross-functional teams, translating product requirements into actionable technical
            tasks and coordinating execution through tools like Jira and Asana. Identified and resolved production
            bottlenecks, improving team productivity by 120% and increasing user retention by 35%. Worked closely with
            engineers and stakeholders to ensure reliable delivery, clear prioritization, and efficient iteration in a
            fast-paced environment.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge title="JIRA" hasAnim={false} />
            <Badge title="Asana" hasAnim={false} />
          </div>
        </div>
      ),
    },
    {
      title: 'August 2023 - September 2024',
      content: (
        <div
          key="vgt"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="Virtual Gaming Technology"
            companyUrl="https://www.vgt.com.hk/en/"
            location="Hong Kong"
            role="Full Stack Developer"
            workType="On-site"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Designed and built distributed backend services using Java Spring Boot in an event-driven architecture to
            process high-volume real-time data at scale. Integrated Kafka-based asynchronous messaging to improve system
            reliability and decouple services for efficient background processing. Revamped frontend architecture and
            migrated components to SolidJS, achieving up to 350% faster rendering and significantly smoother user
            experiences. Optimized system performance and stability, supporting over 100k concurrent users in
            production.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge title="Java Spring Boot" hasAnim={false} />
            <Badge title="SQL" hasAnim={false} />
            <Badge title="Apache Kafka" hasAnim={false} />
            <Badge title="Event-Driven Architecture" hasAnim={false} />
            <Badge title="Distributed Systems" hasAnim={false} />
            <Badge title="SolidJS" hasAnim={false} />
            <Badge title="Tailwind CSS" hasAnim={false} />
            <Badge title="GitLab CI/CD" hasAnim={false} />
          </div>
        </div>
      ),
    },
    {
      title: 'September 2022 - December 2022',
      content: (
        <div
          key="future-successors"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="Future Successors"
            companyUrl="https://futuresuccessors.org/"
            location="Atlanta, GA"
            role="Software Engineer Intern"
            workType="Remote/On-site"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Built backend APIs using FastAPI to support secure communication between frontend and cloud services.
            Designed and optimized data models and database queries, improving performance by 50% while ensuring data
            integrity through validation and error handling. Integrated AWS-based workflows and CI/CD pipelines to
            streamline deployment and support reliable, production-ready feature delivery.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge title="Node.js" hasAnim={false} />
            <Badge title="Express" hasAnim={false} />
            <Badge title="React Native" hasAnim={false} />
            <Badge title="MongoDB" hasAnim={false} />
            <Badge title="NoSQL" hasAnim={false} />
          </div>
        </div>
      ),
    },
    {
      title: 'June 2022 - September 2022',
      content: (
        <div
          key="microsoft"
          className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-7">
          <CompanyHeader
            company="Microsoft"
            companyUrl="https://www.xbox.com/en-US/xbox-game-studios/game-camp"
            location="Atlanta, GA"
            role="Xbox Summer Camp Engineer"
            workType="Remote/On-site"
          />

          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            Built a complete gameplay project in Unreal Engine 5 using C++ and Blueprint, implementing core systems for
            state management and player interactions. Led a team of three engineers, establishing Git workflows, coding
            standards, and code review practices to improve code quality and team efficiency. Rapidly prototyped and
            iterated on gameplay features in an agile environment, delivering a polished project under tight timelines.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge title="Unreal Engine 5" hasAnim={false} />
            <Badge title="C++" hasAnim={false} />
            <Badge title="Blueprint Visual Scripting" hasAnim={false} />
            <Badge title="Git" hasAnim={false} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full">
      {/* Header */}
      <div className="mx-auto my-16 max-w-3xl px-4 text-center md:my-20">
        <p className="text-sm font-medium tracking-widest text-neutral-500 dark:text-neutral-400">WORK EXPERIENCE</p>

        <h2 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-4xl">
          Building useful things—end to end.
        </h2>

        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          A snapshot of the roles where I shipped products, scaled systems, and automated real workflows.
        </p>

        {/* subtle divider */}
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
      </div>

      <Timeline data={data} />
    </section>
  );
}
