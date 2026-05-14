# TASK-006: Generated App Templates

## Status
Todo

## Depends On
TASK-005

## Blocks
TASK-009, TASK-011

## Goal
Add generated app templates for the core split-stack: Astro marketing, SvelteKit dashboard, and Hono API.

## Context
The CLI MVP should prove the Bankstack architecture with a minimal connected demo. The generated project should include `apps/marketing`, `apps/dashboard`, and `apps/api`, but not optional Python compute.

## Scope
Create template files for `apps/marketing`, `apps/dashboard`, and `apps/api`. Marketing should render a simple home page. Dashboard should render a minimal app shell and call the API health endpoint. API should expose `/health` and a protected-route stub showing the auth middleware boundary.

## Out Of Scope
Do not add full auth UI, persistence, mini CRUD demos, Python compute, public docs site, or full visual design polish. Do not implement shared packages except as required imports already defined by TASK-007.

## Implementation Notes
Keep the demo minimal and local-first. If service binding behavior cannot run locally without external setup, provide a local fallback that still demonstrates the intended boundary. Align framework choices with `ARCHITECTURE_OVERVIEW.md`.

## Acceptance Criteria
- Generated project includes `apps/marketing`, `apps/dashboard`, and `apps/api`.
- API has `/health` and a protected-example route stub.
- Dashboard demonstrates a health check call path.
- Generated apps do not require Cloudflare or Supabase credentials to render/build locally.

## Verification
Generate a project and run app-level build/check commands as available. Manually inspect generated app files for the intended split-stack shape.

## Handoff Notes
TASK-011 will turn this into an automated generated-project smoke test. TASK-009 should document the local demo behavior.
