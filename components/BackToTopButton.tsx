'use client';

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10">
      Back to top <span aria-hidden>↑</span>
    </button>
  );
}
