"use client";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import MediaPlaceholder from "./MediaPlaceholder";
import Icon from "./Icon";
import { projects } from "@/lib/site";

export default function HomeWork() {
  const { t, localizeHref } = useTranslation();
  return <section className="section home-work"><div className="container">
    <div className="home-section-heading"><div><p className="eyebrow">{t("Handwerk, das sichtbar wird")}</p><h2>{t("Einblicke in die Arbeit")}</h2></div><Link className="text-link" href={localizeHref("/referenzen")}>{t("Alle Projektbereiche ansehen")}<Icon name="arrow" /></Link></div>
    <div className="home-work-grid">{projects.slice(0, 3).map(project => <figure key={project.id}>
      <MediaPlaceholder label={t(project.title)} photo={project.photo} sizes="(max-width: 650px) 100vw, 33vw" />
      <figcaption><span className="card-category">{t(project.category)}</span><h3>{t(project.title)}</h3><p>{t(project.description)}</p></figcaption>
    </figure>)}</div>
  </div></section>;
}
