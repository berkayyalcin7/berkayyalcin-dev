import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiGithub,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { HiCube, HiDatabase, HiShare } from "react-icons/hi";

import type { Dictionary } from "@/lib/i18n";

type Skill = {
  name: string;
  icon: IconType;
};

type SkillCategory = {
  key: keyof Dictionary["skills"]["categories"];
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: ".NET Full Stack Developer", icon: SiDotnet },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Entity Framework Core", icon: HiCube },
    ],
  },
  {
    key: "database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Microsoft SQL Server", icon: HiDatabase },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    key: "devops",
    skills: [
      { name: "Azure DevOps", icon: VscAzureDevops },
      { name: "Microsoft SharePoint Management", icon: HiShare },
      { name: "Git & GitHub", icon: SiGithub },
    ],
  },
];

export default function Skills({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <section
      id="yetenekler"
      className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {dict.heading}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.key}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {dict.categories[category.key]}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {category.skills.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-2 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:transition dark:hover:border-emerald-400/40 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
