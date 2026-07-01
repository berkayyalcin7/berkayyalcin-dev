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

type Skill = {
  name: string;
  icon: IconType;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend & .NET Ekosistemi",
    skills: [
      { name: ".NET Full Stack Developer", icon: SiDotnet },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Entity Framework Core", icon: HiCube },
    ],
  },
  {
    title: "Veritabanı",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Microsoft SQL Server", icon: HiDatabase },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    title: "DevOps & Kurumsal Araçlar",
    skills: [
      { name: "Azure DevOps", icon: VscAzureDevops },
      { name: "Microsoft SharePoint Management", icon: HiShare },
      { name: "Git & GitHub", icon: SiGithub },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="yetenekler"
      className="scroll-mt-24 border-t border-white/10 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Yetenekler
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {category.skills.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-400/40 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-emerald-400" />
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
