"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import Icon from "./Icon";
import MediaPlaceholder from "./MediaPlaceholder";

export default function ServiceOverview() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container overview-layout"><div className="overview-copy"><p className="eyebrow">{t("Zusammen besser bauen")}</p><h2>{t("Tiefbauleistungen")}</h2><p className="section-subtitle">{t("Mit Fachkräften zum Projekterfolg.")}</p><p>{t("Wir stellen Kolonnen und Fachpersonal für Ihre Tiefbauprojekte in Hamburg und Norddeutschland. Gemeinsam klären wir, welche Unterstützung Ihr Projekt braucht.")}</p><ul className="icon-list">{[{ icon: "team", label: "Erfahrene Kolonnen" }, { icon: "machine", label: "Qualifizierte Maschinenführer" }, { icon: "truck", label: "Flexible Einsatzteams" }, { icon: "shield", label: "Klare & transparente Zusammenarbeit" }].map(item => <li key={t(item.label)}><Icon name={item.icon} /><span>{t(item.label)}</span></li>)}</ul><Link className="button" href={localizeHref(inquiryHref("tiefbaukolonnen"))}>{t("Kolonnen anfragen")}</Link></div><div className="overview-gallery"><MediaPlaceholder label={t("Tiefbau auf der Baustelle")} className="overview-main" /><div className="gallery-thumbnails"><MediaPlaceholder label={t("Leitungsbau")} /><MediaPlaceholder label={t("Erdarbeiten")} /><MediaPlaceholder label={t("Teamarbeit")} /></div></div></section>;
}
