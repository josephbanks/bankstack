#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const cliPath = join(root, "dist", "index.js");
const goldenRoot = join(root, "scripts", "goldens", "cli");
const tempRoot = join(tmpdir(), `create-bankstack-golden-${process.pid}`);

const generatedGoldens = [
  "package.json",
  "README.md",
  "SETUP.md",
  "pnpm-workspace.yaml",
  "nx.json",
  "apps/marketing/src/pages/index.astro",
  "apps/dashboard/src/routes/api/health/+server.ts",
  "packages/shared-utils/package.json",
];

function normalizeNewlines(value) {
  return value.replace(/\r\n/g, "\n");
}

async function readText(path) {
  return normalizeNewlines(await readFile(path, "utf8"));
}

function runCli(args, cwd) {
  const { FORCE_COLOR: _forceColor, NO_COLOR: _noColor, ...env } = process.env;

  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: "utf8",
    env,
  });
}

function assertExit(result, expectedStatus, label) {
  if (result.status !== expectedStatus) {
    throw new Error(
      `${label} exited ${result.status}; expected ${expectedStatus}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(
      `${label} did not match golden output.\n\nExpected:\n${expected}\n\nReceived:\n${actual}`,
    );
  }
}

await rm(tempRoot, { force: true, recursive: true });
await mkdir(tempRoot, { recursive: true });

try {
  const explicitResult = runCli(
    ["golden-stack", "--name", "golden-stack", "--no-install", "--no-git"],
    tempRoot,
  );
  assertExit(explicitResult, 0, "explicit non-interactive flag flow");
  assertEqual(
    normalizeNewlines(explicitResult.stdout),
    await readText(join(goldenRoot, "explicit-stdout.txt")),
    "explicit non-interactive stdout",
  );
  assertEqual(explicitResult.stderr, "", "explicit non-interactive stderr");

  const generatedRoot = join(tempRoot, "golden-stack");

  for (const generatedGolden of generatedGoldens) {
    assertEqual(
      await readText(join(generatedRoot, generatedGolden)),
      await readText(join(goldenRoot, "generated", generatedGolden)),
      `generated ${generatedGolden}`,
    );
  }

  const yesResult = runCli(["--yes"], tempRoot);
  assertExit(yesResult, 0, "--yes default flow");
  assertEqual(
    normalizeNewlines(yesResult.stdout),
    await readText(join(goldenRoot, "yes-stdout.txt")),
    "--yes stdout",
  );
  assertEqual(yesResult.stderr, "", "--yes stderr");
} finally {
  await rm(tempRoot, { force: true, recursive: true });
}

console.log(
  `Checked CLI goldens for ${generatedGoldens.length} generated files from ${relative(root, goldenRoot)}.`,
);
