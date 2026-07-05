import { getPublishedPosts, localizePosts } from "@/lib/blog";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import BlogCard, { type BlogCardDict } from "@/components/BlogCard";
import { localeHref } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

const TEASER_POST_COUNT = 4;

type BlogTeaserProps = {
  lang: string;
  dict: Dictionary["blogTeaser"];
  cardDict: BlogCardDict;
};

export default async function BlogTeaser({ lang, dict, cardDict }: BlogTeaserProps) {
  const posts = localizePosts(await getPublishedPosts(TEASER_POST_COUNT), lang);
  const [featuredPost, ...otherPosts] = posts;
  const hasUntranslated = lang === "en" && posts.some((post) => !post.hasEnglish);

  return (
    <section id="blog" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {dict.heading}
          </h2>
          {posts.length > 0 && (
            <Link
              href={localeHref(lang, "/blog")}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              {dict.allPosts}
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-zinc-900 dark:text-white">
              {dict.emptyTitle}
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              {dict.emptyBody}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-100/40 dark:border-white/10 dark:bg-white/[0.02] p-6 opacity-50"
                >
                  <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-white/10" />
                  <div className="mt-3 h-2 w-full rounded bg-zinc-100 dark:bg-white/5" />
                  <div className="mt-2 h-2 w-4/5 rounded bg-zinc-100 dark:bg-white/5" />
                  <span className="mt-6 inline-block text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {dict.comingSoon}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-zinc-900 dark:text-white">
              {dict.title}
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              {dict.body}
            </p>
            {hasUntranslated && (
              <p className="mt-2 max-w-xl text-sm italic text-zinc-500 dark:text-zinc-500">
                {dict.postsInTurkish}
              </p>
            )}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPost && (
                <BlogCard post={featuredPost} featured lang={lang} dict={cardDict} />
              )}
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} lang={lang} dict={cardDict} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
