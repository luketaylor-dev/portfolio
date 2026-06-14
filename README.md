# Portfolio (Next.js 16, TypeScript, Tailwind)

Production-grade portfolio site. This README is for contributors or anyone new to the codebase.

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- gray-matter + next-mdx-remote (MDX content)
- Vercel (recommended)

## Requirements

- Node.js 18+
- pnpm 8+

## Setup

```bash
pnpm install
pnpm dev
```

Dev server: http://localhost:3000



## Scripts

- dev: next dev
- build: next build
- start: next start
- lint: next lint
- test: jest
- test:watch: jest --watch
- test:coverage: jest --coverage
- type-check: tsc --noEmit
- sitemap: next-sitemap
- build:sitemap: pnpm build && next-sitemap
- analyze: ANALYZE=true next build

## Structure

```
src/
  app/                # App Router routes
  components/         # UI, content, animation, layout, SEO
  lib/                # utils, metadata, content loading, performance helpers
  styles/             # Tailwind globals
content/
  blog/               # MDX posts
  projects/           # MDX projects
public/               # static assets
```

## Content authoring (MDX)

Content is loaded via `src/lib/content.ts` using gray-matter. No build step required.

- Add posts: `content/blog/*.mdx`
- Add projects: `content/projects/*.mdx`

## Environment

Email/inquiry endpoints require secrets. See:

- `SECURE_EMAIL_SETUP.md`
- `SECURE_EMAILJS_SETUP.md`
- `PROJECT_INQUIRY_SYSTEM.md`

Common vars (examples):

- Email provider/API credentials
- SITE_URL (canonical domain, e.g. `https://luke-taylor.dev`)

## Development

```bash
pnpm dev        # start dev server
pnpm lint       # eslint
pnpm test       # unit tests
pnpm type-check # TS checks
```

## Build & deploy

```bash
pnpm build
pnpm start      # serve production build locally
```

Deploy on Vercel by pushing to the default branch. Generate sitemap when needed:

```bash
pnpm build:sitemap
```

## Performance notes

- Images: Next/Image with webp/avif; tune `quality`/`sizes` per use.
- Animations: CSS-first; non-critical effects deferred off the critical path.
- Source maps disabled in production; use `ANALYZE=true` for bundle insights.

## Accessibility

- Semantic markup, focus styles, ARIA for nav.
- Respects reduced motion where appropriate.

## Troubleshooting

- Type errors: `pnpm type-check`.
- Sitemap: ensure config exists, run `pnpm build:sitemap`.

## License

Private. All rights reserved.
