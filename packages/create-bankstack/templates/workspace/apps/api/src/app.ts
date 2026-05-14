import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

const app = new Hono();
const localDemoToken = process.env.BANKSTACK_API_DEMO_TOKEN;

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "Bankstack Hono API",
  }),
);

app.use("/protected/*", async (c, next) => {
  if (!localDemoToken) {
    return c.json(
      {
        ok: false,
        message:
          "Protected route boundary is configured, but BANKSTACK_API_DEMO_TOKEN is not set.",
      },
      503,
    );
  }

  return bearerAuth({ token: localDemoToken })(c, next);
});

app.get("/protected/profile", (c) =>
  c.json({
    ok: true,
    message:
      "Protected route boundary reached. Replace this stub with Supabase JWT verification in a later slice.",
  }),
);

export default app;
