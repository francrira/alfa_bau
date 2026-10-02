"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import MediaPlaceholder from "./MediaPlaceholder";

export default function Hero() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="hero"><div className="container hero-layout">
    <div className="hero-copy"><p className="eyebrow">{t("Fachkräfte für Hamburg & Norddeutschland")}</p><h1>{t("Tiefbau.")}<br /><span>{t("Mit Fachkräften,")}</span><br />{t("die anpacken.")}</h1><p>{t("Wir stellen Fachkräfte und Maschinenführer für Ihre Tiefbauprojekte. Passend zu Ihrem Vorhaben. Gemeinsam im Einsatz.")}</p><div className="actions"><Link className="button" href={localizeHref(inquiryHref("personal"))}>{t("Fachkräfte anfragen")}</Link><Link className="button button-outline" href={localizeHref("/einsatzteams")}>{t("Kolonnen & Teams")}</Link></div></div>
    <MediaPlaceholder label={t("Tiefbau · Menschen im Einsatz")} className="hero-media" priority />
  </div></section>;
}
