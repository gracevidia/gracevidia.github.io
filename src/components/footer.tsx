import { useReveal } from './section';

export function Footer() {
  const revealRef = useReveal();

  return (
    <footer id="contact">
      <div ref={revealRef} className="wrap reveal">
        <p className="foot-note">
          <span>
            © 2026 <span className="highlight">Grace Vidia Rosa Panjaitan</span>
          </span>
          <span>build: portfolio_v5.0</span>
          <span>status: PASSED ✓</span>
        </p>
      </div>
    </footer>
  );
}
