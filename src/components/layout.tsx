import { ReactNode, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import localFont from 'next/font/local';
import { House, Moon, Sun } from 'lucide-react';
import { PROFILE } from 'data/profile';
import { cn } from 'lib/cn';

const googleSans = localFont({
  src: [
    { path: '../styles/fonts/google-sans-400.ttf', weight: '400', style: 'normal' },
    { path: '../styles/fonts/google-sans-500.ttf', weight: '500', style: 'normal' },
    { path: '../styles/fonts/google-sans-700.ttf', weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-google-sans'
});

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Service worker serves the offline page when navigation fails.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <div className={cn(googleSans.className, googleSans.variable)}>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <span className="brand">
            {PROFILE.brand} <span className="chip">{PROFILE.brandChip}</span>
          </span>
          <div className="top-right">
            {/* Home mark: lucide House (ISC-licensed), currentColor follows the theme. */}
            <Link href="/" aria-label="Home" className="icon-btn">
              <House />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration-safe: false during SSR/first render, true after mount.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle light/dark mode"
      className="icon-btn"
    >
      {/* Defaults to light, so the pre-hydration placeholder is the moon. */}
      {!mounted ? <Moon aria-hidden /> : isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </button>
  );
}
