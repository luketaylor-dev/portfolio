# CLAUDE project guide

This file mirrors `.cursor/rules` so Claude follows the same standards as Cursor for this repo.

## Stack

- Next.js App Router (`src/app`)
- React + TypeScript
- Tailwind CSS + shared UI (`src/components`, including `atoms` / `ui` as applicable)
- Jest + Testing Library
- **pnpm** for all install and script commands

## Core

- TypeScript-first; avoid `any` unless justified.
- Focused diffs; no unrelated refactors in the same task.
- Preserve behavior unless the request changes it.
- Never commit secrets or `.env` contents.
- Validate untrusted input at boundaries (routes, forms, params).
- Use **Context7** to verify library/framework docs before non-trivial integration changes.

## Next.js

- Default to Server Components; `'use client'` only when needed.
- Keep route files thin; put reusable logic in `src/lib` or colocated modules.
- Use metadata APIs for SEO / Open Graph / canonical URLs where relevant.
- **`src/app/api`:** validate inputs, stable JSON responses, no leaked internals (see `.cursor/rules/api.mdc`).

## React and components

- Small, composable components; explicit prop types.
- Follow `.cursor/rules/components.mdc` for this project (e.g. `Text` from `@/components/atoms` where that rule applies).
- Explicit loading, empty, error, and success states.
- Keyboard accessibility and visible focus for interactive UI.

## Styling

- Tailwind-first; readable class grouping; reuse primitives.
- Respect contrast, touch targets, and reduced motion where applicable.

## Data

- Keep heavy mapping/transform logic out of route files when it grows; use `src/lib` helpers with clear types.
- See `.cursor/rules/data-handling.mdc` and `types.mdc`.

## Before “done”

- Run **`pnpm type-check`**, **`pnpm lint`**, and **tests** for changed behavior (see `.cursor/rules/frontend-definition-of-done.mdc`).

## Reference-only

- **Do not edit** `.cursor/docs` unless the user explicitly asks (curated reference only).

## Agent behavior

- Explain meaningful tradeoffs briefly when architecture changes.
- Ask only when requirements are genuinely ambiguous.
- Prefer maintainable patterns over clever abstractions.
