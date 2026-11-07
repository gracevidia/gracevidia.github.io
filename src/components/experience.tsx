import { useEffect, useRef, useState } from 'react';
import { EXPERIENCES, ExperienceItemData } from 'data/content';
import { cn } from 'lib/cn';
import { Section } from './section';

// Bullets support a simple *bold* syntax for leading labels.
function renderBullet(bullet: string) {
  const parts = bullet.split(/\*([^*]+)\*/);
  return parts.map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
}

// Inclusive month count for the current job (e.g. "Jun 2025 - Present").
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthsBetween(start: string): number {
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

// Counts up to the total months the first time it scrolls into view.
function DurationCounter({ months }: { months: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Without IntersectionObserver there is nothing to observe: show the final value.
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' && !('IntersectionObserver' in window) ? months : 0
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.disconnect();
          const startTime = performance.now();
          const durationMs = 800;
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * months));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(element);
    return () => io.disconnect();
  }, [months]);

  return (
    <span ref={ref} className="tabular-nums">
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
            (item.isCurrent ? monthsBetween(item.period.split(' - ')[0]) : undefined);

          return (
            <article key={item.id} className={cn('ticket', item.isCurrent && 'ticket--current')}>
            <div className="ticket-card">
              <div className="ticket-head">
                <TicketLogo item={item} />
                <div className="ticket-title">
                  <h3>
                    {item.title}
                    {item.isCurrent && <span className="active-dot" aria-label="Current job" />}
                  </h3>
                  <div className="org">{item.org}</div>
                </div>
              </div>
              <div className="ticket-period">
                <span className="emp-type">{item.employmentType}</span>
                {item.period}
                {months !== undefined && (
                  <>
                    {' '}· <DurationCounter months={months} />
                  </>
                )}{' '}
                · {item.location} · {item.workMode}
              </div>
              <div className="ticket-body">
                <ul>
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
