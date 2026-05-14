# TASK-003: CLI Prompts And Flags

## Status
Todo

## Depends On
TASK-002

## Blocks
TASK-010

## Goal
Implement the v0.1 CLI interaction contract without yet requiring the final generated workspace templates.

## Context
The CLI should work for humans and automation. It must support interactive prompts plus scriptable flags so tests and future agents can create projects deterministically.

## Scope
Implement `create-bankstack [directory]` with prompts and flags for `--name`, `--yes`, `--no-install`, `--no-git`, and guarded overwrite behavior. Validate project names and target directories. Print clear next steps based on install and git choices.

## Out Of Scope
Do not complete template generation, generated app code, golden tests, smoke tests, or dependency installation behavior beyond a controlled prompt/flag path.

## Implementation Notes
Default to prompting for dependency installation, with the default answer set to yes. `--yes` should choose safe defaults. `--force` should be required before overwriting a non-empty directory, if overwrite support is included. Make non-interactive behavior deterministic for tests.

## Acceptance Criteria
- CLI accepts the required positional argument and flags.
- Interactive and non-interactive flows resolve to the same internal options shape.
- Invalid names and unsafe target directories fail with clear messages.
- `--no-install` and `--no-git` are reflected in final next-step output.

## Verification
Run local CLI invocations covering interactive defaults where feasible and non-interactive flag combinations. Confirm failures return non-zero exit codes.

## Handoff Notes
TASK-010 will add durable test coverage for this command contract. Keep option parsing isolated so the template renderer can consume it cleanly.
