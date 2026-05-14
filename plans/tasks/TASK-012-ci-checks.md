# TASK-012: CI Checks

## Status

Todo

## Depends On

TASK-010, TASK-011

## Blocks

TASK-013

## Goal

Add CI checks that protect the CLI MVP before alpha publish prep.

## Context

Before publishing even an alpha, the repo should automatically verify install, CLI tests, and generated-project smoke tests on pull requests or pushes.

## Scope

Add GitHub Actions workflows for dependency installation, root/package checks, CLI golden tests, and generated-project smoke tests. Document any cache choices or expected runtime.

## Out Of Scope

Do not configure npm token publishing, automated releases, Cloudflare deployment, or Supabase provisioning.

## Implementation Notes

Use pnpm in CI. Keep the workflow readable and close to local commands. If smoke tests are expensive, keep them in the workflow but structure the job so failures are easy to diagnose.

TASK-011 added the local generated-project smoke command as `pnpm smoke:generated`. In CI, run the faster CLI package tests first, then run `pnpm smoke:generated` in a separate step so generated install/check/build failures are isolated in the logs. The smoke test installs dependencies from the npm registry in a temporary generated project, so the CI job needs normal outbound registry access but no Cloudflare, Supabase, or publishing secrets.

## Acceptance Criteria

- CI installs dependencies with pnpm.
- CI runs CLI tests and generated-project smoke tests.
- Workflow names and commands match documented local scripts.
- No publishing secrets are required.

## Verification

Run the same commands locally. If possible, inspect workflow syntax with available tooling before committing.

## Handoff Notes

TASK-013 depends on CI being green, but actual npm publishing remains manual for the alpha.

Suggested local command sequence before committing TASK-012:

- `pnpm install --frozen-lockfile`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`
