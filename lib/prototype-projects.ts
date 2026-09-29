export type PrototypeProject = {
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  number: string;
  tone: 'usher' | 'shell';
};

export const prototypeProjects: PrototypeProject[] = [
  {
    title: 'House of Usher',
    eyebrow: 'In development',
    summary: 'An active game design project.',
    image: '/site/usher-visual-study.svg',
    imageAlt: 'Illustrative architectural visual study for House of Usher; not a gameplay screenshot.',
    tags: ['Level Design', 'Puzzle Design', 'Environmental Storytelling'],
    number: '01',
    tone: 'usher',
  },
  {
    title: 'Shell',
    eyebrow: 'Selected project',
    summary: 'Selected game design work.',
    image: '/site/shell-visual-study.svg',
    imageAlt: 'Illustrative abstract visual study for Shell; not a gameplay screenshot.',
    tags: ['Game Design'],
    number: '02',
    tone: 'shell',
  },
];
