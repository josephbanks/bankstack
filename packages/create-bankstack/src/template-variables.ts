import type { ResolvedCliOptions } from "./options.js";

export function variablesForOptions(
  options: ResolvedCliOptions,
): Record<string, string> {
  return {
    PROJECT_NAME: options.projectName,
  };
}
