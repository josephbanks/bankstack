#!/usr/bin/env node

import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const versions = JSON.parse(
  await readFile(join(root, "templates", "versions.json"), "utf8"),
);
const pnpmVersion = versions.packageManager.replace(/^pnpm@/, "");
const tempRoot = await mkdtemp(join(tmpdir(), "create-bankstack-render-"));

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(
      `${label} did not include "${expected}"\nreceived:\n${value}`,
    );
  }
}

function workspaceVariables(projectName) {
  return {
    DEV_DEPENDENCY_NX: versions.devDependencies.nx,
    DEV_DEPENDENCY_PRETTIER: versions.devDependencies.prettier,
    DEV_DEPENDENCY_TYPES_NODE: versions.devDependencies["@types/node"],
    DEV_DEPENDENCY_TYPESCRIPT: versions.devDependencies.typescript,
    NODE_ENGINE: versions.node,
    PACKAGE_MANAGER: versions.packageManager,
    PNPM_ENGINE: pnpmVersion,
    PROJECT_NAME: projectName,
  };
}

try {
  const { renderTemplate } = await import(
    join(root, "dist", "render-template.js")
  );
  const targetDirectory = join(tempRoot, "rendered-app");
  const renderedFiles = await renderTemplate({
    targetDirectory,
    templateName: "workspace",
    variables: workspaceVariables("rendered-app"),
  });

  if (renderedFiles.length !== 7) {
    throw new Error(
      `Expected 7 rendered files, received ${renderedFiles.length}.`,
    );
  }

  const readme = await readFile(join(targetDirectory, "README.md"), "utf8");
  assertIncludes(readme, "# rendered-app", "rendered README");
  assertIncludes(readme, "does not create an app", "rendered README");

  const packageJson = await readFile(
    join(targetDirectory, "package.json"),
    "utf8",
  );
  assertIncludes(packageJson, '"name": "rendered-app"', "rendered package");
  assertIncludes(
    packageJson,
    `"packageManager": "${versions.packageManager}"`,
    "rendered package",
  );
  assertIncludes(
    packageJson,
    `"nx": "${versions.devDependencies.nx}"`,
    "rendered package",
  );

  const workspace = await readFile(
    join(targetDirectory, "pnpm-workspace.yaml"),
    "utf8",
  );
  assertIncludes(workspace, '- "apps/*"', "rendered pnpm workspace");
  assertIncludes(workspace, '- "packages/*"', "rendered pnpm workspace");

  const nxJson = await readFile(join(targetDirectory, "nx.json"), "utf8");
  assertIncludes(nxJson, '"targetDefaults"', "rendered nx.json");

  const gitignore = await readFile(join(targetDirectory, ".gitignore"), "utf8");
  assertIncludes(gitignore, "node_modules/", "rendered .gitignore");

  const prettierIgnore = await readFile(
    join(targetDirectory, ".prettierignore"),
    "utf8",
  );
  assertIncludes(prettierIgnore, "pnpm-lock.yaml", "rendered .prettierignore");

  const placeholderTarget = join(tempRoot, "placeholder-app");
  const placeholderFiles = await renderTemplate({
    targetDirectory: placeholderTarget,
    templateName: "placeholder",
    variables: {
      PROJECT_NAME: "placeholder-app",
    },
  });

  if (placeholderFiles.length !== 4) {
    throw new Error(
      `Expected 4 placeholder files, received ${placeholderFiles.length}.`,
    );
  }

  const marker = await readFile(
    join(placeholderTarget, "assets", "marker.bin"),
    "utf8",
  );
  assertIncludes(
    marker,
    "BANKSTACK_PLACEHOLDER_BINARY_MARKER",
    "copied marker",
  );

  const projectMarker = await readFile(
    join(placeholderTarget, "placeholder-app.txt"),
    "utf8",
  );
  assertIncludes(
    projectMarker,
    "Rendered marker for placeholder-app.",
    "rendered filename interpolation marker",
  );

  const sourceMarker = await readFile(
    join(root, "templates", "placeholder", "assets", "marker.bin"),
  );
  const copiedMarker = await readFile(
    join(placeholderTarget, "assets", "marker.bin"),
  );

  if (!sourceMarker.equals(copiedMarker)) {
    throw new Error("Binary marker file was not copied byte-for-byte.");
  }

  await assertRejects(
    () =>
      renderTemplate({
        targetDirectory: join(tempRoot, "escape-template"),
        templateName: "../workspace",
        variables: workspaceVariables("escape-template"),
      }),
    "Template path escapes its root",
    "template root escape",
  );

  await assertRejects(
    () =>
      renderTemplate({
        targetDirectory: join(tempRoot, "escape-output"),
        templateName: "placeholder",
        variables: {
          PROJECT_NAME: "../escape-output",
        },
      }),
    "Rendered template path escapes its root",
    "rendered output escape",
  );
} finally {
  await rm(tempRoot, { force: true, recursive: true });
}

async function assertRejects(action, expectedMessage, label) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    assertIncludes(message, expectedMessage, label);
    return;
  }

  throw new Error(`${label} did not reject.`);
}
