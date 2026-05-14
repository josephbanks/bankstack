import { createApp, type ApiRuntimeEnv } from "./app.js";

export default {
  fetch(request: Request, env: ApiRuntimeEnv): Response | Promise<Response> {
    return createApp(env).fetch(request);
  },
};
