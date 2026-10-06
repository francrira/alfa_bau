import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { localizedHref, translate } from "./i18n";
import { services, siteUrl } from "./site";

const titles: Record<string, string> = {
  "": "ALFA66 | Fachkräfte, Tiefbau & Einsatzteams",
  leistungen: "Leistungen", personal: "Personal & Kompetenz", einsatzteams: "Kolonnen & Einsatzteams",
  referenzen: "Projekte & Referenzen", projekte: "Projekte & Referenzen", unternehmen: "Wir sind ALFA66",
  karriere: "Karriere", kleinprojekte: "Kleinprojekte", kontakt: "Kontakt",
};
const description = "ALFA66 Bau GmbH in Hamburg: Fachkräfte, Maschinenführer und Kolonnen für Ihre Bauprojekte. Gemeinsam anpacken.";
export const canonicalRoutes = [...Object.keys(titles).filter(route => route !== "projekte"), ...services.map(service => "leistungen/" + service.slug)];

export function layoutMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: { default: translate(locale, titles[""]), template: "%s | ALFA66" },
    description: translate(locale, description),
  };
}
export function routeMetadata(locale: Locale, route: string): Metadata {
  const service = route.startsWith("leistungen/") ? services.find(item => item.slug === route.split("/")[1]) : undefined;
  const canonicalRoute = route === "projekte" ? "referenzen" : route;
  const path = canonicalRoute ? "/" + canonicalRoute + "/" : "/";
  return {
    title: translate(locale, service?.title ?? titles[route] ?? "ALFA66"),
    description: translate(locale, service?.description ?? description),
    alternates: { canonical: localizedHref(locale, path), languages: { de: path, en: localizedHref("en", path) } },
  };
}
