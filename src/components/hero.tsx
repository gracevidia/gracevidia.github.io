import { PROFILE } from 'data/profile';

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="avatar-wrap">
          <div className="avatar-card" tabIndex={0} role="img" aria-label={PROFILE.displayName}>
            <div className="avatar-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PROFILE.avatar} alt={PROFILE.displayName} className="avatar-img" />
            </div>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">{PROFILE.displayName}</h1>
          <p className="hero-role">{PROFILE.role}</p>
          <div className="social-row">
            {PROFILE.socials.map((social) => (
              <a
                key={social.name}
                className="social-btn"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.title}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d={social.path} />
                </svg>
                <span>{social.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
