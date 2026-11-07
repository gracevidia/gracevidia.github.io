import { SKILL_GROUPS } from 'data/content';
import { Section } from './section';

export function Skills() {
  return (
    <Section id="skills" title="Skills & Tools">
      {SKILL_GROUPS.map((group) => (
        <div key={group.name} className="skill-group">
          <p className="g">
            <span className="ico">{group.icon}</span>
            {group.name}
          </p>
          <ul className="skill-list">
            {group.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
