import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiComputerDesktop,
  HiGlobeAlt,
  HiServerStack,
  HiMapPin,
  HiShoppingBag,
  HiWrenchScrewdriver,
  HiCheck,
  HiArrowRight,
  HiMagnifyingGlass,
  HiLockClosed,
  HiDevicePhoneMobile,
  HiPlus,
  HiArrowUpRight,
  HiSparkles,
} from "react-icons/hi2";
import Reveal from "@/components/Reveal";
import AdminPanelShowcase from "@/components/services/AdminPanelShowcase";
import { whatsappUrl } from "@/lib/site-config";
import { demos } from "@/lib/demos";
import { localeHref, fill } from "@/lib/locale-link";
import type { Dictionary } from "@/lib/i18n";

type Props = { lang: string; dict: Dictionary["services"] };

const offerIcons: IconType[] = [
  HiComputerDesktop,
  HiGlobeAlt,
  HiServerStack,
  HiMapPin,
  HiShoppingBag,
  HiWrenchScrewdriver,
];

// Her hizmete kendi rengi: ikon zemini, köşe ışıması ve hover çerçevesi.
// Tailwind sınıfları statik kalmalı (JIT dinamik birleştirmeyi göremez).
const tones = [
  { icon: "from-emerald-400 to-teal-600", glow: "bg-emerald-400/25", ring: "hover:border-emerald-400/60", text: "text-emerald-600 dark:text-emerald-400" },
  { icon: "from-sky-400 to-blue-600", glow: "bg-sky-400/25", ring: "hover:border-sky-400/60", text: "text-sky-600 dark:text-sky-400" },
  { icon: "from-violet-400 to-purple-600", glow: "bg-violet-400/25", ring: "hover:border-violet-400/60", text: "text-violet-600 dark:text-violet-400" },
  { icon: "from-amber-300 to-orange-500", glow: "bg-amber-400/25", ring: "hover:border-amber-400/60", text: "text-amber-600 dark:text-amber-400" },
  { icon: "from-rose-400 to-pink-600", glow: "bg-rose-400/25", ring: "hover:border-rose-400/60", text: "text-rose-600 dark:text-rose-400" },
  { icon: "from-cyan-400 to-sky-600", glow: "bg-cyan-400/25", ring: "hover:border-cyan-400/60", text: "text-cyan-600 dark:text-cyan-400" },
];

const POPULAR_PACKAGE = 1;

const primaryBtn =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-black shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 active:translate-y-0";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-base font-semibold text-zinc-800 transition hover:border-emerald-500/50 hover:text-emerald-700 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400";

const ASCII: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
const toDomain = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => !word.endsWith(".")) // "Uzm. Dr." gibi unvanlar domain'e girmez
    .join("")
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (c) => ASCII[c]) + ".com";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
      {children}
    </p>
  );
}

export default function ServicesLanding({ lang, dict }: Props) {
  const wa = whatsappUrl(dict.whatsappGreeting);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.22), transparent 42%), radial-gradient(circle at 85% 10%, rgba(59,130,246,0.18), transparent 40%), radial-gradient(circle at 70% 85%, rgba(168,85,247,0.16), transparent 40%), radial-gradient(circle at 35% 95%, rgba(244,114,182,0.12), transparent 35%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <HiMapPin className="h-3.5 w-3.5" />
              {dict.hero.badge}
            </span>

            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              {dict.hero.titleLead}
              <span className="text-emerald-600 underline decoration-emerald-500/40 decoration-[0.08em] underline-offset-[0.14em] dark:text-emerald-400">
                {dict.hero.titleHighlight}
              </span>
              {dict.hero.titleTail}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={wa} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <FaWhatsapp className="h-5 w-5" />
                {dict.whatsappCta}
                <HiArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="#paketler" className={ghostBtn}>
                {dict.final.secondaryCta}
              </a>
            </div>

            <ul className="mt-9 grid gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-3 sm:gap-4">
              {dict.hero.trust.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroMock dict={dict.hero} />
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" className="scroll-mt-24 px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <Eyebrow>{dict.offer.eyebrow}</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                  {dict.offer.title}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 lg:pb-1">
                {dict.offer.subtitle}
              </p>
            </div>

            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dict.offer.items.map((item, i) => {
                const Icon = offerIcons[i] ?? HiCheck;
                const tone = tones[i % tones.length];
                return (
                  <li
                    key={item.title}
                    className={`group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-950 ${tone.ring}`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-2xl transition duration-500 group-hover:scale-125 ${tone.glow}`}
                    />
                    <span className={`absolute right-6 top-6 font-mono text-xs font-bold ${tone.text}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110 ${tone.icon}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ÖRNEK ÇALIŞMALAR */}
      <section
        id="ornekler"
        className="relative scroll-mt-24 overflow-hidden bg-zinc-950 px-6 py-24 text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 0%, rgba(16,185,129,0.25), transparent 35%), radial-gradient(circle at 90% 30%, rgba(168,85,247,0.22), transparent 35%), radial-gradient(circle at 40% 100%, rgba(244,63,94,0.18), transparent 40%)",
          }}
        />
        <Reveal>
          <div className="relative mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  {dict.work.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{dict.work.title}</h2>
              </div>
              <p className="text-base leading-relaxed text-zinc-300">{dict.work.subtitle}</p>
            </div>

            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {demos.map((demo, i) => {
                const SectorIcon = demo.icon;
                // 3 sütunlu bento: 0 ve 5 geniş, sondaki CTA da geniş → 4 tam satır.
                const wide = i === 0 || i === 5;
                return (
                  <li key={demo.slug} className={wide ? "lg:col-span-2" : ""}>
                    <a
                      href={`/demo/${demo.slug}`}
                      target="_blank"
                      rel="noopener"
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl"
                      style={{ boxShadow: `0 30px 60px -30px ${demo.palette.accent}66` }}
                    >
                      {/* Tarayıcı çerçevesi + ekran görüntüsü */}
                      <div className="relative">
                        <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-900 px-4 py-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                          <span className="ml-3 truncate font-mono text-[10px] text-zinc-500">
                            {toDomain(demo.name)}
                          </span>
                        </div>
                        <div className={`relative aspect-[16/10] overflow-hidden ${wide ? "lg:aspect-[16/6.5]" : ""}`}>
                          <Image
                            src={`/ornekler/${demo.slug}.png`}
                            alt={`${demo.sector} için örnek web sitesi tasarımı: ${demo.name}`}
                            fill
                            sizes={wide ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"}
                            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                          />
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                            {dict.work.liveDemo}
                            <HiArrowUpRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 items-start gap-4 p-6">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: demo.palette.accent, color: demo.palette.onAccent }}
                        >
                          <SectorIcon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold">{demo.sector}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-400">{demo.pitch}</p>
                          <p className="mt-2 text-xs text-zinc-500">
                            {demo.district} · {dict.work.badge}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
              <li className="md:col-span-2">
                <a
                  href={whatsappUrl(dict.work.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-8 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-600 p-8 text-black transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/30"
                >
                  <HiSparkles className="h-10 w-10 transition group-hover:rotate-12 group-hover:scale-110" />
                  <div>
                    <p className="text-2xl font-semibold leading-snug">{dict.work.ctaText}</p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
                      <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                      {dict.whatsappCta}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <AdminPanelShowcase dict={dict.panel} />

      {/* PAKETLER */}
      <section
        id="paketler"
        className="scroll-mt-24 border-y border-zinc-200 bg-white/60 px-6 py-24 dark:border-white/10 dark:bg-white/[0.02]"
      >
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>{dict.packages.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {dict.packages.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {dict.packages.subtitle}
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {dict.packages.items.map((pkg, i) => {
                const popular = i === POPULAR_PACKAGE;
                return (
                  <article
                    key={pkg.name}
                    className={`relative flex flex-col rounded-3xl p-8 transition ${
                      popular
                        ? "bg-zinc-950 text-white shadow-2xl shadow-emerald-500/20 ring-1 ring-emerald-400/40 lg:-my-4 lg:py-12 dark:bg-gradient-to-b dark:from-emerald-500/15 dark:to-zinc-950"
                        : "border border-zinc-200 bg-white hover:border-emerald-500/40 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-emerald-400/30"
                    }`}
                  >
                    {popular && (
                      <span className="absolute -top-3 left-8 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-black">
                        {dict.packages.popular}
                      </span>
                    )}
                    <h3
                      className={`text-xl font-semibold ${popular ? "text-white" : "text-zinc-900 dark:text-white"}`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${popular ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"}`}
                    >
                      {pkg.desc}
                    </p>
                    <p
                      className={`mt-6 text-sm font-semibold ${popular ? "text-emerald-300" : "text-emerald-700 dark:text-emerald-400"}`}
                    >
                      {dict.packages.priceLabel}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-2.5 text-sm ${popular ? "text-zinc-200" : "text-zinc-700 dark:text-zinc-300"}`}
                        >
                          <HiCheck
                            className={`mt-0.5 h-4 w-4 shrink-0 ${popular ? "text-emerald-300" : "text-emerald-600 dark:text-emerald-400"}`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappUrl(fill(dict.packages.askTemplate, { name: pkg.name }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                        popular
                          ? "bg-emerald-500 text-black hover:bg-emerald-400"
                          : "border border-zinc-300 text-zinc-900 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black dark:border-white/15 dark:text-white dark:hover:border-emerald-500 dark:hover:text-black"
                      }`}
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      {dict.packages.cta}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SÜREÇ */}
      <section id="surec" className="scroll-mt-24 px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{dict.process.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {dict.process.title}
            </h2>
            <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dict.process.steps.map((step, i) => (
                <li
                  key={step.title}
                  className={`group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-950 ${tones[i].ring}`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-6 -right-2 text-[7rem] font-black leading-none opacity-15 transition group-hover:opacity-30 ${tones[i].text}`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br font-mono text-base font-bold text-white shadow-lg ${tones[i].icon}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* NEDEN BEN + BÖLGELER */}
      <section className="px-6 pb-24">
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 dark:border-white/10 dark:bg-zinc-950">
              <Eyebrow>{dict.why.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {dict.why.title}
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{dict.why.body}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {dict.why.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={localeHref(lang, "/dev")}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                {dict.why.devLink}
                <HiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-3xl bg-emerald-500 p-8 text-black sm:p-10">
              <HiMapPin className="h-7 w-7" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{dict.area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-950">{dict.area.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {dict.area.districts.map((district) => (
                  <li
                    key={district}
                    className="rounded-full bg-black/10 px-3 py-1 text-sm font-medium text-emerald-950"
                  >
                    {district}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SSS */}
      <section
        id="sss"
        className="scroll-mt-24 border-t border-zinc-200 px-6 py-24 dark:border-white/10"
      >
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Eyebrow>{dict.faq.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {dict.faq.title}
              </h2>
            </div>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
              {dict.faq.items.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-zinc-900 transition hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <HiPlus className="h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300 group-open:rotate-45 dark:text-emerald-400" />
                  </summary>
                  <p className="mt-3 pr-10 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SON ÇAĞRI */}
      <section id="iletisim" className="scroll-mt-24 px-6 pb-28">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/30 blur-3xl motion-safe:animate-[contact-glow_6s_ease-in-out_infinite]"
            />
            <h2 className="relative text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {dict.final.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-zinc-300">{dict.final.subtitle}</p>
            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={wa} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <FaWhatsapp className="h-5 w-5" />
                {dict.whatsappCta}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/** Örnek bir işletme sitesi + Google sonucu: "ne alacağım?" sorusunu görsel olarak cevaplar. */
function HeroMock({ dict }: { dict: Dictionary["services"]["hero"] }) {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Tarayıcı */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-emerald-900/10 dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-white/5 dark:bg-zinc-950">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-zinc-500 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10">
            <HiLockClosed className="h-3 w-3 text-emerald-600" />
            {dict.mockUrl}
          </div>
        </div>
        <div className="relative">
          <div className="h-36 bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 dark:from-amber-900/60 dark:via-orange-900/50 dark:to-rose-900/50">
            <div className="flex items-center justify-between px-5 pt-4 text-[11px] font-semibold text-zinc-800 dark:text-zinc-100">
              <span>{dict.mockName}</span>
              <span className="flex gap-3 font-normal opacity-70">
                <span>Menü</span>
                <span>Galeri</span>
                <span>İletişim</span>
              </span>
            </div>
            <div className="px-5 pt-6">
              <p className="text-xl font-bold text-zinc-900 dark:text-white">{dict.mockTagline}</p>
              <span className="mt-3 inline-block rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold text-white dark:bg-white dark:text-zinc-900">
                {dict.mockCta}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4">
            <div className="h-14 rounded-lg bg-zinc-100 dark:bg-white/5" />
            <div className="h-14 rounded-lg bg-zinc-100 dark:bg-white/5" />
            <div className="h-14 rounded-lg bg-zinc-100 dark:bg-white/5" />
          </div>
        </div>
      </div>

      {/* Google sonucu */}
      <div className="absolute -bottom-8 -left-4 w-64 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-xl sm:-left-10 dark:border-white/10 dark:bg-zinc-950">
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] text-zinc-600 dark:bg-white/5 dark:text-zinc-300">
          <HiMagnifyingGlass className="h-3 w-3" />
          {dict.mockSearch}
        </div>
        <p className="mt-2.5 text-[10px] text-zinc-500">{dict.mockUrl}</p>
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
          {dict.mockName} — {dict.mockTagline}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <HiCheck className="h-3 w-3" />
          {dict.mockRank}
        </p>
      </div>

      {/* Skor rozetleri */}
      <div className="absolute -right-3 -top-5 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-lg sm:-right-6 dark:border-white/10 dark:bg-zinc-950">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-emerald-500 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
          98
        </span>
        <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">{dict.mockSpeed}</span>
      </div>
      <div className="absolute -right-2 bottom-16 hidden items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-black shadow-lg sm:flex">
        <HiDevicePhoneMobile className="h-3.5 w-3.5" />
        {dict.mockMobile}
      </div>
    </div>
  );
}
