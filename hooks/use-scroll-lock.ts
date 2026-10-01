'use client';

import { useEffect, useRef } from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';
let originalRootOverflow = '';
let originalRootOverscrollBehavior = '';
let originalRootTouchAction = '';

export const SCROLL_LOCK_CHANGE_EVENT = 'portfolio:scroll-lock-change';

export function isScrollLocked() {
  return lockCount > 0;
}

function lockBodyScroll() {
  if (typeof window === 'undefined') return;

  if (lockCount === 0) {
    const { body, documentElement } = document;
    const bodyStyle = body.style;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    originalOverflow = bodyStyle.overflow;
    originalPaddingRight = bodyStyle.paddingRight;
    originalRootOverflow = documentElement.style.overflow;
    originalRootOverscrollBehavior = documentElement.style.overscrollBehavior;
    originalRootTouchAction = documentElement.style.touchAction;

    bodyStyle.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';
    documentElement.style.overscrollBehavior = 'none';
    documentElement.style.touchAction = 'none';

    if (scrollbarWidth > 0) {
      const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      bodyStyle.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
  }

  lockCount += 1;
  if (lockCount === 1) window.dispatchEvent(new Event(SCROLL_LOCK_CHANGE_EVENT));
}

function unlockBodyScroll() {
  if (typeof window === 'undefined' || lockCount === 0) return;

  lockCount -= 1;

  if (lockCount === 0) {
    const bodyStyle = document.body.style;

    bodyStyle.overflow = originalOverflow;
    bodyStyle.paddingRight = originalPaddingRight;
    document.documentElement.style.overflow = originalRootOverflow;
    document.documentElement.style.overscrollBehavior = originalRootOverscrollBehavior;
    document.documentElement.style.touchAction = originalRootTouchAction;
    originalOverflow = '';
    originalPaddingRight = '';
    window.dispatchEvent(new Event(SCROLL_LOCK_CHANGE_EVENT));
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
