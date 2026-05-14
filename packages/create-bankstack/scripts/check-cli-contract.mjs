#!/usr/bin/env node

import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("..", import.meta.url));
const cliPath = join(root, "dist", "index.js");
const versions = JSON.parse(
  await readFile(join(root, "templates", "versions.json"), "utf8"),
);
const pnpmVersion = versions.packageManager.replace(/^pnpm@/, "");
const tempRoot = join(tmpdir(), `create-bankstack-contract-${process.pid}`);

function run(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: options.cwd ?? root,
    encoding: "utf8",
  });
}

function assertExit(result, expectedStatus, label) {
  if (result.status !== expectedStatus) {
    throw new Error(
      `${label} exited ${result.status}; expected ${expectedStatus}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(
      `${label} did not include "${expected}"\nreceived:\n${value}`,
    );
  }
}

await rm(tempRoot, { force: true, recursive: true });
await mkdir(tempRoot, { recursive: true });

try {
  let result = run(["--version"]);
  assertExit(result, 0, "--version");
  assertIncludes(result.stdout, "0.1.0-alpha.0", "--version stdout");

  result = run(["--yes", "--no-install", "--no-git"], { cwd: tempRoot });
  assertExit(result, 0, "--yes flow");
  assertIncludes(
    result.stdout,
    "Project name: my-bankstack-app",
    "--yes stdout",
  );
  assertIncludes(result.stdout, "Install dependencies: no", "--yes stdout");
  assertIncludes(
    result.stdout,
    "Rendered workspace foundation with 48 files.",
    "--yes stdout",
  );
  await assertRenderedWorkspace(
    join(tempRoot, "my-bankstack-app"),
    "my-bankstack-app",
  );

  result = run(
    ["sample-app", "--name", "sample-app", "--no-install", "--no-git"],
    { cwd: tempRoot },
  );
  assertExit(result, 0, "explicit flags");
  assertIncludes(
    result.stdout,
    "Target directory: sample-app",
    "explicit flags stdout",
  );
  assertIncludes(
    result.stdout,
    "Rendered workspace foundation with 48 files.",
    "explicit flags stdout",
  );
  await assertRenderedWorkspace(join(tempRoot, "sample-app"), "sample-app");

  result = run(["--help"]);
  assertExit(result, 0, "--help");
  assertIncludes(result.stdout, "Usage:", "--help stdout");

  result = run(["BadName", "--name", "BadName"], { cwd: tempRoot });
  assertExit(result, 1, "invalid name");
  assertIncludes(
    result.stderr,
    "Target directory must use lowercase letters",
    "invalid name stderr",
  );

  result = run(["..", "--name", "parent-app"], { cwd: tempRoot });
  assertExit(result, 1, "parent directory");
  assertIncludes(
    result.stderr,
    "without path separators",
    "parent directory stderr",
  );

  result = run(["nested/app", "--name", "nested-app"], { cwd: tempRoot });
  assertExit(result, 1, "nested directory");
  assertIncludes(
    result.stderr,
    "without path separators",
    "nested directory stderr",
  );

  result = run([join(tempRoot, "absolute-app"), "--name", "absolute-app"], {
    cwd: tempRoot,
  });
  assertExit(result, 1, "absolute directory");
  assertIncludes(
    result.stderr,
    "not an absolute path",
    "absolute directory stderr",
  );

  await mkdir(join(tempRoot, "nonempty-app"));
  await writeFile(
    join(tempRoot, "nonempty-app", "existing.txt"),
    "existing\n",
    "utf8",
  );

  result = run(["nonempty-app", "--name", "nonempty-app"], { cwd: tempRoot });
  assertExit(result, 1, "non-empty directory");
  assertIncludes(
    result.stderr,
    "Target directory is not empty",
    "non-empty directory stderr",
  );

  result = run(
    [
      "nonempty-app",
      "--name",
      "nonempty-app",
      "--force",
      "--no-install",
      "--no-git",
    ],
    { cwd: tempRoot },
  );
  assertExit(result, 0, "forced non-empty directory");
  assertIncludes(
    result.stdout,
    "Force non-empty directory: yes",
    "forced non-empty directory stdout",
  );

  await symlink(join(tempRoot, "nonempty-app"), join(tempRoot, "linked-app"));

  result = run(["linked-app", "--name", "linked-app", "--force"], {
    cwd: tempRoot,
  });
  assertExit(result, 1, "symlink directory");
  assertIncludes(
    result.stderr,
    "cannot be a symbolic link",
    "symlink directory stderr",
  );
} finally {
  await rm(tempRoot, { force: true, recursive: true });
}

async function assertRenderedWorkspace(targetDirectory, projectName) {
  const readme = await readFile(join(targetDirectory, "README.md"), "utf8");
  assertIncludes(readme, `# ${projectName}`, "CLI rendered README");
  assertIncludes(readme, "apps/dashboard", "CLI rendered README");
  assertIncludes(readme, "packages/shared-utils", "CLI rendered README");

  const setupNotes = await readFile(join(targetDirectory, "SETUP.md"), "utf8");
  assertIncludes(setupNotes, "pnpm only", "CLI rendered setup notes");
  assertIncludes(setupNotes, "service binding", "CLI rendered setup notes");

  const packageJson = await readFile(
    join(targetDirectory, "package.json"),
    "utf8",
  );
  assertIncludes(
    packageJson,
    `"name": "${projectName}"`,
    "CLI rendered package",
  );
  assertIncludes(
    packageJson,
    `"packageManager": "${versions.packageManager}"`,
    "CLI rendered package",
  );
  assertIncludes(
    packageJson,
    `"pnpm": "${pnpmVersion}"`,
    "CLI rendered package",
  );
  assertIncludes(
    packageJson,
    `"nx": "${versions.devDependencies.nx}"`,
    "CLI rendered package",
  );
  assertIncludes(packageJson, '"verify": "pnpm ', "CLI rendered package");

  const workspace = await readFile(
    join(targetDirectory, "pnpm-workspace.yaml"),
    "utf8",
  );
  assertIncludes(workspace, '- "apps/*"', "CLI rendered workspace");
  assertIncludes(workspace, '- "packages/*"', "CLI rendered workspace");

  const nxJson = await readFile(join(targetDirectory, "nx.json"), "utf8");
  assertIncludes(nxJson, '"namedInputs"', "CLI rendered nx.json");

  const tsconfig = await readFile(
    join(targetDirectory, "tsconfig.base.json"),
    "utf8",
  );
  assertIncludes(tsconfig, '"module": "NodeNext"', "CLI rendered tsconfig");

  const gitignore = await readFile(join(targetDirectory, ".gitignore"), "utf8");
  assertIncludes(gitignore, ".svelte-kit/", "CLI rendered .gitignore");
  assertIncludes(gitignore, "supabase/.temp/", "CLI rendered .gitignore");

  const prettierIgnore = await readFile(
    join(targetDirectory, ".prettierignore"),
    "utf8",
  );
  assertIncludes(
    prettierIgnore,
    "pnpm-lock.yaml",
    "CLI rendered .prettierignore",
  );

  const marketingPage = await readFile(
    join(targetDirectory, "apps", "marketing", "src", "pages", "index.astro"),
    "utf8",
  );
  assertIncludes(
    marketingPage,
    `const projectName = "${projectName}";`,
    "CLI rendered marketing page",
  );
  assertIncludes(
    marketingPage,
    "{projectName} ships on a split stack.",
    "CLI rendered marketing page",
  );

  const dashboardHealthProxy = await readFile(
    join(
      targetDirectory,
      "apps",
      "dashboard",
      "src",
      "routes",
      "api",
      "health",
      "+server.ts",
    ),
    "utf8",
  );
  assertIncludes(
    dashboardHealthProxy,
    "BANKSTACK_API_URL",
    "CLI rendered dashboard health proxy",
  );
  assertIncludes(
    dashboardHealthProxy,
    `@${projectName}/shared-utils`,
    "CLI rendered dashboard health proxy",
  );

  const apiApp = await readFile(
    join(targetDirectory, "apps", "api", "src", "app.ts"),
    "utf8",
  );
  assertIncludes(apiApp, 'app.get("/health"', "CLI rendered API app");
  assertIncludes(apiApp, '"/protected/*"', "CLI rendered API app");

  const dashboardWrangler = await readFile(
    join(targetDirectory, "apps", "dashboard", "wrangler.jsonc"),
    "utf8",
  );
  assertIncludes(
    dashboardWrangler,
    `"service": "${projectName}-api"`,
    "CLI rendered dashboard wrangler",
  );

  const sharedUtils = await readFile(
    join(targetDirectory, "packages", "shared-utils", "src", "index.ts"),
    "utf8",
  );
  assertIncludes(sharedUtils, "apiHealthSchema", "CLI rendered shared utils");
}
