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
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-emerald-400 transition-colors">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          </span>
          {dict.badge}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
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
    </section>
  );
}
