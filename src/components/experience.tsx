import { useState } from 'react';
import { EXPERIENCES, ExperienceItemData } from 'data/content';
import { cn } from 'lib/cn';
import { useCountUp } from 'lib/use-count-up';
import { Section } from './section';

// Bullets support a simple *bold* syntax for leading labels.
function renderBullet(bullet: string) {
  const parts = bullet.split(/\*([^*]+)\*/);
  return parts.map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
}

// Inclusive month count for active roles (e.g. "Jun 2025 - Present").
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function monthsBetween(start: string): number {
  const [monthName, yearText] = start.split(' ');
  const startMonth = MONTHS.indexOf(monthName);
  const startYear = Number(yearText);
  const now = new Date();
  return (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth) + 1;
}

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years > 0 && rest > 0) return `${years}y ${rest}m`;
  if (years > 0) return `${years}y`;
  return `${rest}m`;
}

function DurationCounter({ months }: { months: number }) {
  const { ref, value } = useCountUp(months);

  return (
    <span ref={ref} className="ticket-duration tabular-nums">
      {formatMonths(value)}
    </span>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="timeline">
        {EXPERIENCES.map((item) => {
          const months =
            item.durationMonths ??
            (item.isActive ? monthsBetween(item.period.split(' - ')[0]) : undefined);

          return (
            <article key={item.id} className={cn('ticket', item.isActive && 'ticket--active')}>
              <div className="ticket-card">
                <div className="ticket-head">
                  <TicketLogo item={item} />
                  <div className="ticket-title">
                    <h3 className="ticket-role">{item.title}</h3>
                    <div className="ticket-org">{item.org}</div>
                  </div>
                </div>
                <div className="ticket-meta">
                  <span className="emp-type">{item.employmentType}</span>
                  <span className="ticket-period">{item.period}</span>
                  {months !== undefined && <DurationCounter months={months} />}
                </div>
                <div className="ticket-body">
                  <ul className="ticket-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{renderBullet(bullet)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
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
