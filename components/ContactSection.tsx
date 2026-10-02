"use client";
import { useTranslation } from "@/components/LanguageProvider";
import { company } from "@/lib/site";
import ContactForm from "./ContactForm";
import Icon from "./Icon";
export default function ContactSection() {
  const { locale, t, localizeHref } = useTranslation();
  return <section className="section container contact-layout"><div className="contact-details"><p className="eyebrow">{t("Direkt miteinander sprechen")}</p><h2>{t("Kontakt")}</h2><p>{t("Wir sind für Sie da.")}</p><address><strong>{company.name}</strong><br />{company.address}</address><a href={localizeHref(company.phoneHref)}><Icon name="phone" />{company.phone}</a><a href={localizeHref("mailto:" + company.email)}><Icon name="mail" />{company.email}</a><div className="contact-location"><Icon name="pin" /><strong>{t("Hamburg")}</strong><p>{t("Von hier aus sprechen wir über Ihr nächstes Projekt.")}</p><a href={localizeHref("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(company.address))} target="_blank" rel="noopener noreferrer">{t("Adresse in Karten öffnen ↗")}</a></div></div><ContactForm /></section>;
}
