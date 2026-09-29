import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { JSX } from 'react';

const PHOTOS = [
  { src: '/carousel/1.webp', alt: 'Louis Chan portfolio photo 1' },
  { src: '/carousel/2.webp', alt: 'Louis Chan portfolio photo 2' },
  { src: '/carousel/3.webp', alt: 'Louis Chan portfolio photo 3' },
  { src: '/carousel/4.webp', alt: 'Louis Chan portfolio photo 4' },
  { src: '/carousel/5.webp', alt: 'Louis Chan portfolio photo 5' },
  { src: '/carousel/6.webp', alt: 'Louis Chan portfolio photo 6' },
  { src: '/carousel/7.webp', alt: 'Louis Chan portfolio photo 7' },
  { src: '/carousel/8.webp', alt: 'Louis Chan portfolio photo 8' },
];

export default function InfinitePicturesCarousel({ className }: { className?: string }): JSX.Element {
  return (
    <div className={className}>
      <InfiniteMovingCards items={PHOTOS} direction="right" speed="normal" />
    </div>
  );
}
