export const bankstackTheme = {
  colors: {
    canvas: "oklch(97% 0.012 215)",
    ink: "oklch(23% 0.035 235)",
    panel: "oklch(99% 0.004 230)",
    signal: "oklch(84% 0.16 170)",
  },
  radius: {
    control: "0.45rem",
    panel: "0.5rem",
  },
} as const;

export const primaryActionClassName = "bankstack-action";
export const statusCardClassName = "status-card";

export function composeClassName(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(" ");
}
