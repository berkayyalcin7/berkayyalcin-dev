export default function BlogTeaser() {
  return (
    <section id="blog" className="scroll-mt-24 border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Blog
        </h2>
        <p className="mt-4 max-w-xl text-2xl font-medium text-white">
          Yazılar çok yakında burada olacak.
        </p>
        <p className="mt-3 max-w-xl text-base text-zinc-400">
          Blog yazıları Supabase veritabanı bağlandıktan sonra bu alanda
          otomatik olarak listelenecek.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
            >
              <div className="h-3 w-2/3 rounded bg-white/10" />
              <div className="mt-3 h-2 w-full rounded bg-white/5" />
              <div className="mt-2 h-2 w-4/5 rounded bg-white/5" />
              <span className="mt-6 inline-block text-xs font-medium text-zinc-400">
                Yakında
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
