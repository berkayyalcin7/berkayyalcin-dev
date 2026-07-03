"use client";

import { useState, type ReactNode } from "react";
import { HiCheckCircle, HiClipboard, HiClipboardDocumentCheck, HiXCircle } from "react-icons/hi2";
import {
  formatIBAN,
  formatTRPhone,
  formatTRY,
  isValidPlate,
  isValidTCKN,
  isValidTRIban,
  isValidTRPhone,
  maskIBAN,
  maskPhone,
  maskTCKN,
  numberToOrdinalTR,
  numberToWordsTR,
  slugifyTR,
  splitKDV,
  toLowerTR,
  toUpperTR,
} from "trkit";
import { getCityByPlate } from "trkit/data";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500";

function ValidBadge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <HiCheckCircle className="h-3.5 w-3.5" /> Geçerli
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
      <HiXCircle className="h-3.5 w-3.5" /> Geçersiz
    </span>
  );
}

function ResultRow({ label, value }: { label: string; value: string | null }) {
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

function DemoCard({
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
        <code className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
          {fn}
        </code>
      </div>
      {children}
    </div>
  );
}

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText("npm install trkit");
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
      aria-label="npm install trkit komutunu kopyala"
    >
      <span className="select-none text-emerald-500">$</span>
      npm install trkit
      {copied ? (
        <HiClipboardDocumentCheck className="h-4 w-4 text-emerald-500" />
      ) : (
        <HiClipboard className="h-4 w-4 text-zinc-400 transition group-hover:text-emerald-500" />
      )}
    </button>
  );
}

// Tüm örnek değerler sentetiktir; gerçek kişi verisi değildir
export default function TrkitPlayground() {
  const [tckn, setTckn] = useState("10000000146");
  const [phone, setPhone] = useState("5321234567");
  const [iban, setIban] = useState("TR200000000000000000000001");
  const [amount, setAmount] = useState("1250.75");
  const [text, setText] = useState("İstanbul Boğazı'nda yürüyüş");
  const [num, setNum] = useState("2026");
  const [kdvAmount, setKdvAmount] = useState("1000");
  const [kdvRate, setKdvRate] = useState("20");
  const [plate, setPlate] = useState("34 ABC 123");
  const [plateCode, setPlateCode] = useState("59");

  const amountNum = Number(amount);
  const numInt = Number(num);
  const kdv = splitKDV(Number(kdvAmount), Number(kdvRate));
  const city = getCityByPlate(Number(plateCode));

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <DemoCard title="TC Kimlik No Doğrulama" fn="isValidTCKN">
        <input
          value={tckn}
          onChange={(e) => setTckn(e.target.value)}
          className={inputClass}
          maxLength={11}
          placeholder="11 haneli TCKN"
        />
        <div className="mt-3 flex items-center justify-between">
          <ValidBadge ok={isValidTCKN(tckn)} />
        </div>
        <div className="mt-3">
          <ResultRow label="KVKK maskesi" value={maskTCKN(tckn)} />
        </div>
      </DemoCard>

      <DemoCard title="Telefon Numarası" fn="formatTRPhone">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="5321234567, +9053..., 0212..."
        />
        <div className="mt-3">
          <ValidBadge ok={isValidTRPhone(phone)} />
        </div>
        <div className="mt-3">
          <ResultRow label="Ulusal" value={formatTRPhone(phone)} />
          <ResultRow label="Uluslararası" value={formatTRPhone(phone, "international")} />
          <ResultRow label="KVKK maskesi" value={maskPhone(phone)} />
        </div>
      </DemoCard>

      <DemoCard title="IBAN Doğrulama" fn="isValidTRIban">
        <input
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          className={inputClass}
          maxLength={26}
          placeholder="TR ile başlayan 26 karakter"
        />
        <div className="mt-3">
          <ValidBadge ok={isValidTRIban(iban)} />
        </div>
        <div className="mt-3">
          <ResultRow label="Gruplu" value={formatIBAN(iban)} />
          <ResultRow label="KVKK maskesi" value={maskIBAN(iban)} />
        </div>
      </DemoCard>

      <DemoCard title="Para Formatı (TRY)" fn="formatTRY">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
          inputMode="decimal"
          placeholder="1250.75"
        />
        <div className="mt-3">
          <ResultRow label="Biçimli" value={formatTRY(amountNum)} />
          <ResultRow label="Yazıyla" value={numberToWordsTR(amountNum, { currency: true })} />
        </div>
      </DemoCard>

      <DemoCard title="Türkçe Metin İşlemleri" fn="slugifyTR">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={inputClass}
          placeholder="Türkçe karakterli bir metin"
        />
        <div className="mt-3">
          <ResultRow label="Slug" value={slugifyTR(text)} />
          <ResultRow label="toUpperTR" value={toUpperTR(text)} />
          <ResultRow label="toLowerTR" value={toLowerTR(text)} />
        </div>
      </DemoCard>

      <DemoCard title="Sayıyı Yazıya Çevir" fn="numberToWordsTR">
        <input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className={inputClass}
          inputMode="numeric"
          placeholder="2026"
        />
        <div className="mt-3">
          <ResultRow label="Yazıyla" value={numberToWordsTR(numInt)} />
          <ResultRow label="Sıra sayısı" value={numberToOrdinalTR(numInt)} />
        </div>
      </DemoCard>

      <DemoCard title="KDV Hesaplama" fn="splitKDV">
        <div className="flex gap-3">
          <input
            value={kdvAmount}
            onChange={(e) => setKdvAmount(e.target.value)}
            className={inputClass}
            inputMode="decimal"
            placeholder="Brüt tutar"
            aria-label="KDV dahil brüt tutar"
          />
          <input
            value={kdvRate}
            onChange={(e) => setKdvRate(e.target.value)}
            className={`${inputClass} max-w-24`}
            inputMode="numeric"
            placeholder="%"
            aria-label="KDV oranı (yüzde)"
          />
        </div>
        <div className="mt-3">
          <ResultRow label="Net" value={kdv ? formatTRY(kdv.net) : null} />
          <ResultRow label="KDV" value={kdv ? formatTRY(kdv.kdv) : null} />
          <ResultRow label="Brüt" value={kdv ? formatTRY(kdv.gross) : null} />
        </div>
      </DemoCard>

      <DemoCard title="Plaka & İl Bilgisi" fn="getCityByPlate">
        <div className="flex gap-3">
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className={inputClass}
            placeholder="34 ABC 123"
            aria-label="Araç plakası"
          />
          <input
            value={plateCode}
            onChange={(e) => setPlateCode(e.target.value)}
            className={`${inputClass} max-w-24`}
            inputMode="numeric"
            placeholder="İl kodu"
            aria-label="İl plaka kodu"
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <ValidBadge ok={isValidPlate(plate)} />
        </div>
        <div className="mt-3">
          <ResultRow label="İl" value={city ? city.name : null} />
          <ResultRow label="Bölge" value={city ? city.region : null} />
        </div>
      </DemoCard>
    </div>
  );
}
