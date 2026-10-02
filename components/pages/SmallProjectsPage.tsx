"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Icon from "@/components/Icon";
import { inquiryHref } from "@/lib/site";
export default function SmallProjectsPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Auch kleine Vorhaben brauchen gutes Handwerk.")} description={t("Sie planen Arbeiten im Garten oder an Ihrer Außenanlage? Sprechen Sie uns an.")} /><section className="section container"><div className="service-grid">{[
    ["Wege & Flächen", "Sie möchten einen Weg oder eine Fläche gestalten? Erzählen Sie uns von Ihrem Vorhaben.", "paving"],
    ["Garten & Außenanlagen", "Von der Gestaltung bis zur Pflege: Gemeinsam klären wir den Umfang Ihrer Arbeiten.", "worker"],
    ["Ihr individuelles Vorhaben", "Teilen Sie uns mit, was Sie planen und welche Unterstützung Sie benötigen.", "team"],
  ].map(([title, description, icon]) => <article className="service-card" key={t(title)}><Icon name={icon} /><h2 className="card-heading">{t(title)}</h2><p>{t(description)}</p></article>)}</div><div className="section-action"><Link className="button" href={localizeHref(inquiryHref("kleinprojekt"))}>{t("Kleinprojekt anfragen ")}<Icon name="arrow" /></Link></div></section></>;
}
