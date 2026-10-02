import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";
import LanguageProvider from "./LanguageProvider";
import Header from "./Header";
import Footer from "./Footer";
import "@/styles/globals.css";

export default function SiteDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <html lang={locale}><body><LanguageProvider locale={locale}><a className="skip-link" href="#main">{translate(locale, "Zum Inhalt")}</a><Header /><main id="main">{children}</main><Footer /></LanguageProvider></body></html>;
}
