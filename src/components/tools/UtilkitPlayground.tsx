"use client";

import { useState } from "react";
import { HiXCircle } from "react-icons/hi2";
import { base64Decode, base64Encode, byteLength, safeJsonParse, stringLength } from "@berkayyalcin/utilkit";
import { DemoCard, inputClass, ResultRow } from "@/components/tools/shared";
import type { Dictionary } from "@/lib/i18n";

type UtilkitPlaygroundProps = {
  dict: Dictionary["utilkitPlayground"];
};

export default function UtilkitPlayground({ dict }: UtilkitPlaygroundProps) {
  const [encodeInput, setEncodeInput] = useState("Türkçe metin 🎉");
  const [decodeInput, setDecodeInput] = useState(() => base64Encode("Türkçe metin 🎉"));
  const [lengthInput, setLengthInput] = useState("Merhaba 👨‍👩‍👧‍👦 dünya");
  const [jsonInput, setJsonInput] = useState('{"hello": "world"}');

  const decoded = base64Decode(decodeInput);
  const parsedJson = safeJsonParse(jsonInput);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <DemoCard title={dict.base64.title} fn="base64Encode / base64Decode">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {dict.base64.encodeLabel}
        </label>
        <input
          value={encodeInput}
          onChange={(e) => setEncodeInput(e.target.value)}
          className={`${inputClass} mt-1`}
        />
        <div className="mt-2">
          <ResultRow label={dict.base64.encodeResult} value={base64Encode(encodeInput)} />
        </div>

        <label className="mt-4 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {dict.base64.decodeLabel}
        </label>
        <input
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          className={`${inputClass} mt-1`}
        />
        <div className="mt-2">
          <ResultRow
            label={dict.base64.decodeResult}
            value={decoded ?? dict.base64.invalidBase64}
          />
        </div>
      </DemoCard>

      <DemoCard title={dict.length.title} fn="stringLength / byteLength">
        <input
          value={lengthInput}
          onChange={(e) => setLengthInput(e.target.value)}
          className={inputClass}
          placeholder={dict.length.placeholder}
        />
        <div className="mt-3">
          <ResultRow label={dict.length.charLength} value={String(stringLength(lengthInput))} />
          <ResultRow label={dict.length.byteLength} value={String(byteLength(lengthInput))} />
          <ResultRow label={dict.length.nativeLength} value={String(lengthInput.length)} />
        </div>
      </DemoCard>

      <DemoCard title={dict.json.title} fn="safeJsonParse">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className={`${inputClass} min-h-24 font-mono text-xs`}
          placeholder={dict.json.placeholder}
        />
        <div className="mt-3">
          {parsedJson === null ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
              <HiXCircle className="h-3.5 w-3.5" /> {dict.json.invalidResult}
            </span>
          ) : (
            <ResultRow label={dict.json.validResult} value={JSON.stringify(parsedJson)} />
          )}
        </div>
      </DemoCard>
    </div>
  );
}
