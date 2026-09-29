'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <span className="theme-toggle theme-toggle-placeholder" aria-hidden="true" />;
  }

  const dark = resolvedTheme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark ? <Sun size={19} strokeWidth={1.8} aria-hidden="true" /> : <Moon size={19} strokeWidth={1.8} aria-hidden="true" />}
    </button>
  );
}
