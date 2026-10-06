"use client";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import MediaPlaceholder from "./MediaPlaceholder";
import Icon from "./Icon";
import { photos } from "@/lib/photos";

const offerings = [
  { title: "Tiefbaukolonnen", description: "Teams für Erdarbeiten und die täglichen Aufgaben im Tiefbau.", slug: "tiefbaukolonnen", photo: photos.siteTeam },
  { title: "Kanal- & Leitungsbau", description: "Fachkräfte für Rohrleitungen, Kanäle und Versorgungsleitungen.", slug: "rohrleitungskolonnen", photo: photos.ducts },
  { title: "Pflasterkolonnen", description: "Handwerkliche Unterstützung für Wege, Plätze und Außenanlagen.", slug: "pflasterkolonnen", photo: photos.path },
  { title: "Maschinenführer", description: "Die passende Erfahrung für Ihre Maschinen und Ihre Baustelle.", slug: "maschinenfuehrer", photo: photos.excavation },
];

export default function HomeServices() {
  const { t, localizeHref } = useTranslation();
  return <section className="section container home-services">
    <div className="home-section-heading"><div><p className="eyebrow">{t("Was Ihr Projekt weiterbringt")}</p><h2>{t("Ihre Baustelle.")}<br /><span>{t("Unser gemeinsamer Einsatz.")}</span></h2></div><p>{t("Ob einzelne Fachkräfte oder ein ganzes Team: Wir besprechen Ihren Bedarf und stimmen Aufgaben, Qualifikationen und Zeitraum ab.")}</p></div>
    <div className="home-service-grid">{offerings.map((offering, index) => <Link className="home-service-card" href={localizeHref("/leistungen/" + offering.slug)} key={offering.slug}>
      <MediaPlaceholder label={t(offering.title)} photo={offering.photo} sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      <div className="home-service-copy"><span className="service-number" aria-hidden="true">0{index + 1}</span><h3>{t(offering.title)}</h3><p>{t(offering.description)}</p><span className="text-link">{t("Mehr erfahren ")}<Icon name="arrow" /></span></div>
    </Link>)}</div>
    <div className="home-services-footer"><p>{t("Sie benötigen weitere Unterstützung auf Ihrer Baustelle?")}</p><Link className="text-link" href={localizeHref("/personal")}>{t("Personal & Kompetenz")}<Icon name="arrow" /></Link></div>
  </section>;
}
