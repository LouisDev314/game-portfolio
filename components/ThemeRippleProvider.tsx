'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface ThemeRippleContextType {
  toggleThemeWithRipple: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setThemeWithRipple: (theme: string, rect?: DOMRect) => void;
}

const ThemeRippleContext = createContext<ThemeRippleContextType | undefined>(undefined);

export function useThemeRipple() {
  const context = useContext(ThemeRippleContext);
  if (!context) {
    throw new Error('useThemeRipple must be used within a ThemeRippleProvider');
  }
  return context;
}

export function ThemeRippleProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeChange = useCallback(
    (nextTheme: string, rect?: DOMRect) => {
      // 1) Reduced motion check
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !rect) {
        setTheme(nextTheme);
        return;
      }

      // 2) Create overlay
      const isIncomingDark = nextTheme === 'dark';
      const overlay = document.createElement('div');

      // We want the overlay to look like the *incoming* theme base background
      overlay.style.backgroundColor = isIncomingDark ? '#0a0a0a' : '#fafafa';
      overlay.style.position = 'fixed';
      overlay.style.borderRadius = '50%';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '9998'; // Below Navbar which we'll update to 9999

      // 3) Calculate parameters
      const startRadius = 12; // Start small from the center of the button
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      overlay.style.width = `${startRadius * 2}px`;
      overlay.style.height = `${startRadius * 2}px`;
      overlay.style.left = `${cx}px`;
      overlay.style.top = `${cy}px`;
      // Center the circle on (cx, cy)
      overlay.style.transform = 'translate(-50%, -50%) scale(1)';

      document.body.appendChild(overlay);

      // Max distance to viewport corners
      const maxDx = Math.max(cx, window.innerWidth - cx);
      const maxDy = Math.max(cy, window.innerHeight - cy);
      const maxRadius = Math.hypot(maxDx, maxDy);

      // Calculate how much we need to scale the circle to cover the viewport
      const endScale = Math.ceil(maxRadius / startRadius);

      // 4) Animate overlay
      const animation = overlay.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(-50%, -50%) scale(${endScale})`, opacity: 1 },
        ],
        {
          duration: 520,
          easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );

      // apply theme early during the ripple
      setTimeout(() => {
        setTheme(nextTheme);
      }, 100);

      // 5) Remove overlay after animation
      animation.onfinish = () => {
        const fadeOut = overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: 'forwards' });
        fadeOut.onfinish = () => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        };
      };
    },
    [setTheme],
  );

  const toggleThemeWithRipple = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      handleThemeChange(nextTheme, rect);
    },
    [resolvedTheme, handleThemeChange],
  );

  const setThemeWithRipple = useCallback(
    (theme: string, rect?: DOMRect) => {
      handleThemeChange(theme, rect);
    },
    [handleThemeChange],
  );

  return (
    <ThemeRippleContext.Provider value={{ toggleThemeWithRipple, setThemeWithRipple }}>
      {children}
    </ThemeRippleContext.Provider>
  );
}
