# TASK-012: CI Checks

## Status

Done

## Depends On

TASK-010, TASK-011

## Blocks

TASK-013

## Goal

Add CI checks that protect the CLI MVP before alpha publish prep.

## Context

Before publishing even an alpha, the repo should automatically verify install, CLI tests, and generated-project smoke tests on pull requests or pushes.

This repository is expected to be hosted on GitHub for the alpha path, so GitHub Actions is the right first CI surface for repository validation. That does not make Actions the deployment strategy for every future Bankstack surface: the long-running marketing/docs site should use Cloudflare's standard GitHub integration when that milestone begins.

## Scope

Add GitHub Actions workflows for dependency installation, root/package checks, CLI golden tests, and generated-project smoke tests. Document any cache choices or expected runtime. Keep the workflow focused on CLI/package confidence rather than site deployment.

## Out Of Scope

Do not configure npm token publishing, automated releases, Cloudflare deployment, marketing/docs site deployment, or Supabase provisioning.

## Implementation Notes

Use pnpm in CI. Keep the workflow readable and close to local commands. If smoke tests are expensive, keep them in the workflow but structure the job so failures are easy to diagnose.

Treat GitHub Actions as a repo correctness gate for the npm CLI alpha. Cloudflare Pages or Workers deployment should stay separate and be handled through Cloudflare's GitHub integration in the dogfood docs/site milestone or a later deployment task.

TASK-011 added the local generated-project smoke command as `pnpm smoke:generated`. In CI, run the faster CLI package tests first, then run `pnpm smoke:generated` in a separate step so generated install/check/build failures are isolated in the logs. The smoke test installs dependencies from the npm registry in a temporary generated project, so the CI job needs normal outbound registry access but no Cloudflare, Supabase, or publishing secrets.

## Acceptance Criteria

- CI installs dependencies with pnpm.
- CI runs CLI tests and generated-project smoke tests.
- Workflow names and commands match documented local scripts.
- No publishing secrets are required.

## Verification

- `pnpm install --frozen-lockfile`
- `pnpm exec prettier --check .github/workflows/ci.yml README.md plans/TRACKER.md plans/tasks/TASK-012-ci-checks.md`
- `pnpm format:check`
- `pnpm check`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`

The first sandboxed `pnpm smoke:generated` run could not reach `registry.npmjs.org` and was terminated after repeated `ENOTFOUND` retries. The rerun with registry access passed.

## Handoff Notes

TASK-013 depends on CI being green, but actual npm publishing remains manual for the alpha.

CI uses `pnpm/action-setup@v6` to install pnpm from the root `packageManager` field and `actions/setup-node@v6` with the built-in pnpm cache keyed by `pnpm-lock.yaml`. Sources checked:

- https://github.com/pnpm/action-setup
- https://github.com/actions/setup-node
