import { Project } from '@/lib/projects';
import Badge from 'components/Badge';
import GitHubIcon from '@/assets/icons/github-icon';
import YoutubeIcon from '@/assets/icons/youtube-icon';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { ProjectCardMotionShell } from '@/components/ProjectCardMotionShell';
import type { ReactNode } from 'react';

interface ProjectCardProps {
  project: Project;
  imageLoading?: 'eager' | 'lazy';
}

type ProjectAction = {
  href: string;
  label: string;
  ariaLabel: string;
  icon: ReactNode;
};

export default function ProjectCard({ project, imageLoading = 'lazy' }: ProjectCardProps) {
  const actions: ProjectAction[] = [];

  if (project.liveUrl) {
    actions.push({
      href: project.liveUrl,
      label: 'Live',
      ariaLabel: `Open ${project.name} live site in a new tab`,
      icon: <ExternalLink className="size-4" aria-hidden="true" />,
    });
  }

  if (project.demoUrl) {
    actions.push({
      href: project.demoUrl,
      label: 'Demo',
      ariaLabel: `Watch ${project.name} demo in a new tab`,
      icon: <YoutubeIcon className="size-5.5 fill-[#FF0000]" aria-hidden="true" />,
    });
  }

  if (project.repoUrl) {
    actions.push({
      href: project.repoUrl,
      label: 'Code',
      ariaLabel: `Open ${project.name} source code in a new tab`,
      icon: <GitHubIcon className="size-5 dark:fill-white" aria-hidden="true" />,
    });
  }

  return (
    <ProjectCardMotionShell>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imgUrl}
          alt={`${project.name} project logo`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading={imageLoading}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-base font-semibold text-neutral-900 dark:text-neutral-100">{project.name}</h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <Badge key={tech} title={tech} hasAnim={false} />
          ))}
        </div>

        {actions.length > 0 && (
          <div className="flex items-center gap-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.ariaLabel}
                className="flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-300 dark:hover:text-neutral-50">
                {action.label}
                {action.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </ProjectCardMotionShell>
  );
}
