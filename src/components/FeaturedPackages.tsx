import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { tools, type ToolPackage } from "@/lib/tools";
import { localeHref, fill } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

type FeaturedPackagesDict = Dictionary["featuredPackages"];
type ToolText = { tagline: string; features: string[] };

type FeaturedPackagesProps = {
  lang: string;
  dict: FeaturedPackagesDict;
  packageTexts: Record<ToolPackage["slug"], ToolText>;
};

function PackageCard({
  tool,
  text,
  dict,
  lang,
}: {
  tool: ToolPackage;
  text: ToolText;
  dict: FeaturedPackagesDict;
  lang: string;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03]">
      {/* Üst kenar vurgu çizgisi */}
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Terminal mockup — bölüme koyu, "canlı" bir görsel ritim katar */}
      <div className="border-b border-zinc-200 bg-zinc-950 dark:border-white/10">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {dict.installLabel}
          </span>
        </div>
        <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-6">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="select-none text-emerald-400">$</span>
            <span>{tool.installCommand}</span>
          </div>
          <div className="text-zinc-500">
            <span className="text-emerald-400">+</span> {tool.name}
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <span>{dict.outputAdded}</span>
            <span className="inline-block h-3.5 w-[7px] translate-y-[1px] bg-emerald-400 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-lg font-semibold text-zinc-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
              {tool.name}
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cb3837]/20 bg-[#cb3837]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#cb3837] dark:text-red-400">
              <FaNpm className="h-3.5 w-3.5" /> npm
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              {dict.zeroDeps}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              aria-label={fill(dict.githubAria, { name: tool.name })}
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link
              href={tool.packageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
              aria-label={fill(dict.npmAria, { name: tool.name })}
            >
              <HiArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {text.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {text.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={localeHref(lang, `/araclar/${tool.slug}`)}
          className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/20 dark:text-emerald-400"
        >
          {dict.tryLive}
          <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedPackages({ lang, dict, packageTexts }: FeaturedPackagesProps) {
  return (
    <section className="border-t border-zinc-200 px-6 py-20 dark:border-white/10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {dict.heading}
            </h2>
            <p className="mt-4 max-w-xl text-2xl font-medium text-zinc-900 dark:text-white">
              {dict.title}
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              {dict.body}
            </p>
          </div>
          <Link
            href={localeHref(lang, "/araclar")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            {dict.viewAll}
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {tools.map((tool) => (
            <PackageCard
              key={tool.slug}
              tool={tool}
              text={packageTexts[tool.slug]}
              dict={dict}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
