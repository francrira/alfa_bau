"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref, personnel } from "@/lib/site";
import MediaPlaceholder from "./MediaPlaceholder";
import Icon from "./Icon";

export default function Personnel({ heading = true }: { heading?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container">{heading && <div className="section-heading"><h2>{t("Personal & Kompetenz")}</h2><p>{t("Unsere Fachkräfte. Ihr Vorteil.")}</p></div>}<div className="personnel-grid">{personnel.map(person => <Link className="photo-card" href={localizeHref(inquiryHref(person.type))} key={t(person.title)}><MediaPlaceholder label={t(person.title)} /><div className="photo-card-copy"><h3>{t(person.title)}</h3><p>{t(person.description)}</p><span className="text-link">{t("Fachkräfte anfragen ")}<Icon name="arrow" /></span></div></Link>)}</div><div className="section-action"><Link className="button button-outline" href={localizeHref("/einsatzteams")}>{t("Zu unseren Einsatzteams")}</Link></div></section>;
}
