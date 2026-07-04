// Dilden bağımsız site sabitleri. Çevrilebilir metinler src/dictionaries/ altındadır.
export const siteConfig = {
  name: "Berkay Yalçın",
  url: "https://berkayyalcin.dev",
  social: {
    github: "https://github.com/berkayyalcin7",
    linkedin: "https://tr.linkedin.com/in/berkay-yalçın-59289b145",
    emailAddress: "berkayyalcin7@gmail.com",
    email: "mailto:berkayyalcin7@gmail.com",
  },
  cvUrl: "https://dyqriqtgitmyiytrlwyi.supabase.co/storage/v1/object/public/cv/cv.pdf",
  // Nav etiketleri sözlükten gelir (dict.nav); href'ler dilden bağımsızdır.
  nav: [
    { key: "about", href: "/#hakkimda" },
    { key: "projects", href: "/#projeler" },
    { key: "tools", href: "/araclar" },
    { key: "blog", href: "/#blog" },
    { key: "contact", href: "/#iletisim" },
  ],
} as const;

export type NavKey = (typeof siteConfig.nav)[number]["key"];
