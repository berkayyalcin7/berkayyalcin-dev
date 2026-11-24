import { HiArrowRight, HiCheck, HiMapPin, HiPlus, HiClock } from "react-icons/hi2";
import type { Block, Demo } from "@/lib/demos";
import { accentBtn, initials } from "@/components/demo/DemoHero";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
const card = "rounded-[var(--radius)] bg-[var(--surface)] ring-1 ring-[var(--muted)]/15";

function Title({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`demo-display text-3xl font-semibold sm:text-5xl ${center ? "text-center" : ""}`}>{children}</h2>
  );
}

export default function DemoBlock({ block, demo }: { block: Block; demo: Demo }) {
  switch (block.type) {
    /* Restoran menüsü: noktalı fiyat çizgileri, iki sütun */
    case "menu":
      return (
        <Section>
          <Title center>{block.title}</Title>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {block.groups.map((group) => (
              <div key={group.name}>
                <h3 className="demo-display border-b-2 border-[var(--accent)] pb-3 text-2xl font-semibold text-[var(--accent)]">
                  {group.name}
                </h3>
                <ul className="mt-6 space-y-6">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="demo-display text-lg font-semibold">{item.name}</span>
                        <span className="flex-1 translate-y-[-4px] border-b-2 border-dotted border-[var(--muted)]/40" />
                        <span className="font-bold text-[var(--accent)]">{item.price}</span>
                      </div>
                      {item.desc && <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      );

    /* Fiyat listesi: satırlar + fiyat rozetleri */
    case "pricelist":
      return (
        <Section>
          <Title>{block.title}</Title>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] bg-[var(--muted)]/15 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4 bg-[var(--surface)] px-6 py-5">
                <div>
                  <p className="demo-display text-lg font-semibold">{item.name}</p>
                  {item.note && <p className="text-sm text-[var(--muted)]">{item.note}</p>}
                </div>
                <span className="shrink-0 rounded-[var(--radius)] bg-[var(--accent)]/15 px-3 py-1.5 text-sm font-bold text-[var(--accent)]">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      );

    /* Hizmet / tedavi / kabiliyet kartları */
    case "cards":
      return (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Title>{block.title}</Title>
            {block.intro && <p className="max-w-sm text-[var(--muted)]">{block.intro}</p>}
          </div>
          <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${block.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {block.items.map((item, i) => (
              <article key={item.title} className={`${card} group p-7 transition hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[var(--accent)] text-sm font-bold text-[var(--on-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.tag && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className="demo-display mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>
      );

    /* Numaralı liste: hukukta roma rakamlı alanlar, diğerlerinde süreç adımları */
    case "numbered":
      return block.roman ? (
        <Section>
          <Title>{block.title}</Title>
          <ol className="mt-10 border-t border-[var(--ink)]/20">
            {block.items.map((item, i) => (
              <li key={item.title} className="grid gap-4 border-b border-[var(--ink)]/20 py-8 md:grid-cols-[120px_1fr_2fr]">
                <span className="demo-display text-4xl italic text-[var(--accent)]">{ROMAN[i]}.</span>
                <h3 className="demo-display text-2xl font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-[var(--muted)]">{item.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      ) : (
        <Section>
          <Title>{block.title}</Title>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-6 hidden h-0.5 bg-[var(--accent)]/25 md:block" />
            {block.items.map((item, i) => (
              <li key={item.title} className="relative">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--on-accent)] ring-8 ring-[var(--bg)]">
                  {i + 1}
                </span>
                <h3 className="demo-display mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      );

    /* Ekip / hekimler / avukatlar: monogram avatarlı kartlar */
    case "team":
      return (
        <Section>
          <Title>{block.title}</Title>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {block.people.map((person, i) => (
              <article key={person.name} className={`${card} overflow-hidden`}>
                <div
                  className="flex aspect-[4/3] items-center justify-center"
                  style={{ background: demo.palette.hero, filter: `hue-rotate(${i * 14}deg) saturate(0.9)` }}
                >
                  <span className="demo-display flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface)] text-3xl font-semibold text-[var(--accent)] shadow-xl">
                    {initials(person.name)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="demo-display text-xl font-semibold">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      );

    /* Emlak ilan kartları */
    case "listings":
      return (
        <Section>
          <div className="flex items-end justify-between gap-4">
            <Title>{block.title}</Title>
            <span className="hidden items-center gap-2 text-sm font-semibold text-[var(--accent)] sm:inline-flex">
              Tüm ilanlar <HiArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {block.items.map((item, i) => (
              <article key={item.title} className={`${card} group overflow-hidden`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition duration-700 group-hover:scale-105"
                    style={{
                      background: [
                        "linear-gradient(180deg,#7dd3fc 0%,#38bdf8 45%,#0c4a6e 46%,#075985 100%)",
                        "linear-gradient(180deg,#fde68a 0%,#fb923c 50%,#365314 51%,#3f6212 100%)",
                        "linear-gradient(180deg,#c7d2fe 0%,#a5b4fc 55%,#1e293b 56%,#334155 100%)",
                      ][i % 3],
                    }}
                  />
                  <svg viewBox="0 0 200 120" className="absolute bottom-0 left-1/2 h-3/5 -translate-x-1/2" aria-hidden>
                    <path d="M40 120V62l60-40 60 40v58z" fill="#fff" opacity="0.92" />
                    <path d="M30 66l70-48 70 48" stroke="#0b1324" strokeWidth="6" fill="none" />
                    <rect x="88" y="84" width="24" height="36" fill="#0b1324" opacity="0.8" />
                    <rect x="56" y="74" width="20" height="18" fill="#38bdf8" opacity="0.8" />
                    <rect x="124" y="74" width="20" height="18" fill="#38bdf8" opacity="0.8" />
                  </svg>
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--on-accent)]">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="demo-display text-2xl text-[var(--accent)]">{item.price}</p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[var(--muted)]">
                    <HiMapPin className="h-4 w-4" /> {item.place}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-[var(--muted)]/20 pt-4">
                    {item.specs.map((spec) => (
                      <li key={spec} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium ring-1 ring-[var(--muted)]/20">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>
      );

    /* Randevu takvimi: dolu saatler üstü çizili, bir saat seçili */
    case "slots":
      return (
        <Section>
          <div className={`${card} p-8 sm:p-10`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Title>{block.title}</Title>
              <p className="flex max-w-sm items-start gap-2 text-sm text-[var(--muted)]">
                <HiClock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {block.note}
              </p>
            </div>
            <div className={`mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 ${block.days.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
              {block.days.map((day, d) => (
                <div key={day.day}>
                  <p className="text-sm font-bold">{day.day}</p>
                  <ul className="mt-3 space-y-2">
                    {day.times.map((time, t) => {
                      const full = day.full?.includes(time);
                      const selected = d === 1 && t === 1 && !full;
                      return (
                        <li
                          key={time}
                          className={`rounded-[var(--radius)] px-3 py-2 text-center text-sm font-semibold ${
                            full
                              ? "text-[var(--muted)]/50 line-through"
                              : selected
                                ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-lg"
                                : "ring-1 ring-[var(--accent)]/30 text-[var(--accent)]"
                          }`}
                        >
                          {time}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <span className={`${accentBtn} mt-8`}>Seçili saati onayla</span>
          </div>
        </Section>
      );

    case "quote":
      return (
        <Section>
          <figure className="mx-auto max-w-3xl text-center">
            <span className="demo-display block text-8xl leading-none text-[var(--accent)]">“</span>
            <blockquote className="demo-display -mt-6 text-3xl leading-snug sm:text-4xl">{block.text}</blockquote>
            <figcaption className="mt-6 text-sm font-semibold text-[var(--muted)]">{block.author}</figcaption>
          </figure>
        </Section>
      );

    case "faq":
      return (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Title>{block.title}</Title>
            <div className="divide-y divide-[var(--muted)]/20 border-y border-[var(--muted)]/20">
              {block.items.map((item, i) => (
                <details key={item.q} open={i === 0} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <HiPlus className="h-5 w-5 shrink-0 text-[var(--accent)] transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      );

    /* Blog / makale kartları */
    case "articles":
      return (
        <Section>
          <Title>{block.title}</Title>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {block.items.map((item) => (
              <article key={item.title} className={`${card} flex flex-col p-7`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {item.date} · {item.read}
                </p>
                <h3 className="demo-display mt-4 flex-1 text-xl font-semibold leading-snug">{item.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  Devamını oku <HiArrowRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </Section>
      );

    case "chips":
      return (
        <Section>
          <h2 className="demo-display text-2xl font-semibold">{block.title}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium ring-1 ring-[var(--muted)]/20"
              >
                <HiCheck className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      );

    case "banner":
      return (
        <Section>
          <div
            className="relative overflow-hidden rounded-[var(--radius)] p-6 sm:p-12"
            style={{ background: demo.palette.hero }}
          >
            <demo.icon className="absolute -bottom-10 -right-6 h-56 w-56 opacity-15" />
            <div className="relative max-w-xl rounded-[var(--radius)] bg-[var(--bg)]/90 p-8 text-[var(--ink)] shadow-2xl backdrop-blur">
              <h2 className="demo-display text-3xl font-semibold sm:text-4xl">{block.title}</h2>
              <p className="mt-4 text-[var(--muted)]">{block.text}</p>
              <span className={`${accentBtn} mt-7`}>{block.cta}</span>
            </div>
          </div>
        </Section>
      );

    case "stats":
      return (
        <Section>
          <div className={`${card} grid grid-cols-2 gap-y-8 py-10 ${demo.stats.length > 3 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
            {demo.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="demo-display text-4xl font-semibold text-[var(--accent)] sm:text-5xl">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Section>
      );

    case "gallery":
      return (
        <Section>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {demo.gallery.map((label, i) => (
              <div
                key={label}
                className={`relative flex items-end overflow-hidden rounded-[var(--radius)] p-5 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}
                style={{
                  background: demo.palette.hero,
                  filter: `hue-rotate(${i * 16}deg)`,
                  minHeight: i === 0 ? 300 : 142,
                }}
              >
                <demo.icon className="absolute right-4 top-4 h-10 w-10 text-white/30" />
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Section>
      );
  }
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-6xl px-6 py-16">{children}</section>;
}
