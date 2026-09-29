'use client';

import { useId, useMemo, useState } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { cn } from '@/lib/utils';

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

const initParticles = (engine: Engine) => loadSlim(engine);

export function SparklesCore({
  id,
  className,
  background = 'transparent',
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = '#ffffff',
  particleDensity = 80,
}: ParticlesProps) {
  const generatedId = useId();
  const [loaded, setLoaded] = useState(false);
  const options = useMemo<ISourceOptions>(
    () => ({
      background: { color: background },
      fullScreen: { enable: false },
      fpsLimit: 30,
      detectRetina: true,
      particles: {
        color: { value: particleColor },
        move: { enable: true, direction: 'none', random: true, speed: { min: 0.1, max: 1 }, outModes: { default: 'out' } },
        number: { value: Math.min(particleDensity, 80), density: { enable: true, width: 400, height: 400 } },
        opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true, speed } },
        shape: { type: 'circle' },
        size: { value: { min: minSize, max: maxSize } },
      },
    }),
    [background, minSize, maxSize, speed, particleColor, particleDensity],
  );

  return (
    <ParticlesProvider init={initParticles}>
      <div className={cn('transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}>
        <Particles id={id ?? generatedId} className="h-full w-full" options={options} particlesLoaded={() => setLoaded(true)} />
      </div>
    </ParticlesProvider>
  );
}
