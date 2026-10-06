"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inquiryHref, services } from "@/lib/site";
import PageIntro from "@/components/PageIntro";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import TeamProcess from "@/components/TeamProcess";
export default function ServiceDetail({ slug }: { slug: string }) {
  const { locale, t, localizeHref } = useTranslation();
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return <><div className="container breadcrumbs"><Link href={localizeHref("/leistungen")}>{t("Leistungen")}</Link><span>/</span><span>{t(service.title)}</span></div><PageIntro title={t(service.title)} description={t(service.description)} /><section className="section container detail-layout"><div><Icon name={service.icon} className="detail-icon" /><h2>{t("Die passende Unterstützung für Ihr Vorhaben")}</h2><p>{t(service.detail)}</p><h3>{t("Was wir für Ihre Anfrage brauchen")}</h3><ul className="check-list"><li>{t("Projektstandort und geplante Aufgaben")}</li><li>{t("Gewünschter Zeitraum und Teamumfang")}</li><li>{t("Benötigte Qualifikationen und Geräte")}</li></ul><Link className="button" href={localizeHref(inquiryHref(service.slug))}>{t(service.title)} {t("anfragen ")}<Icon name="arrow" /></Link></div><MediaPlaceholder label={t(service.title)} className="detail-media" photo={service.photo} /></section><section className="section container detail-gallery"><h2>{t("Einblicke in die Arbeit")}</h2><div className="photo-grid">{service.gallery.map(photo => <figure key={photo.src}><MediaPlaceholder label={t(photo.alt)} photo={photo} sizes="(max-width: 650px) 100vw, 33vw" /><figcaption>{t(photo.alt)}</figcaption></figure>)}</div></section><TeamProcess /><CTA /></>;
}
