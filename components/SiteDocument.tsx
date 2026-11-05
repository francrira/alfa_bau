import type { ReactNode } from "react";
import { preload } from "react-dom";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";
import { company, siteUrl } from "@/lib/site";
import LanguageProvider from "./LanguageProvider";
import Header from "./Header";
import Footer from "./Footer";
import "@/styles/globals.css";

// Structured business data for search engines. Only verified contact facts from lib/site.ts are used.
function businessJsonLd(locale: Locale) {
  const [street, cityLine] = company.address.split(",").map(part => part.trim());
  const [postalCode, ...city] = cityLine.split(" ");
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": siteUrl + "/#organization",
    name: company.name,
    url: siteUrl + (locale === "en" ? "/en/" : "/"),
    logo: siteUrl + "/logo/logo.png",
    image: siteUrl + "/images/og.jpg",
    telephone: company.phone.replace(/\s/g, ""),
    email: company.email,
    description: translate(locale, "ALFA66 Bau GmbH in Hamburg: Fachkräfte, Maschinenführer und Kolonnen für Ihre Bauprojekte. Gemeinsam anpacken."),
    address: { "@type": "PostalAddress", streetAddress: street, postalCode, addressLocality: city.join(" "), addressCountry: "DE" },
    areaServed: [{ "@type": "City", name: "Hamburg" }, { "@type": "AdministrativeArea", name: locale === "en" ? "Northern Germany" : "Norddeutschland" }],
    inLanguage: locale,
  };
}

export default function SiteDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  // Starts the font download in parallel with the stylesheet instead of after it.
  preload("/fonts/Nunito-Variable.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return <html lang={locale}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd(locale)).replace(/</g, "\\u003c") }} />
    <LanguageProvider locale={locale}><a className="skip-link" href="#main">{translate(locale, "Zum Inhalt")}</a><Header /><main id="main">{children}</main><Footer /></LanguageProvider>
  </body></html>;
}
