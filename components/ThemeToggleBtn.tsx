import { useThemeRipple } from '@/components/ThemeRippleProvider';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggleBtn() {
  const { resolvedTheme } = useTheme();
  const { toggleThemeWithRipple } = useThemeRipple();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleThemeWithRipple}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex size-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors">
      {isDark ? <Sun className="size-5 text-amber-400" /> : <Moon className="size-5" />}
    </button>
  );
}
