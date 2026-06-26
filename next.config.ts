import type { NextConfig } from "next";

// Content-Security-Policy kept intentionally permissive: `'unsafe-inline'` is
// required because Next.js injects inline bootstrap scripts and Tailwind emits
// inline styles (a nonce-based CSP would need middleware and is a later step).
// `frame-src` allows the Google Maps embed on the contact page; `frame-ancestors
// 'none'` blocks clickjacking. Tighten once real script sources are known.
// `'unsafe-eval'` is added in dev only — React's dev build uses eval() for
// debugging features; it is NOT included in production.
const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework/version to attackers.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;

// Enables calling `getCloudflareContext()` (bindings, env) during `next dev`,
// so local dev matches the Workers runtime. Added for the OpenNext adapter.
// Dev-only: at `next build` time we don't need bindings, and the remote-only
// Workers AI binding would otherwise force a Cloudflare login during the build.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") {
  void initOpenNextCloudflareForDev();
}
