export type BlogCategory = 'design-notes' | 'game-analysis';

export const blogCategories: { value: BlogCategory; label: string; description: string }[] = [
  {
    value: 'design-notes',
    label: 'Design Notes',
    description:
      'My own work: project breakdowns, design decisions, levels, puzzles, gameplay, iteration, playtesting, documentation, lessons, and experiments.',
  },
  {
    value: 'game-analysis',
    label: 'Game Analysis',
    description: 'Teardowns of existing games: levels, systems, mechanics, guidance, pacing, and MDA.',
  },
];

export interface BlogArticle {
  title: string;
  /** URL segment for the future /blogs/[slug] article route. */
  slug: string;
  summary: string;
  category: BlogCategory;
  /** ISO 8601 publication date, when available. */
  publishedAt?: string;
  thumbnail?: { src: string; alt: string };
  relatedProjectSlug?: string;
  featured?: boolean;
}

// Add published articles here when their content and /blogs/[slug] pages are ready.
export const blogArticles: BlogArticle[] = [];
