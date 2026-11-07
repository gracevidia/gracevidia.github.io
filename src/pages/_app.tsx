import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { SiteLayout } from 'components/layout';
import styles from 'styles/site.module.css';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    // data-theme attribute keeps the ported CSS selectors working untouched.
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      <SiteLayout>
        {/* CSS page transition: replays on each route change via the key. */}
        <div key={router.pathname} className={styles.fadeIn}>
          <Component {...pageProps} />
        </div>
      </SiteLayout>
    </ThemeProvider>
  );
}
