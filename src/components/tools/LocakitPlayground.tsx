"use client";

import { useState } from "react";
import {
  HiCheckCircle,
  HiClipboard,
  HiClipboardDocumentCheck,
  HiExclamationTriangle,
  HiXCircle,
} from "react-icons/hi2";

// locakit'in çekirdek doğrulama mantığının tarayıcıya taşınmış hali.
// Paket CLI'ı node:fs kullandığı için demo bu saf kopyayla çalışır;
// locakit "core" subpath export'u yayınlandığında doğrudan paketten import edilecek.

type FlatRecord = Record<string, string>;

function flatten(obj: unknown, prefix = ""): FlatRecord {
  const out: FlatRecord = {};
  if (typeof obj === "string") {
    if (prefix) out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) =>
      Object.assign(out, flatten(item, prefix ? `${prefix}.${i}` : String(i)))
    );
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      Object.assign(out, flatten(v, prefix ? `${prefix}.${k}` : k));
    }
  }
  return out;
}

function extractPlaceholders(text: string): string[] {
  const found: string[] = [];
  const patterns = [
    /\{\{\s*[\w.-]+\s*\}\}/g,
    /(?<!\{)\{\s*[\w.-]+\s*\}(?!\})/g,
    /%[sdif]/g,
    /\$t\([^)]*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      found.push(match[0].replace(/\s+/g, ""));
    }
  }
  return found.sort();
}

const TR_SUFFIX_AFTER_PLACEHOLDER = /(\{\{?\s*[\w.-]+\s*\}?\}|%[sdif])['’][a-zçğıiöşü]+/giu;
const TR_SUSPICIOUS_UPPER_I = /\b(?:IPTAL|GIRIS|GIRIŞ|ILERI|IZIN|INDIR|ILETISIM|ISLEM|IMZA)\b/gu;

type Issue = {
  key: string;
  level: "error" | "warning";
  rule: string;
  message: string;
};

function analyze(sourceFlat: FlatRecord, targetFlat: FlatRecord): Issue[] {
  const issues: Issue[] = [];

  for (const [key, sourceValue] of Object.entries(sourceFlat)) {
    const value = targetFlat[key];

    if (value === undefined) {
      issues.push({ key, level: "error", rule: "missing-key", message: "Çeviri eksik." });
      continue;
    }
    if (value.trim() === "") {
      issues.push({ key, level: "error", rule: "empty-value", message: "Çeviri boş." });
      continue;
    }

    const src = extractPlaceholders(sourceValue);
    const dst = extractPlaceholders(value);
    const missing = src.filter((p) => !dst.includes(p));
    const extra = dst.filter((p) => !src.includes(p));
    if (missing.length || extra.length) {
      const parts: string[] = [];
      if (missing.length) parts.push(`eksik: ${missing.join(", ")}`);
      if (extra.length) parts.push(`fazla: ${extra.join(", ")}`);
      issues.push({
        key,
        level: "error",
        rule: "placeholder-mismatch",
        message: `Yer tutucular uyuşmuyor (${parts.join("; ")}).`,
      });
    }

    const suffix = value.match(TR_SUFFIX_AFTER_PLACEHOLDER);
    if (suffix) {
      issues.push({
        key,
        level: "warning",
        rule: "tr/suffix-after-placeholder",
        message: `Yer tutucudan sonra kesme işaretli ek (${suffix.join(", ")}) — ek, çalışma zamanındaki değerle uyuşmayabilir.`,
      });
    }
    const upperI = value.match(TR_SUSPICIOUS_UPPER_I);
    if (upperI) {
      issues.push({
        key,
        level: "warning",
        rule: "tr/dotless-uppercase-i",
        message: `Şüpheli büyük "I": ${upperI.join(", ")} — Türkçe'de "i" büyürken "İ" olur.`,
      });
    }
  }

  for (const key of Object.keys(targetFlat)) {
    if (!(key in sourceFlat)) {
      issues.push({
        key,
        level: "warning",
        rule: "orphan-key",
        message: "Kaynakta karşılığı olmayan artık key.",
      });
    }
  }

  return issues;
}

const EXAMPLE_SOURCE = `{
  "nav": { "home": "Home", "tools": "Tools" },
  "auth": {
    "welcome": "Welcome back, {name}!",
    "cancel": "Cancel"
  },
  "cart": "You have {count} items"
}`;

const EXAMPLE_TARGET = `{
  "nav": { "home": "Ana Sayfa" },
  "auth": {
    "welcome": "Tekrar hoş geldin {isim}!",
    "cancel": "IPTAL"
  },
  "cart": "{count}'ta ürününüz var",
  "old": { "promo": "Kampanya bitti" }
}`;

const textareaClass =
  "h-56 w-full resize-y rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 font-mono text-xs leading-relaxed text-zinc-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white";

function IssueRow({ issue }: { issue: Issue }) {
  const isError = issue.level === "error";
  return (
    <div className="flex items-start gap-2.5 border-t border-zinc-200/60 py-2.5 text-sm first:border-t-0 dark:border-white/5">
      {isError ? (
        <HiXCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
      ) : (
        <HiExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-[13px] font-semibold text-zinc-900 dark:text-white">
            {issue.key}
          </code>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${
              isError
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {issue.rule}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {issue.message}
        </p>
      </div>
    </div>
  );
}

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText("npm install -D locakit");
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
      aria-label="npm install -D locakit komutunu kopyala"
    >
      <span className="select-none text-emerald-500">$</span>
      npm install -D locakit
      {copied ? (
        <HiClipboardDocumentCheck className="h-4 w-4 text-emerald-500" />
      ) : (
        <HiClipboard className="h-4 w-4 text-zinc-400 transition group-hover:text-emerald-500" />
      )}
    </button>
  );
}

export default function LocakitPlayground() {
  const [source, setSource] = useState(EXAMPLE_SOURCE);
  const [target, setTarget] = useState(EXAMPLE_TARGET);
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  function run() {
    try {
      const sourceFlat = flatten(JSON.parse(source));
      const targetFlat = flatten(JSON.parse(target));
      setIssues(analyze(sourceFlat, targetFlat));
      setParseError(null);
    } catch (error) {
      setIssues(null);
      setParseError(
        `JSON ayrıştırılamadı: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  const errors = issues?.filter((i) => i.level === "error") ?? [];
  const warnings = issues?.filter((i) => i.level === "warning") ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="locakit-source"
            className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-white"
          >
            Kaynak dil <code className="font-mono text-xs text-zinc-500">en.json</code>
          </label>
          <textarea
            id="locakit-source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            className={textareaClass}
          />
        </div>
        <div>
          <label
            htmlFor="locakit-target"
            className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-white"
          >
            Hedef dil <code className="font-mono text-xs text-zinc-500">tr.json</code>
          </label>
          <textarea
            id="locakit-target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            spellCheck={false}
            className={textareaClass}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={run}
          className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
        >
          locakit check
        </button>
        {issues !== null && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-rose-500">{errors.length} hata</span>
            {", "}
            <span className="font-semibold text-amber-500">{warnings.length} uyarı</span>
          </span>
        )}
      </div>

      {parseError && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
          {parseError}
        </div>
      )}

      {issues !== null && !parseError && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-100/50 p-5 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.01]">
          {issues.length === 0 ? (
            <p className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <HiCheckCircle className="h-5 w-5" />
              Tüm çeviriler tam ve tutarlı — CI yeşil.
            </p>
          ) : (
            issues.map((issue, i) => <IssueRow key={`${issue.key}-${issue.rule}-${i}`} issue={issue} />)
          )}
        </div>
      )}

      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
        Bu demo, locakit&apos;in <code className="font-mono">check</code> komutundaki doğrulama
        mantığını tarayıcınızda çalıştırır: eksik/artık key tespiti, yer tutucu paritesi ve
        Türkçe dil paketi kuralları. Gerçek pakette bunlara ek olarak lockfile tabanlı bayatlama
        takibi (<code className="font-mono">diff</code>), güvenli yazma (
        <code className="font-mono">apply</code>) ve CI çıkış kodları bulunur. Girdiğiniz veriler
        tarayıcınızdan çıkmaz.
      </p>
    </div>
  );
}
