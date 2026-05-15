# TASK-024: Generated Provider AI Tooling

## Status

Done

## Depends On

TASK-022

## Blocks

None

## Goal

Plan and implement an opt-in generated workspace surface for provider-maintained AI skills and MCP setup guidance across the Bankstack stack.

## Context

Bankstack-generated projects use Cloudflare, Supabase, Astro, SvelteKit, Hono, pnpm, and Nx. Several stack providers now publish first-party agent tooling that can keep coding agents closer to current docs and platform behavior:

- Supabase publishes project-scope agent skills and MCP/plugin guidance.
- Cloudflare publishes agent skills and docs-for-agents/MCP guidance.
- Astro publishes the Astro Docs MCP server.
- Svelte publishes `npx sv add mcp` and the `@sveltejs/mcp` CLI/autofixer flow.

This belongs in generated workspace planning because it affects how agents work inside generated projects, not just how users read public docs.

## Scope

Add a CLI/template plan for optional provider AI tooling. Include interactive and flag-based selection, a safe default that preserves local-first scaffolding, generated guidance or config snippets, and tests/docs that make the behavior explicit.

The first implementation should prefer documentation and safe project files over silently running provider installers. Commands that install provider skills or configure authenticated MCP servers should require explicit user opt-in.

## Out Of Scope

Do not add authenticated MCP credentials, provision provider resources, run browser-based login flows, install all provider tools by default, or make generated projects depend on a specific AI coding agent. Do not replace `skills/bankstack-expert`; provider tooling should complement Bankstack's own guardrails.

## Implementation Notes

Consider a CLI shape like:

```bash
pnpm dlx create-bankstack@alpha my-app --ai-tools recommended
pnpm dlx create-bankstack@alpha my-app --ai-tools none
pnpm dlx create-bankstack@alpha my-app --ai-tools supabase,cloudflare,astro,svelte
```

Interactive selection should offer a recommended preset, no AI tooling, and custom provider choices. The recommended preset should avoid authenticated MCP by default and should not run networked installer commands unless the user explicitly chooses that behavior.

Provider source checks should use current primary docs before implementation:

- Supabase AI skills and MCP/plugin docs.
- Cloudflare docs-for-agents and `cloudflare/skills`.
- Astro `mcp.docs.astro.build` setup docs.
- Svelte MCP add-on and `@sveltejs/mcp` docs.

## Acceptance Criteria

- The CLI has a documented option or prompt for provider AI tooling selection.
- Generated output includes clear provider AI tooling guidance or safe config snippets matching selected providers.
- Default generation remains local-first and does not require provider credentials, hosted resources, or AI tooling.
- Golden tests or equivalent coverage lock the selected output shape.
- Public docs explain the option, safety boundaries, and how provider tooling relates to `skills/bankstack-expert`.

## Verification

Run CLI contract/golden tests, generated-project smoke checks if template output changes, docs checks if public docs change, and formatting. Verify provider commands and config examples against primary/current provider docs immediately before implementation.

## Handoff Notes

Completed in this session:

- Added `--ai-tools <selection>` to `create-bankstack` with `recommended`, `none`, and comma-separated provider selection for `supabase`, `cloudflare`, `astro`, and `svelte`.
- Kept non-interactive and `--yes` generation local-first with `AI tooling guidance: none`.
- Added generated `AI_TOOLS.md` guidance as documentation only; the CLI does not run provider installers, write MCP credentials, authenticate with hosted services, or provision resources.
- Updated package docs, generated goldens, public docs, dogfood verification, and release notes for the `0.1.0-alpha.2` package candidate.

Provider source checks used:

- Supabase AI Tools, MCP, skills, and plugin docs: https://supabase.com/docs/guides/ai-tools, https://supabase.com/docs/guides/ai-tools/mcp, https://supabase.com/docs/guides/ai-tools/ai-skills, https://supabase.com/docs/guides/ai-tools/plugins
- Cloudflare docs-for-agents and skills: https://developers.cloudflare.com/docs-for-agents/, https://github.com/cloudflare/skills
- Astro AI/MCP docs: https://docs.astro.build/en/guides/build-with-ai/, https://mcp.docs.astro.build/
- Svelte AI/MCP docs: https://svelte.dev/docs/ai/overview, https://svelte.dev/docs/ai/mcp, https://svelte.dev/docs/ai/tools

Verification:

- `pnpm format`
- `pnpm format:check`
- `pnpm --filter create-bankstack test`
- `pnpm --filter create-bankstack build`
- `pnpm --filter create-bankstack pack --dry-run --json`
- `pnpm --filter create-bankstack publish --dry-run --no-git-checks --tag alpha --access public --registry https://registry.npmjs.org/`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`
- `pnpm smoke:generated`
