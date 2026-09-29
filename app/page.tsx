import Image from 'next/image';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { prototypeProjects } from '@/lib/prototype-projects';

export default function Home() {
  return (
    <main id="main-content">
      <div id="top" />
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> LOUIS CHAN / GAME DESIGNER</p>
          <h1 id="hero-title">Designing for<br /><em>curiosity.</em></h1>
          <p className="hero-intro">I shape spaces, systems, and stories around what players notice, question, and remember.</p>
          <div className="hero-links">
            <a className="button button-primary" href="#projects">Explore selected work <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="text-link" href="#about">About me <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
          <div className="hero-discipline-list" aria-label="Design interests">
            <span>LEVEL DESIGN</span><span>GAMEPLAY DESIGN</span><span>PUZZLE DESIGN</span><span>STORYTELLING</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-top"><span>PLAYER EXPERIENCE / DESIGN PROCESS</span><span>01—04</span></div>
          <div className="hero-drawing">
            <span className="hero-orbit hero-orbit-one" /><span className="hero-orbit hero-orbit-two" />
            <span className="hero-path hero-path-one" /><span className="hero-path hero-path-two" />
            <span className="hero-node hero-node-one" /><span className="hero-node hero-node-two" /><span className="hero-node hero-node-three" />
            <span className="hero-drawing-word">SPACE <i>→</i> CHOICE <i>→</i> FEELING</span>
          </div>
          <div className="hero-visual-bottom"><span>OBSERVE / TEST / ITERATE</span><span>DESIGN NOTE 001</span></div>
        </div>
      </section>

      <section className="section projects-section" id="projects" aria-labelledby="projects-title">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="section-index">01 / SELECTED WORK</p><h2 id="projects-title">Featured projects<span className="heading-period">.</span></h2></div>
            <p className="section-lede">A selection of game design work, each with its own visual language.</p>
          </div>
          <div className="project-grid">{prototypeProjects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        </div>
      </section>

      <section className="section evidence-section" id="case-studies" aria-labelledby="studies-title">
        <div className="page-shell evidence-grid">
          <div><p className="section-index">02 / THE THINKING BEHIND THE WORK</p><h2 id="studies-title">Show the<br /><em>decisions.</em></h2></div>
          <div className="evidence-copy"><p>Good design work leaves a trail: the original question, the constraints, what players did, and what changed as a result.</p></div>
        </div>
      </section>

      <section className="section currently-section" id="currently-designing" aria-labelledby="current-title">
        <div className="page-shell currently-grid">
          <div className="currently-image">
            <Image src="/site/usher-visual-study.svg" alt="Illustrative House of Usher architectural study; not gameplay." fill sizes="(max-width: 760px) 100vw, 45vw" />
            <span className="media-placeholder-label">ILLUSTRATIVE VISUAL STUDY · NOT GAMEPLAY</span>
          </div>
          <div className="currently-copy"><p className="section-index">03 / ON THE DESIGN DESK</p><span className="status-chip"><span /> CURRENTLY DESIGNING</span><h2 id="current-title">House of<br /><em>Usher.</em></h2><p>House of Usher is in development.</p><div className="current-footer"><span>ACTIVE PROJECT / 2026</span><MoveUpRight size={25} aria-hidden="true" /></div></div>
        </div>
      </section>

      <section className="section writing-section" id="writing" aria-labelledby="writing-title">
        <div className="page-shell writing-grid">
          <div><p className="section-index">04 / NOTES ON DESIGN</p><h2 id="writing-title">Writing for<br /><em>designers.</em></h2></div>
          <div className="writing-types"><p>Notes on design decisions, player experiences, and the details that shape play.</p></div>
        </div>
      </section>

      <section className="section closing-section" id="about" aria-labelledby="about-title">
        <div className="page-shell closing-grid"><div><p className="section-index">05 / ABOUT & CONTACT</p><h2 id="about-title">Thoughtful design.<br /><em>Memorable play.</em></h2></div><div className="closing-copy"><p>I’m Louis, a game designer interested in how level layout, mechanics, puzzles, and environmental storytelling guide a player’s experience.</p><p>I’d be glad to connect about design work and opportunities.</p><a className="button button-outline" href="mailto:louiscch314@gmail.com">Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
      </section>

      <div id="resume" className="resume-anchor page-shell"><span>RESUME</span><a href="mailto:louiscch314@gmail.com?subject=Resume%20request">Request current resume <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    </main>
  );
}
