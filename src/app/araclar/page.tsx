import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";
import { SiNuget } from "react-icons/si";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { tools, type ToolPackage } from "@/lib/tools";

export const metadata: Metadata = {
  title: `Araçlar | ${siteConfig.name}`,
  description:
    "Geliştirdiğim açık kaynak paketler ve geliştirici araçları — canlı demolarıyla birlikte. npm paketleriyle başladı; NuGet paketleri de yolda.",
};

function RegistryBadge({ registry }: { registry: ToolPackage["registry"] }) {
  if (registry === "npm") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cb3837]/20 bg-[#cb3837]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#cb3837] dark:text-red-400">
        <FaNpm className="h-3.5 w-3.5" /> npm
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-600 dark:text-sky-400">
      <SiNuget className="h-3.5 w-3.5" /> NuGet
    </span>
  );
}

function ToolCard({ tool }: { tool: ToolPackage }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-mono text-lg font-semibold text-zinc-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                {tool.name}
              </h3>
              <RegistryBadge registry={tool.registry} />
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{tool.tagline}</p>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              aria-label={`${tool.name} GitHub adresi`}
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link
              href={tool.packageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
              aria-label={`${tool.name} paket sayfası`}
            >
              <HiArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {tool.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <code className="rounded-lg border border-zinc-200 bg-white/60 px-3 py-1.5 font-mono text-xs text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300">
          {tool.installCommand}
        </code>
        <Link
          href={`/araclar/${tool.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-400"
        >
          Canlı Dene
          <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function ToolsHubPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex-1 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <HiArrowLeft className="h-4 w-4" />
            Ana Sayfa
          </Link>

          <h1 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Araçlar
          </h1>
          <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Açık Kaynak Paketler & Geliştirici Araçları
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Geliştirdiğim açık kaynak paketleri burada topluyorum — her birini kurmadan önce
            tarayıcınızda canlı deneyebilirsiniz. Şu an npm paketleriyle başladı; ilerleyen
            dönemde .NET tarafı için NuGet paketleri de bu bölüme eklenecek.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
