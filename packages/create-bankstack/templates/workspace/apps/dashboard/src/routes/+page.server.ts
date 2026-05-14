import type { PageServerLoad } from "./$types";

type HealthPayload = {
  ok: boolean;
  label: string;
  message: string;
};

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/health");
  const health = (await response.json()) as HealthPayload;

  return { health };
};
