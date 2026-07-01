import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiUser,
  HiSparkles,
  HiNewspaper,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import ContactButton from "@/components/ContactButton";

const navIcons: Record<string, IconType> = {
  "/#hakkimda": HiUser,
  "/#yetenekler": HiSparkles,
  "/#blog": HiNewspaper,
  "/#iletisim": HiChatBubbleLeftRight,
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white transition hover:text-emerald-400"
        >
          berkayyalcin<span className="text-emerald-400">.dev</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {siteConfig.nav.map((item) => {
            const Icon = navIcons[item.href];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ContactButton className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white transition hover:border-emerald-400/60 hover:text-emerald-400">
          İletişime Geç
        </ContactButton>
      </div>
    </header>
  );
}
