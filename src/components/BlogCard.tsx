import Link from "next/link";
import Image from "next/image";
import { HiEye, HiClock, HiArrowRight } from "react-icons/hi2";
import { getReadingTime, type LocalizedPost } from "@/lib/blog";
import { localeHref, fill } from "@/lib/locale-link";

export type BlogCardDict = {
  readingTime: string;
  readMore: string;
  languagesAria: string;
};

type BlogCardProps = {
  post: LocalizedPost;
  featured?: boolean;
  lang: string;
  dict: BlogCardDict;
};

/** Yazının mevcut olduğu diller; aktif dil dolgun, diğeri çerçeveli rozet. */
function LanguageBadges({ post, lang, ariaLabel }: { post: LocalizedPost; lang: string; ariaLabel: string }) {
  const badges = [
    { code: "TR", available: true },
    { code: "EN", available: post.hasEnglish },
  ].filter((badge) => badge.available);

  // Kartta gösterilen içeriğin dili: EN görünümünde çeviri varsa EN, yoksa TR
  const shownCode = lang === "en" && post.hasEnglish ? "EN" : "TR";

  return (
    <span aria-label={ariaLabel} className="ml-auto inline-flex items-center gap-1">
      {badges.map((badge) => (
        <span
          key={badge.code}
          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${
            badge.code === shownCode
              ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/30"
              : "border border-zinc-300 text-zinc-500 dark:border-white/20 dark:text-zinc-400"
          }`}
        >
          {badge.code}
        </span>
      ))}
    </span>
  );
}

function formatDate(date: string, lang: string) {
  return new Date(date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post, featured = false, lang, dict }: BlogCardProps) {
  const readingTime = getReadingTime(post.content);

  return (
    <Link
      href={localeHref(lang, `/blog/${post.slug}`)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 dark:border-white/5 dark:bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-150/70 dark:hover:bg-white/[0.03] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5 ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Hover'da beliren ışıma */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 dark:to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Üst kenarda incecik vurgu çizgisi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

      {/* Kapak görseli */}
      {post.cover_image && (
        <div
          className={`relative w-full overflow-hidden border-b border-zinc-200/60 dark:border-white/5 ${
            featured ? "aspect-[21/9]" : "aspect-[16/9]"
          }`}
        >
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Görselden içeriğe yumuşak geçiş */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/60 via-transparent to-transparent dark:from-zinc-950/60" />
        </div>
      )}

      <div
        className={`flex flex-1 flex-col justify-between ${
          featured ? "p-8" : "p-6"
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {post.category && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {post.category}
              </span>
            )}
            <span className="text-[11px] font-medium text-zinc-500">
              {formatDate(post.created_at, lang)}
            </span>
            <LanguageBadges post={post} lang={lang} ariaLabel={dict.languagesAria} />
          </div>

          <h3
            className={`mt-4 font-semibold leading-snug text-zinc-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${
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
                  className="rounded-full bg-zinc-200/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 border border-zinc-250/40 dark:bg-white/5 dark:text-zinc-400 dark:border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-y-2 text-xs text-zinc-500">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1">
              <HiClock className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
              {fill(dict.readingTime, { minutes: readingTime })}
            </span>
            <span className="inline-flex items-center gap-1">
              <HiEye className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
              {post.views ?? 0}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-zinc-500 transition-colors group-hover:text-emerald-600 dark:text-zinc-400 dark:group-hover:text-emerald-400">
            <span className="hidden sm:inline lg:hidden xl:inline">{dict.readMore}</span>
            <HiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
