import ContactButton, { type ContactModalDict } from "@/components/ContactButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n";

type ContactProps = {
  dict: Dictionary["contact"];
  modalDict: ContactModalDict;
};

export default function Contact({ dict, modalDict }: ContactProps) {
  const directLinks = [
    {
      label: dict.emailLabel,
      href: siteConfig.social.email,
      icon: HiEnvelope,
      external: false,
    },
    {
      label: dict.githubLabel,
      href: siteConfig.social.github,
      icon: FaGithub,
      external: true,
    },
    {
      label: dict.linkedinLabel,
      href: siteConfig.social.linkedin,
      icon: FaLinkedin,
      external: true,
    },
  ];

  return (
    <section
      id="iletisim"
      className="scroll-mt-24 border-t border-zinc-200 px-6 py-24 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-blue-500/[0.08] px-6 py-16 text-center sm:px-16 sm:py-20 dark:border-emerald-400/15 dark:from-emerald-500/10 dark:to-blue-500/10">
          {/* Nabız gibi atan arka plan ışıması — "son sahne" hissi */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/20 blur-3xl motion-safe:animate-[contact-glow_6s_ease-in-out_infinite]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            {dict.availability}
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {dict.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-6">
            <ContactButton
              dict={modalDict}
              className="inline-flex items-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              {dict.cta}
            </ContactButton>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {directLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-2 text-sm font-medium text-zinc-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
