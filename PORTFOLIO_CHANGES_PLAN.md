# Portfolio Changes Plan

A consolidated plan covering technical debt, AI-tell fixes, and improvements identified across reviews. Execute in order where dependencies exist.

---

## Phase 1: Logger Utility & Console Log Cleanup

### 1.1 Create Logger utility

Create `src/lib/logger.ts` (or `Logger.ts` if you prefer that naming):

- **Environment variable**: `NEXT_PUBLIC_DEBUG` or `DEBUG` (server-side) — when `"true"`, logs are emitted; otherwise they are no-op.
- **API**: `logger.log()`, `logger.warn()`, `logger.error()` — mirror `console` methods.
- **Behaviour**: In production/build, `console.*` calls should not run unless debug is enabled. Use a single source of truth so `if (process.env.DEBUG) console.log(...)` isn’t scattered.
- **Implementation note**: `console.error` for real errors (error boundaries, API failures) should typically still run in production — consider `logger.error()` always firing, or a separate `logger.debug()` for dev-only logs. Recommend:
  - `logger.debug()` / `logger.log()` → gated by env
  - `logger.error()` → always logs (for diagnostics)
  - `logger.warn()` → configurable (e.g. same as log, or always on)

### 1.2 Replace console calls

| File                                      | Current                                                           | Action                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src/lib/performance.ts`                  | `console.log("LCP:", ...)`, `console.log("Page load time:", ...)` | Remove or route through logger (debug-only)                             |
| `src/components/content/social-share.tsx` | `console.log("Error sharing:", error)`                            | Use `logger.error()` or `logger.warn()` (always useful for real errors) |

Keep `console.error` in error boundaries and API routes for stack traces, unless you prefer routing those through the logger too (then use `logger.error()`).

**Env variable**: Add to `.env.example`:

```
# Set to "true" to enable debug logging (LCP, page load, etc.)
DEBUG=false
```

---

## Phase 2: Dead Code & Cleanup

### 2.1 Remove Contentlayer

- Delete `contentlayer.config.ts`
- Remove `contentlayer` references from `tsconfig.json` (e.g. `"contentlayer/generated"` path)
- Remove any `content` or `predev`/`prebuild` scripts that run Contentlayer
- Update README: remove Contentlayer mentions, document that content is loaded via `lib/content.ts` + gray-matter

### 2.2 Consolidate mobile nav

Choose one:

- **Option A**: Switch to `MobileNavEnhanced` (Framer Motion, scroll lock, click-outside), delete `mobile-nav.tsx`, update layout import
- **Option B**: Delete `mobile-nav-enhanced.tsx`, keep current nav

If keeping current nav: refactor `mobile-nav.tsx` from inline `style={{}}` to Tailwind for consistency.

---

## Phase 3: Shared Config & Nav

### 3.1 Centralise nav items

- Create `src/lib/navigation.ts` (or similar)
- Export `navItems` and optionally `socialLinks` as a single source of truth
- Update `layout.tsx` (desktop nav), `mobile-nav.tsx` (or enhanced), and any other nav usages to import from this file

### 3.2 Manchester Services link

- Decide if Manchester Services should be in the main nav or remain linked only from About
- If yes, add to `navigation.ts`

---

## Phase 4: AI-Tell Fixes

### 4.1 Font change

- Replace Inter with a less generic font (e.g. **DM Sans**, **Outfit**, **Sora**, **Manrope**, **Clash Display**, or a serif like **Libre Baskerville**)
- Update `src/app/layout.tsx`, `tailwind.config.ts`, and `src/app/og/route.tsx` to use the new font

### 4.2 Button refinement

In `src/components/ui/interactive-button.tsx`:

- Remove `hover:rotate-1`
- Reduce glow: tone down or remove `blur-xl` hover effect
- Consider `hover:scale-[1.02]` instead of `hover:scale-105`
- Keep gradients if desired; subtle changes can reduce the “AI portfolio” feel

### 4.3 Gradient variation

- Vary hero gradients across pages so they don’t all use the same pattern
- Consider one page with a solid background or different gradient direction
- Files: `page.tsx`, `contact-form.tsx`, `about/page.tsx`, `projects/page.tsx`, `blog/page.tsx`, `manchester-services/page.tsx`, `inquire/page.tsx`

### 4.4 Add visible domain email

**Email note: the address is changing. When you implement this, use your new email — do not use the old one.**

- Add a `mailto:` link with your **new** domain email in:
  - Footer (e.g. under “Let’s Connect” or near social links)
  - Contact page (e.g. “Or email me at [your-new-email@dibza.co.uk]” below the form)
- Ensure the link is accessible and has appropriate `aria-label` if needed

---

## Phase 5: Documentation & Config

### 5.1 README

- Update tech stack (Next.js 16, gray-matter, next-mdx-remote)
- Remove Contentlayer references and `pnpm content` instructions

### 5.2 Next.js config

- Set `productionBrowserSourceMaps: false` in `next.config.mjs` unless you need source maps in production

---

## Phase 6: TypeScript & Misc

### 6.1 Reduce `any` usage

- `src/components/content/mdx-content.tsx`: type the `img` and `code`/`pre` props properly
- `src/app/projects/[slug]/page.tsx`: type `generateProjectStructuredData(project)` with `Project` instead of `any`

### 6.2 Security

- **SECURE_EMAIL_SETUP.md**: Remove real credentials from the file. Use placeholders (`your_service_id_here`) and refer to `.env.local` / Vercel env vars.

---

## Phase 7: Web Development (.NET, React) — Secondary Service

Position web dev as an offering without overshadowing Unity. Unity stays main stage.

### 7.1 About page narrative

- Add a brief line about .NET web development background and current React work
- Explains versatility and credibility without competing with Unity messaging

### 7.2 Homepage "Also experienced in" line

- Add a subdued line under the three primary skill cards (EEG, VR, Game Dev)
- E.g. "Also experienced in .NET web development and React (including this portfolio)"
- Keeps it visible but secondary

### 7.3 Optional: Secondary web dev page

- Add `/services` or `/web-development` page with .NET/React details
- Link from footer or a small "Also" area, not main nav
- For visitors specifically interested in web work

### 7.4 Project tagging (if applicable)

- Tag any web projects (including this portfolio) with relevant tech
- Project filter can surface them — shows breadth without changing homepage messaging

---

## Phase 8: 3D Modelling (Blender) — Hobby / Pipeline Credibility

Show Blender as a supporting skill for game dev. Hobby level, not a service offering.

### 8.1 Blog category for Blender

- Add "Blender" or "3D pipeline" as a blog tag/category
- Blog post ideas:
  - "Blender to Unity: modelling pipeline"
  - "Asset creation for game projects"
  - "Blender tips for game-ready assets"
  - WIP / process posts
- Low effort, good SEO, reinforces the full-pipeline story

### 8.2 Project badges for custom assets

- On Unity projects where custom 3D assets were made: add "Custom assets" or "3D pipeline" badge
- Add Blender to the tech list on those project cards
- Optional: "Assets" or "Pipeline" subsection in project detail pages

### 8.3 "Beyond code" or "Creative pipeline" section

- Add a small block on homepage or About page
- E.g. "Beyond code — 3D asset creation for games" with 2–3 images
- Link to Blender blog posts
- Shows the skill without a full project write-up per model

### 8.4 Optional: Personal / hobby gallery

- `/personal` or `/creations` page — lightweight showcase of Blender work
- Or a "Personal & hobbies" subsection on About
- Only if you want a dedicated space; can be added later

---

## Phase 8.5: Text Component Migration (In Progress)

Adopted from .cursor rules. Migrate remaining pages to use the Text component.

### Completed

- Created `src/components/atoms/text.tsx` with variants (heading1–4, paragraph, small, mini)
- Added primary color abstraction (Tailwind + globals.css)
- Replaced all `purple-*` with `primary-*` across codebase
- Homepage (`src/app/page.tsx`) fully migrated to Text component

### Remaining

Replace raw `h1`, `h2`, `h3`, `h4`, `p`, `span` with `<Text>` in:

- `src/app/about/page.tsx`
- `src/app/contact/contact-form.tsx`
- `src/app/inquire/page.tsx`
- `src/app/projects/page.tsx`, `[slug]/page.tsx`, `page/[page]/page.tsx`
- `src/app/blog/page.tsx`, `[slug]/page.tsx`, `page/[page]/page.tsx`
- `src/app/manchester-services/page.tsx`
- `src/app/layout.tsx` (footer)
- Components: project-card, blog-card, skill-card, github-card, breadcrumbs, etc.

---

## Phase 9: Visual Overhaul & Possible shadcn/ui Migration (Future)

A larger refactor is being considered — changing the site's looks significantly. If doing a big visual overhaul anyway, consider migrating to **shadcn/ui** as part of it.

### 9.1 Rationale

- **shadcn/ui**: Copy-paste components built on Radix UI + Tailwind. You own the code, can customize freely.
- **Opportunity**: Big visual change = good time to swap custom components (InteractiveButton, Card, Input, Textarea, etc.) for shadcn primitives.
- **Benefits**: Radix accessibility out of the box, consistent design system, active ecosystem.

### 9.2 Suggested approach

1. Use shadcn for new/redesigned UI during the visual overhaul.
2. Gradually replace existing custom components rather than a big-bang migration.
3. Theme shadcn with your colour palette (purple, etc.) via CSS variables in `globals.css`.

### 9.3 Components to consider replacing

- `InteractiveButton` → shadcn `Button` (with variant customisation)
- `Card`, `Input`, `Textarea`, `Badge` → shadcn equivalents
- Forms: shadcn `Form` (react-hook-form + zod) if not already satisfied

### 9.4 Note

- Run `npx shadcn@latest init` to set up; then add components as needed.
- Migration can be incremental — no need to do it all at once.

---

## Phase 10: Portfolio Best Practices & Nice Additions

Recommendations gathered from common portfolio patterns and gaps identified in the current site.

### 10.1 Portfolio basics (higher impact)

| Item                               | Notes                                                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Testimonials / recommendations** | Add 2–3 short quotes from clients or colleagues. "What people say" block on homepage or About. Builds trust.                         |
| **Availability badge**             | "Currently available" or "Booked until X" in header/hero. Optional: Calendly link for booking calls.                                 |
| **RSS feed**                       | Add `/feed.xml` or `/rss.xml` route. Dev audiences expect it. Include `<link rel="alternate" type="application/rss+xml">` in layout. |
| **Custom 404 page**                | Replace default Next.js 404 with branded page + clear nav. Low effort, good polish.                                                  |

### 10.2 Nice additions

| Item                  | Notes                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------- |
| **Now / Uses page**   | `/now` or `/uses` – what you're working on, tools, setup. Popular with dev portfolios.       |
| **Blog enhancements** | TOC for long posts, reading progress bar, surface read time in UI, copy-link on headings.    |
| **Search**            | Cmd+K search modal for projects + blog posts. Project filter exists; full search would help. |
| **Human sitemap**     | `/sitemap` page listing main sections in a readable way (not just XML for crawlers).         |

### 10.3 Tech / package considerations

| Item                    | Notes                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| **Syntax highlighting** | `react-syntax-highlighter` is heavy. Consider Shiki, rehype-pretty-code, or Prism for smaller bundle.  |
| **Content pipeline**    | Gray-matter + next-mdx-remote works. Velite or @next/mdx only if you want typed content or native MDX. |
| **Analytics**           | Vercel Analytics + plausible-tracker – check both are used; one privacy-focused stack may be enough.   |
| **Tailwind v4**         | Plan migration when stable; could align with Phase 9 visual overhaul.                                  |

### 10.4 Priority (impact vs effort)

- **Low effort, high impact:** Testimonials, RSS feed
- **Low effort, medium impact:** Custom 404, availability badge, Now/Uses page
- **Medium effort:** Blog TOC + read time, search (Cmd+K), lighter syntax highlighter

---

## Checklist Summary

- [ ] Create `src/lib/logger.ts` with env-gated debug logging
- [ ] Replace/remove console calls in `performance.ts` and `social-share.tsx`
- [ ] Add `DEBUG` to `.env.example`
- [ ] Remove Contentlayer (config, tsconfig, README)
- [ ] Consolidate mobile nav (choose Enhanced or current)
- [ ] Create `src/lib/navigation.ts` and centralise nav items
- [ ] Change font from Inter to chosen alternative
- [ ] Refine `InteractiveButton` (remove rotate, reduce glow/scale)
- [ ] Vary hero gradients across pages
- [ ] Add visible `mailto:` with **new** domain email (footer + contact page)
- [ ] Update README and .cursorrules
- [ ] Set `productionBrowserSourceMaps: false`
- [ ] Fix `any` types in MDX and project structured data
- [ ] Sanitise SECURE_EMAIL_SETUP.md of real credentials
- [ ] **Phase 7:** Add web dev narrative to About page
- [ ] **Phase 7:** Add "Also experienced in" line on homepage (under skill cards)
- [ ] **Phase 7:** Optional: Create `/web-development` or `/services` page, link from footer
- [ ] **Phase 7:** Optional: Tag web projects for filter
- [ ] **Phase 8:** Add Blender / 3D pipeline blog tag/category
- [ ] **Phase 8:** Write 2–3 Blender blog posts (when ready)
- [ ] **Phase 8:** Add Blender/custom-asset badges to relevant Unity projects
- [ ] **Phase 8:** Add "Beyond code" / "Creative pipeline" section (homepage or About)
- [ ] **Phase 8:** Optional: Create `/personal` gallery for Blender work
- [ ] **Phase 9 (Future):** Visual overhaul — consider shadcn/ui migration as part of it
- [ ] **Phase 10:** Add testimonials section (homepage or About)
- [ ] **Phase 10:** Add availability badge (header/hero)
- [ ] **Phase 10:** Add RSS feed (`/feed.xml` or `/rss.xml`)
- [ ] **Phase 10:** Create custom 404 page
- [ ] **Phase 10:** Optional: Add `/now` or `/uses` page
- [ ] **Phase 10:** Optional: Blog TOC, reading progress, read time in UI
- [ ] **Phase 10:** Optional: Cmd+K search for projects + blog
- [ ] **Phase 10:** Optional: Human-readable `/sitemap` page
- [ ] **Phase 10:** Optional: Swap syntax highlighter for lighter option (Shiki/Prism)

---

## Appendix A: .cursor Rules Audit

**Important:** The current `.cursor/rules/` files appear to be migrated from a different project (Client.Operations). Many rules reference paths and components that don't exist in this portfolio. Below: (1) which rules don't apply, (2) which apply and current compliance, (3) recommended actions.

### A.1 Rules that DON'T apply (project-specific)

| Rule file                                                                       | Why it doesn't apply                                                                                                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **components.mdc**                                                              | References `Text` component, `FormFieldWrapper`, `Dialog` in `molecules/` — none exist. Portfolio uses raw `h1`/`h2`/`p` and different structure. |
| **styling.mdc**                                                                 | Requires `bg-primary-500` / `bg-primary-600/90`. Portfolio uses `purple-500`, `purple-600` — no `primary` abstraction.                            |
| **routing.mdc**                                                                 | Requires `ROUTES` from constants — portfolio uses hardcoded paths.                                                                                |
| **api.mdc**                                                                     | API client generation, Swagger — portfolio has no generated API client.                                                                           |
| **data-handling.mdc**                                                           | Requires `day.js`, mappers in `api/mappers/` — portfolio uses `new Date()`, no mappers.                                                           |
| **hooks.mdc**                                                                   | React Query mutation hooks — portfolio doesn't use React Query.                                                                                   |
| **api-regeneration-workflow**, **ef-migrations**, **after-backend-api-changes** | Backend-specific; no relevance.                                                                                                                   |
| **documentation.mdc**                                                           | References `Client.Operations/documentation/` — doesn't exist.                                                                                    |

### A.2 Rules that apply — current compliance

| Rule                               | Requirement                                                       | Status                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **react-patterns: Server/Client**  | Prefer server components                                          | OK — pages are server; interactive parts isolated                                                |
| **react-patterns: Named imports**  | Use `import { useState } from "react"`, never `import * as React` | Violation: `contact-form.tsx` uses `import React, { useRef, useState }`                          |
| **types: No enums**                | Use union types instead of `enum`                                 | OK — no enums                                                                                    |
| **code-quality: Comments**         | Avoid obvious comments                                            | Violation: Many `{/* Hero Section */}` etc. in about, skeleton-loader                            |
| **file-naming: kebab-case**        | Files in kebab-case                                               | OK — most files follow                                                                           |
| **file-naming: Component folders** | Each component in own folder with index                           | N/A — portfolio uses flat structure; large refactor to adopt                                     |
| **components: const + type**       | Use `const ComponentName = () => {}` and `type` for props         | N/A — portfolio uses `function` and `interface`; Next.js pages may use `export default function` |
| **data-handling: new Date()**      | Use day.js                                                        | Violation: `layout.tsx` uses `new Date().getFullYear()`                                          |

### A.3 Recommended actions

1. **contact-form.tsx:** Change to `import { useRef, useState, useEffect } from "react"`; use direct `useEffect` calls.
2. **Comments:** Remove or reduce obvious section comments; keep only "why" comments.
3. **new Date():** For copyright year, either keep (acceptable) or add day.js.
4. **Portfolio-specific rules:** Consider adding `.cursor/rules/portfolio.mdc` tailored to this codebase; archive or scope Client.Operations rules if they're for another project.

### A.4 Checklist

- [ ] Fix `contact-form.tsx` React import (named imports only)
- [ ] Remove or reduce obvious section comments
- [ ] Decide: portfolio-specific rules vs adapt to current rules
