import Link from 'next/link';
import { BackToTopButton } from '@/components/BackToTopButton';

const LAST_UPDATED = 'February 22, 2026'; // <-- update anytime
const CONTACT_EMAIL = 'louiscch314@gmail.com'; // <-- your email
const GOVERNING_REGION = 'Alberta, Canada'; // optional mention

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Subtle grid / glow */}
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

export default function PrivacyPage() {
  return (
    <Container>
      <header className="relative mx-auto w-full max-w-3xl mt-8 sm:mt-4 px-5 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Legal</Pill>
          <Pill>Privacy</Pill>
          <Pill>Last updated: {LAST_UPDATED}</Pill>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>

        <p className="mt-3 text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg">
          This policy explains what information is collected when you visit this website and how it is used.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10">
            ← Back to home
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 dark:border-white/10 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
            View Terms
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-3xl px-5 pb-16 pt-10 sm:px-6 sm:pb-24">
        {/* Table of contents */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <TocItem href="#intro" label="1. Introduction" />
          <TocItem href="#collect" label="2. Information We Collect" />
          <TocItem href="#use" label="3. How We Use Information" />
          <TocItem href="#cookies" label="4. Cookies & Analytics" />
          <TocItem href="#third" label="5. Third-Party Services" />
          <TocItem href="#security" label="6. Data Security" />
          <TocItem href="#retention" label="7. Data Retention" />
          <TocItem href="#rights" label="8. Your Rights" />
          <TocItem href="#links" label="9. External Links" />
          <TocItem href="#changes" label="10. Changes" />
          <TocItem href="#contact" label="11. Contact" />
          <TocItem href="#ai" label="12. AI Features Disclaimer" />
        </div>

        <Card>
          <div className="space-y-8">
            <section className="space-y-3">
              <H2 id="intro">1. Introduction</H2>
              <P>
                Welcome to my portfolio website (the “Website”). I respect your privacy and aim to be transparent about
                what information is collected and why. By using this Website, you agree to this Privacy Policy.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="collect">2. Information We Collect</H2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    a) Information you provide
                  </h3>
                  <P>If you contact me, you may provide:</P>
                  <Ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Message content you submit</li>
                  </Ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    b) Information collected automatically
                  </h3>
                  <P>Basic technical information may be collected automatically, such as:</P>
                  <Ul>
                    <li>IP address (often approximate location)</li>
                    <li>Browser/device information</li>
                    <li>Pages viewed and time spent</li>
                    <li>Referring/exit pages</li>
                  </Ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <H2 id="use">3. How We Use Information</H2>
              <Ul>
                <li>To respond to your messages or inquiries</li>
                <li>To maintain, improve, and troubleshoot the Website</li>
                <li>To understand usage trends and improve content</li>
              </Ul>
            </section>

            <section className="space-y-3">
              <H2 id="cookies">4. Cookies & Analytics</H2>
              <P>
                The Website may use cookies or similar technologies (for example, analytics) to understand traffic
                patterns and improve user experience. You can disable cookies in your browser settings; some features
                may be affected.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="third">5. Third-Party Services</H2>
              <P>
                The Website may be hosted and delivered through third-party providers (for example, hosting/CDN and
                analytics tools). These providers may process limited data as part of delivering the service.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="security">6. Data Security</H2>
              <P>
                Reasonable safeguards are used to protect your information. However, no internet transmission or storage
                method is completely secure, and absolute security cannot be guaranteed.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="retention">7. Data Retention</H2>
              <P>
                Personal information is retained only as long as needed for the purposes described above, or as required
                by law.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="rights">8. Your Rights</H2>
              <P>
                Depending on your location, you may have rights to access, correct, or delete your personal information,
                or withdraw consent where applicable. To request this, contact me at{' '}
                <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor>.
              </P>
              <P>Governing region reference (if helpful): {GOVERNING_REGION}.</P>
            </section>

            <section className="space-y-3">
              <H2 id="links">9. External Links</H2>
              <P>
                This Website may link to third-party sites (e.g., GitHub, LinkedIn). I am not responsible for their
                content or privacy practices. Please review their policies separately.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="changes">10. Changes to This Policy</H2>
              <P>
                This Privacy Policy may be updated periodically. Updates will be posted on this page with a revised
                “Last updated” date.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="contact">11. Contact</H2>
              <P>
                If you have questions about this policy, contact me at{' '}
                <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor>.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="ai">12. AI Features Disclaimer</H2>
              <P>
                If this Website includes AI-powered features, outputs are provided for informational purposes only and
                may be inaccurate. Please verify critical information independently.
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
            href="/terms"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10">
            Terms of Use <span aria-hidden>→</span>
          </Link>

          <BackToTopButton />
        </div>
      </main>
    </Container>
  );
}
