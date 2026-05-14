# TASK-007: Generated Shared Packages

## Status
Todo

## Depends On
TASK-005

## Blocks
TASK-009, TASK-011

## Goal
Add generated shared package templates for UI, Supabase, and cross-app utilities.

## Context
Bankstack encodes architecture and boundaries, not a fake application domain. Shared packages should prove the intended reuse points without inventing product-specific tables or workflows.

## Scope
Create templates for `packages/ui`, `packages/supabase`, and `packages/shared-utils`. `packages/ui` should include Tailwind v4 theme CSS and a tiny primitive/example. `packages/supabase` should include env contracts, typed client helpers, and placeholder migration/RLS notes. `packages/shared-utils` should include shared constants and/or Zod validation helpers.

## Out Of Scope
Do not add a full shadcn-svelte setup, real product database schema, full auth flow, app templates, or smoke tests.

## Implementation Notes
Use exact dependency versions. Keep package exports clear so generated apps can consume them. Supabase placeholders should make security boundaries visible without requiring real credentials for local builds.

## Acceptance Criteria
- Generated project includes the three shared packages.
- UI package exposes shared theme/primitives for frontend apps.
- Supabase package documents and types the expected env/auth boundary without product tables.
- Shared utilities package can be imported by API and/or frontend templates.

## Verification
Generate a project and run package build/type-check commands as available. Inspect exports and imports for consistency.

## Handoff Notes
Coordinate imports with TASK-006. If TASK-006 is already complete, update app templates only where necessary to consume the shared packages.
