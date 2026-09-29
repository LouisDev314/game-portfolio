'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, ExternalLink, User, Code, FileText, Handshake, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import { siteConfig } from '@/lib/site';
import { useScrollLock } from '@/hooks/use-scroll-lock';

const NAV_SECTIONS = [
  {
    items: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'About Me', href: '/about', icon: User },
      { name: 'Projects', href: '/projects', icon: Code },
      { name: 'Blogs', href: '/blogs', icon: FileText },
    ],
  },
  {
    items: [
      { name: 'Privacy Policy', href: '/privacy', icon: ScrollText },
      { name: 'Terms & Conditions', href: '/terms', icon: Handshake },
    ],
  },
];

export function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // IMPORTANT: use pointerdown so it closes before "click" happens
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          'fixed top-4 left-1/2 z-[9999] w-1/3 -translate-x-1/2 justify-center lg:hidden',
          open ? 'w-full' : 'w-[14.25rem]',
        )}
        ref={ref}>
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'overflow-hidden border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900',
            open ? 'mx-4 rounded-3xl' : 'mx-0 rounded-full',
          )}>
          {/* Pill header — always visible */}
          <div className="flex h-12 items-center justify-between px-4 py-6">
            <div className="flex gap-3 justify-between items-center w-full">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex flex-1 items-center gap-3 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                aria-expanded={open}
                aria-label="Toggle navigation menu">
                <span className="size-8">
                  <Image
                    src="/portfolio-logo.webp"
                    alt="Louis Chan portfolio logo"
                    width={32}
                    height={32}
                    priority
                    className="size-8 rounded-full border border-amber-400 object-cover dark:border-0"
                  />
                </span>

                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Louis Chan</span>
              </button>

              <ThemeToggleBtn />
            </div>
          </div>

          {/* Drawer content */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden">
                <div className="px-4 pb-3 pt-2">
                  {NAV_SECTIONS.map((section, si) => (
                    <div key={si}>
                      {si > 0 && <div className="my-2 border-t border-neutral-100 dark:border-neutral-800" />}
                      {section.items.map((item) => {
                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'flex items-center gap-3 rounded-xl h-12 mb-1 px-4 py-2 text-sm transition-colors',
                              isActive
                                ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
                            )}>
                            {isActive && <Icon className="size-5 text-amber-400 shrink-0" />}
                            {!isActive && <Icon className="size-5 shrink-0" />}
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  ))}

                  {/* Spacer + CTA */}
                  <div className="space-y-1.5 mt-2 mb-3">
                    <a
                      href={siteConfig.links.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect with Louis Chan on LinkedIn (opens in a new tab)"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors">
                      <div className="flex flex-row items-center">
                        <p>Connect Now</p>
                        <ExternalLink className="size-4 ml-2" />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
