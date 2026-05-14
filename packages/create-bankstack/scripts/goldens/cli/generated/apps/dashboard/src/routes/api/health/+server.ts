import { apiHealthSchema } from "@golden-stack/shared-utils";
import { env } from "$env/dynamic/private";
import { json, type RequestHandler } from "@sveltejs/kit";

type ApiHealth = {
  ok?: boolean;
  service?: string;
};

const fallbackHealth = {
  ok: true,
  label: "Local fallback",
  message:
    "Dashboard rendered without external credentials. Start apps/api and set BANKSTACK_API_URL to use the Hono health endpoint.",
};

export const GET: RequestHandler = async ({ fetch, platform }) => {
  const serviceBinding = platform?.env?.API;
  const apiUrl = env.BANKSTACK_API_URL;

  try {
    const response =
      typeof serviceBinding?.fetch === "function"
        ? await serviceBinding.fetch("http://api.local/health")
        : apiUrl
          ? await fetch(new URL("/health", apiUrl))
          : undefined;

    if (!response?.ok) {
      return json(fallbackHealth);
    }

    const payload = apiHealthSchema.safeParse(
      (await response.json()) as ApiHealth,
    );

    if (!payload.success) {
      return json(fallbackHealth);
    }

    return json({
      ok: payload.data.ok === true,
      label: payload.data.ok === true ? "API online" : "API responded",
      message: `${payload.data.service ?? "Hono API"} responded through the dashboard health proxy.`,
    });
  } catch {
    return json(fallbackHealth);
  }
};
