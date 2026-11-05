import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { localizedHref, translate } from "./i18n";
import { services, siteUrl } from "./site";

const titles: Record<string, string> = {
  "": "ALFA66 | Fachkräfte, Tiefbau & Einsatzteams",
  leistungen: "Leistungen", personal: "Personal & Kompetenz", einsatzteams: "Kolonnen & Einsatzteams",
  referenzen: "Projekte & Referenzen", projekte: "Projekte & Referenzen", unternehmen: "Wir sind ALFA66",
  karriere: "Karriere", kleinprojekte: "Kleinprojekte", kontakt: "Kontakt",
  impressum: "Impressum", datenschutz: "Datenschutzerklärung",
};
const description = "ALFA66 Bau GmbH in Hamburg: Fachkräfte, Maschinenführer und Kolonnen für Ihre Bauprojekte. Gemeinsam anpacken.";
export const canonicalRoutes = [...Object.keys(titles).filter(route => route !== "projekte"), ...services.map(service => "leistungen/" + service.slug)];

// Shared link preview for WhatsApp, LinkedIn, Facebook and other sites that read Open Graph tags.
function socialMetadata(locale: Locale, title: string, summary: string, url: string): Metadata {
  const image = { url: "/images/og.jpg", width: 1200, height: 630, alt: translate(locale, "Wege & Pflasterflächen") };
  return {
    openGraph: { type: "website", siteName: "ALFA66 Bau GmbH", locale: locale === "en" ? "en_GB" : "de_DE", url, title, description: summary, images: [image] },
    twitter: { card: "summary_large_image", title, description: summary, images: [image.url] },
  };
}

export function layoutMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: { default: translate(locale, titles[""]), template: "%s | ALFA66" },
    description: translate(locale, description),
    ...socialMetadata(locale, translate(locale, titles[""]), translate(locale, description), localizedHref(locale, "/")),
  };
}
export function routeMetadata(locale: Locale, route: string): Metadata {
  const service = route.startsWith("leistungen/") ? services.find(item => item.slug === route.split("/")[1]) : undefined;
  const canonicalRoute = route === "projekte" ? "referenzen" : route;
  const path = canonicalRoute ? "/" + canonicalRoute + "/" : "/";
  const title = translate(locale, service?.title ?? titles[route] ?? "ALFA66");
  const summary = translate(locale, service?.description ?? description);
  return {
    title,
    description: summary,
    ...socialMetadata(locale, route ? title + " | ALFA66" : title, summary, localizedHref(locale, path)),
    alternates: { canonical: localizedHref(locale, path), languages: { de: path, en: localizedHref("en", path) } },
  };
}
