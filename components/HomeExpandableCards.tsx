'use client';

import { Layers, Crosshair } from 'lucide-react';
import { ExpandableCard, type CardItem } from '@/components/ExpandableCard';
import dynamic from 'next/dynamic';

const ArenaGame = dynamic(() => import('@/components/ArenaGame'), {
  ssr: false,
  loading: () => (
    <p className="p-8 text-sm text-neutral-500" role="status">
      Loading arena…
    </p>
  ),
});
import TechStack from '@/components/TechStack';

const cards: CardItem[] = [
  {
    id: 'skills',
    title: 'Skills',
    description: 'Overview',
    icon: Layers,
    iconColor: 'text-indigo-500',
    content: () => <TechStack />,
  },
  {
    id: 'play',
    title: 'Mini Game',
    description: 'Orbit - Arena FPS',
    icon: Crosshair,
    iconColor: 'text-amber-500',
    modalClassName: 'h-[min(70dvh,30rem)] max-h-[90dvh] w-[92vw] max-w-[100rem] sm:h-[86dvh]',
    closeButtonClassName: 'right-7 top-7',
    content: () => <ArenaGame />,
  },
];

export function HomeExpandableCards() {
  return <ExpandableCard cards={cards} className="flex-wrap justify-center gap-8 sm:gap-12 lg:justify-between" />;
}
