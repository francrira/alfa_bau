"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import MediaPlaceholder from "./MediaPlaceholder";
import { photos } from "@/lib/photos";
import Icon from "./Icon";

export default function Hero() {
  const { t, localizeHref } = useTranslation();
  return <section className="hero"><div className="container hero-layout">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" aria-hidden="true" />{t("Fachkräfte für Hamburg & Norddeutschland")}</p>
      <h1>{t("Gemeinsam bauen.")}<br /><span>{t("Mit Menschen,")}</span><br />{t("die anpacken.")}</h1>
      <p>{t("Fachkräfte, Maschinenführer und eingespielte Kolonnen für Ihre Baustelle. Wir stimmen die passende Unterstützung mit Ihnen ab – vom ersten Gespräch bis zum Einsatz.")}</p>
      <div className="actions"><Link className="button" href={localizeHref(inquiryHref("personal"))}>{t("Fachkräfte anfragen")}<Icon name="arrow" /></Link><Link className="button button-outline" href={localizeHref("/leistungen")}>{t("Leistungen entdecken")}</Link></div>
      <div className="hero-footnote"><Icon name="pin" /><span>{t("In Hamburg zu Hause. Gemeinsam vor Ort.")}</span></div>
    </div>
    <div className="hero-visual">
      <span className="hero-orbit" aria-hidden="true" />
      <MediaPlaceholder label={t("Wege & Pflasterflächen")} className="hero-media" photo={photos.path} priority sizes="(max-width: 900px) 100vw, 46vw" />
      <div className="hero-photo-note"><span className="hero-note-icon"><Icon name="team" /></span><div><strong>{t("Menschen. Maschinen. Teamwork.")}</strong><span>{t("Einblicke in den Baustellenalltag")}</span></div></div>
      <span className="hero-photo-tag">{t("Wege & Pflasterflächen")}</span>
    </div>
  </div><div className="container hero-disciplines" aria-label={t("Unsere Arbeitsbereiche")}><span>{t("Tiefbau")}</span><span>{t("Kanal- & Leitungsbau")}</span><span>{t("Pflasterbau")}</span><span>{t("Maschinenführer")}</span></div></section>;
}
