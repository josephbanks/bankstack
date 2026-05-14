export const supabaseAuthBoundary = {
  name: "Supabase Auth boundary",
  browserClient: "Use the public URL and publishable key only in browser code.",
  apiVerification:
    "Verify Supabase JWTs at the API boundary before returning protected data.",
  rls: "Enable RLS on exposed schemas and write policies before using product tables.",
} as const;
