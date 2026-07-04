"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

const SHOW_AFTER_PX = 600;

export default function BackToTop({ ariaLabel }: { ariaLabel: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > SHOW_AFTER_PX);
        ticking = false;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={ariaLabel}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <HiArrowUp className="h-5 w-5" />
    </button>
  );
}
