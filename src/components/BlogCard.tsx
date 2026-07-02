import Link from "next/link";
import { HiEye, HiClock, HiArrowRight } from "react-icons/hi2";
import { getReadingTime, type Post } from "@/lib/blog";

type BlogCardProps = {
  post: Post;
  featured?: boolean;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = getReadingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5 ${
        featured ? "p-8 sm:col-span-2 lg:col-span-2" : "p-6"
      }`}
    >
      {/* Hover'da beliren ışıma */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Üst kenarda incecik vurgu çizgisi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <div className="flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
              {post.category}
            </span>
          )}
          <span className="text-[11px] font-medium text-zinc-500">
            {formatDate(post.created_at)}
          </span>
        </div>

        <h3
          className={`mt-4 font-semibold leading-snug text-white transition group-hover:text-emerald-400 ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-zinc-400 ${
            featured ? "line-clamp-4 max-w-2xl" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {(post.tags?.length ?? 0) > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags!.slice(0, featured ? 6 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <HiClock className="h-3.5 w-3.5" />
            {readingTime} dk okuma
          </span>
          <span className="inline-flex items-center gap-1">
            <HiEye className="h-3.5 w-3.5" />
            {post.views ?? 0}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-semibold text-zinc-400 transition-colors group-hover:text-emerald-400">
          Devamını Oku
          <HiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
