"use client";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import { inquiryHref } from "@/lib/site";
import Icon from "./Icon";

const steps = [
  ["Bedarf besprechen", "Sie erzählen uns, wo, wann und für welche Aufgaben Sie Unterstützung benötigen."],
  ["Team abstimmen", "Gemeinsam klären wir Qualifikationen, Teamgröße und den geplanten Einsatzzeitraum."],
  ["Gemeinsam anpacken", "Ihr Team unterstützt Sie vor Ort bei den vereinbarten Arbeiten."],
];

export default function HomeProcess() {
  const { t, localizeHref } = useTranslation();
  return <section className="section container home-process">
    <div className="home-section-heading"><div><p className="eyebrow">{t("Klare Absprachen. Gute Zusammenarbeit.")}</p><h2>{t("Vom Gespräch auf die Baustelle.")}</h2></div><Link className="button button-outline" href={localizeHref(inquiryHref("personal"))}>{t("Einsatz besprechen")}<Icon name="arrow" /></Link></div>
    <ol className="home-process-grid">{steps.map(([title, description], index) => <li key={title}><span className="home-step-number">0{index + 1}</span><h3>{t(title)}</h3><p>{t(description)}</p></li>)}</ol>
  </section>;
}
