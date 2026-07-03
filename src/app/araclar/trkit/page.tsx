import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import TrkitPlayground, { InstallCommand } from "@/components/tools/TrkitPlayground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { getToolBySlug } from "@/lib/tools";

export const metadata: Metadata = {
  title: `trkit | Araçlar | ${siteConfig.name}`,
  description:
    "trkit — Türkiye'ye özgü doğrulama, formatlama ve KVKK maskeleme fonksiyonlarını tarayıcınızda canlı deneyin. Sıfır bağımlılıklı, açık kaynak npm paketi.",
};

const trkit = getToolBySlug("trkit");

export default function TrkitPage() {
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
            Araçlar / trkit
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            trkit — Türk Geliştiriciler için Utility Kit
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Geliştirdiğim açık kaynak npm paketi: TC Kimlik No, VKN, IBAN, telefon ve plaka
            doğrulama; KVKK dostu maskeleme; Türkçe <code className="font-mono text-sm">İ/ı</code>{" "}
            duyarlı metin işlemleri; sayıyı yazıya çevirme ve KDV hesapları. Saf fonksiyonlardan
            oluşur — React, Vue, Angular, Node fark etmeksizin her yerde çalışır. Aşağıdaki
            demolar paketi doğrudan tarayıcınızda çalıştırır.
          </p>

          {trkit && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {trkit.features.map((feature) => (
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
              href="https://www.npmjs.com/package/trkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
            >
              <FaNpm className="h-5 w-5 text-[#cb3837]" />
              npm
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="https://github.com/berkayyalcin7/trkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-12">
            <TrkitPlayground />
          </div>

          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
            Örnek değerler sentetiktir; gerçek kişi verisi değildir. trkit yalnızca
            format/checksum doğrulaması yapar — hiçbir devlet servisine sorgu göndermez, kişisel
            veri işlemez ve KVKK/GDPR uyum garantisi değildir. Girdiğiniz veriler tarayıcınızdan
            çıkmaz.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
