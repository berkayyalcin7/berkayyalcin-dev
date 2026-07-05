import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 1800; // Blog sayfalarıyla aynı ISR aralığı

// TR prefix'siz kanonik URL'ler + /en altındaki İngilizce karşılıkları
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/en/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]);

  const staticPages: { path: string; changeFrequency: "weekly" | "daily" | "monthly"; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/blog", changeFrequency: "daily", priority: 0.9 },
    { path: "/araclar", changeFrequency: "monthly", priority: 0.8 },
    { path: "/araclar/trkit", changeFrequency: "monthly", priority: 0.8 },
    { path: "/araclar/locakit", changeFrequency: "monthly", priority: 0.8 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    {
      url: `${siteConfig.url}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    },
    {
      url: `${siteConfig.url}/en${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: Math.max(0.3, page.priority - 0.2),
    },
  ]);

  return [...staticEntries, ...postEntries];
}
