/** Phase 1 display data. Replace with validated MDX content after visual review. */
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
    summary: 'An active design project. Gameplay, level documentation, and iteration evidence will be added to its dedicated page.',
    image: '/site/usher-visual-study.svg',
    imageAlt: 'Illustrative architectural visual study for House of Usher; not a gameplay screenshot.',
    tags: ['Level Design', 'Puzzle Design', 'Environmental Storytelling'],
    number: '01',
    tone: 'usher',
  },
  {
    title: 'Shell',
    eyebrow: 'Selected project',
    summary: 'A second featured game design project. Project details and verified media will be added in the content phase.',
    image: '/site/shell-visual-study.svg',
    imageAlt: 'Illustrative abstract visual study for Shell; not a gameplay screenshot.',
    tags: ['Game Design'],
    number: '02',
    tone: 'shell',
  },
];
