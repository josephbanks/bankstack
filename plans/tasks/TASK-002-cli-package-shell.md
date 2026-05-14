# TASK-002: CLI Package Shell

## Status

Done

## Depends On

TASK-001

## Blocks

TASK-003, TASK-004

## Goal

Create the initial `packages/create-bankstack` package with a buildable TypeScript CLI shell and binary entrypoint.

## Context

The first real product milestone is `create-bankstack@0.1.0-alpha.0`. The CLI should eventually generate a Bankstack split-stack workspace from versioned templates, but this task only creates the package shell.

## Scope

Add `packages/create-bankstack` with package metadata, TypeScript config, source entrypoint, binary declaration, and minimal command output that proves the binary can run. Wire the package into root workspace scripts as appropriate.

## Out Of Scope

Do not implement prompts, flags, template rendering, generated workspace files, tests beyond a basic package sanity check, or npm publishing.

## Implementation Notes

Use the package and binary name `create-bankstack`, pending npm availability in TASK-013. Keep the entrypoint small and easy to replace. Prefer exact dependency versions once dependencies are introduced.

## Acceptance Criteria

- `packages/create-bankstack` exists and is included in the workspace.
- The package builds or type-checks successfully.
- The binary entrypoint can be invoked locally and prints a clear placeholder message.
- No generated project templates are added yet.

## Verification

Run the package build/type-check command and invoke the local CLI binary through the package manager or built output.

## Handoff Notes

TASK-003 should replace the placeholder command behavior with the MVP prompt and flag contract. TASK-004 should add the rendering engine after the shell exists.

Implementation notes for follow-on work:

- The package and binary are named `create-bankstack`.
- The bin points at built output, `./dist/index.js`; local verification invoked that file directly after `pnpm run build`.
- TypeScript is pinned exactly at `typescript@6.0.3`; Node types are pinned exactly at `@types/node@25.7.0`.
- `pnpm --filter create-bankstack exec create-bankstack` was not used as the verification path because pnpm does not expose a package's own bin through that command before package installation/linking. The built binary entrypoint was verified with `node packages/create-bankstack/dist/index.js`, `node packages/create-bankstack/dist/index.js --version`, and the package test script.

Primary/current sources checked:

- npm `bin` field docs: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#bin
- TypeScript project references/build-mode docs: https://www.typescriptlang.org/docs/handbook/project-references
