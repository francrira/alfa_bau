"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { services } from "@/lib/site";
import Icon from "./Icon";

export default function Services({ heading = true }: { heading?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container">{heading && <div className="section-heading"><p className="eyebrow">{t("Kompetenz auf Ihrer Baustelle")}</p><h2>{t("Unsere Leistungen –")}<br />{t("mit kompetentem Personal")}</h2><p>{t("Wir stellen die richtigen Fachkräfte für Ihren Projekterfolg.")}</p></div>}
    <div className="service-grid">{services.slice(0, 6).map(service => <article className="service-card" key={service.slug}><Icon name={service.icon} /><h3>{t(service.title)}</h3><p>{t(service.description)}</p><Link className="text-link" href={localizeHref("/leistungen/" + service.slug)}>{t("Mehr erfahren ")}<Icon name="arrow" /></Link></article>)}</div>
  </section>;
}
