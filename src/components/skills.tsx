import { SKILL_GROUPS } from 'data/content';
import { Section } from './section';

export function Skills() {
  return (
    <Section id="skills" title="Skills & Tools">
      {SKILL_GROUPS.map((group) => (
        <div key={group.name} className="stack-row">
          <p className="stack-group">
            <span className="stack-ico">{group.icon}</span>
            {group.name}
          </p>
          <ul className="stack-items">
            {group.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
