import type { IconType } from "react-icons";
import {
  HiPhoto,
  HiTag,
  HiMegaphone,
  HiChartBar,
  HiArrowUpTray,
  HiCheckCircle,
  HiSquares2X2,
  HiDocumentText,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiPencilSquare,
} from "react-icons/hi2";
import Reveal from "@/components/Reveal";
import type { Dictionary } from "@/lib/i18n";

type PanelDict = Dictionary["services"]["panel"];

const pointIcons: IconType[] = [HiPhoto, HiTag, HiMegaphone, HiChartBar];
const pointTones = [
  "from-emerald-400 to-teal-600",
  "from-amber-300 to-orange-500",
  "from-rose-400 to-pink-600",
  "from-sky-400 to-blue-600",
];
const navIcons: IconType[] = [HiSquares2X2, HiDocumentText, HiPhoto, HiTag, HiMegaphone, HiChatBubbleLeftRight, HiCog6Tooth];
const tiles = [
  "linear-gradient(135deg,#7f1d1d,#f59e0b)",
  "linear-gradient(135deg,#78350f,#fbbf24)",
  "linear-gradient(135deg,#991b1b,#fb923c)",
  "linear-gradient(135deg,#9d174d,#fda4af)",
  "linear-gradient(135deg,#365314,#a3e635)",
  "linear-gradient(135deg,#0c4a6e,#7dd3fc)",
];
const SELECTED_TILE = 2;

export default function AdminPanelShowcase({ dict }: { dict: PanelDict }) {
  const m = dict.mock;
  return (
    <section id="panel" className="scroll-mt-24 overflow-hidden px-6 py-24">
      <Reveal>
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              {dict.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {dict.title}
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{dict.subtitle}</p>
            <ul className="mt-10 space-y-6">
              {dict.points.map((point, i) => {
                const Icon = pointIcons[i];
                return (
                  <li key={point.title} className="flex gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${pointTones[i]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{point.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panel maketi: dekoratif, içeriği soldaki liste anlatıyor */}
          <div aria-hidden className="relative pb-16 lg:pb-0">
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.25), transparent 60%)" }}
            />
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10 dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-white/5 dark:bg-zinc-950">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="flex-1 rounded-md bg-white px-3 py-1 font-mono text-[10px] text-zinc-500 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10">
                  {m.url}
                </span>
              </div>

              <div className="grid grid-cols-[150px_1fr] text-[11px]">
                {/* Kenar çubuğu */}
                <nav className="flex flex-col gap-0.5 bg-zinc-950 p-3 text-zinc-400">
                  <span className="mb-3 flex items-center gap-2 px-2 py-1 text-xs font-semibold text-white">
                    <span className="h-5 w-5 rounded-md bg-gradient-to-br from-red-700 to-amber-500" />
                    Lezzet Durağı
                  </span>
                  {m.nav.map((item, i) => {
                    const Icon = navIcons[i];
                    const active = i === m.activeNav;
                    return (
                      <span
                        key={item}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${active ? "bg-emerald-500 font-semibold text-black" : ""}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item}
                        {i === 5 && (
                          <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-[9px] font-bold text-white">3</span>
                        )}
                      </span>
                    );
                  })}
                </nav>

                <div className="bg-zinc-50 p-4 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-zinc-900 dark:text-white">{m.heading}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1.5 font-semibold text-black">
                      <HiArrowUpTray className="h-3.5 w-3.5" />
                      {m.upload}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {m.stats.map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-white p-2.5 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-white/10">
                        <p className="text-[9px] text-zinc-500">{stat.label}</p>
                        <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-[1fr_150px] gap-3">
                    <div>
                      <div className="grid grid-cols-3 gap-2">
                        {m.images.map((label, i) => (
                          <div
                            key={label}
                            className={`relative flex aspect-[4/3] items-end rounded-lg p-1.5 ${i === SELECTED_TILE ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900" : ""}`}
                            style={{ background: tiles[i % tiles.length] }}
                          >
                            {i === 0 && (
                              <span className="absolute left-1.5 top-1.5 rounded bg-white/90 px-1 text-[8px] font-bold text-zinc-900">
                                {m.coverBadge}
                              </span>
                            )}
                            {i === SELECTED_TILE && (
                              <HiPencilSquare className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-white" />
                            )}
                            <span className="rounded bg-black/40 px-1 text-[8px] font-medium text-white">{label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-zinc-300 py-3 text-zinc-500 dark:border-white/15">
                        <HiArrowUpTray className="h-3.5 w-3.5" />
                        {m.drop}
                      </div>
                    </div>

                    {/* Düzenleme paneli */}
                    <div className="rounded-lg bg-white p-2.5 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-white/10">
                      <p className="font-semibold text-zinc-900 dark:text-white">{m.editTitle}</p>
                      <div className="mt-2 aspect-video rounded-md" style={{ background: tiles[SELECTED_TILE] }} />
                      <p className="mt-2 text-[9px] text-zinc-500">{m.fieldTitle}</p>
                      <p className="mt-0.5 rounded-md px-2 py-1 text-zinc-800 ring-1 ring-emerald-500 dark:text-zinc-200">
                        {m.fieldTitleValue}
                        <span className="ml-px inline-block h-2.5 w-px translate-y-0.5 bg-emerald-500 motion-safe:animate-pulse" />
                      </p>
                      <p className="mt-2 text-[9px] text-zinc-500">{m.fieldAlt}</p>
                      <p className="mt-0.5 rounded-md px-2 py-1 text-zinc-600 ring-1 ring-zinc-200 dark:text-zinc-400 dark:ring-white/10">
                        {m.fieldAltValue}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                        <span className="text-[10px]">{m.toggle}</span>
                        <span className="flex h-3.5 w-6 items-center justify-end rounded-full bg-emerald-500 px-0.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-white" />
                        </span>
                      </div>
                      <span className="mt-2.5 block rounded-md bg-zinc-900 py-1.5 text-center font-semibold text-white dark:bg-white dark:text-zinc-900">
                        {m.save}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telefon: menüden fiyat güncelleme */}
            <div className="absolute -bottom-2 -left-4 w-44 rounded-[1.75rem] border-[5px] border-zinc-900 bg-white p-3 shadow-2xl sm:-left-10 dark:border-zinc-700 dark:bg-zinc-950">
              <span className="mx-auto mb-2 block h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <p className="text-[11px] font-semibold text-zinc-900 dark:text-white">{m.nav[3]}</p>
              <ul className="mt-2 space-y-1.5 text-[10px]">
                <li className="flex items-center justify-between rounded-md px-1.5 py-1 ring-1 ring-emerald-500">
                  <span className="text-zinc-800 dark:text-zinc-200">Tekirdağ Köftesi</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">₺340</span>
                </li>
                <li className="flex items-center justify-between px-1.5 text-zinc-600 dark:text-zinc-400">
                  <span>Kaşarlı Köfte</span>
                  <span>₺360</span>
                </li>
                <li className="flex items-center justify-between px-1.5 text-zinc-600 dark:text-zinc-400">
                  <span>Piyaz</span>
                  <span>₺90</span>
                </li>
              </ul>
              <p className="mt-3 flex items-center gap-1 rounded-lg bg-emerald-500 px-2 py-1.5 text-[10px] font-semibold text-black">
                <HiCheckCircle className="h-3.5 w-3.5" />
                {m.saved}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
