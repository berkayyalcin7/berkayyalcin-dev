import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, defaultLocale } from "@/lib/i18n";

export const alt = "Berkay Yalçın — Full Stack .NET Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { params: Promise<{ lang: string }> };

/**
 * Sosyal paylaşım kartı. next/og'un gömülü Geist fontu Türkçe karakterleri
 * (ı, ğ, ş, ç, ö, ü) kapsadığı için ayrıca font yüklenmez.
 */
export default async function Image({ params }: Params) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#10b981",
            }}
          />
          <div style={{ fontSize: 26, color: "#a1a1aa", letterSpacing: 1 }}>
            berkayyalcin.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              color: "#34d399",
              lineHeight: 1.3,
            }}
          >
            {dict.profile.role}
          </div>
          <div style={{ marginTop: 14, fontSize: 28, color: "#71717a" }}>
            {dict.profile.location}
          </div>
        </div>

        <div style={{ display: "flex", height: 8, width: "100%" }}>
          <div style={{ flex: 1, background: "#10b981" }} />
          <div style={{ flex: 1, background: "#3b82f6" }} />
          <div style={{ flex: 1, background: "#a855f7" }} />
        </div>
      </div>
    ),
    size
  );
}
