import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import BlogCard from "@/components/BlogCard";

const TEASER_POST_COUNT = 4;

export default async function BlogTeaser() {
  const posts = await getPublishedPosts();
  const teaserPosts = posts.slice(0, TEASER_POST_COUNT);
  const [featuredPost, ...otherPosts] = teaserPosts;

  return (
    <section id="blog" className="scroll-mt-24 border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Blog
          </h2>
          {posts.length > 0 && (
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition hover:text-emerald-400"
            >
              Tüm Yazılar
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-white">
              Yazılar çok yakında burada olacak.
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-400">
              Blog yazıları Supabase veritabanına eklendikten sonra bu alanda otomatik olarak listelenecek.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 opacity-50"
                >
                  <div className="h-3 w-2/3 rounded bg-white/10" />
                  <div className="mt-3 h-2 w-full rounded bg-white/5" />
                  <div className="mt-2 h-2 w-4/5 rounded bg-white/5" />
                  <span className="mt-6 inline-block text-xs font-medium text-zinc-500">
                    Yakında
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-white">
              Teknoloji & Deneyim Paylaşımları
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-400">
              .NET, Web mimarileri ve yazılım dünyasından seçtiğim konular hakkındaki teknik yazılarım.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPost && <BlogCard post={featuredPost} featured />}
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
