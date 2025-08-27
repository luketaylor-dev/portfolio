# Portfolio

A fast, modern portfolio for Unity/VR work with MDX case studies.

## Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS (+ typography)
- MDX via Contentlayer
- next-seo + next-sitemap
- Optional: Plausible analytics

## Getting started
```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
```

## Content
Add MDX files under `content/projects`. Frontmatter fields:
```md
---
title: My Project
description: Short summary shown on cards
date: 2025-08-01
tags: [Unity, VR]
featured: true
cover: /images/cover.jpg
---
Your MDX body...
```

## Deploy
- Set `SITE_URL` env for sitemap.
- Deploy on Vercel.
