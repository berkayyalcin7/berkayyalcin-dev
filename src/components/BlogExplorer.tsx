"use client";

import { useMemo, useState } from "react";
import { HiMagnifyingGlass, HiSquares2X2 } from "react-icons/hi2";
import BlogCard from "@/components/BlogCard";
import type { Post } from "@/lib/blog";

type BlogExplorerProps = {
  posts: Post[];
  categories: string[];
};

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr");
    return posts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (!normalizedQuery) return true;
      const haystack = [post.title, post.excerpt, ...(post.tags ?? [])]
        .join(" ")
        .toLocaleLowerCase("tr");
      return haystack.includes(normalizedQuery);
    });
  }, [posts, activeCategory, query]);

  return (
    <div>
      {/* Filtre çubuğu */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === null
                ? "bg-emerald-500 text-black"
                : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-emerald-400/40 hover:text-emerald-400"
            }`}
          >
            <HiSquares2X2 className="h-3.5 w-3.5" />
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory((current) => (current === category ? null : category))
              }
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-emerald-500 text-black"
                  : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-emerald-400/40 hover:text-emerald-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="relative sm:w-64">
          <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Yazılarda ara..."
            className="w-full rounded-full border border-white/10 bg-white/[0.02] py-2 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.04]"
          />
        </label>
      </div>

      {/* Sonuçlar */}
      {filteredPosts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <p className="text-lg font-medium text-white">Sonuç bulunamadı</p>
          <p className="mt-2 text-sm text-zinc-400">
            Farklı bir kategori seçmeyi veya arama terimini değiştirmeyi deneyin.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
