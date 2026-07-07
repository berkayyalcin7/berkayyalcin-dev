import { getProjects, localizeProjects, type Project } from "@/lib/projects";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight, HiCodeBracket } from "react-icons/hi2";
import type { Dictionary } from "@/lib/i18n";
import { fill } from "@/lib/locale-link";

type ProjectsDict = Dictionary["projects"];

// Supabase'de proje yokken gösterilen örnek içerik; açıklamalar sözlükten gelir
function fallbackProjects(dict: ProjectsDict): Pick<
  Project,
  "id" | "title" | "description" | "github_url" | "live_url" | "technologies"
>[] {
  return [
    {
      id: "mock-1",
      title: "E-Commerce Microservices",
      description: dict.fallback.microservices,
      github_url: "https://github.com/berkayyalcin7",
      live_url: null,
      technologies: [".NET 8", "RabbitMQ", "Docker", "PostgreSQL", "Redis"],
    },
    {
      id: "mock-2",
      title: "Personal Portfolio & Blog",
      description: dict.fallback.portfolio,
      github_url: "https://github.com/berkayyalcin7",
      live_url: "https://berkayyalcin.dev",
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript"],
    },
    {
      id: "mock-3",
      title: "Real-time Chat Engine",
      description: dict.fallback.chat,
      github_url: "https://github.com/berkayyalcin7",
      live_url: null,
      technologies: ["Go", "WebSockets", "Redis", "Docker"],
    },
  ];
}

type ProjectItem = ReturnType<typeof fallbackProjects>[number];

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  dict: ProjectsDict;
};

function ProjectLinks({ project, dict }: { project: ProjectItem; dict: ProjectsDict }) {
  return (
    <div className="flex items-center gap-3 pt-1.5">
      {project.github_url && (
        <Link
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          aria-label={fill(dict.githubAria, { title: project.title })}
        >
          <FaGithub className="h-5 w-5" />
        </Link>
      )}
      {project.live_url && (
        <Link
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
          aria-label={fill(dict.liveAria, { title: project.title })}
        >
          <HiArrowUpRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}

// Asimetrik grid'in "kahraman" kartı: iki kolon kaplar, sağında dekoratif panel taşır.
function FeaturedProjectCard({ project, index, dict }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] sm:col-span-2 lg:col-span-2 lg:row-span-2">
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="grid h-full sm:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors duration-300 group-hover:border-emerald-400/40">
                <HiCodeBracket className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-semibold leading-snug text-zinc-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                {project.title}
              </h3>
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <ProjectLinks project={project} dict={dict} />
            </div>
          </div>
        </div>

        {/* Dekoratif panel: devasa sıra numarası + gradient — asimetriye görsel ağırlık katar */}
        <div className="relative hidden items-center justify-center overflow-hidden border-l border-zinc-200/60 bg-gradient-to-br from-emerald-500/[0.06] to-blue-500/[0.06] sm:flex dark:border-white/5 dark:from-emerald-500/10 dark:to-blue-500/10">
          <span
            aria-hidden
            className="select-none font-mono text-[9rem] font-bold leading-none text-zinc-900/[0.04] transition-colors duration-300 group-hover:text-emerald-500/[0.12] dark:text-white/[0.05]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, dict }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-150/60 dark:border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5">
      {/* Hover'da beliren ışıma */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 dark:to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Üst kenarda incecik vurgu çizgisi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Arka planda büyük sıra numarası */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-bold text-zinc-900/[0.03] dark:text-white/[0.03] transition-colors duration-300 group-hover:text-emerald-500/[0.06]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors duration-300 group-hover:border-emerald-400/40">
              <HiCodeBracket className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold leading-snug text-zinc-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
              {project.title}
            </h3>
          </div>
          <ProjectLinks project={project} dict={dict} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/10"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Projects({ lang, dict }: { lang: string; dict: ProjectsDict }) {
  const projects = localizeProjects(await getProjects(), lang);
  const hasProjects = projects.length > 0;
  const visibleProjects = hasProjects ? projects : fallbackProjects(dict);

  return (
    <section id="projeler" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {dict.heading}
        </h2>

        <p className="mt-4 max-w-xl text-2xl font-medium text-zinc-900 dark:text-white">
          {dict.subtitle}
        </p>
        <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
          {hasProjects ? dict.descriptionHasProjects : dict.descriptionFallback}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) =>
            index === 0 ? (
              <FeaturedProjectCard key={project.id} project={project} index={index} dict={dict} />
            ) : (
              <ProjectCard key={project.id} project={project} index={index} dict={dict} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
