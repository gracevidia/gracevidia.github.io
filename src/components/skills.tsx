import { SKILL_GROUPS } from 'data/content';
import { Section } from './section';

export function Skills() {
  return (
    <Section id="skills" title="Skills & Tools">
      <div className="skills-grid">
        {SKILL_GROUPS.map((group) => (
          <div key={group.name} className="stack-card">
            <div className="stack-header">
              <span className="stack-ico" aria-hidden="true">
                {group.icon}
              </span>
              <span className="stack-name">{group.name}</span>
            </div>
            <ul className="stack-items">
              {group.skills.map((skill) => (
                <li key={skill} className="skill-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
