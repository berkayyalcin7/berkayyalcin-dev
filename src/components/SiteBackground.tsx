import NetworkCanvasLoader from "@/components/NetworkCanvasLoader";

/**
 * Sabit arka plan katmanı. Aurora lekeleri, nokta ızgarası ve vinyet sunucuda
 * render edilir — böylece ilk boyamada zemin hazırdır. Yalnızca canvas (parçacık
 * ağı) istemciye ertelenir; eskiden tüm katman `ssr: false` ile yüklendiği için
 * hidrasyona kadar düz bir zemin görünüp sonra bir anda beliriyordu.
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-black"
    >
      {/* Yavaşça hareket eden ışık lekeleri (aurora efekti) */}
      <div className="motion-safe:[animation:aurora-drift-1_22s_ease-in-out_infinite] absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-emerald-500/8 blur-3xl transition-colors duration-300 dark:bg-emerald-500/20" />
      <div className="motion-safe:[animation:aurora-drift-2_26s_ease-in-out_infinite] absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/6 blur-3xl transition-colors duration-300 dark:bg-blue-500/15" />
      <div className="motion-safe:[animation:aurora-drift-3_30s_ease-in-out_infinite] absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl transition-colors duration-300 dark:bg-violet-500/10" />

      {/* İnce nokta ızgarası — Açık Tema. -inset-16: grid-pan transform'u 64px kaydırdığı için taşma payı */}
      <div
        className="motion-safe:[animation:grid-pan_14s_linear_infinite] absolute -inset-16 opacity-[0.7] dark:hidden"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* İnce nokta ızgarası — Koyu Tema */}
      <div
        className="motion-safe:[animation:grid-pan_14s_linear_infinite] absolute -inset-16 hidden opacity-[0.15] dark:block"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Canlı bağlantı ağı — yalnızca bu parça istemciye ertelenir */}
      <NetworkCanvasLoader />

      {/* Kenarlarda hafif vinyet */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-transparent to-slate-50/40 transition-all duration-300 dark:from-black/40 dark:via-transparent dark:to-black/60" />
    </div>
  );
}
