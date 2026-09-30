import RegularCard from '@/components/RegularCard';
import CopyBtn from '@/components/CopyBtn';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site';
import { ArrowUpRight, Mail } from 'lucide-react';

const EMAIL = 'louiscch314@gmail.com';

export default function ContactCard({ className }: { className?: string }) {
  const content = (
    <div className={className}>
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Let&apos;s connect
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            For game design opportunities, collaborations, or portfolio feedback.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 dark:border-neutral-700 dark:bg-neutral-950 sm:px-4">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
              <a
                href={`mailto:${EMAIL}`}
                className="min-w-0 flex-1 break-all text-sm text-neutral-700 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-neutral-200">
                {EMAIL}
              </a>
              <CopyBtn email={EMAIL} />
            </div>
            <a
              href={siteConfig.links.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm font-medium text-neutral-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-neutral-200">
              LinkedIn <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ContactForm email={EMAIL} />
      </div>
    </div>
  );

  return <RegularCard content={content} className="p-5 sm:p-7" />;
}
