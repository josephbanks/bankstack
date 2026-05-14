# TASK-005: Generated Workspace Foundation

## Status

Todo

## Depends On

TASK-004

## Blocks

TASK-006, TASK-007, TASK-008

## Goal

Create the generated project root template for a pnpm/Nx Bankstack workspace.

## Context

The CLI MVP should create a local-first runnable split-stack workspace. Before adding apps and packages, the generated root needs workspace metadata, scripts, and conventions.

## Scope

Add template files for generated root `package.json`, `pnpm-workspace.yaml`, `nx.json`, `.gitignore`, README stub if needed, TypeScript/workspace config if needed, and local-first scripts that later app/package templates can plug into.

## Out Of Scope

Do not add Astro, SvelteKit, Hono, shared package implementations, Cloudflare configs, Supabase helpers, or tests beyond basic render validation.

## Implementation Notes

Generated projects are pnpm-only. Use exact pinned dependency versions. Keep scripts aligned with future `build`, `check`, `test`, and local dev workflows. Avoid requiring external service credentials at this stage.

## Acceptance Criteria

- Running the CLI can create a generated project root with valid workspace metadata.
- Generated root files reference pnpm only.
- Generated root scripts are ready for future app/package tasks.
- No Python compute layer is generated.

## Verification

Generate into a temporary directory and inspect root files. Run any package-manager validation that does not depend on app templates yet.

## Handoff Notes

TASK-006, TASK-007, and TASK-008 can proceed after this root template is stable.
