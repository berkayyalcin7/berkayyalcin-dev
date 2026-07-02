import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { getCategories, getPublishedPosts } from "@/lib/blog";
import BlogExplorer from "@/components/BlogExplorer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 1800; // Revalidate at most every 30 minutes (ISR)

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description:
    ".NET, web mimarileri ve yazılım dünyası üzerine teknik yazılar, deneyimler ve notlar.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const categories = getCategories(posts);

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-28 relative z-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition mb-8"
          >
            <HiArrowLeft className="h-4 w-4" />
            Ana Sayfa
          </Link>

          <h1 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Teknoloji & Deneyim Paylaşımları
          </p>
          <p className="mt-3 max-w-xl text-base text-zinc-400">
            .NET, web mimarileri ve yazılım dünyasından seçtiğim konular
            hakkındaki tüm teknik yazılarım — kategoriye göre filtreleyebilir
            veya arama yapabilirsiniz.
          </p>

          {posts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-lg font-medium text-white">
                Yazılar çok yakında burada olacak.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Blog yazıları yayınlandıkça bu sayfada otomatik listelenecek.
              </p>
            </div>
          ) : (
            <BlogExplorer posts={posts} categories={categories} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
