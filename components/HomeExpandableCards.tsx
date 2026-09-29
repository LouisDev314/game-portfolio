'use client';

import { Layers, MapPin } from 'lucide-react';
import { ExpandableCard, type CardItem } from '@/components/ExpandableCard';
import { Globe } from '@/components/Globe';
import TechStack from '@/components/TechStack';

const cards: CardItem[] = [
  {
    id: 'canada',
    title: 'Location',
    description: 'Based in Canada',
    icon: MapPin,
    iconColor: 'text-red-600',
    content: () => <Globe />,
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
  return <ExpandableCard cards={cards} className="lg:justify-between" />;
}
