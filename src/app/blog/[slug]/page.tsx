import {
  getPostBySlug,
  getPublishedPosts,
  getReadingTime,
  getRelatedPosts,
} from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { HiArrowLeft, HiClock } from "react-icons/hi2";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ViewCounter from "@/components/ViewCounter";
import type { Metadata } from "next";

export const revalidate = 1800; // Revalidate at most every 30 minutes (ISR)

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Yazı Bulunamadı | Berkay Yalçın - Blog",
    };
  }
  return {
    title: `${post.title} | Berkay Yalçın - Blog`,
    description: post.excerpt,
    keywords: post.tags ?? undefined,
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getPublishedPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, allPosts);
  const readingTime = getReadingTime(post.content);

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-28 relative z-10">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition mb-8"
          >
            <HiArrowLeft className="h-4 w-4" />
            Tüm Yazılar
          </Link>

          {/* Article Header */}
          <article>
            {post.cover_image && (
              <div className="relative w-full aspect-video md:aspect-[21/9] mb-8 overflow-hidden rounded-2xl border border-zinc-200 shadow-xl bg-zinc-100 dark:border-white/10 dark:shadow-2xl dark:bg-zinc-900">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {post.category && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {post.category}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  {new Date(post.created_at).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <HiClock className="h-4 w-4" />
                  {readingTime} dk okuma
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                <ViewCounter slug={post.slug} initialViews={post.views || 0} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mt-3">
                {post.title}
              </h1>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 italic">
                {post.excerpt}
              </p>
              {(post.tags?.length ?? 0) > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags!.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 border border-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:bg-white/5 dark:text-zinc-400 dark:border-white/10 dark:transition dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 border-b border-zinc-200 dark:border-white/10" />
            </header>

            {/* Markdown Content with Premium Styles */}
            <div className="markdown-content text-zinc-750 dark:text-zinc-300 leading-relaxed space-y-6">
              <ReactMarkdown
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
                  code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-zinc-150 text-emerald-600 dark:bg-white/10 dark:text-emerald-400 rounded px-1.5 py-0.5 text-xs font-mono">
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
              <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                İlgili Yazılar
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
