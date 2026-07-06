import { getPublishedPostsCount } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { SKILLS_COUNT } from "@/components/Skills";
import StatsGrid, { type StatItem } from "@/components/StatsGrid";
import type { Dictionary } from "@/lib/i18n";

// Profesyonel deneyim ilk iş (Doğruyer Reklam Bilişim, bkz. dict.timeline) ile başlar.
const CAREER_START_YEAR = 2018;

export default async function Stats({ dict }: { dict: Dictionary["stats"] }) {
  const postCount = await getPublishedPostsCount();
  const yearsExperience = new Date().getFullYear() - CAREER_START_YEAR;

  const items: StatItem[] = [
    { value: yearsExperience, suffix: "+", label: dict.years },
    { value: tools.length, suffix: "+", label: dict.packages },
    { value: postCount, suffix: "+", label: dict.posts },
    { value: SKILLS_COUNT, suffix: "+", label: dict.technologies },
  ];

  return (
    <section className="border-t border-zinc-200 px-6 py-12 dark:border-white/10">
      <div className="mx-auto max-w-5xl">
        <StatsGrid items={items} />
      </div>
    </section>
  );
}
