# Portfolio (Next.js 14, TypeScript, Tailwind, Contentlayer)

Production-grade portfolio site. This README is for contributors or anyone new to the codebase.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Contentlayer (MDX content)
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

If content doesn’t appear:

```bash
pnpm content
```

## Scripts

- dev: next dev (runs Contentlayer via predev)
- build: next build (runs Contentlayer via prebuild)
- start: next start
- lint: next lint
- test: jest
- test:watch: jest --watch
- test:coverage: jest --coverage
- type-check: tsc --noEmit
- content: contentlayer build
- sitemap: next-sitemap
- build:sitemap: pnpm build && next-sitemap
- analyze: ANALYZE=true next build

## Structure

```
src/
  app/                # App Router routes
  components/         # UI, content, animation, layout, SEO
  lib/                # utils, metadata, performance helpers
  styles/             # Tailwind globals
content/
  blog/               # MDX posts
  projects/           # MDX projects
public/               # static assets
```

## Content authoring (MDX)

- Add posts: `content/blog/*.mdx`
- Add projects: `content/projects/*.mdx`
- Types/schema: `contentlayer.config.ts`

Rebuild content:

```bash
pnpm content
```

## Environment

Email/inquiry endpoints require secrets. See:

- `SECURE_EMAIL_SETUP.md`
- `SECURE_EMAILJS_SETUP.md`
- `PROJECT_INQUIRY_SYSTEM.md`

Common vars (examples):

- Email provider/API credentials
- SITE_URL (for sitemap)

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

- Content not rendering: `pnpm content`, then restart dev server.
- Type errors: `pnpm type-check`.
- Sitemap: ensure config exists, run `pnpm build:sitemap`.

## License

Private. All rights reserved.
