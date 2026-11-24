import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiClock, HiMapPin, HiStar, HiCheckBadge } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { demos, getDemo } from "@/lib/demos";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  return demo ? { title: `${demo.name} — Örnek ${demo.sector} Sitesi` } : {};
}

const SERIF = 'Georgia, "Times New Roman", serif';

export default async function DemoPage({ params }: Params) {
  const demo = getDemo((await params).slug);
  if (!demo) notFound();

  const { palette: p, icon: Icon } = demo;
  const vars = {
    "--bg": p.bg,
    "--surface": p.surface,
    "--ink": p.ink,
    "--muted": p.muted,
    "--accent": p.accent,
    "--on-accent": p.onAccent,
  } as CSSProperties;
  const heading: CSSProperties = demo.serif ? { fontFamily: SERIF } : {};
  const accentBtn =
    "inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--on-accent)] shadow-lg transition hover:brightness-110";

  return (
    <div style={vars} className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)]">
      {/* Demo şeridi */}
      <div className="flex items-center justify-between gap-4 bg-zinc-950 px-5 py-2 text-xs text-zinc-300">
        <Link href="/#ornekler" className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300">
          <HiArrowLeft className="h-3.5 w-3.5" />
          Örneklere dön
        </Link>
        <span>Örnek tasarım · hayali işletme · berkayyalcin.dev</span>
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2.5 text-lg font-bold" style={heading}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--on-accent)]">
            <Icon className="h-5 w-5" />
          </span>
          {demo.name}
        </span>
        <nav className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
          {demo.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span className={accentBtn}>{demo.cta}</span>
      </header>

      {/* Hero */}
      {demo.layout === "split" ? (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
              <HiMapPin className="h-3.5 w-3.5" />
              {demo.district}
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl" style={heading}>
              {demo.heroTitle}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">{demo.heroText}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className={accentBtn}>{demo.cta}</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                WhatsApp Sipariş & Bilgi
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              className="flex aspect-[5/4] items-center justify-center rounded-[2rem] shadow-2xl"
              style={{ background: p.hero }}
            >
              <Icon className="h-40 w-40 text-white/90 drop-shadow-xl" />
            </div>
            <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl bg-[var(--surface)] px-4 py-3 shadow-xl">
              <HiStar className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-bold">{demo.stats[demo.stats.length - 1].value}</span>
              <span className="text-xs text-[var(--muted)]">{demo.stats[demo.stats.length - 1].label}</span>
            </div>
            <div className="absolute -right-4 top-6 flex items-center gap-2 rounded-2xl bg-[var(--surface)] px-4 py-3 text-xs font-semibold shadow-xl">
              <HiClock className="h-4 w-4 text-[var(--accent)]" />
              {demo.hours}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden px-6 py-28 text-center" style={{ background: p.hero }}>
          <Icon className="mx-auto h-16 w-16 text-[var(--accent)]" />
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl" style={heading}>
            {demo.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted)]">{demo.heroText}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <span className={accentBtn}>{demo.cta}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">
              <HiMapPin className="h-4 w-4 text-[var(--accent)]" />
              {demo.district}
            </span>
          </div>
        </section>
      )}

      {/* İstatistikler */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-3 divide-x divide-[var(--muted)]/20 rounded-3xl bg-[var(--surface)] py-8 shadow-sm">
          {demo.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[var(--accent)] sm:text-4xl" style={heading}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hizmetler */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={heading}>
          {demo.nav[0]}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {demo.services.map((service, i) => (
            <article key={service.title} className="rounded-3xl bg-[var(--surface)] p-7 shadow-sm ring-1 ring-[var(--muted)]/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] font-bold text-[var(--on-accent)]">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold" style={heading}>
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Galeri */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {demo.gallery.map((label, i) => (
            <div
              key={label}
              className={`flex items-end rounded-3xl p-5 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{
                background: p.hero,
                filter: `hue-rotate(${i * 18}deg)`,
                minHeight: i === 0 ? 280 : 132,
              }}
            >
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <div className="grid overflow-hidden rounded-[2rem] bg-[var(--surface)] shadow-sm md:grid-cols-2">
          <div className="p-10">
            <h2 className="text-3xl font-bold" style={heading}>
              Bize ulaşın
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-3">
                <HiMapPin className="h-5 w-5 text-[var(--accent)]" />
                {demo.district}
              </li>
              <li className="flex items-center gap-3">
                <HiClock className="h-5 w-5 text-[var(--accent)]" />
                {demo.hours}
              </li>
              <li className="flex items-center gap-3">
                <HiCheckBadge className="h-5 w-5 text-[var(--accent)]" />
                Google İşletme Profili doğrulanmış
              </li>
            </ul>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </span>
          </div>
          <div
            className="relative min-h-64"
            style={{
              backgroundColor: p.bg,
              backgroundImage:
                "linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.9,
            }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-2xl ring-8 ring-[var(--accent)]/25">
              <HiMapPin className="h-7 w-7" />
            </span>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--muted)]/20 px-6 py-8 text-center text-xs text-[var(--muted)]">
        © {demo.name} · Bu sayfa berkayyalcin.dev tarafından hazırlanmış örnek bir tasarımdır.
      </footer>
    </div>
  );
}
