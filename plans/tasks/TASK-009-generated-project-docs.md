# TASK-009: Generated Project Docs

## Status
Todo

## Depends On
TASK-006, TASK-007, TASK-008

## Blocks
TASK-010, TASK-011

## Goal
Add generated project documentation that explains how to run, inspect, and extend a freshly created Bankstack project.

## Context
The generated scaffold should be understandable without rereading the Bankstack source repository. Documentation should clarify local-first behavior, external service boundaries, and what the scaffold intentionally does not include yet.

## Scope
Create generated README and setup notes covering install, local development, build/check commands, app/package layout, Cloudflare config examples, Supabase env placeholders, and the lack of Python compute in v0.1.

## Out Of Scope
Do not build the public Bankstack docs site, write long-form marketing copy, implement missing code, or document unsupported package managers.

## Implementation Notes
Keep docs practical and command-oriented. Mention that the project is pnpm-only. Explain that Supabase and Cloudflare credentials are optional for local scaffold verification but required for real deployment/auth.

## Acceptance Criteria
- Generated project includes a README with local-first setup and usage.
- Documentation accurately describes generated apps and packages.
- Documentation identifies external setup steps without claiming automation.
- Documentation makes clear that Python compute is not included in v0.1.

## Verification
Generate a project and read the generated docs against the actual file tree. Run documented local commands where feasible.

## Handoff Notes
TASK-010 and TASK-011 should use the documented commands as part of their test design where practical.
