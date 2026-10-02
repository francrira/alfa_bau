"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Icon from "./Icon";

const features = [
  { icon: "worker", title: "Qualifizierte Fachkräfte", description: "Passende Kompetenz für Ihr Projekt." },
  { icon: "team", title: "Erfahrene Kolonnen", description: "Gemeinsam auf Ihrer Baustelle." },
  { icon: "truck", title: "Flexible Einsatzteams", description: "Abgestimmt auf Ihren Bedarf." },
  { icon: "clock", title: "Zuverlässig & termintreu", description: "Klare Planung und Absprachen." },
  { icon: "shield", title: "Sicherheit & Qualität", description: "Sorgfalt bei jedem Arbeitsschritt." },
];
export default function FeatureStrip({ detailed = false }: { detailed?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  return <section className={"feature-strip" + (detailed ? " feature-strip-detailed" : "")} aria-label={t("Unser Anspruch")}><div className="container feature-list">{features.map(feature => <div className="feature" key={t(feature.title)}><Icon name={feature.icon} /><div><h3>{t(feature.title)}</h3>{detailed && <p>{t(feature.description)}</p>}</div></div>)}</div></section>;
}
