# TASK-004: Template Rendering Engine

## Status
Todo

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
