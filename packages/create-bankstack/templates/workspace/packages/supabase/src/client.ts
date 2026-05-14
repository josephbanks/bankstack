import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  parsePublicSupabaseEnv,
  type PublicSupabaseEnv,
  type SupabaseEnvInput,
} from "./env.js";

export function createBrowserSupabaseClient(
  input: SupabaseEnvInput,
): SupabaseClient | undefined {
  const env: PublicSupabaseEnv = parsePublicSupabaseEnv(input);

  if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return undefined;
  }

  return createClient(
    env.PUBLIC_SUPABASE_URL,
    env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
