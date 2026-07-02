import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use direct public client for public static site generation to avoid Next.js build-time cookies() issue
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  // Kolonlar Supabase'de henüz yoksa undefined gelir; kod her iki durumu da destekler.
  category?: string | null;
  tags?: string[] | null;
};

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }

  return data as Post;
}

/** Yaklaşık okuma süresi (dakika), ~200 kelime/dk üzerinden. */
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Yayınlanmış yazılardaki benzersiz kategoriler (alfabetik). */
export function getCategories(posts: Post[]): string[] {
  const categories = new Set<string>();
  for (const post of posts) {
    if (post.category) categories.add(post.category);
  }
  return [...categories].sort((a, b) => a.localeCompare(b, "tr"));
}

/**
 * Aynı kategori (+2 puan) ve ortak etiket (+1 puan/etiket) skoruna göre
 * ilgili yazılar; eşitlikte yeni tarihli öne geçer. Skoru 0 olanlar da
 * listeye girebilir ki bölüm hiç boş kalmasın.
 */
export function getRelatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  const currentTags = new Set(current.tags ?? []);

  return all
    .filter((post) => post.id !== current.id)
    .map((post) => {
      let score = 0;
      if (current.category && post.category === current.category) score += 2;
      for (const tag of post.tags ?? []) {
        if (currentTags.has(tag)) score += 1;
      }
      return { post, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.created_at).getTime() - new Date(a.post.created_at).getTime()
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
