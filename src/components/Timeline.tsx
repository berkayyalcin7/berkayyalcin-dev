import type { Dictionary } from "@/lib/i18n";
import { fill } from "@/lib/locale-link";

export default function Timeline({ dict }: { dict: Dictionary["timeline"] }) {
  // Chronological order from left to right (oldest to newest)
  const chronologicalExperience = [...dict.experience].reverse().map((exp) => ({
    ...exp,
    period: fill(exp.period, { year: new Date().getFullYear() }),
  }));

  return (
    <section id="deneyim" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {dict.heading}
          </h2>
          <p className="mt-4 text-2xl font-medium text-zinc-900 dark:text-white">
            {dict.subtitle}
          </p>
        </div>

        {/* Masaüstü Görünümü (lg ve üzeri) */}
        <div className="hidden lg:block relative mt-12">
          {/* Yatay Bağlantı Çizgisi */}
          <div className="absolute top-[21px] left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-900 -z-10" />

          {/* 5 Kolonlu Izgara */}
          <div className="grid grid-cols-5 gap-6 pt-2">
            {chronologicalExperience.map((exp, idx) => (
              <div key={idx} className="flex flex-col group relative">
                
                {/* Nokta Göstergesi */}
                <div className="flex items-center mb-6 pl-4">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] dark:group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-0 group-hover:animate-ping group-hover:opacity-20"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors duration-300 group-hover:bg-emerald-500 shadow-sm" />
                  </div>
                  <div className="ml-3 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 px-2 py-0.5 rounded-full transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/20">
                    {exp.period}
                  </div>
                </div>

                {/* Kart İçeriği */}
                <div className="flex-1 flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-100/50 dark:border-white/5 dark:bg-white/[0.01] p-5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/30 group-hover:bg-zinc-150/60 dark:group-hover:bg-white/[0.02] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5 min-h-[240px] relative">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {exp.company}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium mt-1">
                      {exp.role}
                    </p>
                    
                    <ul className="mt-4 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 list-disc pl-4 leading-relaxed">
                      {exp.points.map((point, pIdx) => (
                        <li key={pIdx} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobil/Tablet Görünümü (lg Altı) - Dikey Akış */}
        <div className="block lg:hidden relative mt-12 pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-10">
          {chronologicalExperience.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Zaman Çizgisi Noktası */}
              <div className="-ml-[35px] absolute top-1 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-0 group-hover:animate-ping group-hover:opacity-20"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors duration-300 group-hover:bg-emerald-500 shadow-sm" />
              </div>

              {/* Dönem Bilgisi */}
              <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 px-2.5 py-0.5 rounded-full inline-block transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/20">
                {exp.period}
              </div>

              {/* Dikey Kart */}
              <div className="mt-3 relative rounded-2xl border border-zinc-200 bg-zinc-100/50 dark:border-white/5 dark:bg-white/[0.01] p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-zinc-150/60 dark:group-hover:bg-white/[0.02]">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {exp.company}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium mt-1">
                  {exp.role}
                </p>
                
                <ul className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 list-disc pl-4 leading-relaxed">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
