import { useState } from 'react';
import { PROJECTS } from 'data/content';
import { cn } from 'lib/cn';
import { Section } from './section';

// All cards show by default; the "Open more" button only appears when the
// number of projects exceeds this limit (2 rows x 3 cards).
const PROJECT_LIMIT = 6;

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = PROJECTS.length > PROJECT_LIMIT;

  return (
    <Section id="projects" title="Projects & Samples">
      <div className="proj-grid">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className={cn('proj', needsToggle && !expanded && index >= PROJECT_LIMIT && 'proj-hidden')}
          >
            <span className="ptype">{project.type}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.href} target="_blank" rel="noopener">
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
      {needsToggle && (
        <div className="project-actions">
          <button
            className="btn btn-sun"
            type="button"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show less' : 'Open more'}
          </button>
        </div>
      )}
    </Section>
  );
}
