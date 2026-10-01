'use client';

import { useEffect, useRef, useState } from 'react';
import type { createArena, ArenaSnapshot } from '@/lib/game/arena';

function statusText(state: ArenaSnapshot, available: boolean, error: string) {
  if (error) return error;
  if (!available) return 'Best played with mouse + keyboard';
  switch (state.status) {
    case 'complete':
      return 'Survived. 30 seconds complete.';
    case 'over':
      return 'Run ended.';
    case 'paused':
      return 'Paused';
    case 'error':
      return 'Graphics interrupted. Close and reopen to retry.';
    default:
      return 'Stay moving. Survive 30 seconds.';
  }
}

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
    let generation = 0;
    async function initialize() {
      const current = ++generation;
      if (!desktop.matches || !host || !('requestPointerLock' in HTMLElement.prototype)) {
        engineRef.current?.dispose();
        engineRef.current = null;
        setAvailable(false);
        setState({ status: 'ready', score: 0, remaining: 30 });
        return;
      }
      if (engineRef.current) return;
      try {
        // The engine (and Three.js) is fetched only for an open desktop arena.
        const { createArena } = await import('@/lib/game/arena');
        if (current !== generation) return;
        engineRef.current = createArena(host, setState);
        setAvailable(true);
        setError('');
      } catch {
        if (current !== generation) return;
        setError('This browser could not start the arena. Try a browser with WebGL enabled.');
      }
    }
    initialize();
    desktop.addEventListener('change', initialize);
    return () => {
      generation++;
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
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-amber-400/50 bg-neutral-950 text-neutral-100">
      <header className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 pr-16 sm:px-6 sm:pr-20">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Play <span className="ml-2 text-xs font-normal text-neutral-400">Orbit</span>
          </h2>
          <p className="mt-1 text-xs text-neutral-400">WASD · Mouse · Hold to fire · Tab to pause</p>
        </div>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#10151b]">
        <div ref={hostRef} className="absolute inset-0 [&_canvas]:block [&_canvas]:outline-none" />
        {playing && (
          <>
            <div
              className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 text-center text-xs font-semibold tracking-widest text-amber-300"
              role="status">
              {state.pressure === 'danger'
                ? 'MOVE NOW · FLOOR PULSE'
                : state.pressure === 'warning'
                  ? 'MOVE · FLOOR CHARGING'
                  : ''}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-items-center text-neutral-200 [[data-feedback=shot]~&]:text-amber-200">
              <div className="relative size-4">
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
              {statusText(state, available, error)}
              {ended && (
                <span className="mt-2 block text-3xl font-semibold tabular-nums">
                  {state.score} <span className="text-sm font-normal text-neutral-400">hits</span>
                </span>
              )}
            </p>
            {state.message && <p className="max-w-xs text-xs text-neutral-400">{state.message}</p>}
            {state.status === 'ready' && available && (
              <p className="max-w-sm text-xs text-neutral-400">
                One hit ends the run. The floor charges if you stay in one area — move away to clear it.
              </p>
            )}
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
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-neutral-400 sm:px-6">
        <span>
          Score <span className="ml-2 font-semibold tabular-nums text-neutral-100">{state.score}</span>
        </span>
        <span className="tabular-nums">
          {state.remaining}s{' '}
          <span className="ml-2 text-amber-200">
            {playing
              ? state.remaining > 20
                ? 'Settle in'
                : state.remaining > 10
                  ? 'Pressure rising'
                  : 'Final push'
              : ''}
          </span>
        </span>
        <span>Esc · exit{ended ? ' / R · restart' : ''}</span>
      </footer>
    </section>
  );
}
