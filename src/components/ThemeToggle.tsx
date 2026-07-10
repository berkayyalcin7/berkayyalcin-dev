"use client";

import { useSyncExternalStore } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

// Tema bilgisi React dışında (html.classList + localStorage) tutulduğu için
// useSyncExternalStore ile okunur; toggle "themechange" event'iyle haber verir.
function subscribe(onChange: () => void) {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
}

function getSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot(): "light" | "dark" {
  return "dark"; // SSR'da varsayılan tema
}

export default function ThemeToggle({ ariaLabel }: { ariaLabel: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    // Hem bu bileşenin hem de canvas arka planının güncellenmesi için
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/60 bg-zinc-100/50 text-zinc-600 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/5 dark:bg-white/[0.01] dark:text-zinc-400 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400 shadow-sm"
      aria-label={ariaLabel}
      aria-pressed={theme === "dark"}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        {/* Güneş İkonu (Light Mode aktifken görünür) */}
        <HiSun
          className={`absolute inset-0 h-full w-full transform transition-all duration-500 ease-out ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          }`}
        />
        {/* Ay İkonu (Dark Mode aktifken görünür) */}
        <HiMoon
          className={`absolute inset-0 h-full w-full transform transition-all duration-500 ease-out ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
