"use client";
import { useTranslation } from "@/components/LanguageProvider";
import References from "@/components/References";
import FeatureStrip from "@/components/FeatureStrip";
import CTA from "@/components/CTA";
export default function CompanyPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><References asPage /><FeatureStrip detailed /><CTA /></>;
}
