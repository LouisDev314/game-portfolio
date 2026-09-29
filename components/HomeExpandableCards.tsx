'use client';

import { Layers, MapPin } from 'lucide-react';
import { ExpandableCard, type CardItem } from '@/components/ExpandableCard';
import { Globe } from '@/components/Globe';
import TechStack from '@/components/TechStack';

const cards: CardItem[] = [
  {
    id: 'canada',
    title: 'Based in Canada',
    description: 'Remote',
    icon: MapPin,
    iconColor: 'text-red-600',
    content: () => <Globe />,
  },
  {
    id: 'tech-stack',
    title: 'Tech Stack',
    description: 'Skill set',
    icon: Layers,
    iconColor: 'text-indigo-500',
    content: () => <TechStack />,
  },
];

export function HomeExpandableCards() {
  return <ExpandableCard cards={cards} />;
}
