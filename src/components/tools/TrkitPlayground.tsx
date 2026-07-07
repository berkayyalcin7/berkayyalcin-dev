"use client";

import { useState } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { DemoCard, inputClass, ResultRow } from "@/components/tools/shared";
import {
  addWorkingDaysTR,
  formatIBAN,
  formatTRPhone,
  formatTRY,
  getHolidaysTR,
  isValidPlate,
  isValidTCKN,
  isValidTRIban,
  isValidTRPhone,
  isWorkingDayTR,
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
  const [workDate, setWorkDate] = useState("2026-10-29");
  const [workDays, setWorkDays] = useState("5");

  const amountNum = Number(amount);
  const numInt = Number(num);
  const kdv = splitKDV(Number(kdvAmount), Number(kdvRate));
  const city = getCityByPlate(Number(plateCode));
  const working = isWorkingDayTR(workDate);
  const holidayNames = (getHolidaysTR(Number(workDate.slice(0, 4))) ?? [])
    .filter((h) => h.date === workDate)
    .map((h) => h.name)
    .join(", ");

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

      <DemoCard title="Resmî Tatil & İş Günü" fn="isWorkingDayTR">
        <div className="flex gap-3">
          <input
            type="date"
            value={workDate}
            onChange={(e) => setWorkDate(e.target.value)}
            className={inputClass}
            min="2020-01-01"
            max="2030-12-31"
            aria-label="Tarih (2020-2030)"
          />
          <input
            value={workDays}
            onChange={(e) => setWorkDays(e.target.value)}
            className={`${inputClass} max-w-24`}
            inputMode="numeric"
            placeholder="+gün"
            aria-label="Eklenecek iş günü sayısı"
          />
        </div>
        <div className="mt-3">
          <ResultRow
            label="Durum"
            value={working === null ? null : working ? "İş günü" : "Tatil / hafta sonu"}
          />
          <ResultRow label="Tatil adı" value={holidayNames === "" ? null : holidayNames} />
          <ResultRow
            label={`+${workDays || "?"} iş günü`}
            value={addWorkingDaysTR(workDate, Number(workDays))}
          />
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
