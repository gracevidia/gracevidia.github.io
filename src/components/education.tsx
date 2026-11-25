import { EDUCATION } from 'data/content';
import { Section } from './section';

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="edu-list">
        {EDUCATION.map((item) => (
          <li key={item.id} className="edu-card">
            <div className="edu-main">
              <strong className="edu-school">{item.school}</strong>
              <div className="edu-degree">{item.degree}</div>
              {item.grade && <span className="edu-grade">{item.grade}</span>}
            </div>
            <span className="edu-period">{item.period}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
