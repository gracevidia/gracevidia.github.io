import { CONTENT, QA_START } from 'data/content';
import { PROFILE } from 'data/profile';
import { useCountUp } from 'lib/use-count-up';
import { Section } from './section';
import { monthsBetween } from './experience';

function YearsCounter({ months }: { months: number }) {
  const { ref, value } = useCountUp(Math.floor(months / 12));

  return (
    <span ref={ref} className="about-years tabular-nums">
      {value}+ years
    </span>
  );
}

export function About() {
  // "{years}+" in the copy is where the counter goes.
  const [prefix, suffix] = CONTENT.about.split('{years}+');
  const roleIndex = prefix.indexOf(PROFILE.role);

  return (
    <Section id="about">
      <p className="about-text">
        {roleIndex !== -1 ? (
          <>
            {prefix.slice(0, roleIndex)}
            <span className="about-highlight">{PROFILE.role}</span>
            {prefix.slice(roleIndex + PROFILE.role.length)}
          </>
        ) : (
          prefix
        )}
        <YearsCounter months={monthsBetween(QA_START)} />
        {suffix}
      </p>

      <div className="info-grid">
        {CONTENT.infoCards.map((card) => (
          <div key={card.k} className="info-card">
            <div className="info-card-label">{card.k}</div>
            <div className="info-card-value">{card.v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
