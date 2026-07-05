import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  sort_order: number;
  created_at: string;
  // İngilizce çeviri kolonları; null/undefined ise TR metin gösterilir.
  title_en?: string | null;
  description_en?: string | null;
};

/** EN görünümünde çevirisi olan alanları İngilizce'ye çevirir; çeviri yoksa TR kalır. */
export function localizeProjects(projects: Project[], lang: string): Project[] {
  if (lang !== "en") return projects;
  return projects.map((project) => ({
    ...project,
    title: project.title_en ?? project.title,
    description: project.description_en ?? project.description,
  }));
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return data as Project[];
}
