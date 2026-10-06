"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Icon from "@/components/Icon";
import { inquiryHref } from "@/lib/site";
import { photos } from "@/lib/photos";

const examples = [
  { title: "Wege & Flächen", description: "Sie möchten einen Weg oder eine Fläche gestalten? Erzählen Sie uns von Ihrem Vorhaben.", icon: "paving", photo: photos.pavingDetail },
  { title: "Garten & Außenanlagen", description: "Von der Gestaltung bis zur Pflege: Gemeinsam klären wir den Umfang Ihrer Arbeiten.", icon: "worker", photo: photos.path },
  { title: "Ihr individuelles Vorhaben", description: "Teilen Sie uns mit, was Sie planen und welche Unterstützung Sie benötigen.", icon: "team", photo: photos.steps },
];
export default function SmallProjectsPage() {
  const { t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Auch kleine Vorhaben brauchen gutes Handwerk.")} description={t("Sie planen Arbeiten im Garten oder an Ihrer Außenanlage? Sprechen Sie uns an.")} /><section className="section container"><div className="service-grid">{examples.map(example =>
    <article className="small-project-card" key={example.title}><MediaPlaceholder label={t(example.title)} photo={example.photo} sizes="(max-width: 650px) 100vw, 33vw" /><div className="small-project-copy"><Icon name={example.icon} /><h2 className="card-heading">{t(example.title)}</h2><p>{t(example.description)}</p></div></article>
  )}</div><div className="section-action"><Link className="button" href={localizeHref(inquiryHref("kleinprojekt"))}>{t("Kleinprojekt anfragen ")}<Icon name="arrow" /></Link></div></section></>;
}
