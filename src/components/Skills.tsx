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

// Stats şeridinin "Teknoloji" sayacı bu tek kaynaktan beslenir.
export const SKILLS_COUNT = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

// Marquee'de iki şerit ters yönde akar: Modern Web solda, Enterprise sağda.
const webRow = [...skillCategories[0]!.skills, ...skillCategories[2]!.skills];
const enterpriseRow = [...skillCategories[1]!.skills, ...skillCategories[3]!.skills];

function SkillPill({ name, icon: Icon }: Skill) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-2 text-sm text-zinc-700 transition hover:border-emerald-500/40 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-white">
      <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      {name}
    </span>
  );
}

function MarqueeRow({ skills, direction }: { skills: Skill[]; direction: "left" | "right" }) {
  // İçerik iki kez tekrarlanır ki %50 kaydırmada döngü kesintisiz görünsün.
  const doubled = [...skills, ...skills];
  const animation =
    direction === "left"
      ? "motion-safe:animate-[marquee-left_26s_linear_infinite]"
      : "motion-safe:animate-[marquee-right_26s_linear_infinite]";

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max gap-3 ${animation} group-hover:[animation-play-state:paused]`}>
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} {...skill} />
        ))}
      </div>
    </div>
  );
}

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

        {/* Hareket tercih edilmiyorsa: kayan şerit yerine sabit, kategorili ızgara */}
        <div className="motion-safe:hidden mt-8 grid gap-8 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.key}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {dict.categories[category.key]}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillPill key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Kayan logo şeridi: iki sıra ters yönde, üzerine gelince duraklar */}
        <div className="hidden motion-safe:block mt-8 space-y-4">
          <MarqueeRow skills={webRow} direction="left" />
          <MarqueeRow skills={enterpriseRow} direction="right" />
        </div>
      </div>
    </section>
  );
}
