import { CONTENT } from 'data/content';
import { Section } from './section';

export function About() {
  return (
    <Section id="about" title="Nice to meet you! 👋">
      {CONTENT.about.map((paragraph) => (
        <p key={paragraph} className="about-text">
          {paragraph}
        </p>
      ))}

      <ul className="tags">
        {CONTENT.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="info-grid">
        {CONTENT.infoCards.map((card) => (
          <div key={card.k} className="info-card">
            <div className="k">{card.k}</div>
            <div className="v">{card.v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
