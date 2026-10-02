"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import Icon from "./Icon";

export default function CTA() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="cta"><div className="container cta-layout"><div><p className="eyebrow">{t("Bereit für den nächsten Schritt?")}</p><h2>{t("Ihr Projekt in guten Händen")}</h2><p>{t("Mit Fachkräften, die anpacken.")}</p></div><Link className="button" href={localizeHref(inquiryHref("personal"))}>{t("Fachkräfte anfragen ")}<Icon name="arrow" /></Link></div></section>;
}
