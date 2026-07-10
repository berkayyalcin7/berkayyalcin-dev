"use client";

import { useState, type ReactNode } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";

type SkillsMarqueeProps = {
  pauseLabel: string;
  playLabel: string;
  /** Sunucuda render edilen şeritler; iz (track) elemanları `.marquee-track` taşır. */
  children: ReactNode;
};

/**
 * WCAG 2.2.2: 5 saniyeden uzun süren otomatik hareket için duraklatma yolu
 * sunulmalı. Hover ile duraklatma klavye ve dokunmatik kullanıcılara ulaşmaz.
 *
 * Duraklatma, animasyon sınıfını değiştirmek yerine sarmalayıcıya `.marquee-paused`
 * ekleyerek yapılır (bkz. globals.css) — böylece şeritler sunucu bileşeni olarak
 * kalır ve ikon bileşenleri client bundle'ına girmez.
 */
export default function SkillsMarquee({ pauseLabel, playLabel, children }: SkillsMarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="mt-8">
      <div className={paused ? "marquee-paused space-y-4" : "space-y-4"}>{children}</div>

      <button
        type="button"
        onClick={() => setPaused((current) => !current)}
        aria-pressed={paused}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
      >
        {paused ? <HiPlay className="h-3.5 w-3.5" /> : <HiPause className="h-3.5 w-3.5" />}
        {paused ? playLabel : pauseLabel}
      </button>
    </div>
  );
}
