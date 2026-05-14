import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { ResolvedCliOptions } from "./options.js";
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
  };
}
