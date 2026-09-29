'use client';
import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useLocalTime } from '@/hooks/use-local-time';
import { TimeChip } from './TimeChip';

const World = dynamic(() => import('../components/ui/globe').then((m) => m.World), {
  ssr: false,
});

export function Globe() {
  const time = useLocalTime('America/Edmonton'); // Calgary timezone

  const ARC_COLORS = {
    primary: '#3b82f6',
    accent: '#06b6d4',
    indigo: '#6366f1',
  } as const;

  type Arc = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
  };

  const CALGARY = { lat: 51.0447, lng: -114.0719 };

  // North America
  const VANCOUVER = { lat: 49.2827, lng: -123.1207 };
  const TORONTO = { lat: 43.6532, lng: -79.3832 };
  const MEXICO_CITY = { lat: 19.4326, lng: -99.1332 };
  const SAN_FRANCISCO = { lat: 37.7749, lng: -122.4194 };
  const LOS_ANGELES = { lat: 34.0522, lng: -118.2437 };
  const AUSTIN = { lat: 30.2672, lng: -97.7431 };
  const CHICAGO = { lat: 41.8781, lng: -87.6298 };
  const NEW_YORK = { lat: 40.7128, lng: -74.006 };

  // South America
  const SAO_PAULO = { lat: -23.5558, lng: -46.6396 };
  const BUENOS_AIRES = { lat: -34.6037, lng: -58.3816 };
  const SANTIAGO = { lat: -33.4489, lng: -70.6693 };

  // Europe
  const LONDON = { lat: 51.5072, lng: -0.1276 };
  const PARIS = { lat: 48.8566, lng: 2.3522 };
  const BERLIN = { lat: 52.52, lng: 13.405 };
  const AMSTERDAM = { lat: 52.3676, lng: 4.9041 };
  const MADRID = { lat: 40.4168, lng: -3.7038 };
  const STOCKHOLM = { lat: 59.3293, lng: 18.0686 };
  const ISTANBUL = { lat: 41.0082, lng: 28.9784 };

  // Africa
  const LAGOS = { lat: 6.5244, lng: 3.3792 };
  const NAIROBI = { lat: -1.2921, lng: 36.8219 };
  const CAPE_TOWN = { lat: -33.9249, lng: 18.4241 };

  // Middle East
  const DUBAI = { lat: 25.2048, lng: 55.2708 };
  const TEL_AVIV = { lat: 32.0853, lng: 34.7818 };

  // Asia
  const HONG_KONG = { lat: 22.3193, lng: 114.1694 };
  const SINGAPORE = { lat: 1.3521, lng: 103.8198 };
  const TOKYO = { lat: 35.6762, lng: 139.6503 };
  const SEOUL = { lat: 37.5665, lng: 126.978 };
  const BANGALORE = { lat: 12.9716, lng: 77.5946 };
  const MUMBAI = { lat: 19.076, lng: 72.8777 };
  const SHANGHAI = { lat: 31.2304, lng: 121.4737 };

  // Oceania
  const SYDNEY = { lat: -33.8688, lng: 151.2093 };
  const MELBOURNE = { lat: -37.8136, lng: 144.9631 };
  const AUCKLAND = { lat: -36.8485, lng: 174.7633 };

  function makeArc(
    order: number,
    from: { lat: number; lng: number },
    to: { lat: number; lng: number },
    arcAlt: number,
    color: string,
  ): Arc {
    return {
      order,
      startLat: from.lat,
      startLng: from.lng,
      endLat: to.lat,
      endLng: to.lng,
      arcAlt,
      color,
    };
  }

  const sampleArcs = useMemo<Arc[]>(() => {
    const arcs: Arc[] = [];
    let i = 1;

    const add = (from: { lat: number; lng: number }, to: { lat: number; lng: number }, arcAlt: number, color: string) =>
      arcs.push(makeArc(i++, from, to, arcAlt, color));

    // Calgary -> global (primary story)
    add(CALGARY, VANCOUVER, 0.1, ARC_COLORS.accent);
    add(CALGARY, TORONTO, 0.14, ARC_COLORS.primary);
    add(CALGARY, SAN_FRANCISCO, 0.18, ARC_COLORS.accent);
    add(CALGARY, LOS_ANGELES, 0.2, ARC_COLORS.indigo);
    add(CALGARY, AUSTIN, 0.17, ARC_COLORS.primary);
    add(CALGARY, CHICAGO, 0.16, ARC_COLORS.indigo);
    add(CALGARY, NEW_YORK, 0.16, ARC_COLORS.indigo);
    add(CALGARY, MEXICO_CITY, 0.22, ARC_COLORS.accent);

    add(CALGARY, LONDON, 0.3, ARC_COLORS.primary);
    add(CALGARY, PARIS, 0.29, ARC_COLORS.accent);
    add(CALGARY, AMSTERDAM, 0.28, ARC_COLORS.indigo);
    add(CALGARY, BERLIN, 0.3, ARC_COLORS.primary);
    add(CALGARY, MADRID, 0.27, ARC_COLORS.accent);
    add(CALGARY, STOCKHOLM, 0.31, ARC_COLORS.indigo);
    add(CALGARY, ISTANBUL, 0.33, ARC_COLORS.primary);

    add(CALGARY, DUBAI, 0.36, ARC_COLORS.accent);
    add(CALGARY, TEL_AVIV, 0.34, ARC_COLORS.indigo);

    add(CALGARY, LAGOS, 0.35, ARC_COLORS.primary);
    add(CALGARY, NAIROBI, 0.36, ARC_COLORS.accent);
    add(CALGARY, CAPE_TOWN, 0.38, ARC_COLORS.indigo);

    add(CALGARY, HONG_KONG, 0.32, ARC_COLORS.primary);
    add(CALGARY, SHANGHAI, 0.34, ARC_COLORS.accent);
    add(CALGARY, TOKYO, 0.36, ARC_COLORS.indigo);
    add(CALGARY, SEOUL, 0.35, ARC_COLORS.primary);
    add(CALGARY, SINGAPORE, 0.34, ARC_COLORS.accent);
    add(CALGARY, BANGALORE, 0.37, ARC_COLORS.indigo);
    add(CALGARY, MUMBAI, 0.36, ARC_COLORS.primary);

    add(CALGARY, SYDNEY, 0.4, ARC_COLORS.accent);
    add(CALGARY, MELBOURNE, 0.4, ARC_COLORS.indigo);
    add(CALGARY, AUCKLAND, 0.42, ARC_COLORS.primary);

    // Inter-hub arcs (makes it feel like a real network, not only Calgary spokes)
    add(NEW_YORK, LONDON, 0.28, ARC_COLORS.accent);
    add(SAN_FRANCISCO, TOKYO, 0.33, ARC_COLORS.primary);
    add(LONDON, DUBAI, 0.3, ARC_COLORS.indigo);
    add(SINGAPORE, SYDNEY, 0.28, ARC_COLORS.accent);
    add(HONG_KONG, SINGAPORE, 0.18, ARC_COLORS.primary);
    add(PARIS, ISTANBUL, 0.22, ARC_COLORS.indigo);
    add(SAO_PAULO, LAGOS, 0.33, ARC_COLORS.primary);
    add(SAO_PAULO, MADRID, 0.3, ARC_COLORS.accent);

    // South America (optional, but adds “global” feel)
    add(CALGARY, SAO_PAULO, 0.33, ARC_COLORS.indigo);
    add(CALGARY, BUENOS_AIRES, 0.36, ARC_COLORS.primary);
    add(CALGARY, SANTIAGO, 0.34, ARC_COLORS.accent);

    return arcs;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Data is static and makeArc is stable
  }, []);

  const globeConfig = {
    pointSize: 4,
    globeColor: '#3e454c',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.1,
    emissive: '#062056',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.7)',
    ambientLight: '#38bdf8',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 1,
    initialPosition: { lat: 51.0447, lng: -114.0719 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <div className="no-scrollbar relative w-full h-full rounded-3xl bg-white border border-amber-400 dark:bg-black overflow-hidden">
      {/* subtle frame glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10" />

      {/* top gradient for readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 z-20" />

      {/* content */}
      <div className="relative z-30 h-full w-full px-6 pt-8 pb-6 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Building without borders
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              Working across time zones
            </span>
            <TimeChip label={`Calgary · ${time} (MT)`} />
          </div>
        </motion.div>

        {/* Globe stage (fits globe completely) */}
        <div className="relative flex-1 min-h-0">
          {/* bottom fade (smaller so it doesn't mask the globe) */}
          <div className="pointer-events-none absolute md:-mb-6 inset-x-0 bottom-0 h-14 dark:h-16 bg-gradient-to-t from-white to-transparent dark:from-black z-20" />

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {/* Make a square stage so the globe can fit */}
            <div className="aspect-square w-full sm:w-4/5 md:w-128 sm:translate-y-8">
              <div className="h-full w-full origin-center">
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
