# TASK-013: Alpha Publish Prep

## Status
Todo

## Depends On
TASK-012

## Blocks
TASK-014

## Goal
Prepare the manual `create-bankstack@0.1.0-alpha.0` npm release.

## Context
The first release should be real and installable, but clearly marked as alpha. Publishing should happen only after tests and smoke checks are passing.

## Scope
Verify npm package name availability, finalize package metadata, add release notes or checklist, confirm files included in the package, and document the manual publish command sequence.

## Out Of Scope
Do not automate npm publishing with tokens, publish a stable `0.1.0`, deploy docs, or add new product features.

## Implementation Notes
If `create-bankstack` is unavailable, document the naming issue and propose the smallest naming adjustment before changing package identity. Use `0.1.0-alpha.0` for the first alpha unless a prior release exists.

## Acceptance Criteria
- Package name availability or naming blocker is documented.
- Package metadata is ready for npm alpha publication.
- Manual publish checklist exists and references required verification commands.
- Package contents are reviewed so templates and built CLI files are included correctly.

## Verification
Run package dry-run commands where available, such as pack or publish dry-run. Confirm CI checks are passing before any real publish.

## Handoff Notes
After alpha publish prep, TASK-014 can begin the dogfood docs site milestone.
