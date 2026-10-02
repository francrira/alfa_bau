"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Services from "@/components/Services";
import ServiceOverview from "@/components/ServiceOverview";
import TeamProcess from "@/components/TeamProcess";
import Personnel from "@/components/Personnel";
import ContactSection from "@/components/ContactSection";
export default function HomePage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><Hero /><FeatureStrip /><ServiceOverview /><Services /><Personnel /><TeamProcess /><ContactSection /></>;
}
