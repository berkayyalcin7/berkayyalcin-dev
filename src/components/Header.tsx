import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiUser,
  HiBriefcase,
  HiSparkles,
  HiFolder,
  HiNewspaper,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import ContactButton from "@/components/ContactButton";
import ThemeToggle from "@/components/ThemeToggle";

const navIcons: Record<string, IconType> = {
  "/#hakkimda": HiUser,
  "/#deneyim": HiBriefcase,
  "/#yetenekler": HiSparkles,
  "/#projeler": HiFolder,
  "/#blog": HiNewspaper,
  "/#iletisim": HiChatBubbleLeftRight,
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-black/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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
                className="flex items-center gap-1.5 text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ContactButton className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400">
            İletişime Geç
          </ContactButton>
        </div>
      </div>
    </header>
  );
}
