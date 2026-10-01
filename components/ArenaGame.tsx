'use client';

import { useEffect, useRef, useState } from 'react';
import { createArena, type ArenaSnapshot } from '@/lib/game/arena';

export default function ArenaGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof createArena> | null>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<ArenaSnapshot>({ status: 'ready', score: 0, remaining: 30 });
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const desktop = window.matchMedia('(min-width: 640px) and (hover: hover) and (pointer: fine)');
    function initialize() {
      if (!desktop.matches || !host || !('requestPointerLock' in HTMLElement.prototype)) {
        engineRef.current?.dispose();
        engineRef.current = null;
        setAvailable(false);
        setState({ status: 'ready', score: 0, remaining: 30 });
        return;
      }
      if (engineRef.current) return;
      try {
        engineRef.current = createArena(host, setState);
        setAvailable(true);
        setError('');
      } catch {
        setError('This browser could not start the arena. Try a browser with WebGL enabled.');
      }
    }
    initialize();
    desktop.addEventListener('change', initialize);
    return () => {
      desktop.removeEventListener('change', initialize);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (available && state.status !== 'playing') actionRef.current?.focus();
  }, [available, state.status]);

  const playing = state.status === 'playing';
  const ended = state.status === 'over' || state.status === 'complete';
  return (
    <section className="overflow-hidden rounded-2xl border border-amber-400/50 bg-neutral-950 text-neutral-100">
      <header className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 pr-16 sm:px-6 sm:pr-20">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Play <span className="ml-2 text-xs font-normal text-neutral-400">Orbit</span>
          </h2>
          <p className="mt-1 text-xs text-neutral-400">WASD · Mouse · Click to fire</p>
        </div>
      </header>
      <div className="relative h-[min(52dvh,28rem)] min-h-48 overflow-hidden bg-[#10151b]">
        <div ref={hostRef} className="absolute inset-0 [&_canvas]:block [&_canvas]:outline-none" />
        {playing && (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="relative size-4 text-neutral-200">
                <span className="absolute left-1/2 top-0 h-1 w-px bg-current" />
                <span className="absolute bottom-0 left-1/2 h-1 w-px bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-1 bg-current" />
                <span className="absolute right-0 top-1/2 h-px w-1 bg-current" />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-amber-300 opacity-0 [[data-feedback=shot]~&]:opacity-60 [[data-feedback=hit]~&]:opacity-60 motion-reduce:hidden"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 [[data-feedback=hit]~&]:opacity-100">
              <span className="text-lg text-amber-300">×</span>
            </div>
          </>
        )}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950/65 px-6 text-center">
            <p className="text-sm font-medium" role="status">
              {error ||
                (!available
                  ? 'Best played with mouse + keyboard'
                  : ended
                    ? state.status === 'complete'
                      ? '30 seconds. Arena cleared.'
                      : 'Caught.'
                    : state.status === 'paused'
                      ? 'Paused'
                      : state.status === 'error'
                        ? 'Graphics interrupted. Close and reopen to retry.'
                        : 'Stay moving. Survive 30 seconds.')}
              {ended && (
                <span className="mt-2 block text-3xl font-semibold tabular-nums">
                  {state.score} <span className="text-sm font-normal text-neutral-400">hits</span>
                </span>
              )}
            </p>
            {state.message && <p className="max-w-xs text-xs text-neutral-400">{state.message}</p>}
            {available && state.status !== 'error' && (
              <button
                ref={actionRef}
                data-autofocus
                type="button"
                onClick={() => engineRef.current?.start()}
                className="rounded-full bg-amber-400 px-7 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
                {ended ? 'Play Again' : state.status === 'paused' ? 'Resume' : 'Play'}
              </button>
            )}
          </div>
        )}
      </div>
      <footer className="flex items-center justify-between gap-3 px-5 py-4 text-xs text-neutral-400 sm:px-6">
        <span>
          Score <span className="ml-2 font-semibold tabular-nums text-neutral-100">{state.score}</span>
        </span>
        <span className="tabular-nums">{state.remaining}s</span>
        <span>Esc · exit{ended ? ' / R · restart' : ''}</span>
      </footer>
    </section>
  );
}
