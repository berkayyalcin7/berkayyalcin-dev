import { getPostCards } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, defaultLocale } from "@/lib/i18n";

export const revalidate = 1800; // Blog sayfalarıyla aynı ISR aralığı

/** XML metin düğümleri ve attribute'ları için kaçış. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Kanonik (EN, prefix'siz) URL'ler üzerinden tek bir besleme. Çevirisi olmayan
 * yazılar Türkçe orijinaliyle listelenir — localizePost'un fallback davranışı.
 */
export async function GET() {
  const [dict, posts] = await Promise.all([
    getDictionary(defaultLocale),
    getPostCards(defaultLocale),
  ]);

  const feedUrl = `${siteConfig.url}/feed.xml`;
  const lastBuildDate = (
    posts[0] ? new Date(posts[0].created_at) : new Date()
  ).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${(post.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(dict.meta.siteTitle)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(dict.blogPage.metaDescription)}</description>
    <language>${defaultLocale}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
