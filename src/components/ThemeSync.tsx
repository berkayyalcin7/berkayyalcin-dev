"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Dil değişiminde [lang] layout'u remount olur ve <html> üzerindeki tema class'ı
 * silinir. useLayoutEffect, tarayıcı boyama yapmadan ÖNCE senkron çalıştığı için
 * tema aynı karede geri uygulanır — gözle görülür dark/light "çift geçiş" olmaz.
 */
export default function ThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      // localStorage erişilemiyorsa varsayılan (dark) geçerli
    }
    const theme = stored === "light" ? "light" : "dark";
    const other = theme === "light" ? "dark" : "light";
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(other);
  }, [pathname]);

  return null;
}
