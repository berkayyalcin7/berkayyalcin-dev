import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaNpm } from "react-icons/fa";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import TrkitPlayground, { InstallCommand } from "@/components/tools/TrkitPlayground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, buildHeaderDict } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-link";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `trkit | ${dict.toolsPage.metaTitle} | ${siteConfig.name}`,
    description: dict.trkit.metaDescription,
    alternates: {
      languages: { tr: "/araclar/trkit", en: "/en/araclar/trkit" },
    },
  };
}

export default async function TrkitPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={buildHeaderDict(dict)} />
      <main className="relative z-10 flex-1 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href={localeHref(lang, "/araclar")}
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <HiArrowLeft className="h-4 w-4" />
            {dict.toolsPage.backToTools}
          </Link>

          <h1 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {dict.toolsPage.heading} / trkit
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {dict.trkit.pageTitle}
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            {dict.trkit.pageIntro}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {dict.trkit.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
              >
                {feature}
              </span>
            ))}
          </div>

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

          {lang !== "tr" && (
            <p className="mt-6 text-sm italic text-zinc-500 dark:text-zinc-500">
              {dict.toolsPage.demoInTurkishNote}
            </p>
          )}

          <div className="mt-12">
            <TrkitPlayground />
          </div>

          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
            {dict.trkit.disclaimer}
          </p>
        </div>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
