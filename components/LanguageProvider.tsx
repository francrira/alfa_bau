"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { localizedHref, translate } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const LanguageContext = createContext<Locale>("de");
export default function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>;
}
export function useTranslation() {
  const locale = useContext(LanguageContext);
  return { locale, t: (text: string) => translate(locale, text), localizeHref: (path: string) => localizedHref(locale, path) };
}
