import type { NextConfig } from "next";

/**
 * Güvenlik başlıkları. CSP burada bilinçli olarak yok: tema FOUC'unu önleyen
 * inline script (bkz. layout.tsx) ve Tailwind'in inline style'ları nonce'suz bir
 * politikayla çakışır. CSP'yi eklemek, o script'i nonce'lu hale getirmeyi
 * gerektirir — ayrı bir iş olarak ele alınmalı.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
