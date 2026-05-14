# TASK-008: Cloudflare And Supabase Conventions

## Status

Todo

## Depends On

TASK-005

## Blocks

TASK-009, TASK-011

## Goal

Add generated Cloudflare and Supabase convention files that show the intended production shape while remaining local-first.

## Context

The Bankstack architecture centers on Cloudflare edge deployment, service bindings, Supabase Auth, and Supabase RLS. The v0.1 scaffold should show these boundaries without requiring external accounts during creation.

## Scope

Add Wrangler configs, service binding examples, `.env.example` files, Supabase environment contracts, and auth-boundary placeholders. Ensure app templates and docs can refer to these files consistently.

## Out Of Scope

Do not create real Cloudflare resources, run `wrangler login`, provision Supabase projects, implement full auth UI, or add production deployment automation.

## Implementation Notes

Generated configs should be safe examples. Clearly mark values that users must replace. Keep local dev paths working without credentials. Service binding examples should demonstrate dashboard-to-API intent.

## Acceptance Criteria

- Generated project contains Cloudflare config examples for relevant apps.
- Generated project contains Supabase env examples and auth-boundary placeholders.
- Local build/check flows do not require real Cloudflare or Supabase credentials.
- Docs and comments avoid implying that external services were provisioned automatically.

## Verification

Generate a project, inspect generated config files, and run local build/check commands that do not require credentials.

## Handoff Notes

TASK-009 should explain external setup steps and local limitations clearly. TASK-011 should verify local-first behavior.
