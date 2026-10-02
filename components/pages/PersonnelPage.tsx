"use client";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import Personnel from "@/components/Personnel";
import FeatureStrip from "@/components/FeatureStrip";
import CTA from "@/components/CTA";
export default function PersonnelPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Personal & Kompetenz")} description={t("Unsere Fachkräfte. Ihr Vorteil.")} /><Personnel heading={false} /><FeatureStrip detailed /><CTA /></>;
}
