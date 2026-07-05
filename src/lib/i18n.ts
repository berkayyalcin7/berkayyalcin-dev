// Yalnızca Server Component'lardan kullanılmalı; sözlükler client bundle'ına girmemeli.
import type tr from "@/dictionaries/tr.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export type Dictionary = typeof tr;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
};

export function hasLocale(lang: string): lang is Locale {
  return (locales as readonly string[]).includes(lang);
}

export const getDictionary = (locale: Locale) => dictionaries[locale]();

/** Header client bileşeninin ihtiyaç duyduğu sözlük dilimini üretir. */
export function buildHeaderDict(dict: Dictionary) {
  return {
    nav: dict.nav,
    contactCta: dict.header.contactCta,
    openMenu: dict.header.openMenu,
    closeMenu: dict.header.closeMenu,
    themeToggle: dict.header.themeToggle,
    switchLocale: dict.header.switchLocale,
    contactModal: dict.contactModal,
  };
}
