"use client";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import ServiceOverview from "@/components/ServiceOverview";
import TeamProcess from "@/components/TeamProcess";
import CTA from "@/components/CTA";
export default function TeamsPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Gemeinsam anpacken.")} description={t("Kolonnen und Einsatzteams, abgestimmt auf Ihr Vorhaben.")} /><ServiceOverview /><TeamProcess /><CTA /></>;
}
