"use client";
import LanguageSwitch from "./LanguageSwitch";
import { stripLocale } from "@/lib/i18n";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { inquiryHref, navigation } from "@/lib/site";
import Brand from "./Brand";
import Icon from "./Icon";

export default function Header() {
  const { locale, t, localizeHref } = useTranslation();
  const pathname = usePathname();
  const currentPath = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setInteractive(true); setOpen(false); }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className={"site-header" + (interactive ? " is-interactive" : "")}><div className="container navbar">
    <Link className="brand-link" href={localizeHref("/")} aria-label={t("ALFA66 – Startseite")} onClick={() => setOpen(false)}><Brand /></Link>
    <div className="header-controls"><LanguageSwitch /><button ref={menuButton} className="menu-toggle" aria-label={t(open ? "Menü schließen" : "Menü öffnen")} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button></div>
    <nav id="navigation" aria-label={t("Hauptnavigation")} className={"navigation" + (open ? " is-open" : "")}>
      {navigation.map(({ href, label }) => {
        const current = currentPath.replace(/\/$/, "") === href || currentPath.startsWith(href + "/") || (href === "/referenzen" && currentPath.startsWith("/projekte"));
        return <Link key={href} href={localizeHref(href)} aria-current={current ? "page" : undefined} onClick={() => setOpen(false)}>{t(label)}</Link>;
      })}
      <Link className="button header-cta" href={localizeHref(inquiryHref())} onClick={() => setOpen(false)}>{t("Projekt anfragen")}</Link>
    </nav>
  </div></header>;
}
