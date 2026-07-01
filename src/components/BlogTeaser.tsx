import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";

export default async function BlogTeaser() {
  const posts = await getPublishedPosts();

  return (
    <section id="blog" className="scroll-mt-24 border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Blog
        </h2>
        
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
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-emerald-400/40 hover:bg-white/[0.04]"
                >
                  <span className="text-[11px] font-medium text-emerald-400">
                    {new Date(post.created_at).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white transition group-hover:text-emerald-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition group-hover:text-white">
                    Devamını Oku →
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
