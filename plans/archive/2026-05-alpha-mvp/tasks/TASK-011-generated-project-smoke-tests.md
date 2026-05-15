# TASK-011: Generated Project Smoke Tests

## Status

Done

## Depends On

TASK-006, TASK-007, TASK-008, TASK-009

## Blocks

TASK-012

## Goal

Add smoke tests proving a freshly generated Bankstack project can install and pass local build/check commands.

## Context

The CLI MVP promise is a local-first runnable split-stack scaffold. Smoke tests should verify that a generated project is not just a file tree, but a usable workspace.

## Scope

Create a test that generates a project in a temporary directory, runs `pnpm install`, and runs the generated build/check commands that are intended to work without Cloudflare or Supabase credentials.

## Out Of Scope

Do not deploy to Cloudflare, provision Supabase, run production publish steps, or validate optional Python compute.

## Implementation Notes

Keep smoke tests realistic but bounded. If dependency installation is slow, document expected runtime and consider marking the smoke test separately from fast unit/golden tests. Ensure temp directories are cleaned up or clearly ignored.

## Acceptance Criteria

- A generated project can install dependencies with pnpm.
- Generated build/check commands pass without real external credentials.
- Smoke test failure output makes it clear which generated command failed.
- Test does not depend on user-specific paths or accounts.

## Verification

Run the smoke test locally from a clean state. Confirm it fails meaningfully if the generated project is broken.

## Handoff Notes

Implemented `pnpm smoke:generated`, which delegates to `packages/create-bankstack` and runs `tsc -p tsconfig.json && node scripts/smoke-generated-project.mjs`.

The smoke script builds the CLI, generates a temp `smoke-stack` project with `--no-install --no-git`, then runs these generated-project commands:

- `pnpm install --no-frozen-lockfile --reporter=append-only`
- `pnpm format:check`
- `pnpm check`
- `pnpm build`
- `pnpm test`

Verification completed locally on 2026-05-14:

- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`

The generated install needs npm registry access and took about 30 seconds once dependencies were reachable from the pnpm store. The script cleans up its temp directory by default; set `BANKSTACK_KEEP_SMOKE_TEMP=1` when debugging a generated project failure.

TASK-012 should run `pnpm --filter create-bankstack test` before `pnpm smoke:generated` so golden failures stay quick and easy to diagnose.
