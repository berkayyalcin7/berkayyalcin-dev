import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları
          saklıdır.
        </p>
        <div className="flex items-center gap-6">
          <a href={siteConfig.social.github} className="transition hover:text-white">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} className="transition hover:text-white">
            LinkedIn
          </a>
          <a href={siteConfig.social.x} className="transition hover:text-white">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
