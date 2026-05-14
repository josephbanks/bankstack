# TASK-010: CLI Golden Tests

## Status
Todo

## Depends On
TASK-003, TASK-009

## Blocks
TASK-012

## Goal
Add durable golden tests that verify the CLI renders stable, expected output.

## Context
Template-first generation is only useful if changes are intentional and reviewable. Golden tests should catch accidental drift in generated files and CLI option behavior.

## Scope
Add tests that run the CLI against temporary directories and compare selected generated files or snapshots to expected output. Cover project name interpolation, flags, and generated docs/root files.

## Out Of Scope
Do not run full dependency installation or app builds in this task. That belongs to TASK-011.

## Implementation Notes
Choose a test approach that fits the repo foundation and package tooling. Keep snapshots stable and avoid including machine-specific paths or timestamps. Prefer focused golden coverage over snapshotting every generated file if full snapshots become noisy.

## Acceptance Criteria
- Test suite covers the core CLI rendering path.
- Tests cover at least one non-interactive flag flow.
- Golden expectations are deterministic across machines.
- Tests can run from the root or package scripts.

## Verification
Run the CLI package test command and any root test command added for this suite.

## Handoff Notes
TASK-012 should wire these tests into CI. TASK-011 should complement these tests with install/build smoke coverage.
