import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { HiArrowLeft } from "react-icons/hi2";

export const revalidate = 3600; // Revalidate at most every hour (ISR)

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="flex-1 px-6 py-28 relative z-10">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition mb-8"
          >
            <HiArrowLeft className="h-4 w-4" />
            Geri Dön
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                {new Date(post.created_at).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mt-3">
                {post.title}
              </h1>
              <p className="mt-4 text-base text-zinc-400 italic">
                {post.excerpt}
              </p>
              <div className="mt-6 border-b border-white/10" />
            </header>

            {/* Markdown Content with Premium Styles */}
            <div className="markdown-content text-zinc-300 leading-relaxed space-y-6">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/5 pb-2">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-white mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold text-white mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => <p className="mb-4 text-zinc-300">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-zinc-300">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-1 text-zinc-300">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-400 bg-white/[0.02] pl-4 py-2 italic my-4 rounded-r-lg text-zinc-400">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-white/10 rounded px-1.5 py-0.5 text-xs text-emerald-400 font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-black/40 border border-white/10 rounded-2xl p-4 overflow-x-auto my-6 text-xs text-zinc-300 font-mono leading-relaxed">
                        <code className={className}>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
