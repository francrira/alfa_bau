"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref, services } from "@/lib/site";
import Icon from "./Icon";

export default function TeamProcess() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section section-tinted"><div className="container"><div className="section-heading"><h2>{t("So stellen wir Personal")}</h2><p>{t("In drei einfachen Schritten zu Ihrem Einsatzteam.")}</p></div><div className="process-layout"><ol className="steps">{[
    ["Anforderung", "Sie teilen uns Ihren Personalbedarf und Projektzeitraum mit."],
    ["Team zusammenstellen", "Wir stimmen die passenden Qualifikationen und den Umfang mit Ihnen ab."],
    ["Einsatz & Unterstützung", "Ihr Team unterstützt Sie bei den vereinbarten Aufgaben vor Ort."],
  ].map(([title, text], index) => <li key={t(title)}><span className="step-number">{index + 1}</span><div><h3>{t(title)}</h3><p>{t(text)}</p></div></li>)}</ol><div className="availability-card"><Icon name="team" /><h3>{t("Ihr passendes Einsatzteam")}</h3><p>{t("Bedarfsgerecht zusammengestellt.")}<br />{t("Flexibel & zuverlässig.")}</p><Link className="text-link" href={localizeHref(inquiryHref("personal"))}>{t("Verfügbarkeit anfragen ")}<Icon name="arrow" /></Link></div><div className="typical-jobs"><h3>{t("Typische Einsätze")}</h3>{services.slice(0, 6).map(service => <Link href={localizeHref(inquiryHref(service.slug))} key={service.slug}><Icon name={service.icon} /><span className="job-label">{t(service.title)}</span><span aria-hidden="true">↗</span></Link>)}</div></div><p className="process-note">{t("Jedes Projekt hat eigene Anforderungen. Sprechen Sie uns an – wir klären die passende Unterstützung für Ihr Vorhaben.")}</p></div></section>;
}
