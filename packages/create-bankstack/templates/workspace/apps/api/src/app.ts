import {
  createHealthPayload,
  protectedProfilePath,
} from "@{{PROJECT_NAME}}/shared-utils";
import { supabaseAuthBoundary } from "@{{PROJECT_NAME}}/supabase/auth-boundary";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

export type ApiRuntimeEnv = {
  BANKSTACK_API_DEMO_TOKEN?: string;
  SUPABASE_JWT_SECRET?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  SUPABASE_URL?: string;
};

export function createApp(env: ApiRuntimeEnv = {}): Hono {
  const app = new Hono();
  const localDemoToken = env.BANKSTACK_API_DEMO_TOKEN;

  app.get("/health", (c) => c.json(createHealthPayload("Bankstack Hono API")));

  app.use("/protected/*", async (c, next) => {
    if (!localDemoToken) {
      return c.json(
        {
          ok: false,
          boundary: supabaseAuthBoundary.name,
          message:
            "Protected route boundary is configured, but BANKSTACK_API_DEMO_TOKEN is not set. Replace the demo token with Supabase JWT verification before shipping authenticated routes.",
        },
        503,
      );
    }

    return bearerAuth({ token: localDemoToken })(c, next);
  });

  app.get(protectedProfilePath, (c) =>
    c.json({
      ok: true,
      boundary: supabaseAuthBoundary.name,
      message:
        "Protected route boundary reached. Replace this stub with Supabase JWT verification and RLS-backed reads in a later slice.",
    }),
  );

  return app;
}
