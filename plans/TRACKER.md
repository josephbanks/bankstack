# Bankstack Task Tracker

This tracker is the source of truth for Bankstack planning status, dependencies, blockers, and recommended execution order. Individual work packets live in [tasks](tasks).

## Status Values

Use only `Todo`, `Doing`, `Blocked`, or `Done`.

## Recommended Dependency Flow

```text
TASK-000
  -> TASK-001
    -> TASK-002
      -> TASK-003
      -> TASK-004
        -> TASK-005
          -> TASK-006
          -> TASK-007
          -> TASK-008
            -> TASK-009
              -> TASK-010
              -> TASK-011
                -> TASK-012
                  -> TASK-013
                    -> TASK-014
                      -> TASK-015
```

## Phase 0: Planning System

| ID       | Task                                                 | Status | Depends On | Blocks   | Owner/Session                   | Acceptance Summary                                                                               |
| -------- | ---------------------------------------------------- | ------ | ---------- | -------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| TASK-000 | [Planning System](tasks/TASK-000-planning-system.md) | Done   | None       | TASK-001 | Codex planning scaffold session | `plans/` contains a tracker, usage README, and task files that future agents can execute safely. |

## Phase 1: Repo Foundation

| ID       | Task                                                 | Status | Depends On | Blocks   | Owner/Session                | Acceptance Summary                                                                                              |
| -------- | ---------------------------------------------------- | ------ | ---------- | -------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| TASK-001 | [Repo Foundation](tasks/TASK-001-repo-foundation.md) | Done   | TASK-000   | TASK-002 | Codex implementation session | Root pnpm/Nx foundation, MIT license, baseline scripts, and metadata are present without product templates yet. |

## Phase 2: CLI Package

| ID       | Task                                                                     | Status | Depends On | Blocks             | Owner/Session                | Acceptance Summary                                                                                          |
| -------- | ------------------------------------------------------------------------ | ------ | ---------- | ------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| TASK-002 | [CLI Package Shell](tasks/TASK-002-cli-package-shell.md)                 | Done   | TASK-001   | TASK-003, TASK-004 | Codex implementation session | `packages/create-bankstack` exists with buildable TypeScript package metadata and a binary entrypoint stub. |
| TASK-003 | [CLI Prompts And Flags](tasks/TASK-003-cli-prompts-and-flags.md)         | Done   | TASK-002   | TASK-010           | Codex implementation session | CLI accepts the MVP prompts and automation flags without generating the final workspace yet.                |
| TASK-004 | [Template Rendering Engine](tasks/TASK-004-template-rendering-engine.md) | Done   | TASK-002   | TASK-005           | Codex implementation session | CLI has a template-first copy/render engine and exact dependency version policy.                            |

## Phase 3: Core Templates

| ID       | Task                                                                                         | Status | Depends On                   | Blocks                       | Owner/Session                | Acceptance Summary                                                                                        |
| -------- | -------------------------------------------------------------------------------------------- | ------ | ---------------------------- | ---------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| TASK-005 | [Generated Workspace Foundation](tasks/TASK-005-generated-workspace-foundation.md)           | Done   | TASK-004                     | TASK-006, TASK-007, TASK-008 | Codex implementation session | Generated project root contains pnpm/Nx metadata, root scripts, and local-first defaults.                 |
| TASK-006 | [Generated App Templates](tasks/TASK-006-generated-app-templates.md)                         | Done   | TASK-005                     | TASK-009, TASK-011           | Codex implementation session | Generated Astro, SvelteKit, and Hono apps exist with a minimal connected demo.                            |
| TASK-007 | [Generated Shared Packages](tasks/TASK-007-generated-shared-packages.md)                     | Done   | TASK-005                     | TASK-009, TASK-011           | Codex implementation session | Generated shared UI, Supabase, and utility packages exist with MVP placeholders.                          |
| TASK-008 | [Cloudflare And Supabase Conventions](tasks/TASK-008-cloudflare-and-supabase-conventions.md) | Done   | TASK-005                     | TASK-009, TASK-011           | Codex implementation session | Generated Wrangler configs, service binding examples, env examples, and auth-boundary placeholders exist. |
| TASK-009 | [Generated Project Docs](tasks/TASK-009-generated-project-docs.md)                           | Done   | TASK-006, TASK-007, TASK-008 | TASK-010, TASK-011           | Codex implementation session | Generated README and setup notes explain local-first usage and external service setup boundaries.         |

## Phase 4: Verification

| ID       | Task                                                                             | Status | Depends On                             | Blocks   | Owner/Session                | Acceptance Summary                                                        |
| -------- | -------------------------------------------------------------------------------- | ------ | -------------------------------------- | -------- | ---------------------------- | ------------------------------------------------------------------------- |
| TASK-010 | [CLI Golden Tests](tasks/TASK-010-cli-golden-tests.md)                           | Done   | TASK-003, TASK-009                     | TASK-012 | Codex implementation session | CLI rendering is covered by stable golden/snapshot tests.                 |
| TASK-011 | [Generated Project Smoke Tests](tasks/TASK-011-generated-project-smoke-tests.md) | Done   | TASK-006, TASK-007, TASK-008, TASK-009 | TASK-012 | Codex implementation session | A temp generated project can install and pass build/check smoke tests.    |
| TASK-012 | [CI Checks](tasks/TASK-012-ci-checks.md)                                         | Todo   | TASK-010, TASK-011                     | TASK-013 | Unassigned                   | GitHub Actions run install, CLI tests, and generated-project smoke tests. |

## Phase 5: Alpha Publish

| ID       | Task                                                       | Status | Depends On | Blocks   | Owner/Session | Acceptance Summary                                                                     |
| -------- | ---------------------------------------------------------- | ------ | ---------- | -------- | ------------- | -------------------------------------------------------------------------------------- |
| TASK-013 | [Alpha Publish Prep](tasks/TASK-013-alpha-publish-prep.md) | Todo   | TASK-012   | TASK-014 | Unassigned    | npm name availability, package metadata, and manual alpha release checklist are ready. |

## Phase 6: Dogfood Site

| ID       | Task                                                     | Status | Depends On | Blocks   | Owner/Session | Acceptance Summary                                                                |
| -------- | -------------------------------------------------------- | ------ | ---------- | -------- | ------------- | --------------------------------------------------------------------------------- |
| TASK-014 | [Dogfood Docs Site](tasks/TASK-014-dogfood-docs-site.md) | Todo   | TASK-013   | TASK-015 | Unassigned    | `apps/docs` milestone is planned and can dogfood the CLI conventions after alpha. |

## Phase 7: Agent Skill

| ID       | Task                                                               | Status | Depends On | Blocks | Owner/Session | Acceptance Summary                                                   |
| -------- | ------------------------------------------------------------------ | ------ | ---------- | ------ | ------------- | -------------------------------------------------------------------- |
| TASK-015 | [Bankstack Expert Skill](tasks/TASK-015-bankstack-expert-skill.md) | Todo   | TASK-014   | None   | Unassigned    | `skills/bankstack-expert` milestone is planned after docs stabilize. |
