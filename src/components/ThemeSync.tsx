"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client navigasyonlarında (özellikle dil değişiminde) kök layout yeniden render
 * olduğunda <html> üzerindeki tema class'ı kaybolabiliyor. Bu bileşen her rota
 * değişiminden sonra temayı localStorage'daki tercihe göre yeniden uygular.
 */
export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
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
