# golden-stack AI Tooling Notes

Bankstack can generate provider AI tooling guidance, but it does not run provider installers, write authenticated MCP credentials, create cloud resources, or bind this project to one coding agent.

Selected provider guidance: `none`

No provider AI tooling guidance was selected for this generated workspace.

You can still add provider-maintained tools later. Re-run `create-bankstack` in a scratch directory with `--ai-tools recommended` or a provider list to inspect the guidance Bankstack would generate.

## Safety Boundary

- Treat all commands and endpoints above as opt-in reference material.
- Prefer provider-maintained docs, skills, and MCP servers when you need current platform behavior.
- Do not connect AI tools to production Cloudflare or Supabase resources unless you intentionally grant that access.
- Keep `skills/bankstack-expert` separate from provider tooling: Bankstack's skill explains this stack's conventions, while provider tools explain their own platforms.
