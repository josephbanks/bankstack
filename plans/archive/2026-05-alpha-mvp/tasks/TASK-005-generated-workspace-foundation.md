# TASK-005: Generated Workspace Foundation

## Status

Done

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

Implementation notes:

- The CLI now renders the `workspace` template instead of the TASK-004 placeholder.
- Generated root files are `package.json`, `pnpm-workspace.yaml`, `nx.json`, `tsconfig.base.json`, `.gitignore`, `.prettierignore`, and `README.md`.
- Exact generated tool versions are sourced from `packages/create-bankstack/templates/versions.json` and expanded into template variables by `src/template-variables.ts`.
- The generated workspace is pnpm-only with `packageManager: pnpm@10.33.2`, `engines.pnpm: 10.33.2`, and workspace globs for `apps/*` and `packages/*`.
- The generated `nx.json` includes workspace-level `namedInputs`, a `production` named input, cacheable `build`/`check`/`test` target defaults, and no generated app/package projects yet.
- The TASK-004 `placeholder` template remains only as a renderer fixture for binary-copy and filename-interpolation checks.
- No Astro, SvelteKit, Hono, shared package, Cloudflare config, Supabase helper, or Python compute layer was generated in this task.

Verification performed:

- `pnpm --filter create-bankstack test`
- `pnpm run check`
- `pnpm run build`
- `pnpm run test`
- `pnpm format:check`
- Generated `/private/tmp/bankstack-task005-hqm6Iv/foundation-app` with `node packages/create-bankstack/dist/index.js foundation-app --name foundation-app --no-install --no-git` and confirmed the seven root files.
- In the generated temp workspace, `pnpm install --lockfile-only --offline` succeeded.
- In the generated temp workspace after a network-capable `pnpm install`, `pnpm format:check`, `pnpm check`, `pnpm build`, and `pnpm test` succeeded. The Nx commands reported `No tasks were run`, which is expected before TASK-006 and TASK-007 add projects.
- `bankstack_reviewer` found no critical issues; `smoke_tester` independently confirmed the root checks and generated file shape.

Primary/current sources checked:

- pnpm workspace docs: https://pnpm.io/pnpm-workspace_yaml
- pnpm workspace protocol/config docs: https://pnpm.io/workspaces
- Node.js Corepack/package manager behavior: https://r2.nodejs.org/download/release/latest-v22.x/docs/api/corepack.html
- Nx inputs and named inputs docs: https://nx.dev/docs/reference/inputs
- Nx `nx.json` reference: https://nx.dev/docs/reference/nx-json
