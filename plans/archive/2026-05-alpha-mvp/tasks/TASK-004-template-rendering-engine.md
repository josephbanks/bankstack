# TASK-004: Template Rendering Engine

## Status

Done

## Depends On

TASK-002

## Blocks

TASK-005

## Goal

Add the template-first copy/render engine that will power generated Bankstack projects.

## Context

Bankstack should generate predictable output from versioned templates in this repository rather than shelling out to upstream generators at create time. This makes output easier to test, review, and publish.

## Scope

Create the internal template directory structure, rendering/copy utilities, ignore rules, variable interpolation conventions, and exact-version dependency policy. Add a small placeholder template if needed to prove rendering works.

## Out Of Scope

Do not build the full generated workspace, app templates, shared packages, Cloudflare configs, or golden tests in this task.

## Implementation Notes

Keep interpolation simple and explicit. Avoid ad hoc shelling out for file generation. Ensure binary-safe copying works for future assets even if v0.1 templates are mostly text. Document how template variables are named and where exact dependency versions live.

## Acceptance Criteria

- CLI code can copy/render templates into a target directory.
- Template variable conventions are documented near the template engine.
- Exact dependency version policy is represented in templates or supporting metadata.
- Placeholder rendering is covered by a lightweight local check or manual verification.

## Verification

Run the CLI or an internal script against a temporary directory and inspect rendered output. Confirm no product templates beyond placeholders are accidentally introduced.

## Handoff Notes

TASK-005 should replace or extend the placeholder template with the generated workspace root.

Implementation notes:

- Template rendering lives in `packages/create-bankstack/src/render-template.ts`.
- The CLI renders the `placeholder` template into the validated target directory so TASK-004 has an end-to-end path without introducing real generated workspace files early.
- Template variables use uppercase snake case with `{{VARIABLE_NAME}}`; the convention is documented in `packages/create-bankstack/templates/README.md`.
- Text templates are rendered as UTF-8; unknown/non-text files are copied with `copyFile` to stay binary-safe for future assets.
- Template symlinks are rejected.
- Exact generated dependency policy is represented by `packages/create-bankstack/templates/versions.json`.
- `package.json` includes both `dist` and `templates` in the publishable files list.

Verification performed:

- `pnpm run check`
- `pnpm run build`
- `pnpm run test`
- `pnpm --filter create-bankstack pack --dry-run`

Primary/current sources checked:

- Node.js filesystem docs for `copyFile`, recursive directory reads, and `Dirent`: https://nodejs.org/api/fs.html
- Node.js path docs for `relative` and `resolve`: https://nodejs.org/api/path.html
