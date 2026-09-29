import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SocialBtns from '@/components/SocialBtns';
import { projects } from '@/lib/projects';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: 'General',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blogs', href: '/blogs' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Me', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Projects',
    links: projects.flatMap((project) =>
      project.liveUrl ? [{ label: project.name, href: project.liveUrl, external: true }] : [],
    ),
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export default function Footer({ homeOverlap = false }: { homeOverlap?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'mt-0 border-t border-neutral-200 bg-white dark:border-neutral-800/60 dark:bg-neutral-950',
        homeOverlap ? '-mt-16' : 'mt-24',
      )}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center gap-2">
          <div className="size-8">
            <Image
              src="/portfolio-logo.webp"
              alt="My portfolio logo"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Louis Chan</span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:max-w-lg md:max-w-2xl mt-6 mb-12">
          Building at the edge of possibility, where ideas become systems and systems shape what’s next. Each line of
          code moves the world forward —{' '}
          <span className="whitespace-nowrap italic text-amber-500 dark:text-amber-400">sic itur ad astra</span>.
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:gap-x-12">
          {footerGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-base font-medium tracking-wide text-neutral-500">{group.title}</h3>
              <ul className="flex flex-col space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:text-white">
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800/60 sm:flex-row sm:items-center md:items-center">
          <p className="text-sm text-neutral-500">© {year} Louis Chan. All rights reserved.</p>
          <SocialBtns className="mt-0" />
        </div>
      </div>
    </footer>
  );
}
