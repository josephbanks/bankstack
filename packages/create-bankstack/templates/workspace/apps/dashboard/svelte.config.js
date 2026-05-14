import adapter from "@sveltejs/adapter-cloudflare";

const config = {
  kit: {
    adapter: adapter({
      platformProxy: {
        configPath: "wrangler.jsonc",
      },
    }),
  },
};

export default config;
