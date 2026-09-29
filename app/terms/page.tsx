import Link from 'next/link';
import { BackToTopButton } from '@/components/BackToTopButton';

const LAST_UPDATED = 'February 22, 2026'; // <-- update anytime
const CONTACT_EMAIL = 'louiscch314@gmail.com'; // <-- your email
const GOVERNING_LAW = 'Alberta, Canada'; // <-- set your jurisdiction

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-70 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
        <div className="absolute -top-24 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-500/10" />
      </div>

      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
      {children}
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-lg font-semibold tracking-tight sm:text-xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-[15px]">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-[15px]">
      {children}
    </ul>
  );
}

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  const isMail = href.startsWith('mailto:');
  return (
    <Link
      href={href}
      className="font-medium text-neutral-900 underline decoration-neutral-400/70 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-500/80 dark:hover:decoration-neutral-100"
      {...(isMail ? { prefetch: false } : {})}>
      {children}
    </Link>
  );
}

function TocItem({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-neutral-700 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10">
      <span className="font-medium">{label}</span>
      <span className="text-neutral-400 transition group-hover:translate-x-0.5 dark:text-neutral-500">→</span>
    </a>
  );
}

export default function TermsPage() {
  return (
    <Container>
      <header className="relative mx-auto w-full max-w-3xl mt-8 sm:mt-4 px-5 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Legal</Pill>
          <Pill>Terms</Pill>
          <Pill>Last updated: {LAST_UPDATED}</Pill>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Use</h1>

        <p className="mt-3 text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg">
          These terms govern your use of this website. By accessing the site, you agree to them.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10">
            ← Back to home
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 dark:border-white/10 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
            View Privacy Policy
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-3xl px-5 pb-16 pt-10 sm:px-6 sm:pb-24">
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <TocItem href="#acceptance" label="1. Acceptance" />
          <TocItem href="#use" label="2. Website Use" />
          <TocItem href="#ip" label="3. Intellectual Property" />
          <TocItem href="#warranties" label="4. No Warranties" />
          <TocItem href="#liability" label="5. Limitation of Liability" />
          <TocItem href="#links" label="6. External Links" />
          <TocItem href="#changes" label="7. Changes" />
          <TocItem href="#law" label="8. Governing Law" />
          <TocItem href="#contact" label="9. Contact" />
        </div>

        <Card>
          <div className="space-y-8">
            <section className="space-y-3">
              <H2 id="acceptance">1. Acceptance of Terms</H2>
              <P>
                By accessing this website (the “Website”), you agree to be bound by these Terms of Use. If you do not
                agree, please do not use the Website.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="use">2. Use of the Website</H2>
              <P>This Website is provided for informational and portfolio purposes only. You agree not to:</P>
              <Ul>
                <li>Use the Website for unlawful purposes</li>
                <li>Attempt unauthorized access to any part of the Website</li>
                <li>Interfere with performance, security, or availability</li>
                <li>Copy or scrape content in a way that violates these terms or applicable law</li>
              </Ul>
            </section>

            <section className="space-y-3">
              <H2 id="ip">3. Intellectual Property</H2>
              <P>
                Unless otherwise stated, all content on this Website (including text, visuals, code snippets, project
                descriptions, and design) is owned by the Website owner and is protected by applicable intellectual
                property laws.
              </P>
              <P>
                You may view and share links to the Website, but you may not reproduce or distribute content without
                prior written permission.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="warranties">4. No Warranties</H2>
              <P>
                The Website is provided “as is” and “as available” without warranties of any kind. I do not guarantee
                the accuracy, completeness, or availability of the Website.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="liability">5. Limitation of Liability</H2>
              <P>
                To the maximum extent permitted by law, I am not liable for any indirect, incidental, consequential, or
                punitive damages arising from your use of the Website.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="links">6. External Links</H2>
              <P>
                The Website may contain links to third-party websites (e.g., GitHub, LinkedIn). I am not responsible for
                third-party content, policies, or practices.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="changes">7. Changes to These Terms</H2>
              <P>
                These Terms may be updated from time to time. Changes will be posted on this page with an updated “Last
                updated” date. Continued use of the Website after changes indicates acceptance.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="law">8. Governing Law</H2>
              <P>
                These Terms are governed by the laws of {GOVERNING_LAW}, without regard to conflict of law principles.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="contact">9. Contact</H2>
              <P>
                If you have questions about these Terms, contact me at{' '}
                <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor>.
              </P>
            </section>

            <div className="pt-2">
              <div className="rounded-xl border border-black/10 bg-white/60 p-4 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">Quick note</p>
                <p className="mt-1">
                  This template is for general informational use and may not cover every legal requirement for your
                  specific situation. Consider professional advice for compliance needs.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10">
            Privacy Policy <span aria-hidden>→</span>
          </Link>

          <BackToTopButton />
        </div>
      </main>
    </Container>
  );
}
