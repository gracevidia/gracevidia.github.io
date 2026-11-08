import Link from 'next/link';
import Meta from 'components/meta';

export default function NotFound() {
  return (
    <>
      <Meta title="Page Not Found - QA Analyst / Engineer" noindex />
      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <p className="nf-sub">Well… this one slipped past QA. 🐞</p>

        <div className="nf-bug-card">
          <div className="nf-bug-head">
            <span>BUG-404 · page_not_found</span>
            <span className="nf-sev">SEV: LOW</span>
          </div>
          <div className="nf-bug-body">
            <div className="nf-row">
              <span className="nf-k">Steps</span>
              <span>Open a URL that doesn&apos;t exist on this site.</span>
            </div>
            <div className="nf-row">
              <span className="nf-k">Expected</span>
              <span>A page loads.</span>
            </div>
            <div className="nf-row">
              <span className="nf-k">Actual</span>
              <span>Nothing here — the page was moved, renamed, or never existed.</span>
            </div>
            <div className="nf-row">
              <span className="nf-k">Workaround</span>
              <span>Head back to the homepage below.</span>
            </div>
          </div>
        </div>

        <Link className="nf-btn" href="/">
          ← Back to homepage
        </Link>
      </div>
    </>
  );
}
