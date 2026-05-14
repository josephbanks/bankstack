import { serve } from "@hono/node-server";

import { createApp, type ApiRuntimeEnv } from "./app.js";

const port = Number(process.env.PORT ?? 8787);
const hostname = process.env.HOST ?? "127.0.0.1";
const env: ApiRuntimeEnv = {
  BANKSTACK_API_DEMO_TOKEN: process.env.BANKSTACK_API_DEMO_TOKEN,
  SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
};

serve(
  {
    fetch: createApp(env).fetch,
    hostname,
    port,
  },
  (info) => {
    console.log(`Bankstack API listening on http://${hostname}:${info.port}`);
  },
);
