import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCpuChip,
  HiGlobeAlt,
  HiMapPin,
  HiComputerDesktop,
  HiServer,
  HiLink,
  HiArrowDownTray,
} from "react-icons/hi2";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n";

type AboutProps = {
  dict: Dictionary["about"];
};

const expertiseIcons: { key: keyof Dictionary["about"]["expertise"]; icon: IconType; accent: string }[] = [
  { key: "web", icon: HiGlobeAlt, accent: "emerald" },
  { key: "desktop", icon: HiComputerDesktop, accent: "blue" },
  { key: "services", icon: HiServer, accent: "violet" },
  { key: "api", icon: HiLink, accent: "amber" },
];

const accentClasses: Record<string, { card: string; icon: string }> = {
  emerald: {
    card: "hover:border-emerald-500/30",
    icon: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-500/20",
  },
  blue: {
    card: "hover:border-blue-500/30",
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20",
  },
  violet: {
    card: "hover:border-violet-500/30",
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500/20",
  },
  amber: {
    card: "hover:border-amber-500/30",
    icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/20",
  },
};

export default function About({ dict }: AboutProps) {
  const highlights = [
    { label: dict.highlights.titleLabel, value: dict.highlights.titleValue, icon: HiAcademicCap },
    { label: dict.highlights.expertiseLabel, value: dict.highlights.expertiseValue, icon: HiCpuChip },
    { label: dict.highlights.ecosystemLabel, value: dict.highlights.ecosystemValue, icon: HiGlobeAlt },
    { label: dict.highlights.locationLabel, value: dict.highlights.locationValue, icon: HiMapPin },
  ];

  return (
    <section id="hakkimda" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          {dict.heading}
        </h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-2xl font-medium leading-relaxed text-zinc-900 dark:text-white sm:text-3xl">
              {dict.leadBefore}{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-blue-400">
                {dict.leadHighlight}
              </span>{" "}
              {dict.leadAfter}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.body}
            </p>

            <div className="mt-6">
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3 text-xs font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 active:translate-y-0"
              >
                <HiArrowDownTray className="h-4 w-4" />
                {dict.downloadCv}
              </a>
            </div>

            <div className="mt-8 border-t border-zinc-200 dark:border-white/10 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                {dict.expertiseHeading}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {expertiseIcons.map(({ key, icon: Icon, accent }) => (
                  <div
                    key={key}
                    className={`group flex gap-3.5 rounded-2xl border border-zinc-200/80 bg-white/60 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:border-white/20 ${accentClasses[accent]!.card}`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${accentClasses[accent]!.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm transition group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                        {dict.expertise[key].title}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {dict.expertise[key].description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white/60 p-4.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-white hover:shadow-md hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:border-emerald-400/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
