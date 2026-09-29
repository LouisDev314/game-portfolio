'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Writing', href: '#writing' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const controls = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'));
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link href="#top" className="brand" aria-label="Louis Chan, back to top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">LC<span className="brand-mark-dot">.</span></span>
          <span className="brand-copy">LOUIS CHAN<span>GAME DESIGN PORTFOLIO</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="header-contact" href="mailto:louiscch314@gmail.com">
            Contact <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={triggerRef}
            className="mobile-menu-button"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav" id="mobile-nav" ref={menuRef}>
          <nav aria-label="Mobile navigation" className="page-shell mobile-nav-inner">
            {links.map((link, index) => (
              <Link
                key={link.label}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span><ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
