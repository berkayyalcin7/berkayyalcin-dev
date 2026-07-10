"use client";

import { useMemo, useState } from "react";
import { HiMagnifyingGlass, HiSquares2X2 } from "react-icons/hi2";
import BlogCard, { type BlogCardDict } from "@/components/BlogCard";
import type { PostCard } from "@/lib/blog";

export type BlogExplorerDict = {
  all: string;
  searchPlaceholder: string;
  noResults: string;
  noResultsBody: string;
};

type BlogExplorerProps = {
  posts: PostCard[];
  categories: string[];
  lang: string;
  dict: BlogExplorerDict;
  cardDict: BlogCardDict;
};

/** NFD ile ayrışmayan Türkçe harfler; ASCII karşılıklarına elle katlanır. */
const TURKISH_FOLD: Record<string, string> = {
  ı: "i",
  ş: "s",
  ğ: "g",
  ç: "c",
  ö: "o",
  ü: "u",
};

/**
 * Aramayı diyakritik-duyarsız yapar: "yazilim" araması "yazılım"ı bulur.
 * Önce dile duyarlı küçültme (TR'de I→ı), sonra birleşik işaretlerin atılması.
 */
function foldForSearch(value: string, locale: string): string {
  return value
    .toLocaleLowerCase(locale)
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .replace(/[ışğçöü]/g, (char) => TURKISH_FOLD[char] ?? char);
}

export default function BlogExplorer({ posts, categories, lang, dict, cardDict }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Küçük harfe çevirme dile duyarlı: TR'de I→ı, EN'de I→i
  const searchLocale = lang === "tr" ? "tr" : "en";

  // Aranabilir metin yazı başına bir kez katlanır; her tuş vuruşunda değil.
  const haystacks = useMemo(
    () =>
      posts.map((post) =>
        foldForSearch([post.title, post.excerpt, ...(post.tags ?? [])].join(" "), searchLocale)
      ),
    [posts, searchLocale]
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = foldForSearch(query.trim(), searchLocale);
    return posts.filter((post, index) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (!normalizedQuery) return true;
      return haystacks[index]!.includes(normalizedQuery);
    });
  }, [posts, haystacks, activeCategory, query, searchLocale]);

  return (
    <div>
      {/* Filtre çubuğu */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === null
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                : "border border-zinc-200 bg-zinc-100/50 text-zinc-600 hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
            }`}
          >
            <HiSquares2X2 className="h-3.5 w-3.5" />
            {dict.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory((current) => (current === category ? null : category))
              }
              aria-pressed={activeCategory === category}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                  : "border border-zinc-200 bg-zinc-100/50 text-zinc-600 hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="relative sm:w-64">
          <span className="sr-only">{dict.searchPlaceholder}</span>
          <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          {/* outline-none kaldırıldı: klavye odağı globals.css'teki :focus-visible halkasını alır */}
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-full border border-zinc-200 bg-zinc-100/30 py-2 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-emerald-500/50 focus:bg-zinc-100/60 dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-emerald-400/50 dark:focus:bg-white/[0.04]"
          />
        </label>
      </div>

      {/* Sonuçlar */}
      {filteredPosts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 bg-zinc-100/40 dark:border-white/10 dark:bg-white/[0.02] p-12 text-center">
          <p className="text-lg font-medium text-zinc-900 dark:text-white">{dict.noResults}</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{dict.noResultsBody}</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} lang={lang} dict={cardDict} />
          ))}
        </div>
      )}
    </div>
  );
}
