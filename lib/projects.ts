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
    description:
      'A 30+ player PvEvP zombie extraction game where survivors scavenge resources, evade the undead, outplay rival players, and fight to extract alive.',
    highlights: [
      'Managed production planning and milestone tracking',
      'Coordinated work across design, art, and development',
      'Helped align team priorities around the core extraction experience',
    ],
    video: placeholderVideo,
    poster: '/lastremains.webp',
    engine: 'Unreal Engine 5',
    liveUrl: 'https://www.mylastday.xyz',
    repoUrl: 'https://github.com/LouisDev314/my-last-day',
  },
  {
    id: '1',
    name: 'Paper Bridge',
    slug: 'paper-bridge',
    tags: ['Software Development', 'AI Systems'],
    description:
      'AI/RAG document intelligence platform for extracting, searching, and asking grounded questions across PDFs.',
    highlights: [
      'PDF ingestion with schema-enforced extraction',
      'pgvector retrieval and citation-grounded Q&A',
      'FastAPI backend architecture for production workflows',
    ],
    video: placeholderVideo,
    poster: '/paper-bridge-logo.webp',
    liveUrl: 'https://paper-bridge.vercel.app/dashboard',
    demoUrl: 'https://youtu.be/3FmdrRM75Io',
    repoUrl: 'https://github.com/LouisDev314/paper-bridge',
  },
  {
    id: '2',
    name: 'PopBox Studio',
    slug: 'popbox-studio',
    tags: ['Software Development', 'Production'],
    description:
      'Production anime collectibles commerce platform with a real storefront, checkout, inventory, and admin flow.',
    highlights: [
      'SSR storefront with Stripe checkout and guest checkout',
      'Inventory reservations backed by PostgreSQL/Supabase',
      'Admin workflows for production-ready order management',
    ],
    video: placeholderVideo,
    poster: '/store-logo.png',
    liveUrl: 'https://www.popboxstudio.com/',
    repoUrl: 'https://github.com/LouisDev314/popbox-studio-next',
  },
];
