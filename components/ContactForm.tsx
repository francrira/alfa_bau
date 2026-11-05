"use client";
import { useTranslation } from "@/components/LanguageProvider";
import { Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { company, services } from "@/lib/site";
import Icon from "./Icon";

const options = [{ slug: "projekt", title: "Projektanfrage" }, { slug: "personal", title: "Personalbedarf" }, ...services, { slug: "karriere", title: "Bewerbung / Karriere" }, { slug: "kleinprojekt", title: "Kleinprojekt" }];

// Follows ?anfrage= on every client navigation, including between two inquiry links on the same page.
// Isolated in its own Suspense boundary so the rest of the form still renders statically.
function InquiryFromUrl({ onChange }: { onChange: (slug: string) => void }) {
  const requested = useSearchParams().get("anfrage");
  useEffect(() => {
    if (requested && options.some(option => option.slug === requested)) {
      onChange(requested);
      // Same-page navigation keeps the scroll position, so bring the form into view explicitly.
      if (window.location.hash === "#anfrage") document.getElementById("anfrage")?.scrollIntoView({ block: "start" });
    }
  }, [requested, onChange]);
  return null;
}

export default function ContactForm() {
  const { locale, t } = useTranslation();
  const [inquiry, setInquiry] = useState("projekt");
  // idle → sending → sent; "failed" offers the email-app draft as a fallback.
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [mailHref, setMailHref] = useState("");
  const [interactive, setInteractive] = useState(false);
  const startedAt = useRef(0);
  useEffect(() => { setInteractive(true); startedAt.current = Date.now(); }, []);
  async function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const field of ["name", "message"]) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(input.value.trim() ? "" : t("Bitte füllen Sie dieses Feld aus."));
    }
    if (!form.reportValidity()) return;
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const option = options.find(item => item.slug === inquiry)?.title ?? "Projektanfrage";
    const type = t(option);
    const body = t("Anfrage: ") + type + "\nName: " + value("name") + "\n" + t("E-Mail: ") + value("email") + "\n" + t("Telefon: ") + value("phone") + "\n\n" + value("message");
    setMailHref("mailto:" + company.email + "?subject=" + encodeURIComponent(value("subject") || type) + "&body=" + encodeURIComponent(body));
    setStatus("sending");
    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The team receives the German topic name so every enquiry is filed the same way.
        body: JSON.stringify({ name: value("name"), email: value("email"), phone: value("phone"), inquiry: option, subject: value("subject"), message: value("message"), website: value("website"), language: locale, elapsed: Date.now() - startedAt.current }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error ?? String(response.status));
      setStatus("sent");
      form.reset();
      setInquiry("projekt");
    } catch {
      setStatus("failed");
    }
  }
  return <form id="anfrage" className="contact-form" method="post" onSubmit={sendInquiry} onChange={() => { if (status === "failed") setStatus("idle"); }}>
    <Suspense fallback={null}><InquiryFromUrl onChange={setInquiry} /></Suspense>
    <h2>{t("Ihr Projekt. Unsere Unterstützung.")}</h2><p className="form-intro">{t("Worum geht es? Wir freuen uns auf Ihre Anfrage.")}</p>
    {!interactive && <p className="form-fallback">{t("Sie können uns direkt per E-Mail oder Telefon kontaktieren. Das Formular benötigt JavaScript.")} <a href={"mailto:" + company.email}>{company.email}</a> · <a href={company.phoneHref}>{company.phone}</a></p>}
    <fieldset className="form-fields" disabled={!interactive || status === "sending"} aria-label={t("Ihre Anfrage")}>
    <div className="form-row"><label htmlFor="name">{t("Name ")}<span>*</span><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder={t("Ihr Name")} onInput={event => event.currentTarget.setCustomValidity("")} /></label><label htmlFor="email">{t("E-Mail ")}<span>*</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder={t("ihre@email.de")} /></label></div>
    <div className="form-row"><label htmlFor="phone">{t("Telefon")}<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder={t("Für Rückfragen (optional)")} /></label><label htmlFor="inquiry">{t("Ihre Anfrage")}<select id="inquiry" name="inquiry" value={inquiry} onChange={event => setInquiry(event.target.value)}>{options.map(option => <option value={option.slug} key={option.slug}>{t(option.title)}</option>)}</select></label></div>
    <label htmlFor="subject">{t("Betreff")}<input id="subject" name="subject" maxLength={180} placeholder={t("Eine kurze Beschreibung Ihres Vorhabens")} /></label>
    <label htmlFor="message">{t("Nachricht ")}<span>*</span><textarea id="message" name="message" rows={5} required maxLength={4000} placeholder={t("Was planen Sie? Wo und wann benötigen Sie Unterstützung?")} onInput={event => event.currentTarget.setCustomValidity("")} /></label>
    {/* Honeypot: hidden from people and screen readers; bots that fill it are silently ignored. */}
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Website<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="form-note">{t("* Pflichtfelder. Ihre Anfrage wird direkt an unser Team gesendet. Wir verwenden Ihre Angaben nur zur Bearbeitung Ihrer Anfrage. Unterlagen können Sie uns anschließend per E-Mail schicken.")}</p>
    <button className="button" type="submit">{status === "sending" ? t("Wird gesendet …") : t("Anfrage senden ")}<Icon name="arrow" /></button>
    </fieldset>
    {status === "sent" && <div className="form-status" role="status"><strong>{t("Vielen Dank! Ihre Anfrage ist bei uns angekommen.")}</strong><p>{t("Wir melden uns so schnell wie möglich bei Ihnen.")}</p></div>}
    {status === "failed" && <div className="form-status form-status-error" role="alert"><strong>{t("Ihre Anfrage konnte gerade nicht gesendet werden.")}</strong><p>{t("Bitte versuchen Sie es erneut, ")}<a href={mailHref}>{t("öffnen Sie sie als E-Mail")}</a> {t("oder rufen Sie uns an: ")}<a href={company.phoneHref}>{company.phone}</a>.</p></div>}
  </form>;
}
