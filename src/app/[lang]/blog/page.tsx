import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { getCategories, getPublishedPosts } from "@/lib/blog";
import BlogExplorer from "@/components/BlogExplorer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, buildHeaderDict } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-link";

export const revalidate = 1800; // Revalidate at most every 30 minutes (ISR)

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.blogPage.metaTitle} | ${siteConfig.name}`,
    description: dict.blogPage.metaDescription,
    alternates: {
      languages: { tr: "/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogIndexPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await getPublishedPosts();
  const categories = getCategories(posts);

  return (
    <>
      <Header lang={lang} dict={buildHeaderDict(dict)} />
      <main className="flex-1 px-6 py-28 relative z-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href={localeHref(lang, "/#blog")}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition mb-8"
          >
            <HiArrowLeft className="h-4 w-4" />
            {dict.blogPage.backHome}
          </Link>

          <h1 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {dict.blogPage.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {dict.blogPage.title}
          </p>
          <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
            {dict.blogPage.intro}
          </p>
          {lang !== "tr" && (
            <p className="mt-2 max-w-xl text-sm italic text-zinc-500 dark:text-zinc-500">
              {dict.blogTeaser.postsInTurkish}
            </p>
          )}

          {posts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 bg-zinc-100/40 dark:border-white/10 dark:bg-white/[0.02] p-12 text-center">
              <p className="text-lg font-medium text-zinc-900 dark:text-white">
                {dict.blogPage.emptyTitle}
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {dict.blogPage.emptyBody}
              </p>
            </div>
          ) : (
            <BlogExplorer posts={posts} categories={categories} lang={lang} cardDict={dict.blogCard} />
          )}
        </div>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
