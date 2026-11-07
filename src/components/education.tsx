import { EDUCATION } from 'data/content';
import { Section } from './section';

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="plain-list">
        {EDUCATION.map((item) => (
          <li key={item.id}>
            <div className="edu-main">
              <strong>{item.school}</strong>
              <div className="edu-sub">{item.degree}</div>
              {item.grade && <span className="edu-grade">{item.grade}</span>}
            </div>
            <span className="meta">{item.period}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
