import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.12), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-5xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-emerald-400 transition-colors">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          Yeni projeler üzerinde çalışıyorum
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Merhaba, ben {siteConfig.name}.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          {siteConfig.role} — {siteConfig.location}. Modern web ve .NET
          ekosistemiyle uçtan uca ürünler geliştiriyor, öğrendiklerimi bu
          blogda paylaşıyorum.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#blog"
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            Blog Yazılarını Gör
          </a>
          <a
            href="#iletisim"
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
          >
            Benimle İletişime Geç
          </a>
        </div>
      </div>
    </section>
  );
}
