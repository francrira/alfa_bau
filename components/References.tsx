"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { inquiryHref } from "@/lib/site";
import MediaPlaceholder from "./MediaPlaceholder";
import { photos } from "@/lib/photos";

export default function References({ asPage = false }: { asPage?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container company-layout"><div><p className="eyebrow">{t("Menschen. Handwerk. Zusammenarbeit.")}</p>{asPage ? <h1>{t("Wir sind ALFA66")}</h1> : <h2>{t("Wir sind ALFA66")}</h2>}<p className="section-subtitle">{t("Ihre Fachkräfte für Tiefbauprojekte.")}</p><p>{t("ALFA66 Bau GmbH ist Ihr Ansprechpartner für Fachkräfte und Teams. Wir unterstützen Bauvorhaben mit Menschen, die mitdenken und anpacken.")}</p><p>{t("Von der ersten Anfrage bis zur Abstimmung vor Ort: Wir setzen auf klare Absprachen und eine Zusammenarbeit, auf die Sie bauen können.")}</p><div className="company-values"><div><strong>01</strong><span>{t("Bedarf verstehen")}</span></div><div><strong>02</strong><span>{t("Team abstimmen")}</span></div><div><strong>03</strong><span>{t("Gemeinsam anpacken")}</span></div></div><Link className="text-link" href={localizeHref(inquiryHref())}>{t("Lernen wir uns kennen →")}</Link></div><MediaPlaceholder label={t("Das ALFA66 Team")} className="company-media" photo={photos.siteTeam} /></section>;
}
