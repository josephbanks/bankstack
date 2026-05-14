# TASK-011: Generated Project Smoke Tests

## Status
Todo

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
TASK-012 should run this smoke test in CI after golden tests pass.
