'use client';

import { motion } from 'motion/react';
import { BookOpen, Gamepad2, Map, Puzzle, Repeat2, Wrench, type LucideIcon } from 'lucide-react';
import Badge from '@/components/Badge';
import UnrealIcon from '@/assets/icons/unreal-icon';
import UnityIcon from '@/assets/icons/unity-icon';
import AsepriteIcon from '@/assets/icons/aseprite';
import BlenderIcon from '@/assets/icons/blender';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: readonly string[];
};

const SKILL_CATEGORIES = [
  {
    title: 'GAME DESIGN',
    icon: Gamepad2,
    skills: [
      'Gameplay Design',
      'Playcentric Approach',
      'Core Loops',
      'Mechanics Design',
      'Systems Design',
      'Player Goals',
      'Pacing',
      'Progression',
      'Balancing',
    ],
  },
  {
    title: 'LEVEL DESIGN',
    icon: Map,
    skills: [
      'Level Flow',
      'Environmental Storytelling',
      'Player Guidance',
      'Spatial Design',
      'Blockouts',
      'Critical Paths',
      'Exploration',
      'Pacing',
    ],
  },
  {
    title: 'PUZZLE & INTERACTION DESIGN',
    icon: Puzzle,
    skills: [
      'Affordances',
      'Difficulty Curves',
      'Puzzle Design',
      'Player Onboarding',
      'Feedback',
      'Interaction Design',
      'Discovery',
      'Risk / Reward',
    ],
  },
  {
    title: 'NARRATIVE & PLAYER EXPERIENCE',
    icon: BookOpen,
    skills: [
      'Emotional Pacing',
      'Experience Design',
      'Narrative Design',
      'Player Motivation',
      'Worldbuilding',
      'Atmosphere',
      'Story Beats',
    ],
  },
  {
    title: 'PROTOTYPING & ITERATION',
    icon: Repeat2,
    skills: [
      'Iterative Design',
      'Design Documentation',
      'Rapid Prototyping',
      'Playtesting',
      'Design Validation',
      'Greyboxing',
      'Balancing',
      'Feedback Analysis',
    ],
  },
  {
    title: 'TECHNICAL DESIGN & TOOLS',
    icon: Wrench,
    skills: ['Unreal Engine 5', 'Unity', 'Aseprite', 'Blender', 'Technical Design', 'Gameplay Scripting'],
  },
] as const satisfies readonly SkillCategory[];

type SkillName = (typeof SKILL_CATEGORIES)[number]['skills'][number];

const FEATURED_SKILLS: ReadonlySet<SkillName> = new Set<SkillName>([
  'Gameplay Design',
  'Playcentric Approach',
  'Level Flow',
  'Environmental Storytelling',
  'Affordances',
  'Difficulty Curves',
  'Emotional Pacing',
  'Experience Design',
  'Iterative Design',
  'Design Documentation',
  'Unreal Engine 5',
  'Unity',
]);

// Reuse the local monochrome SVGs, verified against Simple Icons:
// https://github.com/simple-icons/simple-icons/blob/develop/icons/unrealengine.svg
// https://github.com/simple-icons/simple-icons/blob/develop/icons/unity.svg
const TOOL_ICONS = {
  'Unreal Engine 5': UnrealIcon,
  Unity: UnityIcon,
  Aseprite: AsepriteIcon,
  Blender: BlenderIcon,
};

export default function TechStackChips() {
  return (
    <div className="pt-4 space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
        {SKILL_CATEGORIES.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div
              key={category.title}
              className="min-w-0 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 max-[360px]:p-2 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
              <h3 className="flex items-start gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-4">
                <CategoryIcon aria-hidden="true" className="size-4 shrink-0 mt-0.5" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const ToolIcon = skill in TOOL_ICONS ? TOOL_ICONS[skill as keyof typeof TOOL_ICONS] : undefined;
                  return (
                    <Badge
                      key={skill}
                      title={skill}
                      featured={FEATURED_SKILLS.has(skill)}
                      icon={
                        ToolIcon ? (
                          <span aria-hidden="true" className="relative z-10 shrink-0">
                            <ToolIcon className="size-4 fill-current" />
                          </span>
                        ) : undefined
                      }
                      titleClassName={ToolIcon ? undefined : 'ml-0'}
                      fillClassName="bg-indigo-500/20"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
