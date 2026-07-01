import { siteConfig } from "@/lib/site-config";
import { HiBriefcase } from "react-icons/hi2";

export default function Timeline() {
  // Chronological order from left to right (oldest to newest)
  const chronologicalExperience = [...siteConfig.experience].reverse();

  return (
    <section id="deneyim" className="scroll-mt-24 border-t border-white/10 px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Deneyim & Kariyer
            </h2>
            <p className="mt-4 text-2xl font-medium text-white">
              Kariyer Zaman Çizelgem
            </p>
          </div>
          <span className="lg:hidden inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium select-none">
            Sağa kaydırın <span className="animate-pulse">→</span>
          </span>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative mt-12">
          {/* Horizontal Connection Line */}
          <div className="absolute top-[21px] left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-800 to-zinc-900 -z-10" />

          {/* Scrollable Track - Flex on mobile, Grid on desktop */}
          <div className="flex lg:grid lg:grid-cols-5 gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {chronologicalExperience.map((exp, idx) => (
              <div key={idx} className="w-[280px] md:w-[320px] lg:w-auto shrink-0 lg:shrink snap-start flex flex-col group relative">
                
                {/* Timeline Dot Indicator */}
                <div className="flex items-center mb-6 pl-4">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-0 group-hover:animate-ping group-hover:opacity-20"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-600 transition-colors duration-300 group-hover:bg-emerald-500 shadow-sm" />
                  </div>
                  {/* Subtle connecting pulse indicator */}
                  <div className="ml-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider bg-zinc-900/50 border border-white/5 px-2 py-0.5 rounded-full transition group-hover:text-emerald-400 group-hover:border-emerald-500/20">
                    {exp.period}
                  </div>
                </div>

                {/* Compact Content Card with Glassmorphism */}
                <div className="flex-1 flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.01] p-5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/30 group-hover:bg-white/[0.02] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] group-hover:shadow-emerald-500/5 min-h-[220px]">
                  {/* Glowing border/effect on hover */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div>
                    <h3 className="text-sm font-semibold text-white transition group-hover:text-emerald-400">
                      {exp.company}
                    </h3>
                    <p className="text-xs text-emerald-400/80 font-medium mt-1">
                      {exp.role}
                    </p>
                    
                    {/* Bullet Points */}
                    <ul className="mt-4 space-y-1.5 text-xs text-zinc-400 list-disc pl-4 leading-relaxed">
                      {exp.points.map((point, pIdx) => (
                        <li key={pIdx} className="hover:text-zinc-300 transition-colors">
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
      </div>
    </section>
  );
}
