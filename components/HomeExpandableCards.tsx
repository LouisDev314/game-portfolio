'use client';

import { Layers, Crosshair } from 'lucide-react';
import { ExpandableCard, type CardItem } from '@/components/ExpandableCard';
import { ExtractionGame } from '@/components/ExtractionGame';
import TechStack from '@/components/TechStack';

const cards: CardItem[] = [
  {
    id: 'extraction',
    title: 'Extraction',
    description: 'Play a short run',
    icon: Crosshair,
    iconColor: 'text-amber-500',
    modalClassName: 'max-h-[90dvh] w-[min(90%,48rem)]',
    closeButtonClassName: 'right-16 sm:right-20',
    content: () => <ExtractionGame />,
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
