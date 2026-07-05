import ContactButton, { type ContactModalDict } from "@/components/ContactButton";
import type { Dictionary } from "@/lib/i18n";

type ContactProps = {
  dict: Dictionary["contact"];
  modalDict: ContactModalDict;
};

export default function Contact({ dict, modalDict }: ContactProps) {
  return (
    <section id="iletisim" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {dict.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-2xl font-medium text-zinc-900 dark:text-white sm:text-3xl">
          {dict.title}
        </p>
        <ContactButton
          dict={modalDict}
          className="mt-8 inline-block rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          {dict.cta}
        </ContactButton>
      </div>
    </section>
  );
}
