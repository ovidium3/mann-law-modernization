import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext adapter config for deploying this Next.js app to Cloudflare Workers.
// Defaults are fine for a marketing/intake site. When Phase 1 adds caching
// needs (ISR, etc.), wire an incrementalCache (e.g. KV or R2) here.
export default defineCloudflareConfig({});
