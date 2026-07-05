"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  HiUser,
  HiFolder,
  HiWrenchScrewdriver,
  HiNewspaper,
  HiChatBubbleLeftRight,
  HiBars3,
  HiXMark,
  HiLanguage,
} from "react-icons/hi2";
import { siteConfig, type NavKey } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-link";
import ContactButton, { type ContactModalDict } from "@/components/ContactButton";
import ThemeToggle from "@/components/ThemeToggle";

export type HeaderDict = {
  nav: Record<NavKey, string>;
  contactCta: string;
  openMenu: string;
  closeMenu: string;
  themeToggle: string;
  switchLocale: string;
  contactModal: ContactModalDict;
};

type HeaderProps = {
  lang: string;
  dict: HeaderDict;
};

const navIcons: Record<string, IconType> = {
  "/#hakkimda": HiUser,
  "/#projeler": HiFolder,
  "/araclar": HiWrenchScrewdriver,
  "/#blog": HiNewspaper,
  "/#iletisim": HiChatBubbleLeftRight,
};

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Proxy '/'yi görünmez şekilde '/tr'ye rewrite ettiği için SSR'da pathname
  // '/tr/...' gelir, tarayıcıda ise '/...' olur. Karşılaştırmalar ve dil
  // değiştirici hedefi için dil prefix'i soyulmuş normalize yol kullanılır.
  const basePath = pathname.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  const homePath = lang === "tr" ? "/" : `/${lang}`;
  const isHome = basePath === "/";

  // Scrollspy: ana sayfada görünür bölümün nav linkini vurgula
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = siteConfig.nav
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => item.href.slice(2));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      // Bölüm, görünür alanın üst-orta bandına girince aktif sayılır
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (href: string) =>
    (isHome && href === `/#${activeSection}`) ||
    basePath === href ||
    (!href.startsWith("/#") && href !== "/" && basePath.startsWith(`${href}/`));

  // Dil değiştirici: mevcut yolun diğer dildeki karşılığı
  const switchTarget =
    lang === "tr" ? (basePath === "/" ? "/en" : `/en${basePath}`) : basePath;
  const switchLabel = lang === "tr" ? "EN" : "TR";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-black/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
        <Link
          href={homePath}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white transition hover:text-emerald-500 dark:hover:text-emerald-400"
        >
          berkayyalcin<span className="text-emerald-500 dark:text-emerald-400">.dev</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {siteConfig.nav.map((item) => {
            const Icon = navIcons[item.href];
            return (
              <Link
                key={item.href}
                href={localeHref(lang, item.href)}
                className={`flex items-center gap-1.5 text-sm transition ${
                  isActive(item.href)
                    ? "text-emerald-500 dark:text-emerald-400 font-medium"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Bilinçli olarak <a>: dil değişimi tam sayfa yüklemesiyle yapılır.
              Client navigasyonu [lang] layout'unu remount edip tema class'ını
              siliyor ve inline script'ler için React dev uyarısı üretiyordu. */}
          <a
            href={switchTarget}
            aria-label={dict.switchLocale}
            className="flex h-9 items-center gap-1.5 rounded-full border border-zinc-200/60 bg-zinc-100/50 px-3 text-xs font-semibold text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/5 dark:bg-white/[0.01] dark:text-zinc-400 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400"
          >
            <HiLanguage className="h-4 w-4" />
            {switchLabel}
          </a>
          <ThemeToggle ariaLabel={dict.themeToggle} />
          <ContactButton
            dict={dict.contactModal}
            className="hidden sm:inline-flex rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
          >
            {dict.contactCta}
          </ContactButton>

          {/* Mobil menü butonu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? dict.closeMenu : dict.openMenu}
            aria-expanded={isMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-100/50 text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/5 dark:bg-white/[0.01] dark:text-zinc-400 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400 sm:hidden"
          >
            {isMenuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobil menü paneli */}
      {isMenuOpen && (
        <nav className="border-t border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-white/10 dark:bg-black/90 sm:hidden">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const Icon = navIcons[item.href];
              return (
                <li key={item.href}>
                  <Link
                    href={localeHref(lang, item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-emerald-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                  >
                    {Icon && <Icon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />}
                    {dict.nav[item.key]}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-zinc-200 pt-3 dark:border-white/10">
              <ContactButton
                dict={dict.contactModal}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                {dict.contactCta}
              </ContactButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
