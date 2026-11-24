// Client bileşenlerinden de import edilebilir (server-only bağımlılığı yok).

/** Varsayılan dil (tr) prefix'siz yaşar; diğer diller /{lang} prefix'i alır. */
export function localeHref(lang: string, href: string): string {
  if (lang === "tr") return href;
  if (href === "/") return `/${lang}`;
  // "/dev#blog" → "/en/dev#blog", "/#x" → "/en#x"
  if (href.startsWith("/#")) return `/${lang}#${href.slice(2)}`;
  return `/${lang}${href}`;
}

/** metadata.alternates.canonical için mutlak yol. TR prefix'siz kanoniktir; EN /en alır. */
export function canonicalPath(lang: string, path: string): string {
  return localeHref(lang, path);
}

/** Bir sayfanın kanoniği + hreflang alternatifleri. */
export function alternatesFor(lang: string, path: string) {
  return {
    canonical: canonicalPath(lang, path),
    languages: { tr: path, en: localeHref("en", path), "x-default": path },
  };
}

/** Yer tutucuları ({name} vb.) verilen değerlerle değiştirir. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );
}
