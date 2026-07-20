import {
  getPostBySlug,
  getPostCardsBySlugs,
  getPostSummaries,
  getReadingTime,
  getRelatedSlugs,
  localizePost,
} from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { HiArrowLeft, HiClock, HiLanguage } from "react-icons/hi2";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ViewCounter from "@/components/ViewCounter";
import ReadingProgress from "@/components/ReadingProgress";
import type { Metadata } from "next";
import { getDictionary, hasLocale, buildHeaderDict, locales } from "@/lib/i18n";
import { localeHref, fill, canonicalPath } from "@/lib/locale-link";

export const revalidate = 1800; // Revalidate at most every 30 minutes (ISR)

type BlogPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : null;
  const rawPost = await getPostBySlug(slug);
  if (!rawPost) {
    return {
      title: `${dict?.blogPost.notFoundTitle ?? "Post Not Found"} | Berkay Yalçın - Blog`,
    };
  }

  const post = localizePost(rawPost, lang);
  const baseUrl = "https://berkayyalcin.dev";

  return {
    title: `${post.title} | Berkay Yalçın - Blog`,
    description: post.excerpt,
    keywords: post.tags ?? undefined,
    alternates: {
      canonical: canonicalPath(lang, `/blog/${post.slug}`),
      languages: {
        en: `/blog/${post.slug}`,
        tr: `/tr/blog/${post.slug}`,
        "x-default": `/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | Berkay Yalçın - Blog`,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: ["Berkay Yalçın"],
      // images bilinçli olarak yok: opengraph-image.tsx her yazı için başlık,
      // kategori ve okuma süresi taşıyan 1200x630 kart üretir. Kapak görseli
      // olmayan yazılarda eskiden kare icon.png paylaşılıyordu.
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return locales.flatMap((lang) =>
    posts.map((post) => ({ lang, slug: post.slug }))
  );
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const [rawPost, summaries] = await Promise.all([
    getPostBySlug(slug),
    getPostSummaries(),
  ]);

  if (!rawPost) {
    notFound();
  }

  const post = localizePost(rawPost, lang);
  // Skorlama içeriksiz özetler üzerinde yapılır; tam satır yalnızca kazanan 3 yazı için çekilir.
  const relatedPosts = await getPostCardsBySlugs(getRelatedSlugs(rawPost, summaries), lang);
  const readingTime = getReadingTime(post.content);

  const baseUrl = "https://berkayyalcin.dev";
  const coverImageUrl = post.cover_image
    ? (post.cover_image.startsWith("http") ? post.cover_image : `${baseUrl}${post.cover_image}`)
    : `${baseUrl}/icon.png`;

  // Gösterilen içeriğin gerçek dili (EN istenip çeviri yoksa TR gösterilir)
  const contentLang = lang === "en" && post.hasEnglish ? "en" : "tr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "inLanguage": contentLang,
    "image": coverImageUrl,
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": "Berkay Yalçın",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Berkay Yalçın",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Header lang={lang} dict={buildHeaderDict(dict)} />
      <main id="main-content" className="flex-1 px-6 py-28 relative z-10">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            href={localeHref(lang, "/blog")}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 transition mb-8"
          >
            <HiArrowLeft className="h-4 w-4" />
            {dict.blogPost.backToAll}
          </Link>

          {/* EN istendi ama çeviri yok: Türkçe orijinal gösterildiğini belirt */}
          {post.isFallback && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/5 dark:text-amber-300">
              <HiLanguage className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{dict.blogPost.fallbackNotice}</p>
            </div>
          )}
        </div>

        {/* Kapak: metin kolonundan biraz daha geniş; 16:9 kapaklarla birebir uyumlu (21/9 kırpmıyordu) */}
        {post.cover_image && (
          <div className="mx-auto mb-10 max-w-4xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                className="object-cover object-center"
              />
              {/* İnce kenar geçişi — görsel içeriğini örtmez */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent dark:from-black/35"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {/* Article Header */}
          <article>
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {post.category && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    {post.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  {["TR", ...(post.hasEnglish ? ["EN"] : [])].map((code) => (
                    <span
                      key={code}
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wider ${
                        code.toLowerCase() === contentLang
                          ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/30"
                          : "border border-zinc-300 text-zinc-500 dark:border-white/20 dark:text-zinc-400"
                      }`}
                    >
                      {code}
                    </span>
                  ))}
                </span>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  {new Date(post.created_at).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <HiClock className="h-4 w-4" />
                  {fill(dict.blogPost.readingTime, { minutes: readingTime })}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                <ViewCounter slug={post.slug} initialViews={post.views || 0} label={dict.blogPost.views} />
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl sm:leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
              {(post.tags?.length ?? 0) > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags!.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 border border-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-700 dark:bg-white/5 dark:text-zinc-400 dark:border-white/10 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/15" />
            </header>

            {/* Markdown Content with Premium Styles */}
            <div className="markdown-content text-zinc-750 dark:text-zinc-300 leading-relaxed space-y-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 border-b border-zinc-200 dark:border-white/5 pb-2">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => <p className="mb-4 text-zinc-700 dark:text-zinc-300">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-zinc-700 dark:text-zinc-300">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-1 text-zinc-700 dark:text-zinc-300">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 bg-zinc-100/50 dark:border-emerald-400 dark:bg-white/[0.02] pl-4 py-2 italic my-4 rounded-r-lg text-zinc-600 dark:text-zinc-400">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => {
                    const isExternal = Boolean(href && !href.startsWith("/") && !href.startsWith("#"));
                    return (
                      <a
                        href={href}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="font-medium text-emerald-700 underline decoration-emerald-500/40 underline-offset-2 transition hover:decoration-emerald-500 dark:text-emerald-400"
                      >
                        {children}
                      </a>
                    );
                  },
                  strong: ({ children }) => (
                    <strong className="font-semibold text-zinc-900 dark:text-white">{children}</strong>
                  ),
                  hr: () => <hr className="my-8 border-zinc-200 dark:border-white/10" />,
                  // Aşağıdakiler remark-gfm ile gelir (tablo, görev listesi, üstü çizili).
                  table: ({ children }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
                      <table className="w-full border-collapse text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-zinc-100 text-left dark:bg-white/5">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-zinc-200 px-4 py-2.5 font-semibold text-zinc-900 dark:border-white/10 dark:text-white">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-zinc-200/70 px-4 py-2.5 text-zinc-700 dark:border-white/5 dark:text-zinc-300">
                      {children}
                    </td>
                  ),
                  del: ({ children }) => (
                    <del className="text-zinc-500 dark:text-zinc-500">{children}</del>
                  ),
                  code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-zinc-150 text-emerald-700 dark:bg-white/10 dark:text-emerald-400 rounded px-1.5 py-0.5 text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <div className="my-6 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/30 dark:border-white/10 shadow-xl dark:shadow-2xl dark:bg-zinc-950/40">
                        {/* Mock Code Editor Header Bar */}
                        <div className="flex items-center justify-between bg-zinc-200/80 text-zinc-650 dark:bg-zinc-900/80 px-4 py-2.5 text-xs dark:text-zinc-400 select-none border-b border-zinc-200 dark:border-white/5">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase">
                            {match ? match[1] : "code"}
                          </span>
                        </div>
                        {/* Syntax Highlighter */}
                        <SyntaxHighlighter
                          language={match ? match[1] : "javascript"}
                          style={vscDarkPlus}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: "1.25rem",
                            background: "transparent",
                            fontSize: "0.8rem",
                            lineHeight: "1.6",
                            fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* İlgili Yazılar */}
          {relatedPosts.length > 0 && (
            <aside className="mt-16 border-t border-zinc-200 dark:border-white/10 pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                {dict.blogPost.relatedPosts}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} lang={lang} dict={dict.blogCard} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer lang={lang} dict={dict.footer} nav={dict.nav} contact={dict.contact} />
    </>
  );
}
