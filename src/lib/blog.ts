import { cache } from "react";
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
  // İngilizce çeviri kolonları; null/undefined ise yazının yalnızca TR'si vardır.
  title_en?: string | null;
  excerpt_en?: string | null;
  content_en?: string | null;
};

/**
 * Dile göre çözülmüş yazı: title/excerpt/content istenen dilin metnini taşır.
 * `hasEnglish` rozetler için, `isFallback` EN istenip TR gösterildiğinde
 * "çeviri yok" notunu tetiklemek için kullanılır. TR kaynak dil olduğundan
 * her yazı Türkçe'ye sahiptir.
 */
export type LocalizedPost = Post & {
  hasEnglish: boolean;
  isFallback: boolean;
};

export function localizePost(post: Post, lang: string): LocalizedPost {
  const hasEnglish = Boolean(post.title_en && post.excerpt_en && post.content_en);
  const useEnglish = lang === "en" && hasEnglish;

  return {
    ...post,
    title: useEnglish ? post.title_en! : post.title,
    excerpt: useEnglish ? post.excerpt_en! : post.excerpt,
    content: useEnglish ? post.content_en! : post.content,
    hasEnglish,
    isFallback: lang === "en" && !hasEnglish,
  };
}

export function localizePosts(posts: Post[], lang: string): LocalizedPost[] {
  return posts.map((post) => localizePost(post, lang));
}

// React.cache: aynı istek içinde birden çok bileşen çağırırsa sorgu tekilleşir.
export const getPublishedPosts = cache(async (limit?: number): Promise<Post[]> => {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

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
});

/** Stats şeridi için hafif sorgu: satırları çekmeden sadece sayıyı döner. */
export const getPublishedPostsCount = cache(async (): Promise<number> => {
  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  if (error) {
    console.error("Error fetching post count:", error);
    return 0;
  }

  return count ?? 0;
});

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
