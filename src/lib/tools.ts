// Araçlar bölümünün dilden bağımsız verisi; tanıtım metinleri sözlüklerde
// (dict.trkit / dict.locakit) yaşar. İleride NuGet paketleri registry: "nuget" ile eklenir.

export type ToolRegistry = "npm" | "nuget";

export type ToolSlug = "trkit" | "locakit" | "utilkit";

export type ToolPackage = {
  slug: ToolSlug;
  name: string;
  registry: ToolRegistry;
  installCommand: string;
  packageUrl: string;
  githubUrl: string;
};

export const tools: ToolPackage[] = [
  {
    slug: "trkit",
    name: "trkit",
    registry: "npm",
    installCommand: "npm install trkit",
    packageUrl: "https://www.npmjs.com/package/trkit",
    githubUrl: "https://github.com/berkayyalcin7/trkit",
  },
  {
    slug: "locakit",
    name: "locakit",
    registry: "npm",
    installCommand: "npm install -D locakit",
    packageUrl: "https://www.npmjs.com/package/locakit",
    githubUrl: "https://github.com/berkayyalcin7/locakit",
  },
  {
    slug: "utilkit",
    name: "utilkit",
    registry: "npm",
    installCommand: "npm install @berkayyalcin/utilkit",
    packageUrl: "https://www.npmjs.com/package/@berkayyalcin/utilkit",
    githubUrl: "https://github.com/berkayyalcin7/utilkit",
  },
];

export function getToolBySlug(slug: string): ToolPackage | undefined {
  return tools.find((tool) => tool.slug === slug);
}
