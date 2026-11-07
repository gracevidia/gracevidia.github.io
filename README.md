# My GitHub Pages

Built with [Next.js](https://nextjs.org) (Pages Router), React 19, and Tailwind CSS v4. Statically exported and deployed to GitHub Pages.

## Prerequisites

Install these before running the app locally:

- **[Node.js](https://nodejs.org)** — version 20.9 or newer (22 LTS recommended).
- **npm** — bundled with Node.js.

That's it — all other dependencies are installed from `package.json`.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev
```

## Useful Commands

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `npm run dev`    | Start the dev server with hot reload                |
| `npm run build`  | Lint-check types and export the static site to `out/` |
| `npm run lint`   | Run ESLint                                          |
| `npx serve out`  | Preview the built site locally after `npm run build` |

## Project Structure

```
├── public/            # Static assets served as-is (images, offline page, service worker)
│   └── img/           #   pfp, favicons, company logos
├── src/
│   ├── components/    # Page sections: hero, about, experience, skills, projects, ...
│   ├── data/          # All site content — edit this to change copy or lists
│   │   ├── profile.ts #   Name, role, avatar, social links
│   │   └── content.ts #   Experience, education, skills, projects, about text
│   ├── lib/           # Small shared helpers (cn)
│   ├── pages/         # Routes: index, 404
│   └── styles/        # globals.css (design system), fonts, module CSS
├── next.config.ts     # Static export config for GitHub Pages
└── .github/workflows/deploy.yml
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds the static export and publishes the `out/` directory to GitHub Pages. The repository's Pages source must be set to **GitHub Actions** (Settings → Pages).
