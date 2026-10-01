'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Backpack, ShieldAlert } from 'lucide-react';

type Status = 'playing' | 'extracted' | 'overrun';
type Route = 'quiet' | 'cache';

const routes = {
  quiet: { supplies: 1, minThreat: 14, threatRange: 9 },
  cache: { supplies: 3, minThreat: 30, threatRange: 17 },
} as const;

export function ExtractionGame() {
  const [status, setStatus] = useState<Status>('playing');
  const [supplies, setSupplies] = useState(0);
  const [threat, setThreat] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState('The route is quiet. Choose your first move.');
  const searchRef = useRef<HTMLButtonElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === 'playing') searchRef.current?.focus();
    else restartRef.current?.focus();
  }, [status]);

  function search(route: Route) {
    if (status !== 'playing') return;

    const choice = routes[route];
    const nextThreat = threat + choice.minThreat + Math.floor(Math.random() * choice.threatRange);

    if (nextThreat >= 100) {
      setThreat(100);
      setSupplies(0);
      setStatus('overrun');
      setMessage('The horde caught up. Your supplies were lost.');
      return;
    }

    setThreat(nextThreat);
    setSupplies((current) => current + choice.supplies);
    setMessage(
      route === 'quiet'
        ? 'Quiet sweep: +1 supply. You can hear the horde getting closer.'
        : 'Cache secured: +3 supplies. The noise draws the horde nearer.',
    );
  }

  function extract() {
    if (status !== 'playing' || supplies === 0) return;
    setStatus('extracted');
    setBest((current) => Math.max(current, supplies));
    setMessage(`Extracted with ${supplies} ${supplies === 1 ? 'supply' : 'supplies'}. Safe, but could you carry more?`);
  }

  function restart() {
    setStatus('playing');
    setSupplies(0);
    setThreat(0);
    setMessage('The route is quiet. Choose your first move.');
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-400/80 bg-white text-neutral-900 dark:border-amber-400/40 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="relative h-36 overflow-hidden bg-neutral-800 sm:h-44">
        <div
          className="absolute inset-0 bg-cover bg-[center_61%]"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(10,10,10,.82), rgba(10,10,10,.10)), url('/lastremains.webp')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-5 bottom-4 text-white sm:inset-x-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Last Remains · field prototype
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Extraction Run</h2>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-8">
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Search for supplies, then extract before the horde reaches you. Push for a bigger haul or leave safely.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <Backpack className="size-4" aria-hidden="true" /> Supplies
            </div>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{supplies}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <ShieldAlert className="size-4" aria-hidden="true" /> Horde threat
            </div>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{threat}%</p>
          </div>
        </div>

        <div
          aria-label={`Horde threat ${threat} percent`}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={threat}
          className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-amber-400 transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${threat}%` }}
          />
        </div>

        <p className="min-h-10 text-sm font-medium leading-relaxed" role="status" aria-live="polite">
          {message}
        </p>

        {status === 'playing' ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              ref={searchRef}
              type="button"
              data-autofocus
              onClick={() => search('quiet')}
              className="rounded-xl border border-neutral-300 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 motion-reduce:transition-none dark:border-neutral-700 dark:hover:bg-neutral-900">
              Quiet sweep{' '}
              <span className="block text-xs font-normal text-neutral-500 dark:text-neutral-400">
                +1 supply · low threat
              </span>
            </button>
            <button
              type="button"
              onClick={() => search('cache')}
              className="rounded-xl border border-amber-400 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 motion-reduce:transition-none dark:border-amber-400/60 dark:hover:bg-amber-400/10">
              Raid the cache{' '}
              <span className="block text-xs font-normal text-neutral-500 dark:text-neutral-400">
                +3 supplies · high threat
              </span>
            </button>
            <button
              type="button"
              onClick={extract}
              disabled={supplies === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300 sm:col-span-2">
              Extract with {supplies} {supplies === 1 ? 'supply' : 'supplies'}{' '}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            ref={restartRef}
            type="button"
            onClick={restart}
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 motion-reduce:transition-none dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300">
            Try another run
          </button>
        )}

        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
          Best extraction: {best} · A small risk / reward study inspired by my Last Remains work
        </p>
      </div>
    </div>
  );
}
