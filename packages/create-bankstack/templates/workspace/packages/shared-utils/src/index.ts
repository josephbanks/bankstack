import { z } from "zod";

export const BANKSTACK_STACK_LABEL = "Cloudflare edge + Supabase";
export const protectedProfilePath = "/protected/profile";

export const projectSlugSchema = z
  .string()
  .min(1)
  .max(214)
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/);

export const apiHealthSchema = z.object({
  ok: z.boolean(),
  service: z.string(),
});

export type ApiHealth = z.infer<typeof apiHealthSchema>;

export function createHealthPayload(service: string): ApiHealth {
  return apiHealthSchema.parse({
    ok: true,
    service,
  });
}

export function describeLocalStack(projectName: string): string {
  return `${projectName} starts with an Astro public surface, a SvelteKit dashboard, a Hono API, and shared packages for UI, Supabase boundaries, and validation.`;
}
