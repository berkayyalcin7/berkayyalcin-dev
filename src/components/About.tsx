import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCpuChip,
  HiGlobeAlt,
  HiMapPin,
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
