// Araçlar bölümünün veri kaynağı: her paket bir kayıt.
// İleride NuGet paketleri de buraya registry: "nuget" ile eklenir.

export type ToolRegistry = "npm" | "nuget";

export type ToolPackage = {
  slug: string;
  name: string;
  registry: ToolRegistry;
  tagline: string;
  description: string;
  installCommand: string;
  packageUrl: string;
  githubUrl: string;
  features: string[];
};

export const tools: ToolPackage[] = [
  {
    slug: "trkit",
    name: "trkit",
    registry: "npm",
    tagline: "Türk geliştiriciler için sıfır bağımlılıklı utility kit",
    description:
      "TC Kimlik No, VKN, IBAN, telefon ve plaka doğrulama; KVKK dostu maskeleme; Türkçe İ/ı duyarlı metin işlemleri; sayıyı yazıya çevirme, KDV hesapları ve Diyanet takvimiyle doğrulanmış resmî tatil / iş günü hesapları. Saf fonksiyonlardan oluşur — React, Vue, Angular, Node fark etmeksizin her yerde çalışır.",
    installCommand: "npm install trkit",
    packageUrl: "https://www.npmjs.com/package/trkit",
    githubUrl: "https://github.com/berkayyalcin7/trkit",
    features: [
      "Sıfır bağımlılık",
      "%100 test kapsamı",
      "Tree-shakeable",
      "TypeScript-first",
      "KVKK dostu",
      "MIT lisansı",
    ],
  },
  {
    slug: "locakit",
    name: "locakit",
    registry: "npm",
    tagline: "AI agent'lar için deterministik i18n motoru",
    description:
      "Çok dilli projelerde locale JSON'larını agent'ınızla senkron tutar: eksik ve bayatlamış key'leri lockfile ile tespit eder, çeviriyi zaten kullandığınız AI agent (Claude Code vb.) kodun bağlamını okuyarak yapar, locakit de yer tutucu paritesi, glossary ve Türkçe dil paketi kurallarıyla doğrulayıp JSON'a güvenle yazar. Çeviri API'si yok, SaaS hesabı yok, token faturası yok.",
    installCommand: "npm install -D locakit",
    packageUrl: "https://www.npmjs.com/package/locakit",
    githubUrl: "https://github.com/berkayyalcin7/locakit",
    features: [
      "Sıfır bağımlılık",
      "API key gerektirmez",
      "Lockfile ile bayatlama takibi",
      "CI dostu check",
      "Türkçe dil paketi",
      "Claude Code skill'i",
      "MIT lisansı",
    ],
  },
];

export function getToolBySlug(slug: string): ToolPackage | undefined {
  return tools.find((tool) => tool.slug === slug);
}
