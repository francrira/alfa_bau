"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Icon from "@/components/Icon";
import { inquiryHref } from "@/lib/site";
export default function CareerPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Dein Handwerk. Unser Team.")} description={t("Du packst gerne an und bringst Erfahrung mit? Lernen wir uns kennen.")} /><section className="section container detail-layout"><div><p className="eyebrow">{t("Karriere bei ALFA66")}</p><h2>{t("Menschen machen den Unterschied.")}</h2><p>{t("Ob Maschinenführer, Fachkraft im Tiefbau oder Unterstützung auf der Baustelle: Erzähle uns, welche Erfahrung und Qualifikationen du mitbringst.")}</p><ul className="check-list"><li>{t("Deine bisherigen Tätigkeiten und Qualifikationen")}</li><li>{t("Dein gewünschter Einsatzbereich")}</li><li>{t("Deine Verfügbarkeit und Kontaktdaten")}</li></ul><p>{t("Wir sprechen gemeinsam über passende Einsatzmöglichkeiten. Zeugnisse oder Unterlagen kannst du deiner E-Mail hinzufügen.")}</p><Link className="button" href={localizeHref(inquiryHref("karriere"))}>{t("Jetzt Kontakt aufnehmen ")}<Icon name="arrow" /></Link></div><MediaPlaceholder label={t("Zusammen im ALFA66 Team")} className="detail-media" /></section></>;
}
