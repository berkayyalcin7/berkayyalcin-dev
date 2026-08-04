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
      {/* Dynamic Aurora & Mesh Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px] dark:bg-emerald-500/20 animate-ambient-glow" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/15 blur-[100px] dark:bg-blue-500/20 animate-ambient-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-teal-500/10 blur-[130px] dark:bg-teal-500/15" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              {dict.badge}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-6xl leading-[1.1]">
              {titleBefore}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                {siteConfig.name}
              </span>
              {titleAfter}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl leading-relaxed">
              {fill(dict.subtitle, { role: profile.role, location: profile.location })}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={localeHref(lang, "/#blog")}
                className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25 active:translate-y-0"
              >
                {dict.ctaBlog}
              </a>
              <a
                href={localeHref(lang, "/#iletisim")}
                className="rounded-full border border-zinc-300 bg-white/50 backdrop-blur-sm px-7 py-3.5 text-sm font-bold text-zinc-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400 active:translate-y-0"
              >
                {dict.ctaContact}
              </a>

              {/* Sosyal bağlantılar */}
              <div className="flex items-center gap-2.5 sm:ml-2 sm:border-l sm:border-zinc-200 sm:pl-6 dark:sm:border-white/10">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/70 backdrop-blur-sm text-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/15 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Kod editörü mockup */}
          <div className="relative hidden lg:block">
            {/* Ambient Back Glow for Editor */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-blue-500/30 opacity-70 blur-xl transition-all duration-500 group-hover:opacity-100" />
            
            <div
              aria-hidden
              className="absolute -top-3.5 -right-2 z-20 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-white/95 px-3.5 py-1 text-xs font-bold text-emerald-700 shadow-xl backdrop-blur-md dark:border-emerald-400/40 dark:bg-zinc-950/95 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              {dict.buildPassing}
            </div>
            
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-emerald-500/10 dark:border-white/15">
              {/* Window Header / Tabs Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/90 px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56] transition-opacity hover:opacity-80" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e] transition-opacity hover:opacity-80" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f] transition-opacity hover:opacity-80" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="rounded-t-lg bg-zinc-950 px-3 py-1 text-xs font-mono font-medium text-emerald-400 border-t border-x border-emerald-500/30">
                    developer.ts
                  </span>
                  <span className="px-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer">
                    stack.json
                  </span>
                </div>
              </div>

              {/* Code Content with Line Numbers */}
              <div className="flex px-4 py-5 font-mono text-[13px] leading-7">
                <div className="select-none pr-4 text-right text-zinc-600 font-mono">
                  1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
                </div>
                <div className="space-y-0.5 text-zinc-300">
                  <div>
                    <span className="text-purple-400 font-semibold">const</span>{" "}
                    <span className="text-sky-300 font-semibold">developer</span> = {"{"}
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-zinc-400">name</span>: <span className="text-emerald-300 font-medium">&quot;{siteConfig.name}&quot;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-zinc-400">role</span>: <span className="text-emerald-300 font-medium">&quot;{profile.role}&quot;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-zinc-400">stack</span>: [<span className="text-emerald-300">&quot;Next.js&quot;</span>, <span className="text-emerald-300">&quot;.NET&quot;</span>, <span className="text-emerald-300">&quot;Supabase&quot;</span>],
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-zinc-400">building</span>: <span className="text-emerald-300">&quot;{dict.codeBuilding}&quot;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-zinc-400">status</span>: <span className="text-emerald-300">&quot;{dict.codeStatus}&quot;</span>
                  </div>
                  <div>{"}"};</div>
                  <div className="pt-1.5 flex items-center">
                    <span className="text-zinc-500">{"// Ready for new challenges"}</span>
                    <span className="ml-2 inline-block h-4 w-2 bg-emerald-400 motion-safe:animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
