import { useEffect, useRef, useState } from 'react';
import { CONTENT } from 'data/content';
import { Section } from './section';
import { monthsBetween } from './experience';

// First QA experience (Waste4Change contract) — the experience counter starts here.
const QA_START = 'Sep 2022';

// Counts up to the total years the first time it scrolls into view.
function YearsCounter({ months }: { months: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const years = Math.floor(months / 12);
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' && !('IntersectionObserver' in window) ? years : 0
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
            setValue(Math.round(eased * years));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(element);
    return () => io.disconnect();
  }, [years]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}+ years
    </span>
  );
}

export function About() {
  // "{years}+" in the copy is where the counter goes.
  const [prefix, suffix] = CONTENT.about.split('{years}+');

  return (
    <Section id="about">
      <p className="about-text">
        {prefix}
        <YearsCounter months={monthsBetween(QA_START)} />
        {suffix}
      </p>

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
