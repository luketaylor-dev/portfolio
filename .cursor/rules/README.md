# Cursor Project Rules

This directory contains Project Rules for the Cursor IDE, organized by domain.

## Migration from .cursorrules

The single `.cursorrules` file (1110 lines) has been refactored into focused `.mdc` files following Cursor's latest guidance:

- Each rule file is under 500 lines
- Rules are organized by domain/topic
- Better maintainability and discoverability

## Rule Files

- **file-naming.mdc** - File naming (kebab-case)
- **components.mdc** - Component patterns (Text component, syntax)
- **react-patterns.mdc** - Server/Client components, React imports
- **code-quality.mdc** - Code comments and quality guidelines
- **documentation.mdc** - Documentation organization
- **data-handling.mdc** - Types, form data, mapping
- **types.mdc** - TypeScript conventions (union types over enums)
- **routing.mdc** - Route constants and navigation
- **hooks.mdc** - useEffect and useMemo guidance
- **styling.mdc** - Styling conventions (primary palette, selected/hover)
- **prop-drilling.mdc** - Prop passing and Context usage
- **context7.mdc** - Use Context7 for library/framework docs
- **pnpm.mdc** - Package manager (pnpm only)

## Reference

The old `.cursorrules` file has been backed up as `.cursorrules.old` for reference.
