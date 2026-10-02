"use client";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import Services from "@/components/Services";
import ServiceOverview from "@/components/ServiceOverview";
import CTA from "@/components/CTA";
export default function ServicesPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Unsere Leistungen – mit kompetentem Personal")} description={t("Wir stellen die richtigen Fachkräfte für Ihren Projekterfolg.")} /><Services heading={false} /><ServiceOverview /><CTA /></>;
}
