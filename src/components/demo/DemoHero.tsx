import {
  HiArrowRight,
  HiCalendarDays,
  HiCheck,
  HiChevronDown,
  HiClock,
  HiMagnifyingGlass,
  HiMapPin,
  HiStar,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import type { Demo } from "@/lib/demos";

export const accentBtn =
  "inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--on-accent)] shadow-lg transition hover:brightness-110";
export const ghostLink = "inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] opacity-80";

/** "Uzm. Dr. Elif Aydın" → "EA" */
export function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => !w.endsWith("."));
  return words.slice(-2).map((w) => w[0]).join("");
}

export default function DemoHero({ demo }: { demo: Demo }) {
  switch (demo.hero) {
    case "split":
      return <SplitHero demo={demo} />;
    case "center":
      return <CenterHero demo={demo} />;
    case "cards":
      return <CardsHero demo={demo} />;
    case "search":
      return <SearchHero demo={demo} />;
    case "bold":
      return <BoldHero demo={demo} />;
    case "corporate":
      return <CorporateHero demo={demo} />;
    case "profile":
      return <ProfileHero demo={demo} />;
    case "editorial":
      return <EditorialHero demo={demo} />;
  }
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
      <HiMapPin className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/* Restoran: sıcak, iştah açan; tabak görseli + "günün özeli" fişi */
function SplitHero({ demo }: { demo: Demo }) {
  const { icon: Icon, palette: p } = demo;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <Eyebrow>{demo.eyebrow}</Eyebrow>
        <h1 className="demo-display mt-6 text-5xl font-semibold leading-[1.02] sm:text-7xl">{demo.heroTitle}</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">{demo.heroText}</p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <span className={accentBtn}>{demo.cta}</span>
          <span className={ghostLink}>
            {demo.nav[0]}
            <HiArrowRight className="h-4 w-4" />
          </span>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--muted)]/20 pt-6 text-sm text-[var(--muted)]">
          {demo.heroPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div
          className="relative flex aspect-[4/4.2] items-center justify-center overflow-hidden rounded-[var(--radius)] shadow-2xl"
          style={{ background: p.hero }}
        >
          {[78, 58, 38].map((size) => (
            <span
              key={size}
              className="absolute rounded-full border border-white/20"
              style={{ width: `${size}%`, aspectRatio: "1" }}
            />
          ))}
          <Icon className="relative h-36 w-36 text-white drop-shadow-2xl" />
        </div>
        <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-2xl bg-[var(--surface)] px-4 py-3 text-xs font-semibold shadow-xl">
          <HiClock className="h-4 w-4 text-[var(--accent)]" />
          {demo.hours}
        </div>
        <div className="absolute -left-6 bottom-10 flex items-center gap-2 rounded-2xl bg-[var(--surface)] px-4 py-3 shadow-xl">
          <HiStar className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-bold">{demo.stats[1]?.value}</span>
          <span className="text-xs text-[var(--muted)]">{demo.stats[1]?.label}</span>
        </div>
        <div className="absolute -bottom-6 right-8 rotate-3 rounded-xl border-2 border-dashed border-[var(--accent)]/40 bg-[var(--surface)] px-5 py-3 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">Günün özeli</p>
          <p className="demo-display text-lg font-semibold">Kaşarlı Köfte + Ayran</p>
        </div>
      </div>
    </section>
  );
}

/* Kuaför: gece, ışıltılı, büyük italik serif */
function CenterHero({ demo }: { demo: Demo }) {
  const { icon: Icon, palette: p } = demo;
  const [first, ...rest] = demo.heroTitle.split(" ");
  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-24 text-center" style={{ background: p.hero }}>
      <span className="absolute left-[8%] top-16 h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl" />
      <span className="absolute bottom-10 right-[10%] h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />
      <p className="relative text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">{demo.eyebrow}</p>
      <h1 className="demo-display relative mx-auto mt-8 max-w-4xl text-6xl font-medium leading-[0.95] sm:text-8xl">
        <em className="text-[var(--accent)]">{first}</em> {rest.join(" ")}
      </h1>
      <p className="relative mx-auto mt-8 max-w-xl text-lg text-[var(--muted)]">{demo.heroText}</p>
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <span className={accentBtn}>
          <HiCalendarDays className="h-4 w-4" />
          {demo.cta}
        </span>
        <span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/20 px-6 py-3.5 text-sm font-semibold">
          <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
          WhatsApp
        </span>
      </div>
      <ul className="relative mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {demo.heroPoints.map((point) => (
          <li
            key={point}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur"
          >
            <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Diş kliniği: ferah, güven veren; üst üste binen bilgi kartları */
function CardsHero({ demo }: { demo: Demo }) {
  const { icon: Icon, palette: p } = demo;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-10 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-[var(--accent)]">{demo.eyebrow}</p>
        <h1 className="demo-display mt-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl">{demo.heroTitle}</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">{demo.heroText}</p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <span className={accentBtn}>
            <HiCalendarDays className="h-4 w-4" />
            {demo.cta}
          </span>
          <span className={ghostLink}>
            <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
            WhatsApp ile sorun
          </span>
        </div>
        <ul className="mt-10 grid max-w-md grid-cols-3 gap-3">
          {demo.heroPoints.map((point) => (
            <li key={point} className="rounded-2xl bg-[var(--surface)] px-3 py-3 text-center text-xs font-semibold shadow-sm">
              <HiCheck className="mx-auto mb-1 h-4 w-4 text-[var(--accent)]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-[460px]">
        <div
          className="absolute inset-x-6 top-0 flex h-[340px] items-center justify-center rounded-[2.5rem] shadow-2xl"
          style={{ background: p.hero }}
        >
          <Icon className="h-40 w-40 text-white drop-shadow-xl" />
        </div>
        <div className="absolute bottom-6 left-0 w-64 rounded-3xl bg-[var(--surface)] p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--on-accent)]">
              <HiCalendarDays className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Randevunuz onaylandı</p>
              <p className="text-xs text-[var(--muted)]">Perşembe · 14:30 · Dt. Selin Koç</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-24 right-0 rounded-3xl bg-[var(--surface)] px-5 py-4 shadow-2xl">
          <p className="flex items-center gap-1 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <HiStar key={i} className="h-4 w-4" />
            ))}
          </p>
          <p className="mt-1 text-sm font-bold">4.9 · 312 Google yorumu</p>
        </div>
      </div>
    </section>
  );
}

/* Emlak: gün batımı, deniz; hero altında ilan arama çubuğu */
function SearchHero({ demo }: { demo: Demo }) {
  const { palette: p } = demo;
  const filters = [
    ["Konum", "Marmaraereğlisi"],
    ["Emlak tipi", "Yazlık"],
    ["Oda", "3+1"],
    ["Fiyat", "₺5M – ₺10M"],
  ];
  return (
    <section className="relative">
      <div className="relative overflow-hidden px-6 pb-40 pt-24 text-center" style={{ background: p.hero }}>
        <span className="absolute bottom-16 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-300/90 shadow-[0_0_80px_30px_rgba(251,191,36,0.35)]" />
        <svg className="absolute inset-x-0 bottom-0 h-40 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 C 240 20 480 100 720 60 S 1200 20 1440 60 V160 H0Z" fill="#0b1324" opacity="0.55" />
          <path d="M0 95 C 300 60 520 130 820 95 S 1260 70 1440 100 V160 H0Z" fill="#0b1324" opacity="0.8" />
          <path d="M0 130 C 360 105 720 155 1080 128 S 1380 120 1440 130 V160 H0Z" fill="#0b1324" />
        </svg>
        <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{demo.eyebrow}</p>
        <h1 className="demo-display relative mx-auto mt-6 max-w-3xl text-5xl leading-[1.05] text-white sm:text-7xl">
          {demo.heroTitle}
        </h1>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-white/75">{demo.heroText}</p>
      </div>
      <div className="relative mx-auto -mt-20 max-w-5xl px-6">
        <div className="grid gap-2 rounded-[var(--radius)] bg-[var(--surface)] p-3 shadow-2xl ring-1 ring-white/10 sm:grid-cols-[repeat(4,1fr)_auto]">
          {filters.map(([label, value]) => (
            <div key={label} className="rounded-[calc(var(--radius)-4px)] px-4 py-2.5 hover:bg-white/5">
              <p className="text-[11px] uppercase tracking-wider text-[var(--muted)]">{label}</p>
              <p className="mt-0.5 flex items-center justify-between text-sm font-semibold">
                {value}
                <HiChevronDown className="h-4 w-4 text-[var(--muted)]" />
              </p>
            </div>
          ))}
          <span className={`${accentBtn} justify-center`}>
            <HiMagnifyingGlass className="h-4 w-4" />
            Ara
          </span>
        </div>
      </div>
    </section>
  );
}

/* Oto servis: endüstriyel, büyük harfli, ikaz şeritli */
function BoldHero({ demo }: { demo: Demo }) {
  const { icon: Icon, palette: p } = demo;
  const words = demo.heroTitle.replace(/\.$/, "").split(" ");
  const last = words.pop();
  return (
    <section>
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">/ {demo.eyebrow}</p>
          <h1 className="demo-display mt-6 text-6xl font-bold uppercase leading-none sm:text-8xl">
            {words.join(" ")}{" "}
            <span className="mt-3 inline-block bg-[var(--accent)] px-3 pb-1 text-[var(--on-accent)]">{last}</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-[var(--muted)]">{demo.heroText}</p>
        </div>
        <div className="relative overflow-hidden rounded-[var(--radius)] bg-[var(--accent)] p-8 text-[var(--on-accent)]">
          <Icon className="absolute -right-10 -top-10 h-48 w-48 opacity-20" />
          <p className="text-xs font-bold uppercase tracking-widest">Ücretsiz arıza tespiti</p>
          <p className="demo-display mt-3 text-3xl font-bold leading-tight">Plakanızı yazın, 15 dakikada fiyat gelsin.</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-black px-5 py-3 text-sm font-bold text-white">
            <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
            {demo.cta}
          </span>
        </div>
      </div>
      <div className="h-4 w-full" style={{ background: p.hero }} />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-6">
        <span className="mr-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Tüm markalar</span>
        {demo.heroPoints.map((brand) => (
          <span key={brand} className="rounded-[var(--radius)] border border-white/15 px-4 py-1.5 text-sm font-semibold">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

/* Fabrika: kurumsal, mavi baskı (blueprint) ızgarası, KPI kutuları */
function CorporateHero({ demo }: { demo: Demo }) {
  const { palette: p } = demo;
  return (
    <section className="relative overflow-hidden text-white" style={{ background: p.hero }}>
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-200">{demo.eyebrow}</p>
          <h1 className="demo-display mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl">{demo.heroTitle}</h1>
          <p className="mt-6 max-w-lg text-lg text-blue-100">{demo.heroText}</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-white px-6 py-3.5 text-sm font-semibold text-blue-900">
              {demo.cta}
              <HiArrowRight className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-blue-100">Katalog indir (PDF)</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {demo.stats.map((stat) => (
            <div key={stat.label} className="rounded-[var(--radius)] border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="demo-display text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-white/15 bg-black/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5">
          <span className="text-xs uppercase tracking-widest text-blue-200">Sertifikalar</span>
          {demo.heroPoints.map((cert) => (
            <span key={cert} className="demo-display text-lg font-bold tracking-tight text-white/90">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Doktor: sakin, güvenilir; kemer çerçeveli monogram portre + özgeçmiş */
function ProfileHero({ demo }: { demo: Demo }) {
  const { icon: Icon, palette: p } = demo;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <div
          className="relative flex aspect-[3/4] items-end justify-center overflow-hidden rounded-t-full rounded-b-[var(--radius)] shadow-xl"
          style={{ background: p.hero }}
        >
          <span className="demo-display absolute inset-0 flex items-center justify-center text-[9rem] font-medium text-[var(--accent)]/80">
            {initials(demo.name)}
          </span>
          <span className="relative mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--accent)] shadow">
            <Icon className="h-4 w-4" />
            {demo.eyebrow}
          </span>
        </div>
        <span className="absolute -right-4 top-12 rounded-2xl bg-[var(--surface)] px-4 py-3 text-xs font-semibold shadow-lg">
          <HiClock className="mb-1 h-4 w-4 text-[var(--accent)]" />
          Randevulu kabul
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{demo.eyebrow}</p>
        <h1 className="demo-display mt-4 text-5xl font-semibold leading-tight sm:text-6xl">{demo.heroTitle}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{demo.heroText}</p>
        <ul className="mt-8 space-y-3 border-l-2 border-[var(--accent)]/30 pl-5">
          {demo.heroPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm">
              <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <span className={accentBtn}>
            <HiCalendarDays className="h-4 w-4" />
            {demo.cta}
          </span>
          <span className="text-sm text-[var(--muted)]">{demo.hours}</span>
        </div>
      </div>
    </section>
  );
}

/* Hukuk: gazete/dergi düzeni, ince çizgiler, roma rakamları, keskin köşeler */
function EditorialHero({ demo }: { demo: Demo }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10">
      <div className="border-y-[3px] border-double border-[var(--ink)]/70 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
        {demo.eyebrow}
      </div>
      <div className="grid gap-10 py-16 lg:grid-cols-12">
        <h1 className="demo-display text-5xl font-medium leading-[1.05] sm:text-7xl lg:col-span-8">
          {demo.heroTitle}
        </h1>
        <div className="flex flex-col justify-end border-[var(--ink)]/20 lg:col-span-4 lg:border-l lg:pl-8">
          <p className="leading-relaxed text-[var(--muted)]">{demo.heroText}</p>
          <span className={`${accentBtn} mt-8 self-start`}>
            {demo.cta}
            <HiArrowRight className="h-4 w-4" />
          </span>
          <p className="mt-6 text-xs text-[var(--muted)]">{demo.hours}</p>
        </div>
      </div>
      <ol className="grid border-y border-[var(--ink)]/20 sm:grid-cols-4">
        {demo.heroPoints.map((area) => (
          <li key={area} className="border-[var(--ink)]/20 px-5 py-6 sm:border-l sm:first:border-l-0">
            <span className="block h-px w-8 bg-[var(--accent)]" />
            <p className="mt-3 text-sm font-semibold">{area}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

