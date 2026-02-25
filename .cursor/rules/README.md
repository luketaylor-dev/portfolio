# Cursor Project Rules

This directory contains Project Rules for the Cursor IDE, organized by domain.

## Migration from .cursorrules

The single `.cursorrules` file (1110 lines) has been refactored into focused `.mdc` files following Cursor's latest guidance:

- Each rule file is under 500 lines
- Rules are organized by domain/topic
- Better maintainability and discoverability

## Rule Files

- **file-naming.mdc** - File naming conventions and component structure
- **components.mdc** - Component patterns (Text component, Dialogs, syntax)
- **react-patterns.mdc** - Server/Client components, React imports
- **code-quality.mdc** - Code comments and quality guidelines
- **documentation.mdc** - Documentation organization
- **data-handling.mdc** - Date handling and data mapping
- **api.mdc** - API client generation and error handling
- **api-regeneration-workflow.mdc** - Workflow for regenerating client API after backend changes
- **types.mdc** - TypeScript type conventions (enums, unions)
- **routing.mdc** - Route constants and navigation
- **hooks.mdc** - Mutation hooks and side effects
- **styling.mdc** - Styling conventions (selected states, hover states)

## Reference

The old `.cursorrules` file has been backed up as `.cursorrules.old` for reference.

