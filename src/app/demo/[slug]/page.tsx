import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiClock, HiMapPin, HiCheckBadge } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { demos, getDemo, type FontKey } from "@/lib/demos";
import DemoHero, { accentBtn } from "@/components/demo/DemoHero";
import DemoBlock from "@/components/demo/DemoBlocks";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  return demo ? { title: `${demo.name} — Örnek ${demo.sector} Sitesi` } : {};
}

const FONT: Record<FontKey, string> = {
  geist: "var(--font-geist-sans)",
  fraunces: "var(--font-fraunces)",
  playfair: "var(--font-playfair)",
  cormorant: "var(--font-cormorant)",
  dmserif: "var(--font-dmserif)",
  manrope: "var(--font-manrope)",
  grotesk: "var(--font-grotesk)",
  lora: "var(--font-lora)",
};

export default async function DemoPage({ params }: Params) {
  const demo = getDemo((await params).slug);
  if (!demo) notFound();

  const { palette: p, icon: Icon } = demo;
  const editorial = demo.hero === "editorial";
  const vars = {
    "--bg": p.bg,
    "--surface": p.surface,
    "--ink": p.ink,
    "--muted": p.muted,
    "--accent": p.accent,
    "--on-accent": p.onAccent,
    "--radius": demo.radius,
    "--display": `${FONT[demo.display]}, Georgia, serif`,
    // DM Serif Display zaten dar; ek negatif harf aralığı harfleri birbirine yapıştırıyor.
    "--display-tracking": demo.display === "dmserif" ? "0" : "-0.02em",
    fontFamily: `${FONT[demo.body]}, system-ui, sans-serif`,
  } as CSSProperties;

  const logo = (
    <span className="demo-display flex items-center gap-2.5 text-xl font-semibold">
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-[var(--accent)] text-[var(--on-accent)]">
        <Icon className="h-5 w-5" />
      </span>
      {demo.name}
    </span>
  );

  return (
    <div style={vars} className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Demo şeridi */}
      <div className="flex items-center justify-between gap-4 bg-zinc-950 px-5 py-2 font-sans text-xs text-zinc-300">
        <Link href="/#ornekler" className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300">
          <HiArrowLeft className="h-3.5 w-3.5" />
          Örneklere dön
        </Link>
        <span>Örnek tasarım · hayali işletme · berkayyalcin.dev</span>
      </div>

      {/* Nav: hukukta ortalı logo, diğerlerinde klasik */}
      {editorial ? (
        <header className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-6 text-sm">
          <nav className="hidden gap-7 text-[var(--muted)] md:flex">
            {demo.nav.slice(0, 2).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          {logo}
          <nav className="hidden justify-end gap-7 text-[var(--muted)] md:flex">
            {demo.nav.slice(2).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>
      ) : (
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {logo}
          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
            {demo.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className={accentBtn}>{demo.cta}</span>
        </header>
      )}

      <DemoHero demo={demo} />

      {demo.blocks.map((block, i) => (
        <DemoBlock key={i} block={block} demo={demo} />
      ))}

      {/* İletişim */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="grid overflow-hidden rounded-[var(--radius)] bg-[var(--surface)] ring-1 ring-[var(--muted)]/15 md:grid-cols-2">
          <div className="p-10">
            <h2 className="demo-display text-3xl font-semibold sm:text-4xl">{demo.form?.title ?? "Bize ulaşın"}</h2>
            {demo.form ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {demo.form.fields.map((field, i) => (
                  <div
                    key={field}
                    className={`rounded-[var(--radius)] px-4 py-3 text-sm text-[var(--muted)] ring-1 ring-[var(--muted)]/25 ${i === demo.form!.fields.length - 1 ? "min-h-24 sm:col-span-2" : ""} ${i === demo.form!.fields.length - 2 && demo.form!.fields.length % 2 === 0 ? "sm:col-span-2" : ""}`}
                  >
                    {field}
                  </div>
                ))}
                <span className={`${accentBtn} justify-center sm:col-span-2`}>Gönder</span>
              </div>
            ) : (
              <span className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp&apos;tan yazın
              </span>
            )}
            <ul className="mt-8 space-y-3 text-sm text-[var(--muted)]">
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
          </div>
          <div
            className="relative min-h-72"
            style={{
              backgroundColor: p.bg,
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--muted) 25%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--muted) 25%, transparent) 1px, transparent 1px), linear-gradient(35deg, transparent 48%, color-mix(in srgb, var(--accent) 35%, transparent) 48% 52%, transparent 52%)",
              backgroundSize: "40px 40px, 40px 40px, 100% 100%",
            }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-2xl ring-8 ring-[var(--accent)]/25">
              <HiMapPin className="h-7 w-7" />
            </span>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--muted)]/20 px-6 py-8 text-center text-xs text-[var(--muted)]">
        {demo.disclaimer && <p className="mx-auto mb-3 max-w-2xl">{demo.disclaimer}</p>}© {demo.name} · Bu sayfa
        berkayyalcin.dev tarafından hazırlanmış örnek bir tasarımdır.
      </footer>
    </div>
  );
}
