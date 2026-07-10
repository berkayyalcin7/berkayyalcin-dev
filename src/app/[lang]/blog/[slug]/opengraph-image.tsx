import { ImageResponse } from "next/og";
import { getPostBySlug, getReadingTime, localizePost } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, defaultLocale } from "@/lib/i18n";
import { fill } from "@/lib/locale-link";

export const alt = "Berkay Yalçın — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { params: Promise<{ lang: string; slug: string }> };

/** Uzun başlıklarda yazı boyutunu kademeli küçültür ki kart taşmasın. */
function titleFontSize(title: string): number {
  if (title.length > 90) return 48;
  if (title.length > 60) return 58;
  return 70;
}

export default async function Image({ params }: Params) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const [dict, rawPost] = await Promise.all([getDictionary(locale), getPostBySlug(slug)]);

  // Yazı bulunamazsa jenerik bir kart üret; OG rotası 404 veremez.
  const post = rawPost ? localizePost(rawPost, locale) : null;
  const title = post?.title ?? dict.blogPost.notFoundTitle;

  const meta = post
    ? [
        new Date(post.created_at).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        fill(dict.blogPost.readingTime, { minutes: getReadingTime(post.content) }),
      ]
    : [];

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {post?.category ? (
            <div
              style={{
                display: "flex",
                borderRadius: 9999,
                border: "2px solid #10b98155",
                background: "#10b98118",
                color: "#34d399",
                padding: "8px 22px",
                fontSize: 24,
                letterSpacing: 1,
              }}
            >
              {post.category.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")}
            </div>
          ) : null}
          <div style={{ fontSize: 24, color: "#71717a" }}>{meta.join("  ·  ")}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(title),
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: -1.5,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#10b981" }} />
            <div style={{ fontSize: 28, color: "#e4e4e7" }}>{siteConfig.name}</div>
          </div>
          <div style={{ fontSize: 26, color: "#71717a" }}>berkayyalcin.dev</div>
        </div>
      </div>
    ),
    size
  );
}
