"use client";
import { useTranslation } from "@/components/LanguageProvider";
export default function PageIntro({ title, description, eyebrow }: { title: string; description: string; eyebrow?: string }) {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="page-intro container">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{t(title)}</h1><p>{t(description)}</p></section>;
}
