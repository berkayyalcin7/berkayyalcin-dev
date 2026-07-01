import { getProjects } from "@/lib/projects";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projeler" className="scroll-mt-24 border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Projeler
        </h2>

        {projects.length === 0 ? (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-white">
              Geliştirdiğim Yazılımlar & Çalışmalar
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-400">
              Buradaki projeler zamanla güncellenecek olup paylaşılanlar örnek olarak yer almaktadır.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "mock-1",
                  title: "E-Commerce Microservices",
                  description: "CQRS ve Event-Driven Design mimarileri kullanılarak .NET 8 ile geliştirilmiş ölçeklenebilir e-ticaret mikroservis yapısı.",
                  github_url: "https://github.com/berkayyalcin7",
                  live_url: null,
                  technologies: [".NET 8", "RabbitMQ", "Docker", "PostgreSQL", "Redis"],
                },
                {
                  id: "mock-2",
                  title: "Personal Portfolio & Blog",
                  description: "Ziyaretçi sayaçları, dinamik içerik yönetimi ve modern karanlık tema estetiğine sahip Next.js portfolyo projesi.",
                  github_url: "https://github.com/berkayyalcin7",
                  live_url: "https://berkayyalcin.dev",
                  technologies: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript"],
                },
                {
                  id: "mock-3",
                  title: "Real-time Chat Engine",
                  description: "WebSocket protokolü üzerinden anlık mesajlaşma ve oda sistemini destekleyen yüksek performanslı Go backend motoru.",
                  github_url: "https://github.com/berkayyalcin7",
                  live_url: null,
                  technologies: ["Go", "WebSockets", "Redis", "Docker"],
                }
              ].map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5"
                >
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold leading-snug text-white transition group-hover:text-emerald-400">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <Link
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub Adresi`}
                          >
                            <FaGithub className="h-5 w-5" />
                          </Link>
                        )}
                        {project.live_url && (
                          <Link
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-emerald-400 transition-colors"
                            aria-label={`${project.title} Canlı Demo`}
                          >
                            <HiArrowUpRight className="h-5 w-5" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 max-w-xl text-2xl font-medium text-white">
              Geliştirdiğim Yazılımlar & Çalışmalar
            </p>
            <p className="mt-3 max-w-xl text-base text-zinc-400">
              Açık kaynaklı projelerim, kişisel araçlarım ve geliştirdiğim kurumsal uygulamalar.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5"
                >
                  {/* Decorative glowing gradient border/effect on hover */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold leading-snug text-white transition group-hover:text-emerald-400">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <Link
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub Adresi`}
                          >
                            <FaGithub className="h-5 w-5" />
                          </Link>
                        )}
                        {project.live_url && (
                          <Link
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-emerald-400 transition-colors"
                            aria-label={`${project.title} Canlı Demo`}
                          >
                            <HiArrowUpRight className="h-5 w-5" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
