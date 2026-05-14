#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type PackageJson = {
  version?: string;
};

function readPackageVersion(): string {
  const packageJsonPath = join(dirname(fileURLToPath(import.meta.url)), "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJson;

  return packageJson.version ?? "0.0.0";
}

function printPlaceholder(): void {
  console.log("create-bankstack");
  console.log(`version ${readPackageVersion()}`);
  console.log("");
  console.log("Bankstack project generation is being assembled. This CLI shell is ready for prompts and templates in the next tasks.");
}

function main(args: string[]): void {
  if (args.includes("--version") || args.includes("-v")) {
    console.log(readPackageVersion());
    return;
  }

  printPlaceholder();
}

main(process.argv.slice(2));
