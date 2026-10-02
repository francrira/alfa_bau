"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { company, services } from "@/lib/site";
import Brand from "./Brand";
import Icon from "./Icon";

export default function Footer() {
  const { locale, t, localizeHref } = useTranslation();
  return <footer className="footer"><div className="container footer-grid"><div className="footer-about"><Link href={localizeHref("/")} aria-label={t("ALFA66 – Startseite")}><Brand /></Link><p>{t("Ihr Partner für Fachkräfte und Teams für Bauvorhaben in Hamburg und Norddeutschland.")}</p><a className="footer-contact-link" href={localizeHref(company.phoneHref)}><Icon name="phone" />{company.phone}</a></div><div><h3>{t("Leistungen")}</h3>{services.slice(0, 6).map(service => <Link key={service.slug} href={localizeHref("/leistungen/" + service.slug)}>{t(service.title)}</Link>)}</div><div><h3>{t("Personal")}</h3><Link href={localizeHref("/personal")}>{t("Fachkräfte & Kompetenz")}</Link><Link href={localizeHref("/einsatzteams")}>{t("Kolonnen & Einsatzteams")}</Link><Link href={localizeHref("/karriere")}>{t("Karriere")}</Link><Link href={localizeHref("/kleinprojekte")}>{t("Kleinprojekte")}</Link></div><div><h3>{t("Unternehmen")}</h3><Link href={localizeHref("/unternehmen")}>{t("Über uns")}</Link><Link href={localizeHref("/referenzen")}>{t("Projekte & Referenzen")}</Link><Link href={localizeHref("/kontakt")}>{t("Kontakt")}</Link></div><div className="footer-address"><h3>{company.name}</h3><address>{company.address}</address><a href={localizeHref("mailto:" + company.email)}>{company.email}</a><Link className="text-link" href={localizeHref("/kontakt")}>{t("Projekt besprechen ↗")}</Link></div></div><div className="container copyright">© {new Date().getFullYear()} {company.name}{t(". Alle Rechte vorbehalten.")}</div></footer>;
}
