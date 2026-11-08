import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Link } from 'lucide-react';
import { PROJECTS } from 'data/content';
import { Section } from './section';

// Cards visible per page (matches the 3-up grid).
const PAGE_SIZE = 3;
// Custom scrollbar width; the thumb width is proportional to what's visible.
const BAR_WIDTH = 200;
const MIN_THUMB = 36;

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(MIN_THUMB);
  const [canScroll, setCanScroll] = useState(true);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  // Show the scrollbar briefly after a nav click, then hide it again.
  const flashScrollbar = () => {
    setScrollbarVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setScrollbarVisible(false), 2000);
  };

  const pageStep = () => {
    const element = scrollRef.current;
    if (!element) return 0;
    const card = element.querySelector<HTMLElement>('.proj');
    return card ? card.offsetWidth + 20 : element.clientWidth * 0.8;
  };

  // Syncs the progress + thumb size with the actual row state.
  const syncScrollbar = () => {
    const element = scrollRef.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setCanScroll(max > 0);
    setProgress(max > 0 ? element.scrollLeft / max : 0);
    const visible = element.scrollWidth > 0 ? element.clientWidth / element.scrollWidth : 1;
    setThumbWidth(Math.max(MIN_THUMB, Math.round(BAR_WIDTH * visible)));
  };

  useEffect(() => {
    // Compute the thumb once after mount (before any hover) and on resize.
    const raf = requestAnimationFrame(syncScrollbar);
    window.addEventListener('resize', syncScrollbar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', syncScrollbar);
    };
  }, []);

  const onScroll = () => {
    // Keep the scrollbar visible while scrolling (mobile has no hover);
    // it hides 2s after the last scroll event.
    flashScrollbar();
    syncScrollbar();
    const element = scrollRef.current;
    if (!element) return;
    const step = pageStep();
    setPage(step > 0 ? Math.round(element.scrollLeft / (step * PAGE_SIZE)) : 0);
  };

  // Page-based navigation: the next page shows a fresh set of cards.
  const goToPage = (next: number) => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ left: next * PAGE_SIZE * pageStep(), behavior: 'smooth' });
    flashScrollbar();
  };

  const jumpTo = (clientX: number) => {
    const element = scrollRef.current;
    const bar = scrollbarRef.current;
    if (!element || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    element.scrollTo({ left: ratio * (element.scrollWidth - element.clientWidth), behavior: 'smooth' });
  };

  const onBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    jumpTo(event.clientX);
  };

  const onBarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons & 1) jumpTo(event.clientX); // dragging
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
            onClick={() => goToPage(page - 1)}
            disabled={progress <= 0.001}
            aria-label="Previous projects page"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="proj-nav"
            onClick={() => goToPage(page + 1)}
            disabled={!canScroll || progress >= 0.999}
            aria-label="Next projects page"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      }
    >
      {/* Horizontal scroll row: 3 cards visible, scroll for the rest. */}
      <div className="proj-grid" ref={scrollRef} onScroll={onScroll}>
        {PROJECTS.map((project) => (
          <article key={project.id} className="proj">
            <div className="ptype-row">
              {project.types.map((type) => (
                <span key={type} className={`ptype ptype--${type.toLowerCase().replace(/\s+/g, '-')}`}>
                  {type}
                </span>
              ))}
            </div>
            <h3>
              {project.title}{' '}
              <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label="Open project" className="proj-link">
                <Link size={16} />
              </a>
            </h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>

      {/* Compact scrollbar: click or drag to move through the row. */}
      <div
        ref={scrollbarRef}
        className={scrollbarVisible ? 'proj-scrollbar show' : 'proj-scrollbar'}
        onPointerDown={onBarPointerDown}
        onPointerMove={onBarPointerMove}
        aria-hidden
      >
        <div
          className="proj-scrollbar-thumb"
          style={{ width: `${thumbWidth}px`, left: `${progress * (BAR_WIDTH - thumbWidth)}px` }}
        />
      </div>
    </Section>
  );
}
