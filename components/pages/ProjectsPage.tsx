"use client";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import Projects from "@/components/Projects";
export default function ProjectsPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Projekte & Referenzen")} description={t("Unsere Einsatzbereiche. Ihre Möglichkeiten.")} /><Projects /></>;
}
