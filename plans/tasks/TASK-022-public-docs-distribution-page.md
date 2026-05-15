# TASK-022: Public Docs Distribution Page

## Status

Done

## Depends On

TASK-019, TASK-020

## Blocks

TASK-023

## Goal

Create or refine a public docs entrypoint that explains how users adopt Bankstack through the CLI, the skill, current alpha limits, and feedback paths.

## Context

The docs site has pages for the alpha CLI, generated workspace, Cloudflare boundary, Supabase boundary, and dogfood/future skill alignment. After source docs cleanup and skill packaging guidance, the docs should give users one clear distribution-oriented path.

## Scope

Add or revise docs content under `apps/docs` so users can choose between greenfield CLI scaffolding and existing-project skill guidance. Include current limits and issue/feedback paths without promising unsupported automation.

## Out Of Scope

Do not redesign the docs site, add search/analytics/CMS, publish the skill, automate npm releases, or modify generated templates unless the docs expose a separate concrete bug.

## Implementation Notes

Keep the docs alpha-honest. The CLI is the greenfield path; the skill is the existing-project/agent-session path. Link to generated golden docs only for claims that match the templates.

## Acceptance Criteria

- Public docs include a clear distribution/adoption page or equivalent entrypoint.
- The page explains CLI install, skill usage, current limits, and feedback paths.
- Navigation exposes the distribution content where alpha users can find it.
- Docs claims are checked against current package docs, generated output, and skill content.

## Verification

Run the docs check/build commands and workspace checks. Review generated routes locally if needed.

## Handoff Notes

Completed in this session:

- Added `apps/docs/src/content/docs/distribution.md` as the public adoption entrypoint for CLI, skill, alpha limits, and feedback paths.
- Linked the distribution guide from the homepage and docs hub.
- Extended dogfood verification to require the distribution route and key CLI/skill/feedback claims.

Verification:

- `pnpm format`
- `pnpm format:check`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`
