import { ArrowUp } from 'lucide-react';
import { useReveal } from './section';

export function Footer() {
  const revealRef = useReveal();

  return (
    <footer id="contact">
      <div ref={revealRef} className="wrap reveal">
        <div className="foot-row">
          <span className="foot-note">build: portofolio-v5.0.0</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="foot-top"
          >
            Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
