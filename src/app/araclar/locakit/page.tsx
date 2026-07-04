import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import LocakitPlayground, { InstallCommand } from "@/components/tools/LocakitPlayground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { getToolBySlug } from "@/lib/tools";

export const metadata: Metadata = {
  title: `locakit | Araçlar | ${siteConfig.name}`,
  description:
    "locakit — AI agent'lar için deterministik i18n motoru. Eksik ve bayat çeviri key'lerini tespit eder, agent'ınız bağlama uygun çevirir, locakit doğrulayıp güvenle yazar. Doğrulama motorunu tarayıcınızda canlı deneyin.",
};

const locakit = getToolBySlug("locakit");

const workflow = [
  {
    step: "locakit diff",
    who: "locakit",
    detail: "Eksik ve bayatlamış key'leri lockfile ile tespit eder, bağlam ve glossary ile birlikte JSON olarak verir.",
  },
  {
    step: "çeviri",
    who: "agent'ınız",
    detail: "Claude Code her key'in kodda kullanıldığı yeri okur — \"Home\" nav linkiyse \"Ana Sayfa\" olur, bina ise \"Ev\". Projenin tonunu bildiği için sen/siz tutarlıdır.",
  },
  {
    step: "locakit apply",
    who: "locakit",
    detail: "Yamalı çevirileri kaynak key sırasını koruyarak yazar; kaynakta olmayan key'leri reddeder (halüsinasyon emniyeti).",
  },
  {
    step: "locakit check",
    who: "locakit",
    detail: "Yer tutucu paritesi, glossary ve dil paketi kurallarını doğrular; CI'da hata varsa build kırılır.",
  },
];

export default function LocakitPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex-1 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/araclar"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <HiArrowLeft className="h-4 w-4" />
            Araçlar
          </Link>

          <h1 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Araçlar / locakit
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            locakit — AI Agent&apos;lar için Deterministik i18n Motoru
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Çeviri araçlarının hepsi kendi LLM boru hattını kurar: API key, SaaS hesabı, token
            faturası. Oysa gün boyu kullandığınız agent kod tabanınızı zaten okuyor.{" "}
            <span className="text-zinc-900 dark:text-white">
              locakit işi doğru yerinden böler:
            </span>{" "}
            çeviriyi agent&apos;ınız yapar; eksik/bayat key tespiti, yer tutucu ve glossary
            doğrulaması, güvenli JSON yazımı gibi deterministik işleri locakit üstlenir.
          </p>

          {locakit && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {locakit.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <InstallCommand />
            <Link
              href="https://www.npmjs.com/package/locakit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
            >
              <FaNpm className="h-5 w-5 text-[#cb3837]" />
              npm
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="https://github.com/berkayyalcin7/locakit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* İş akışı */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item, index) => (
              <div
                key={item.step}
                className="rounded-2xl border border-zinc-200 bg-zinc-100/50 p-5 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.01]"
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {index + 1}. {item.step}
                  </code>
                  <span className="rounded-full bg-zinc-200/60 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
                    {item.who}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Doğrulama motorunu canlı deneyin
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Aşağıdaki örnek bilerek hatalı: eksik key, yer tutucu uyumsuzluğu, artık key ve
              Türkçe dil paketinin yakaladığı iki klasik hata içeriyor.{" "}
              <code className="font-mono text-emerald-600 dark:text-emerald-400">
                locakit check
              </code>{" "}
              butonuna basın.
            </p>
            <div className="mt-6">
              <LocakitPlayground />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
