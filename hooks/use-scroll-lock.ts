'use client';

import { useEffect, useRef } from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function lockBodyScroll() {
  if (typeof window === 'undefined') return;

  if (lockCount === 0) {
    const { body, documentElement } = document;
    const bodyStyle = body.style;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    originalOverflow = bodyStyle.overflow;
    originalPaddingRight = bodyStyle.paddingRight;

    bodyStyle.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      bodyStyle.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

function unlockBodyScroll() {
  if (typeof window === 'undefined' || lockCount === 0) return;

  lockCount -= 1;

  if (lockCount === 0) {
    const bodyStyle = document.body.style;

    bodyStyle.overflow = originalOverflow;
    bodyStyle.paddingRight = originalPaddingRight;
    originalOverflow = '';
    originalPaddingRight = '';
  }
}

export function useScrollLock(locked: boolean) {
  const ownsLock = useRef(false);

  useEffect(() => {
    if (locked && !ownsLock.current) {
      lockBodyScroll();
      ownsLock.current = true;
    }

    if (!locked && ownsLock.current) {
      unlockBodyScroll();
      ownsLock.current = false;
    }

    return () => {
      if (ownsLock.current) {
        unlockBodyScroll();
        ownsLock.current = false;
      }
    };
  }, [locked]);
}
