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

/**
 * Kart görünümü için gereken alanlar. `content` bilinçli olarak yoktur: okuma
 * süresi sunucuda hesaplanıp `readingMinutes` olarak taşınır. Aksi halde
 * BlogExplorer (client component) tüm yazıların tam markdown'ını tarayıcıya
 * serileştiriyordu.
 */
export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  views: number;
  created_at: string;
  readingMinutes: number;
  hasEnglish: boolean;
};

/** İlgili yazı skorlaması, sitemap ve slug listeleri için içeriksiz satır. */
export type PostSummary = {
  id: string;
  slug: string;
  category: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

const SUMMARY_COLUMNS = "id,slug,category,tags,created_at,updated_at";

// İçerik yalnızca okuma süresini hesaplamak için çekilir ve karta konmadan atılır.
const CARD_COLUMNS =
  "id,slug,title,excerpt,cover_image,views,created_at,category,tags,title_en,excerpt_en,content,content_en";

type CardRow = Pick<
  Post,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image"
  | "views"
  | "created_at"
  | "content"
> & {
  category?: string | null;
  tags?: string[] | null;
  title_en?: string | null;
  excerpt_en?: string | null;
  content_en?: string | null;
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

/** Satırı karta çevirir: dili çözer, okuma süresini hesaplar, içeriği düşürür. */
function toPostCard(row: CardRow, lang: string): PostCard {
  const hasEnglish = Boolean(row.title_en && row.excerpt_en && row.content_en);
  const useEnglish = lang === "en" && hasEnglish;
  const content = useEnglish ? row.content_en! : row.content;

  return {
    id: row.id,
    slug: row.slug,
    title: useEnglish ? row.title_en! : row.title,
    excerpt: useEnglish ? row.excerpt_en! : row.excerpt,
    cover_image: row.cover_image,
    category: row.category ?? null,
    tags: row.tags ?? null,
    views: row.views ?? 0,
    created_at: row.created_at,
    readingMinutes: getReadingTime(content),
    hasEnglish,
  };
}

// React.cache: aynı istek içinde birden çok bileşen çağırırsa sorgu tekilleşir.

/** Kart ızgaraları (blog listesi, teaser, ilgili yazılar) için içeriksiz kayıtlar. */
export const getPostCards = cache(async (lang: string, limit?: number): Promise<PostCard[]> => {
  let query = supabase
    .from("posts")
    .select(CARD_COLUMNS)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching post cards:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as unknown as CardRow[]).map((row) => toPostCard(row, lang));
});

/** Skorlama / sitemap / slug listesi için; içerik kolonlarını hiç çekmez. */
export const getPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching post summaries:", error);
    return [];
  }

  return data as unknown as PostSummary[];
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
export function getCategories(posts: { category: string | null }[]): string[] {
  const categories = new Set<string>();
  for (const post of posts) {
    if (post.category) categories.add(post.category);
  }
  return [...categories].sort((a, b) => a.localeCompare(b, "tr"));
}

/**
 * Aynı kategori (+2 puan) ve ortak etiket (+1 puan/etiket) skoruna göre
 * ilgili yazıların slug'ları; eşitlikte yeni tarihli öne geçer. Skoru 0 olanlar
 * da listeye girebilir ki bölüm hiç boş kalmasın.
 */
export function getRelatedSlugs(
  current: Pick<Post, "id" | "category" | "tags">,
  all: PostSummary[],
  limit = 3
): string[] {
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
    .map((entry) => entry.post.slug);
}

/** Verilen slug'ların kartları, slug sırası korunarak. */
export async function getPostCardsBySlugs(slugs: string[], lang: string): Promise<PostCard[]> {
  if (slugs.length === 0) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(CARD_COLUMNS)
    .eq("published", true)
    .in("slug", slugs);

  if (error) {
    console.error("Error fetching post cards by slug:", error);
    return [];
  }

  const bySlug = new Map(
    (data as unknown as CardRow[]).map((row) => [row.slug, toPostCard(row, lang)])
  );
  return slugs.map((slug) => bySlug.get(slug)).filter((card): card is PostCard => Boolean(card));
}
