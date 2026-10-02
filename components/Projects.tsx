"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { useState } from "react";
import { inquiryHref, projectCategories, projects } from "@/lib/site";
import MediaPlaceholder from "./MediaPlaceholder";
import Icon from "./Icon";

export default function Projects({ compact = false }: { compact?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  const [category, setCategory] = useState<string>("Alle");
  const visible = projects.filter(project => category === "Alle" || project.category === category);
  return <section className="section container">
    {!compact && <div className="filter-bar" role="group" aria-label={t("Projekte nach Bereich filtern")}>{projectCategories.map(item => <button key={t(item)} type="button" aria-pressed={category === item} className={category === item ? "filter active" : "filter"} onClick={() => setCategory(item)}>{t(item)}</button>)}</div>}
    {compact && <div className="section-heading"><h2>{t("Projekte & Referenzen")}</h2><p>{t("Einblicke in die Bereiche unserer Arbeit.")}</p></div>}
    <p className="gallery-notice">{t("Die Projektgalerie wird mit Fotos und Referenzen ergänzt.")}</p>
    <div className="project-grid" aria-live="polite">{visible.map(project => <article className="photo-card" key={project.id}><MediaPlaceholder label={t(project.title)} /><div className="photo-card-copy"><span className="card-category">{t(project.category)}</span><h3>{t(project.title)}</h3><p>{t(project.description)}</p></div></article>)}<article className="project-inquiry"><p className="eyebrow">{t("Gemeinsam anpacken")}</p><h3>{t("Ihr Projekt")}<br />{t("mit uns?")}</h3><p>{t("Sprechen Sie uns an.")}</p><Link className="button" href={localizeHref(inquiryHref())}>{t("Projekt anfragen ")}<Icon name="arrow" /></Link></article></div>
    {compact && <div className="section-action"><Link className="button button-outline" href={localizeHref("/referenzen")}>{t("Alle Projektbereiche ansehen")}</Link></div>}
  </section>;
}
