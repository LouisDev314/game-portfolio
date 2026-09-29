export interface Project {
  id: string;
  name: string;
  description: string;
  highlights?: string[];
  imgUrl: string;
  techs: string[];
  liveUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Paper Bridge',
    description:
      'AI/RAG document intelligence platform for extracting, searching, and asking grounded questions across PDFs.',
    highlights: [
      'PDF ingestion with schema-enforced extraction',
      'pgvector retrieval and citation-grounded Q&A',
      'FastAPI backend architecture for production workflows',
    ],
    imgUrl: '/paper-bridge-logo.webp',
    techs: [
      'Python',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'pgvector',
      'Supabase',
      'OpenAI API',
      'Embeddings',
      'RAG',
    ],
    liveUrl: 'https://paper-bridge.vercel.app/dashboard',
    demoUrl: 'https://youtu.be/3FmdrRM75Io',
    repoUrl: 'https://github.com/LouisDev314/paper-bridge',
  },
  {
    id: '2',
    name: 'PopBox Studio',
    description:
      'Production anime collectibles commerce platform with a real storefront, checkout, inventory, and admin flow.',
    highlights: [
      'SSR storefront with Stripe checkout and guest checkout',
      'Inventory reservations backed by PostgreSQL/Supabase',
      'Admin workflows for production-ready order management',
    ],
    imgUrl: '/store-logo.png',
    techs: [
      'Next.js',
      'Node.js',
      'Drizzle',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Docker',
      'Stripe',
      'GitHub Actions (CI/CD)',
      'TanStack Query',
    ],
    liveUrl: 'https://www.popboxstudio.com/',
    repoUrl: 'https://github.com/LouisDev314/popbox-studio-next',
  },
  {
    id: '3',
    name: 'Last Remains',
    description:
      'A 30+ player PvEvP zombie extraction game where survivors scavenge, avoid the undead, outplay rivals, and fight to extract alive.',
    highlights: [
      'Managed project planning and production coordination across a cross-functional game team',
      'Supported development of the PvEvP extraction loop spanning stealth, scavenging, survival, and player conflict',
      'Helped align design, art, and development work to keep features and milestones moving toward release',
    ],
    imgUrl: '/lastremains.webp',
    techs: [
      'Project Management',
      'Production Planning',
      'Cross-Team Coordination',
      'Game Development',
      'PvEvP',
      'Extraction',
      'Survival',
      'Unreal Engine 5',
    ],
    liveUrl: 'https://www.mylastday.xyz',
    repoUrl: 'https://github.com/LouisDev314/my-last-day',
  },
];
