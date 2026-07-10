"use client";

import { useState, type ReactNode } from "react";
import { HiClipboard, HiClipboardDocumentCheck } from "react-icons/hi2";

export const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500";

export function ResultRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-zinc-200/60 py-2 text-sm first:border-t-0 dark:border-white/5">
      <span className="shrink-0 text-zinc-500 dark:text-zinc-400">{label}</span>
      {value === null ? (
        <span className="text-zinc-400 dark:text-zinc-600">—</span>
      ) : (
        <code className="break-all text-right font-mono text-[13px] text-zinc-900 dark:text-emerald-300/90">
          {value}
        </code>
      )}
    </div>
  );
}

export function DemoCard({
  title,
  fn,
  children,
}: {
  title: string;
  fn: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-100/50 p-5 backdrop-blur-sm transition-colors dark:border-white/5 dark:bg-white/[0.01]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <code className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
          {fn}
        </code>
      </div>
      {children}
    </div>
  );
}

/** Kopyalanacak komut `command` prop'undan gelir; tool'dan bağımsız kullanılabilir. */
export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano erişimi yoksa sessizce geç
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-100/60 px-4 py-2.5 font-mono text-sm text-zinc-800 transition hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200"
      aria-label={`${command} komutunu kopyala`}
    >
      <span className="select-none text-emerald-700 dark:text-emerald-400">$</span>
      {command}
      {copied ? (
        <HiClipboardDocumentCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <HiClipboard className="h-4 w-4 text-zinc-400 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
      )}
    </button>
  );
}
