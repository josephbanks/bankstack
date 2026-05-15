import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { AiToolsProvider, ResolvedCliOptions } from "./options.js";
import { templatesRoot } from "./render-template.js";

type TemplateVersions = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  node: string;
  packageManager: string;
};

function readTemplateVersions(): TemplateVersions {
  return JSON.parse(
    readFileSync(join(templatesRoot(), "versions.json"), "utf8"),
  ) as TemplateVersions;
}

function pnpmEngineFromPackageManager(packageManager: string): string {
  const [name, version] = packageManager.split("@");

  if (name !== "pnpm" || !version) {
    throw new Error(
      `Generated workspace packageManager must be pinned to pnpm, received "${packageManager}".`,
    );
  }

  return version;
}

function variableSuffixForPackageName(packageName: string): string {
  return packageName
    .replace(/^@/, "")
    .replaceAll(/[^a-zA-Z0-9]+/g, "_")
    .replaceAll(/^_+|_+$/g, "")
    .toUpperCase();
}

function dependencyVariables(
  prefix: string,
  dependencies: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(dependencies).map(([name, version]) => [
      `${prefix}_${variableSuffixForPackageName(name)}`,
      version,
    ]),
  );
}

const providerGuidance: Record<AiToolsProvider, string> = {
  astro: [
    "### Astro Docs MCP",
    "",
    "Astro publishes a remote docs MCP server at `https://mcp.docs.astro.build/mcp`. For Codex-style CLI config, Astro documents this command shape:",
    "",
    "```toml",
    "[mcp_servers.astro-docs]",
    'command = "npx"',
    'args = ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"]',
    "```",
    "",
    "Source: https://docs.astro.build/en/guides/build-with-ai/",
  ].join("\n"),
  cloudflare: [
    "### Cloudflare",
    "",
    "Cloudflare publishes docs-for-agents, MCP guidance, and task-specific skills. Use Cloudflare's Markdown and `llms.txt` surfaces when possible so agents do not waste context scraping HTML.",
    "",
    "- Docs for agents: https://developers.cloudflare.com/docs-for-agents/",
    "- Skills repository: https://github.com/cloudflare/skills",
    "",
    "Authenticate with Cloudflare tools only when you intend to inspect or change real Cloudflare resources.",
  ].join("\n"),
  supabase: [
    "### Supabase",
    "",
    "Supabase publishes AI tools that combine MCP guidance and agent skills. Current docs list the hosted MCP server at `https://mcp.supabase.com/mcp` and the local Supabase CLI MCP server at `http://localhost:54321/mcp`.",
    "",
    "Do not connect AI tooling to production data by default. Prefer local or disposable projects while exploring generated workspace conventions.",
    "",
    "- AI tools: https://supabase.com/docs/guides/ai-tools",
    "- MCP server: https://supabase.com/docs/guides/ai-tools/mcp",
    "- Agent skills: https://supabase.com/docs/guides/ai-tools/ai-skills",
  ].join("\n"),
  svelte: [
    "### Svelte",
    "",
    "Svelte publishes AI instructions, skills, subagent guidance, and MCP tooling. The local MCP server command is `npx -y @sveltejs/mcp`; the remote MCP endpoint is `https://mcp.svelte.dev/mcp`.",
    "",
    "For Svelte code changes, use the docs flow Svelte documents: list sections, fetch relevant documentation, then run the Svelte autofixer.",
    "",
    "- AI overview: https://svelte.dev/docs/ai/overview",
    "- MCP setup: https://svelte.dev/docs/ai/mcp",
    "- Tools: https://svelte.dev/docs/ai/tools",
  ].join("\n"),
};

function aiToolsProviderList(providers: AiToolsProvider[]): string {
  return providers.length > 0 ? providers.join(", ") : "none";
}

function aiToolsGuidance(providers: AiToolsProvider[]): string {
  if (providers.length === 0) {
    return [
      "No provider AI tooling guidance was selected for this generated workspace.",
      "",
      "You can still add provider-maintained tools later. Re-run `create-bankstack` in a scratch directory with `--ai-tools recommended` or a provider list to inspect the guidance Bankstack would generate.",
    ].join("\n");
  }

  return providers.map((provider) => providerGuidance[provider]).join("\n\n");
}

export function variablesForOptions(
  options: ResolvedCliOptions,
): Record<string, string> {
  const versions = readTemplateVersions();

  return {
    ...dependencyVariables("DEPENDENCY", versions.dependencies),
    ...dependencyVariables("DEV_DEPENDENCY", versions.devDependencies),
    NODE_ENGINE: versions.node,
    PACKAGE_MANAGER: versions.packageManager,
    PNPM_ENGINE: pnpmEngineFromPackageManager(versions.packageManager),
    PROJECT_NAME: options.projectName,
    AI_TOOLS_PROVIDER_LIST: aiToolsProviderList(options.aiTools),
    AI_TOOLS_GUIDANCE: aiToolsGuidance(options.aiTools),
  };
}
