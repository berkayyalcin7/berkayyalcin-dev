"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { HiEye } from "react-icons/hi2";

type ViewCounterProps = {
  slug: string;
  initialViews: number;
};

export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState<number>(initialViews);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const storageKey = `post-view:${slug}`;
    const cooldownPeriod = 2 * 60 * 60 * 1000; // 2 hours

    const incrementAndFetchViews = async () => {
      try {
        const lastViewed = localStorage.getItem(storageKey);
        const shouldIncrement = !lastViewed || (Date.now() - Number(lastViewed) > cooldownPeriod);

        if (shouldIncrement) {
          // 1. Call RPC to increment views
          const { error: rpcError } = await supabase.rpc("increment_post_views", {
            post_slug: slug,
          });

          if (rpcError) {
            // If RPC is not created yet or fails, we fail silently and log it
            console.warn("RPC increment_post_views failed, it might not be created in Supabase yet:", rpcError.message);
          } else {
            // Set timestamp only if increment was successful
            localStorage.setItem(storageKey, Date.now().toString());
          }
        }

        // 2. Fetch the latest view count
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("views")
          .eq("slug", slug)
          .single();

        if (!fetchError && data) {
          setViews(data.views);
          setHasIncremented(true);
        }
      } catch (err) {
        console.error("Error updating/fetching views:", err);
      }
    };

    incrementAndFetchViews();
  }, [slug]);

  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 select-none">
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse transition-colors duration-300 ${hasIncremented ? 'bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
      <HiEye className={`h-4 w-4 transition-colors duration-300 ${hasIncremented ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
      <span className={`transition-all duration-500 ease-out ${hasIncremented ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-500 dark:text-zinc-400'}`}>
        {views} okunma
      </span>
    </div>
  );
}
