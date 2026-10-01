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
    id: 'play',
    title: 'Play',
    description: '30 seconds in orbit',
    icon: Crosshair,
    iconColor: 'text-amber-500',
    modalClassName: 'max-h-[90dvh] w-[min(90%,48rem)]',
    closeButtonClassName: 'right-7 top-7',
    content: () => <ArenaGame />,
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Overview',
    icon: Layers,
    iconColor: 'text-indigo-500',
    content: () => <TechStack />,
  },
];

export function HomeExpandableCards() {
  return <ExpandableCard cards={cards} className="flex-wrap justify-center gap-8 sm:gap-12 lg:justify-between" />;
}
