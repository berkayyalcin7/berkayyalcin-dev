"use client";

import { useEffect, useRef, useState } from "react";

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const COUNT_UP_DURATION_MS = 1200;

/** Görünüme girince 0'dan hedef değere easeOutCubic ile sayar; reduced-motion'da direkt hedefe atlar. */
function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (prefersReducedMotion) {
          setValue(target);
          return;
        }

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return { value, ref };
}

function StatCard({ value, suffix, label }: StatItem) {
  const { value: displayValue, ref } = useCountUp(value);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4 py-2 text-center sm:items-start sm:text-left">
      <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
    </div>
  );
}

export default function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-zinc-200 dark:sm:divide-white/10">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}
