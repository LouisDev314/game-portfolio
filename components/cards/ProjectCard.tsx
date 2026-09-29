import Image from 'next/image';
import type { PrototypeProject } from '@/lib/prototype-projects';

export function ProjectCard({ project }: { project: PrototypeProject }) {
  return (
    <article className={`project-card project-card-${project.tone}`}>
      <div className="project-image-wrap">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          className="project-image"
        />
        <span className="media-placeholder-label">ILLUSTRATIVE VISUAL STUDY · NOT GAMEPLAY</span>
      </div>
      <div className="project-card-content">
        <div className="project-card-meta"><span>{project.number} / FEATURED PROJECT</span><span>{project.eyebrow}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-tags" aria-label={`${project.title} design areas`}>
          {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </div>
    </article>
  );
}
