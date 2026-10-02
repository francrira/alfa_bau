"use client";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import ContactSection from "@/components/ContactSection";
export default function ContactPage() {
  const { locale, t, localizeHref } = useTranslation();
  return <><PageIntro title={t("Sprechen wir über Ihr Projekt.")} description={t("Fachkräfte, Einsatzteams oder ein neues Vorhaben – wir freuen uns auf Ihre Anfrage.")} /><ContactSection /></>;
}
