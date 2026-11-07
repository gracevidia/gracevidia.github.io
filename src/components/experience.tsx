import { useState } from 'react';
import { EXPERIENCES, ExperienceItemData } from 'data/content';
import { cn } from 'lib/cn';
import { Section } from './section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="timeline">
        {EXPERIENCES.map((item) => (
          <article key={item.id} className="ticket">
            <div className="ticket-card">
              <div className="ticket-head">
                <TicketLogo item={item} />
                <div className="ticket-title">
                  <h3>{item.title}</h3>
                  <div className="org">{item.org}</div>
                </div>
                <span className="ticket-status">VERIFIED ✓</span>
              </div>
              <div className="ticket-period">
                <span className="emp-type">{item.employmentType}</span>
                {item.period} · {item.location}
              </div>
              <div className="ticket-body">
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

// Company logo with a letter fallback when the image fails to load.
function TicketLogo({ item }: { item: ExperienceItemData }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn('ticket-logo', `ticket-logo--${item.logoVariant}`, failed && 'has-fallback')}
      aria-hidden="true"
    >
      <span className="ticket-logo-fallback">{item.fallback}</span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.logo} alt="" onError={() => setFailed(true)} />
      )}
    </div>
  );
}
