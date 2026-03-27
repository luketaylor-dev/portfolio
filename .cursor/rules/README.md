# Cursor project rules

Rules for this repository: **Next.js App Router**, React, TypeScript, Tailwind, Jest, **pnpm**.

Each concern lives in a focused `.mdc` file. Files with YAML frontmatter (`alwaysApply`, `globs`) control when Cursor applies them.

## Rule files

| File | Purpose |
|------|---------|
| `code-quality.mdc` | Engineering bar, errors, validation, comments |
| `pnpm.mdc` | Use pnpm only for install and scripts |
| `context7.mdc` | Use Context7 for library/framework docs before integrating |
| `docs-folder.mdc` | `.cursor/docs` is reference-only; do not edit |
| `documentation.mdc` | Where to put human-written project docs |
| `file-naming.mdc` | `kebab-case` files and layout under `src/` |
| `react-patterns.mdc` | Server vs client components, imports |
| `components.mdc` | `Text`, dialogs, forms, component conventions |
| `routing.mdc` | Navigation and optional route centralisation |
| `hooks.mdc` | Custom hooks, effects, derived state |
| `styling.mdc` | Tailwind and interactive states |
| `data-handling.mdc` | Mapping, parsing, dates |
| `types.mdc` | Unions over enums, typing habits |
| `api.mdc` | `src/app/api` route handlers |
| `frontend-definition-of-done.mdc` | Lint, type-check, tests before “done” |
| `prop-drilling.mdc` | Props vs context |

## Repo root

See **`CLAUDE.md`** for the same standards for Claude Code and other agents.
