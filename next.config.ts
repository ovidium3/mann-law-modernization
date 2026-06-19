import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Enables calling `getCloudflareContext()` (bindings, env) during `next dev`,
// so local dev matches the Workers runtime. Added for the OpenNext adapter.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
