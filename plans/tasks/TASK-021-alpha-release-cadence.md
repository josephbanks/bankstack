# TASK-021: Alpha Release Cadence

## Status

Todo

## Depends On

None

## Blocks

TASK-023

## Goal

Refresh the release checklist and cadence notes so alpha releases, npm dist-tags, and the path to stable promotion are explicit.

## Context

The first alpha publish path is documented in `packages/create-bankstack/RELEASE.md`. The package has alpha-era dist-tag caveats, and future sessions need a clean process for deciding when to publish another alpha or prepare a stable release.

## Scope

Review current package metadata, release checklist, npm dist-tag notes, CI expectations, and docs references. Update release guidance so it matches the current alpha state and clearly separates alpha patch releases from future stable promotion.

## Out Of Scope

Do not publish to npm, add npm tokens, automate releases in CI, or change package identity unless the release checklist itself proves a blocker that must be split into a separate task.

## Implementation Notes

Use current npm/package-manager behavior from primary sources if a release decision depends on it. Keep commands manual and explicit. Preserve the caution not to unpublish alpha versions to fix dist-tags.

## Acceptance Criteria

- `packages/create-bankstack/RELEASE.md` reflects the current alpha version, dist-tag reality, and next release path.
- The stable-promotion path is described without promising a date.
- CI and local verification expectations are clear before publish.
- Any unresolved release questions are captured as follow-up notes.

## Verification

Run formatting checks. If npm behavior or dist-tag status is referenced, verify it against the npm registry immediately before making claims.

## Handoff Notes

None yet.
