import { z } from "zod";

export type SupabaseEnvInput = Record<string, string | undefined>;

export const publicSupabaseEnvSchema = z
  .object({
    PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    PUBLIC_SUPABASE_URL: z.string().url().optional(),
  })
  .refine(
    (value) =>
      Boolean(value.PUBLIC_SUPABASE_URL) ===
      Boolean(value.PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    {
      message:
        "PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set together.",
      path: ["PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
    },
  );

export const serverSupabaseEnvSchema = z.object({
  SUPABASE_JWT_SECRET: z.string().min(1).optional(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  SUPABASE_URL: z.string().url().optional(),
});

export type PublicSupabaseEnv = z.infer<typeof publicSupabaseEnvSchema>;
export type ServerSupabaseEnv = z.infer<typeof serverSupabaseEnvSchema>;

export function parsePublicSupabaseEnv(
  input: SupabaseEnvInput,
): PublicSupabaseEnv {
  return publicSupabaseEnvSchema.parse(input);
}

export function parseServerSupabaseEnv(
  input: SupabaseEnvInput,
): ServerSupabaseEnv {
  return serverSupabaseEnvSchema.parse(input);
}
