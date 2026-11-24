"use client";

import { useEffect, useRef, useState } from "react";
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
  HiGlobeAlt,
  HiSquares2X2,
  HiTag,
  HiArrowPath,
  HiQuestionMarkCircle,
  HiCodeBracket,
  HiPhoto,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig, type NavItem, type NavKey } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-link";
import ContactButton, { type ContactModalDict } from "@/components/ContactButton";
import ThemeToggle from "@/components/ThemeToggle";

export type HeaderDict = {
  nav: Record<NavKey, string>;
  mainNav: string;
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
  /** Verilmezse portfolyo menüsü (siteConfig.nav) kullanılır. */
  nav?: readonly NavItem[];
  /** Verilirse sağdaki CTA, e-posta modalı yerine WhatsApp linki olur. */
  whatsapp?: { href: string; label: string };
};

const navIcons: Record<NavKey, IconType> = {
  services: HiGlobeAlt,
  about: HiUser,
  projects: HiFolder,
  tools: HiWrenchScrewdriver,
  blog: HiNewspaper,
  contact: HiChatBubbleLeftRight,
  offer: HiSquares2X2,
  work: HiPhoto,
  packages: HiTag,
  process: HiArrowPath,
  faq: HiQuestionMarkCircle,
  dev: HiCodeBracket,
};

const MOBILE_MENU_ID = "mobile-nav";

export default function Header({ lang, dict, nav = siteConfig.nav, whatsapp }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape mobil menüyü kapatır ve odağı açan butona geri verir.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Proxy '/'yi görünmez şekilde '/tr'ye rewrite ettiği için SSR'da pathname
  // '/tr/...' gelir, tarayıcıda ise '/...' olur. Karşılaştırmalar ve dil
  // değiştirici hedefi için dil prefix'i soyulmuş normalize yol kullanılır.
  const basePath = pathname.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  const homePath = localeHref(lang, "/");

  // "/dev#blog" gibi bir link mevcut sayfaya aitse hash'ini döndürür (scrollspy için).
  const pageHash = (href: string) => {
    const [path, hash] = href.split("#");
    return hash && (path || "/") === basePath ? hash : null;
  };
  const sectionKey = nav.map((item) => pageHash(item.href) ?? "").join(",");

  // Scrollspy: görünür bölümün nav linkini vurgula
  useEffect(() => {
    const sectionIds = sectionKey.split(",").filter(Boolean);
    if (sectionIds.length === 0) return;

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
  }, [sectionKey]);

  const isActive = (href: string) => {
    const hash = pageHash(href);
    if (hash) return hash === activeSection;
    if (href.includes("#")) return false;
    return basePath === href || (href !== "/" && basePath.startsWith(`${href}/`));
  };

  // Dil değiştirici: mevcut yolun diğer dildeki karşılığı.
  // TR prefix'siz kanoniktir; EN /en prefix'i alır.
  const localeSegments = [
    { code: "TR", href: basePath, active: lang === "tr" },
    { code: "EN", href: localeHref("en", basePath), active: lang !== "tr" },
  ];

  const ctaClass =
    "hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400";
  const mobileCtaClass =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-black/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link
          href={homePath}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white transition hover:text-emerald-700 dark:hover:text-emerald-400"
        >
          berkayyalcin<span className="text-emerald-700 dark:text-emerald-400">.dev</span>
        </Link>

        <nav aria-label={dict.mainNav} className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => {
            const Icon = navIcons[item.key];
            return (
              <Link
                key={item.href}
                href={localeHref(lang, item.href)}
                aria-current={isActive(item.href) ? "true" : undefined}
                className={`flex items-center gap-1.5 text-sm transition ${
                  isActive(item.href)
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
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
              siliyor ve inline script'ler için React dev uyarısı üretiyordu.
              İki dil de segment olarak görünür; aktif olan vurgulu rozettir. */}
          <div
            role="group"
            aria-label={dict.switchLocale}
            className="flex h-9 items-center gap-0.5 rounded-full border border-zinc-200/60 bg-zinc-100/50 p-1 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <HiLanguage className="ml-1.5 mr-0.5 h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
            {localeSegments.map((segment) =>
              segment.active ? (
                <span
                  key={segment.code}
                  aria-current="true"
                  className="flex h-7 items-center rounded-full bg-emerald-500 px-2.5 text-xs font-bold tracking-wide text-black shadow-sm shadow-emerald-500/30"
                >
                  {segment.code}
                </span>
              ) : (
                <a
                  key={segment.code}
                  href={segment.href}
                  className="flex h-7 items-center rounded-full px-2.5 text-xs font-bold tracking-wide text-zinc-500 transition hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
                >
                  {segment.code}
                </a>
              )
            )}
          </div>
          <ThemeToggle ariaLabel={dict.themeToggle} />
          {whatsapp ? (
            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
              <FaWhatsapp className="h-4 w-4" />
              {whatsapp.label}
            </a>
          ) : (
            <ContactButton dict={dict.contactModal} className={ctaClass}>
              {dict.contactCta}
            </ContactButton>
          )}

          {/* Mobil menü butonu */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? dict.closeMenu : dict.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-100/50 text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/5 dark:bg-white/[0.01] dark:text-zinc-400 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400 lg:hidden"
          >
            {isMenuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobil menü paneli */}
      {isMenuOpen && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label={dict.mainNav}
          className="border-t border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-white/10 dark:bg-black/90 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const Icon = navIcons[item.key];
              return (
                <li key={item.href}>
                  <Link
                    href={localeHref(lang, item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                  >
                    {Icon && <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                    {dict.nav[item.key]}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-zinc-200 pt-3 dark:border-white/10">
              {whatsapp ? (
                <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={mobileCtaClass}>
                  <FaWhatsapp className="h-4 w-4" />
                  {whatsapp.label}
                </a>
              ) : (
                <ContactButton dict={dict.contactModal} className={mobileCtaClass}>
                  {dict.contactCta}
                </ContactButton>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
