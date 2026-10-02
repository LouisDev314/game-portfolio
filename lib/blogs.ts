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
  /** URL segment for /blogs/[slug]. */
  slug: string;
  summary: string;
  category: BlogCategory;
  /** ISO 8601 publication date, when available. */
  publishedAt?: string;
  thumbnail?: { src: string; alt: string };
  relatedProjectSlug?: string;
  featured?: boolean;
}

export interface ArticleMedia {
  filename: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  /** Capture guidance retained for future supplied media. */
  note: string;
}

export interface ArticleVisual {
  id: string;
  imagePurpose: string;
  replacementNotes: string;
  /** One image for a figure, two for a responsive comparison. */
  images: {
    src: string;
    alt: string;
    caption: string;
    annotations?: { label: string; x: number; y: number }[];
  }[];
}

export type ArticleBlock = { type: 'paragraph'; text: string } | { type: 'figure'; visual: ArticleVisual };

export interface ArticleContent extends BlogArticle {
  experienceNote: string;
  playtimeMedia: ArticleMedia[];
  assetRoot: string;
  heroCredit: string;
  heroSource: string;
  heroVisual?: ArticleVisual;
  intro: string[];
  sections: { id: string; title: string; blocks: ArticleBlock[]; takeaway: string }[];
  takeaways: { title: string; text: string }[];
  sources: { title: string; url: string; note: string }[];
}

export const blogArticles: ArticleContent[] = [residentEvil4];

import { residentEvil4 } from '@/lib/articles/resident-evil-4';

/** Main reading flow, including headings and captions; source notes are reference material. */
export function articleWordCount(article: ArticleContent): number {
  const text = [
    article.title,
    article.summary,
    article.experienceNote,
    ...article.intro,
    ...article.sections.flatMap((section) => [
      section.title,
      ...section.blocks.flatMap((block) =>
        block.type === 'paragraph' ? [block.text] : block.visual.images.map((image) => image.caption),
      ),
      section.takeaway,
    ]),
    ...article.takeaways.map((takeaway) => `${takeaway.title} ${takeaway.text}`),
  ].join(' ');
  return text.match(/\b[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*\b/gu)?.length ?? 0;
}

export function articleReadTime(article: ArticleContent): number {
  return Math.max(1, Math.round(articleWordCount(article) / 250));
}
