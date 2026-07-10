// Client bileşenlerinden de import edilebilir (server-only bağımlılığı yok).

/** Varsayılan dil (en) prefix'siz yaşar; diğer diller /{lang} prefix'i alır. */
export function localeHref(lang: string, href: string): string {
  if (lang === "en") return href;
  if (href === "/") return `/${lang}`;
  // "/#blog" gibi hash linkleri "/tr#blog" olmalı
  if (href.startsWith("/#")) return `/${lang}#${href.slice(2)}`;
  return `/${lang}${href}`;
}

/**
 * metadata.alternates.canonical için mutlak yol. EN prefix'siz kanoniktir; TR
 * /tr prefix'i alır. Coğrafya tabanlı /tr yönlendirmesi (bkz. proxy.ts) iki URL'nin
 * de indekslenebilir olmasına yol açtığından her sayfa kendi kanoniğini bildirir.
 */
export function canonicalPath(lang: string, path: string): string {
  if (lang !== "tr") return path;
  return path === "/" ? "/tr" : `/tr${path}`;
}

/** Yer tutucuları ({name} vb.) verilen değerlerle değiştirir. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );
}
