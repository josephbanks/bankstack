import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const docsRoot = new URL("..", import.meta.url).pathname;
const workspaceRoot = new URL("../../..", import.meta.url).pathname;

const requiredBuildFiles = [
  "dist/index.html",
  "dist/docs/index.html",
  "dist/docs/alpha-cli/index.html",
  "dist/docs/cloudflare-boundary/index.html",
  "dist/docs/dogfood-and-skill/index.html",
  "dist/docs/distribution/index.html",
  "dist/docs/generated-workspace/index.html",
  "dist/docs/supabase-boundary/index.html",
  "dist/docs/what-is-bankstack/index.html",
];

const requiredDocsFiles = [
  "src/content/docs/alpha-cli.md",
  "src/content/docs/distribution.md",
  "src/content/docs/generated-workspace.md",
  "src/content/docs/cloudflare-boundary.md",
  "src/content/docs/supabase-boundary.md",
  "src/content/docs/dogfood-and-skill.md",
  "src/content/docs/what-is-bankstack.md",
];

const readWorkspace = (path) => readFileSync(join(workspaceRoot, path), "utf8");
const readDocs = (path) => readFileSync(join(docsRoot, path), "utf8");

const failures = [];

for (const path of requiredBuildFiles) {
  if (!existsSync(join(docsRoot, path))) {
    failures.push(`Missing built route: ${path}`);
  }
}

for (const path of requiredDocsFiles) {
  if (!existsSync(join(docsRoot, path))) {
    failures.push(`Missing docs source: ${path}`);
  }
}

const cliReadme = readWorkspace("packages/create-bankstack/README.md");
const goldenReadme = readWorkspace(
  "packages/create-bankstack/scripts/goldens/cli/generated/README.md",
);
const goldenSetup = readWorkspace(
  "packages/create-bankstack/scripts/goldens/cli/generated/SETUP.md",
);
const alphaDocs = readDocs("src/content/docs/alpha-cli.md");
const distributionDocs = readDocs("src/content/docs/distribution.md");
const generatedDocs = readDocs("src/content/docs/generated-workspace.md");
const cloudflareDocs = readDocs("src/content/docs/cloudflare-boundary.md");
const supabaseDocs = readDocs("src/content/docs/supabase-boundary.md");
const dogfoodDocs = readDocs("src/content/docs/dogfood-and-skill.md");
const dogfoodProcess = readWorkspace("plans/DOGFOOD.md");

const requiredClaims = [
  [cliReadme, "pnpm dlx create-bankstack@alpha", "CLI README alpha pnpm usage"],
  [cliReadme, "npx create-bankstack@alpha", "CLI README alpha npx usage"],
  [alphaDocs, "pnpm dlx create-bankstack@alpha", "docs alpha pnpm usage"],
  [alphaDocs, "npx create-bankstack@alpha", "docs alpha npx usage"],
  [
    distributionDocs,
    "pnpm dlx create-bankstack@alpha",
    "distribution docs alpha pnpm usage",
  ],
  [
    distributionDocs,
    "npx create-bankstack@alpha",
    "distribution docs alpha npx usage",
  ],
  [
    distributionDocs,
    "skills/bankstack-expert",
    "distribution docs skill guidance",
  ],
  [distributionDocs, "GitHub issues", "distribution docs feedback path"],
  [dogfoodDocs, "plans/DOGFOOD.md", "dogfood docs process link"],
  [
    dogfoodProcess,
    "pnpm smoke:generated",
    "dogfood process generated smoke command",
  ],
  [goldenReadme, "apps/marketing", "generated README marketing app"],
  [goldenReadme, "apps/dashboard", "generated README dashboard app"],
  [goldenReadme, "apps/api", "generated README API app"],
  [generatedDocs, "apps/marketing", "docs generated marketing app"],
  [generatedDocs, "apps/dashboard", "docs generated dashboard app"],
  [generatedDocs, "apps/api", "docs generated API app"],
  [
    goldenSetup,
    "Cloudflare resources are not provisioned by the CLI",
    "generated setup Cloudflare non-provisioning",
  ],
  [
    cloudflareDocs,
    "does not authenticate with Wrangler",
    "docs Cloudflare auth boundary",
  ],
  [cloudflareDocs, "create Workers", "docs Cloudflare creation boundary"],
  [
    cloudflareDocs,
    "deploy anything automatically",
    "docs Cloudflare deployment boundary",
  ],
  [
    cliReadme,
    "it does not create cloud resources",
    "CLI README cloud resource boundary",
  ],
  [
    cliReadme,
    "provision Supabase",
    "CLI README Supabase provisioning boundary",
  ],
  [
    cliReadme,
    "deploy anything automatically",
    "CLI README deployment boundary",
  ],
  [
    supabaseDocs,
    "It does not create a Supabase project",
    "docs Supabase project boundary",
  ],
  [
    supabaseDocs,
    "row level security policies for real data",
    "docs Supabase RLS boundary",
  ],
  [
    supabaseDocs,
    "PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "docs Supabase publishable key terminology",
  ],
];

for (const [source, expected, label] of requiredClaims) {
  if (!source.includes(expected)) {
    failures.push(`Missing claim (${label}): ${expected}`);
  }
}

if (failures.length > 0) {
  console.error("Dogfood verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Dogfood verification passed for ${requiredBuildFiles.length} built routes and ${requiredClaims.length} source-alignment claims.`,
);
