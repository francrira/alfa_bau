"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
export default function NotFound() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container not-found"><p className="eyebrow">{t("404 · Hier geht es nicht weiter")}</p><h1>{t("Seite nicht gefunden.")}</h1><p>{t("Entdecken Sie unsere Leistungen oder sprechen Sie direkt mit uns.")}</p><div className="actions"><Link className="button" href={localizeHref("/")}>{t("Zur Startseite")}</Link><Link className="button button-outline" href={localizeHref("/kontakt")}>{t("Kontakt")}</Link></div></section>;
}
