export interface Project {
  id: string;
  name: string;
  slug: string;
  tags: string[];
  description: string;
  highlights: string[];
  video: string;
  poster: string;
  liveUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  engine?: string;
}

const placeholderVideo = '/lastremains-home.mp4';

export const projects: Project[] = [
  {
    id: '3',
    name: 'Last Remains',
    slug: 'last-remains',
    tags: ['Project Management', 'Production'],
    description: 'A 30+ player PvEvP zombie extraction game about scavenging, surviving, and escaping.',
    highlights: [
      'Production planning and milestone tracking',
      'Provided design feedback from playtests',
      'Coordinated across art, design, development, and marketing',
    ],
    video: placeholderVideo,
    poster: '/lastremains.webp',
    engine: 'Unreal Engine 5',
  },
];
