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
];

export function getToolBySlug(slug: string): ToolPackage | undefined {
  return tools.find((tool) => tool.slug === slug);
}
