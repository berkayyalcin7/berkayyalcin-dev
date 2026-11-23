import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

type FooterProps = {
  lang: string;
  dict: Dictionary["footer"];
  services: Dictionary["services"];
};

export default function Footer({ lang, dict, services }: FooterProps) {
  const linkClass = "transition hover:text-zinc-900 dark:hover:text-white";
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row">
        <div className="text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {dict.rights}
          </p>
          <p className="mt-1">{services.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href={whatsappUrl(services.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span className="tabular-nums">{siteConfig.phoneDisplay}</span>
          </a>
          <Link href={localeHref(lang, "/")} className={linkClass}>
            {services.footer.servicesLink}
          </Link>
          <Link href={localeHref(lang, "/dev")} className={linkClass}>
            {services.footer.devLink}
          </Link>
          <Link href={localeHref(lang, "/blog")} className={linkClass}>
            Blog
          </Link>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
