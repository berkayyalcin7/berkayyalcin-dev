import Link from "next/link";
import { HiHome, HiNewspaper } from "react-icons/hi2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-28 relative z-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-blue-500 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl">
            404
          </p>
          <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-white sm:text-3xl">
            Sayfa Bulunamadı
          </h1>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <HiHome className="h-4 w-4" />
              Ana Sayfa
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
            >
              <HiNewspaper className="h-4 w-4" />
              Blog Yazıları
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
