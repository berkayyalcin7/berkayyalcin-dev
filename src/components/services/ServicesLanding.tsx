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
  HiPhone,
  HiArrowRight,
  HiMagnifyingGlass,
  HiLockClosed,
  HiDevicePhoneMobile,
  HiPlus,
} from "react-icons/hi2";
import Reveal from "@/components/Reveal";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
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

const POPULAR_PACKAGE = 1;

const primaryBtn =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-black shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 active:translate-y-0";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-base font-semibold text-zinc-800 transition hover:border-emerald-500/50 hover:text-emerald-700 dark:border-white/15 dark:text-white dark:hover:border-emerald-400/60 dark:hover:text-emerald-400";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
      {children}
    </p>
  );
}

export default function ServicesLanding({ lang, dict }: Props) {
  const wa = whatsappUrl(dict.whatsappGreeting);
  const tel = `tel:${siteConfig.phone}`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.18), transparent 42%), radial-gradient(circle at 85% 10%, rgba(59,130,246,0.12), transparent 40%)",
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
              <a href={tel} className={ghostBtn}>
                <HiPhone className="h-4 w-4" />
                <span className="tabular-nums">{siteConfig.phoneDisplay}</span>
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

            <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
              {dict.offer.items.map((item, i) => {
                const Icon = offerIcons[i] ?? HiCheck;
                return (
                  <li
                    key={item.title}
                    className="group relative bg-white p-7 transition-colors hover:bg-emerald-50/60 dark:bg-zinc-950 dark:hover:bg-emerald-500/[0.06]"
                  >
                    <span className="absolute right-6 top-6 font-mono text-xs text-zinc-400 dark:text-zinc-600">
                      0{i + 1}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 transition group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-black dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
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
            <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
              <span
                aria-hidden
                className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-emerald-500/60 via-emerald-500/30 to-transparent md:block"
              />
              {dict.process.steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/40 bg-slate-50 font-mono text-sm font-bold text-emerald-700 dark:bg-black dark:text-emerald-400">
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
              <a
                href={tel}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
              >
                <HiPhone className="h-4 w-4" />
                <span className="tabular-nums">{siteConfig.phoneDisplay}</span>
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
