import type { Project } from '@/lib/projects';
import Badge from '@/components/Badge';
import { ProjectCardMedia } from '@/components/ProjectCardMedia';
import { ProjectCardMotionShell } from '@/components/ProjectCardMotionShell';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <ProjectCardMotionShell slug={project.slug} title={project.name}>
      <ProjectCardMedia video={project.video} poster={project.poster} />

      <div className="flex min-w-0 flex-col p-5 sm:p-6 lg:p-7">
        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.name}
        </h3>

        <div className="mt-3 lg:mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} title={tag} hasAnim={false} />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{project.description}</p>

        <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <ul className="mt-2 space-y-1.5 text-sm leading-snug text-neutral-600 dark:text-neutral-300">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-500">
                  •
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden="true"
          className="mt-5 text-sm text-right font-medium text-neutral-600 transition-colors group-hover:text-neutral-950 dark:text-neutral-300 dark:group-hover:text-white lg:mt-auto lg:pt-5 underline underline-offset-2">
          View Project{' '}
          <span className="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </ProjectCardMotionShell>
  );
}
