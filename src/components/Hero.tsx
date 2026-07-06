import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import { localeHref, fill } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

type HeroProps = {
  lang: string;
  dict: Dictionary["hero"];
  profile: Dictionary["profile"];
};

export default function Hero({ lang, dict, profile }: HeroProps) {
  const socialLinks = [
    { label: "GitHub", href: siteConfig.social.github, icon: FaGithub },
    { label: "LinkedIn", href: siteConfig.social.linkedin, icon: FaLinkedin },
    { label: dict.emailAria, href: siteConfig.social.email, icon: HiEnvelope },
  ];

  // "Merhaba, ben {name}." şablonunu, isim vurgulu span'iyle render etmek için böl
  const [titleBefore, titleAfter] = dict.title.split("{name}");

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
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-emerald-400 transition-colors">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              {dict.badge}
            </span>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              {titleBefore}
              <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              {titleAfter}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              {fill(dict.subtitle, { role: profile.role, location: profile.location })}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={localeHref(lang, "/#blog")}
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                {dict.ctaBlog}
              </a>
              <a
                href={localeHref(lang, "/#iletisim")}
                className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
              >
                {dict.ctaContact}
              </a>

              {/* Sosyal bağlantılar */}
              <div className="flex items-center gap-2 sm:ml-2 sm:border-l sm:border-zinc-200 sm:pl-6 dark:sm:border-white/10">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100/50 text-zinc-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Kod editörü mockup: gerçek foto yerine geliştirici kimliğini görsel olarak taşır */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute -top-3 -right-3 z-10 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-600 shadow-lg dark:border-emerald-400/30 dark:bg-zinc-950 dark:text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              {dict.buildPassing}
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950/95 shadow-2xl shadow-emerald-500/10 dark:border-white/10">
              <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  developer.ts
                </span>
              </div>
              <div className="space-y-0.5 px-5 py-6 font-mono text-[13px] leading-7 text-zinc-300">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-sky-300">developer</span> = {"{"}
                </div>
                <div className="pl-4">
                  name: <span className="text-emerald-300">&quot;{siteConfig.name}&quot;</span>,
                </div>
                <div className="pl-4">
                  role: <span className="text-emerald-300">&quot;{profile.role}&quot;</span>,
                </div>
                <div className="pl-4">
                  stack: [<span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;.NET&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;Supabase&quot;</span>],
                </div>
                <div className="pl-4">
                  building:{" "}
                  <span className="text-emerald-300">&quot;{dict.codeBuilding}&quot;</span>,
                </div>
                <div className="pl-4">
                  status: <span className="text-emerald-300">&quot;{dict.codeStatus}&quot;</span>
                </div>
                <div>{"}"};</div>
                <div className="pt-1">
                  <span className="inline-block h-4 w-[7px] translate-y-[2px] bg-emerald-400 motion-safe:animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
