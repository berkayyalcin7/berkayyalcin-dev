"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  HiUser,
  HiBriefcase,
  HiSparkles,
  HiFolder,
  HiWrenchScrewdriver,
  HiNewspaper,
  HiChatBubbleLeftRight,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import ContactButton from "@/components/ContactButton";
import ThemeToggle from "@/components/ThemeToggle";

const navIcons: Record<string, IconType> = {
  "/#hakkimda": HiUser,
  "/#deneyim": HiBriefcase,
  "/#yetenekler": HiSparkles,
  "/#projeler": HiFolder,
  "/araclar": HiWrenchScrewdriver,
  "/#blog": HiNewspaper,
  "/#iletisim": HiChatBubbleLeftRight,
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scrollspy: ana sayfada görünür bölümün nav linkini vurgula
  useEffect(() => {
    // Ana sayfa dışında isActive zaten false döner; state'i sıfırlamak gerekmez
    if (pathname !== "/") return;

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
  }, [pathname]);

  // Mobil menü açıkken Escape ile kapatma
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    (pathname === "/" && href === `/#${activeSection}`) ||
    pathname === href ||
    (!href.startsWith("/#") && href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-black/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
        <Link
          href="/"
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
                href={item.href}
                className={`flex items-center gap-1.5 text-sm transition ${
                  isActive(item.href)
                    ? "text-emerald-500 dark:text-emerald-400 font-medium"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <ContactButton className="hidden sm:inline-flex rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400">
            İletişime Geç
          </ContactButton>

          {/* Mobil menü butonu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
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
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-emerald-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                  >
                    {Icon && <Icon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-zinc-200 pt-3 dark:border-white/10">
              <ContactButton className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400">
                İletişime Geç
              </ContactButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
