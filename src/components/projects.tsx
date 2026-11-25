import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from 'data/content';
import { cn } from 'lib/cn';
import { Section } from './section';

const MIN_THUMB_PERCENT = 18;

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const activeTimer = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [thumbPercent, setThumbPercent] = useState(35);
  const [canScroll, setCanScroll] = useState(true);
  const [barActive, setBarActive] = useState(false);

  const pulseScrollbar = () => {
    setBarActive(true);
    if (activeTimer.current) window.clearTimeout(activeTimer.current);
    activeTimer.current = window.setTimeout(() => setBarActive(false), 1600);
  };

  // Reads the actual rendered card step and visible count so navigation works
  // accurately across mobile (1 card), tablet (2 cards), and desktop (3 cards).
  const getScrollMetrics = () => {
    const element = scrollRef.current;
    if (!element) return { step: 0, visibleCards: 1 };
    const card = element.querySelector<HTMLElement>('.proj-card');
    const gap = Number.parseFloat(window.getComputedStyle(element).columnGap || '16') || 16;
    const step = card ? card.offsetWidth + gap : element.clientWidth * 0.85;
    const visibleCards = step > 0 ? Math.max(1, Math.floor((element.clientWidth + gap) / step)) : 1;
    return { step, visibleCards };
  };

  const syncScrollbar = () => {
    const element = scrollRef.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setCanScroll(max > 1);
    setProgress(max > 1 ? Math.min(Math.max(element.scrollLeft / max, 0), 1) : 0);
    const visibleRatio = element.scrollWidth > 0 ? element.clientWidth / element.scrollWidth : 1;
    setThumbPercent(Math.min(100, Math.max(MIN_THUMB_PERCENT, visibleRatio * 100)));
  };

  useEffect(() => {
    const raf = requestAnimationFrame(syncScrollbar);
    window.addEventListener('resize', syncScrollbar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', syncScrollbar);
      if (activeTimer.current) window.clearTimeout(activeTimer.current);
    };
  }, []);

  const onScroll = () => {
    pulseScrollbar();
    syncScrollbar();
  };

  const stepPage = (direction: -1 | 1) => {
    const element = scrollRef.current;
    if (!element) return;
    const { step, visibleCards } = getScrollMetrics();
    const max = element.scrollWidth - element.clientWidth;
    const delta = direction * step * visibleCards;
    const target = Math.min(Math.max(element.scrollLeft + delta, 0), max);
    element.scrollTo({ left: target, behavior: 'smooth' });
    pulseScrollbar();
  };

  const jumpTo = (clientX: number) => {
    const element = scrollRef.current;
    const bar = scrollbarRef.current;
    if (!element || !bar) return;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    element.scrollTo({ left: ratio * (element.scrollWidth - element.clientWidth), behavior: 'smooth' });
    pulseScrollbar();
  };

  const onBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    jumpTo(event.clientX);
  };

  const onBarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons & 1 || event.pointerType === 'touch') {
      jumpTo(event.clientX);
    }
  };

  return (
    <Section
      id="projects"
      title="Projects"
      actions={
        <div className="proj-nav-row">
          <button
            type="button"
            className="proj-nav"
            onClick={() => stepPage(-1)}
            disabled={!canScroll || progress <= 0.005}
            aria-label="Previous projects"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="proj-nav"
            onClick={() => stepPage(1)}
            disabled={!canScroll || progress >= 0.995}
            aria-label="Next projects"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      }
    >
      <div className="proj-grid" ref={scrollRef} onScroll={onScroll}>
        {PROJECTS.map((project) => (
          <article key={project.id} className="proj-card">
            <div className="ptype-row">
              {project.types.map((type) => (
                <span key={type} className="ptype">
                  {type}
                </span>
              ))}
            </div>
            <div className="proj-head">
              <h3 className="proj-title">{project.title}</h3>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="proj-link"
              >
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="proj-desc">{project.description}</p>
          </article>
        ))}
      </div>

      {canScroll && (
        <div
          ref={scrollbarRef}
          className={cn('proj-scrollbar', barActive && 'is-active')}
          onPointerDown={onBarPointerDown}
          onPointerMove={onBarPointerMove}
          aria-hidden="true"
        >
          <div className="proj-scrollbar-track">
            <div
              className="proj-scrollbar-thumb"
              style={{
                width: `${thumbPercent}%`,
                left: `${progress * (100 - thumbPercent)}%`
              }}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
