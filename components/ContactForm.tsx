"use client";
import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { company, services } from "@/lib/site";
import Icon from "./Icon";

const options = [{ slug: "projekt", title: "Projektanfrage" }, { slug: "personal", title: "Personalbedarf" }, ...services, { slug: "karriere", title: "Bewerbung / Karriere" }, { slug: "kleinprojekt", title: "Kleinprojekt" }];
export default function ContactForm() {
  const { locale, t, localizeHref } = useTranslation();
  const [inquiry, setInquiry] = useState("projekt");
  const [draftReady, setDraftReady] = useState(false);
  const [mailHref, setMailHref] = useState("");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("anfrage");
    if (requested && options.some(option => option.slug === requested)) setInquiry(requested);
  }, []);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (const field of ["name", "message"]) {
      const input = event.currentTarget.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(input.value.trim() ? "" : t("Bitte füllen Sie dieses Feld aus."));
    }
    if (!event.currentTarget.reportValidity()) return;
    const type = t(options.find(option => option.slug === inquiry)?.title ?? "Projektanfrage");
    const subject = String(data.get("subject") ?? "").trim() || type;
    const body = t("Anfrage: ") + type + "\nName: " + String(data.get("name")).trim() + "\n" + t("E-Mail: ") + String(data.get("email")).trim() + "\n" + t("Telefon: ") + String(data.get("phone") ?? "").trim() + "\n\n" + String(data.get("message")).trim();
    const href = "mailto:" + company.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setMailHref(href);
    setDraftReady(true);
    window.location.href = href;
  }
  return <form id="anfrage" className="contact-form" onSubmit={prepareEmail} onChange={() => setDraftReady(false)}>
    <h2>{t("Ihr Projekt. Unsere Unterstützung.")}</h2><p className="form-intro">{t("Worum geht es? Wir freuen uns auf Ihre Anfrage.")}</p>
    <div className="form-row"><label htmlFor="name">{t("Name ")}<span>*</span><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder={t("Ihr Name")} onInput={event => event.currentTarget.setCustomValidity("")} /></label><label htmlFor="email">{t("E-Mail ")}<span>*</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder={t("ihre@email.de")} /></label></div>
    <div className="form-row"><label htmlFor="phone">{t("Telefon")}<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder={t("Für Rückfragen (optional)")} /></label><label htmlFor="inquiry">{t("Ihre Anfrage")}<select id="inquiry" name="inquiry" value={inquiry} onChange={event => setInquiry(event.target.value)}>{options.map(option => <option value={option.slug} key={option.slug}>{t(option.title)}</option>)}</select></label></div>
    <label htmlFor="subject">{t("Betreff")}<input id="subject" name="subject" maxLength={180} placeholder={t("Eine kurze Beschreibung Ihres Vorhabens")} /></label>
    <label htmlFor="message">{t("Nachricht ")}<span>*</span><textarea id="message" name="message" rows={5} required maxLength={4000} placeholder={t("Was planen Sie? Wo und wann benötigen Sie Unterstützung?")} onInput={event => event.currentTarget.setCustomValidity("")} /></label>
    <p className="form-note">{t("* Pflichtfelder. Der Button öffnet Ihre E-Mail-App mit Ihrer Anfrage. Versenden Sie die E-Mail dort; Anhänge können Sie dort hinzufügen.")}</p>
    <button className="button" type="submit">{t("Anfrage als E-Mail öffnen ")}<Icon name="arrow" /></button>
    {draftReady && <div className="form-status" role="status"><strong>{t("Ihre Anfrage ist vorbereitet.")}</strong><p>{t("Bitte senden Sie die E-Mail in Ihrer E-Mail-App. Falls sich keine App geöffnet hat, ")}<a href={localizeHref(mailHref)}>{t("öffnen Sie den Entwurf erneut")}</a> {t("oder schreiben Sie an ")}<a href={localizeHref("mailto:" + company.email)}>{company.email}</a>.</p></div>}
  </form>;
}
