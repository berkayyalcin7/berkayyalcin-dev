import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCpuChip,
  HiGlobeAlt,
  HiMapPin,
  HiComputerDesktop,
  HiServer,
  HiLink,
} from "react-icons/hi2";

type Highlight = {
  label: string;
  value: string;
  icon: IconType;
};

const highlights: Highlight[] = [
  { label: "Unvan", value: "Bilgisayar Mühendisi", icon: HiAcademicCap },
  { label: "Uzmanlık", value: ".NET Full Stack Developer", icon: HiCpuChip },
  { label: "Ekosistem", value: "Web & Kurumsal Yazılım", icon: HiGlobeAlt },
  { label: "Konum", value: "Türkiye", icon: HiMapPin },
];

export default function About() {
  return (
    <section id="hakkimda" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Hakkımda
        </h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              Yazılım geliştirmeyi sadece bir meslek değil,{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                sürekli öğrenme ve üretme
              </span>{" "}
              yolculuğu olarak görüyorum.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
              Bilgisayar Mühendisiyim ve modern web teknolojilerinin yanı sıra
              .NET ekosisteminde de uçtan uca çözümler geliştiriyorum. Entity
              Framework Core, Microsoft SQL Server, Azure DevOps ve Microsoft
              SharePoint Management gibi kurumsal araçlarla çalışma deneyimim
              var.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Uygulama ve Entegrasyon Uzmanlıkları
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3 transition hover:border-emerald-400/30 hover:bg-white/[0.03]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500/20">
                    <HiGlobeAlt className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-zinc-200 text-xs transition group-hover:text-white">Web Geliştirme</h4>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-normal">
                      TypeScript, React, Next.js ve Tailwind CSS ile hızlı, SEO dostu ve responsive modern web uygulamaları.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3 transition hover:border-blue-400/30 hover:bg-white/[0.03]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
                    <HiComputerDesktop className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-zinc-200 text-xs transition group-hover:text-white">Masaüstü (Desktop) Geliştirme</h4>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-normal">
                      Windows platformu için yüksek performanslı, kararlı WinForms ve WPF tabanlı kurumsal masaüstü yazılımları.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3 transition hover:border-violet-400/30 hover:bg-white/[0.03]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                    <HiServer className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-zinc-200 text-xs transition group-hover:text-white">Arka Plan Servisleri (Services)</h4>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-normal">
                      Sürekli çalışan arka plan işleri, Windows/Worker Service uygulamaları ve planlanmış veri/kuyruk işleme sistemleri.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3 transition hover:border-amber-400/30 hover:bg-white/[0.03]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition group-hover:bg-amber-500/20">
                    <HiLink className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-zinc-200 text-xs transition group-hover:text-white">API Tasarımı & Entegrasyonlar</h4>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-normal">
                      Güvenli, RESTful API tasarımları (.NET Web API) ve çeşitli 3. parti sistemlerin veri/servis entegrasyonu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-400/40 hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500/20">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
