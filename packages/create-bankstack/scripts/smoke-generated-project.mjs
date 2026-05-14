#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const cliPath = join(root, "dist", "index.js");
const projectName = "smoke-stack";
const keepTemp = process.env.BANKSTACK_KEEP_SMOKE_TEMP === "1";
const tempRoot = await mkdtemp(join(tmpdir(), "create-bankstack-smoke-"));
const projectRoot = join(tempRoot, projectName);

const steps = [
  {
    label: "pnpm install --no-frozen-lockfile",
    command: "pnpm",
    args: ["install", "--no-frozen-lockfile", "--reporter=append-only"],
    timeoutMs: 10 * 60 * 1000,
  },
  {
    label: "pnpm format:check",
    command: "pnpm",
    args: ["format:check"],
    timeoutMs: 2 * 60 * 1000,
  },
  {
    label: "pnpm check",
    command: "pnpm",
    args: ["check"],
    timeoutMs: 5 * 60 * 1000,
  },
  {
    label: "pnpm build",
    command: "pnpm",
    args: ["build"],
    timeoutMs: 5 * 60 * 1000,
  },
  {
    label: "pnpm test",
    command: "pnpm",
    args: ["test"],
    timeoutMs: 2 * 60 * 1000,
  },
];

function commandText(command, args) {
  return [command, ...args].join(" ");
}

function run(command, args, cwd, timeoutMs = 2 * 60 * 1000) {
  const { FORCE_COLOR: _forceColor, NO_COLOR: _noColor, ...env } = process.env;

  return spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env,
    stdio: "inherit",
    timeout: timeoutMs,
  });
}

function assertSuccess(result, label) {
  if (result.status === 0 && !result.error) {
    return;
  }

  const status =
    result.error?.message ?? result.status ?? result.signal ?? "unknown";
  throw new Error(`${label} failed with status ${status} in ${projectRoot}`);
}

await mkdir(tempRoot, { recursive: true });

try {
  const generated = run(
    process.execPath,
    [cliPath, projectName, "--name", projectName, "--no-install", "--no-git"],
    tempRoot,
  );
  assertSuccess(generated, "generate smoke project");

  console.log(`Generated ${projectName} in ${projectRoot}`);

  for (const step of steps) {
    console.log(`Running ${step.label}`);
    const result = run(step.command, step.args, projectRoot, step.timeoutMs);
    assertSuccess(result, step.label);
  }

  console.log(
    `Generated project smoke passed: ${steps
      .map((step) => commandText(step.command, step.args))
      .join(", ")}`,
  );
} finally {
  if (keepTemp) {
    console.log(`Keeping generated smoke project at ${projectRoot}`);
  } else {
    await rm(tempRoot, { force: true, recursive: true });
  }
}
