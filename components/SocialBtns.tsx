import Image from 'next/image';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site';

export default function SocialBtns({ className }: { className?: string }) {
  const SOCIALS = [
    {
      icon: <Image src="/linkedin-icon.svg" alt="" width={20} height={20} className="size-5" />,
      href: siteConfig.links.linkedIn,
      label: 'LinkedIn',
    },
  ];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {SOCIALS.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} profile (opens in a new tab)`}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-100 transition-colors">
          {icon}
        </a>
      ))}
    </div>
  );
}
