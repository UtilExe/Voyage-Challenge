/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/voyages",
        permanent: false, // 302 redirect
      },
    ];
  },
};

export default config;
