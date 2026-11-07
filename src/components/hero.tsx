import { PROFILE } from 'data/profile';
import { CONTENT } from 'data/content';

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="avatar-wrap">
          <div className="avatar" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROFILE.avatar} alt="G" />
          </div>
          <span className="sticker">QA ✓</span>
        </div>
        <div>
          <span className="status-pill">
            <span className="dot" />
            {CONTENT.statusPill}
          </span>
          <h1>
            Hi, I&apos;m {PROFILE.displayName} —<br />
            <span className="hl">{PROFILE.role}</span>
          </h1>
          <div className="social-row">
            {PROFILE.socials.map((social) => (
              <a
                key={social.name}
                className="icon-btn"
                href={social.href}
                target="_blank"
                rel="noopener"
                aria-label={social.title}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
