// Dilden bağımsız site sabitleri. Çevrilebilir metinler src/dictionaries/ altındadır.
export const siteConfig = {
  name: "Berkay Yalçın",
  url: "https://berkayyalcin.dev",
  phone: "+905385282234",
  phoneDisplay: "+90 538 528 22 34",
  social: {
    github: "https://github.com/berkayyalcin7",
    linkedin: "https://tr.linkedin.com/in/berkay-yalçın-59289b145",
    emailAddress: "berkayyalcin7@gmail.com",
    email: "mailto:berkayyalcin7@gmail.com",
  },
  cvUrl: "https://dyqriqtgitmyiytrlwyi.supabase.co/storage/v1/object/public/cv/cv.pdf",
  // Nav etiketleri sözlükten gelir (dict.nav); href'ler dilden bağımsızdır.
  // Geliştirici portfolyosu (/dev) ve blog/araçlar sayfalarının menüsü:
  nav: [
    { key: "services", href: "/" },
    { key: "about", href: "/dev#hakkimda" },
    { key: "projects", href: "/dev#projeler" },
    { key: "tools", href: "/araclar" },
    { key: "blog", href: "/dev#blog" },
    { key: "contact", href: "/dev#iletisim" },
  ],
  // Ana sayfa (web hizmetleri) menüsü:
  servicesNav: [
    { key: "offer", href: "/#hizmetler" },
    { key: "packages", href: "/#paketler" },
    { key: "process", href: "/#surec" },
    { key: "faq", href: "/#sss" },
    { key: "dev", href: "/dev" },
  ],
} as const;

export type NavItem =
  | (typeof siteConfig.nav)[number]
  | (typeof siteConfig.servicesNav)[number];
export type NavKey = NavItem["key"];

/** WhatsApp sohbet linki; text verilirse mesaj kutusu önceden doldurulur. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${siteConfig.phone.slice(1)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
