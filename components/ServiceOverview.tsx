"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import Icon from "./Icon";
import MediaPlaceholder from "./MediaPlaceholder";
import { photos } from "@/lib/photos";

export default function ServiceOverview() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container overview-layout"><div className="overview-copy"><p className="eyebrow">{t("Zusammen besser bauen")}</p><h2>{t("Tiefbauleistungen")}</h2><p className="section-subtitle">{t("Mit Fachkräften zum Projekterfolg.")}</p><p>{t("Wir stellen Kolonnen und Fachpersonal für Ihre Tiefbauprojekte in Hamburg und Norddeutschland. Gemeinsam klären wir, welche Unterstützung Ihr Projekt braucht.")}</p><ul className="icon-list">{[{ icon: "team", label: "Erfahrene Kolonnen" }, { icon: "machine", label: "Qualifizierte Maschinenführer" }, { icon: "truck", label: "Flexible Einsatzteams" }, { icon: "shield", label: "Klare & transparente Zusammenarbeit" }].map(item => <li key={t(item.label)}><Icon name={item.icon} /><span>{t(item.label)}</span></li>)}</ul><Link className="button" href={localizeHref(inquiryHref("tiefbaukolonnen"))}>{t("Kolonnen anfragen")}</Link></div><div className="overview-gallery"><MediaPlaceholder label={t("Tiefbau auf der Baustelle")} className="overview-main" photo={photos.excavation} /><div className="gallery-thumbnails"><MediaPlaceholder label={t("Leitungsbau")} photo={photos.ducts} sizes="(max-width: 650px) 33vw, 20vw" /><MediaPlaceholder label={t("Erdarbeiten")} photo={photos.shaft} sizes="(max-width: 650px) 33vw, 20vw" /><MediaPlaceholder label={t("Teamarbeit")} photo={photos.siteTeam} sizes="(max-width: 650px) 33vw, 20vw" /></div></div></section>;
}
