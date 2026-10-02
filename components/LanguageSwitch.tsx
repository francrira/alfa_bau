"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localizedHref } from "@/lib/i18n";
import { useTranslation } from "./LanguageProvider";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const { locale, t } = useTranslation();
  const [suffix, setSuffix] = useState("");
  useEffect(() => { setSuffix(window.location.search + window.location.hash); }, [pathname]);
  return <nav className="language-switch" aria-label={t("Sprache wählen")}>{(["de", "en"] as const).map(language =>
    <a key={language} href={localizedHref(language, pathname) + suffix} hrefLang={language} lang={language}
      aria-label={language === "en" ? "Switch to English" : "Auf Deutsch wechseln"}
      aria-current={locale === language ? "true" : undefined}
      onClick={event => {
        event.currentTarget.href = localizedHref(language, pathname) + window.location.search + window.location.hash;
      }}>{language.toUpperCase()}</a>
  )}</nav>;
}
