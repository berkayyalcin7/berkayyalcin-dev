import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

type FooterProps = {
  lang: string;
  dict: Dictionary["footer"];
  nav: Dictionary["nav"];
  contact: Pick<Dictionary["contact"], "emailLabel" | "githubLabel" | "linkedinLabel">;
};

export default function Footer({ lang, dict, nav, contact }: FooterProps) {
  const homePath = lang === "en" ? "/" : `/${lang}`;
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: contact.emailLabel, href: siteConfig.social.email, icon: HiEnvelope, external: false },
    { label: contact.githubLabel, href: siteConfig.social.github, icon: FaGithub, external: true },
    { label: contact.linkedinLabel, href: siteConfig.social.linkedin, icon: FaLinkedin, external: true },
  ];

  return (
    <footer className="relative border-t border-zinc-200 px-6 py-14 dark:border-white/10">
      {/* İletişim bölümünün kapanışını sürdüren ince vurgu çizgisi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
      />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Marka + kısa tanıtım + sosyal bağlantılar */}
          <div>
            <div className="flex items-center gap-3">
              <Link
                href={homePath}
                className="text-base font-bold tracking-tight text-zinc-900 transition hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400"
              >
                berkayyalcin<span className="text-emerald-700 dark:text-emerald-400">.dev</span>
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Available for work
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-zinc-200/80 bg-white/60 text-zinc-600 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-500/15 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Site içi navigasyon: Header'ın aynı kaynağı, sakin metin linkleri olarak */}
          <nav aria-label={dict.navAria}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:flex sm:flex-col sm:gap-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localeHref(lang, item.href)}
                    className="text-zinc-600 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {dict.rights}
          </p>
          <p>{dict.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
