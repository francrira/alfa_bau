"use client";
import type { ReactNode } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import PageIntro from "@/components/PageIntro";
import { company, legal } from "@/lib/site";

// Legal copy is written per language rather than through the phrase dictionary: the wording must stay
// complete and coherent in each language, and a missing translation must never fall back mid-sentence.

function Legal({ children }: { children: ReactNode }) {
  return <section className="section container legal">{children}</section>;
}
function Mail() { return <a href={"mailto:" + company.email}>{company.email}</a>; }
function Phone() { return <a href={company.phoneHref}>{company.phone}</a>; }
function Address() {
  const [street, city] = company.address.split(",").map(part => part.trim());
  return <address>{company.name}<br />{street}<br />{city}<br />Deutschland</address>;
}

export function ImpressumPage() {
  const { locale } = useTranslation();
  const de = locale === "de";
  return <><PageIntro title={de ? "Impressum" : "Legal notice"} description={de ? "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)" : "Information pursuant to Section 5 of the German Digital Services Act (DDG)"} />
    <Legal>
      <h2>{de ? "Anbieter" : "Provider"}</h2>
      <Address />
      <h2>{de ? "Vertreten durch" : "Represented by"}</h2>
      <p>{de ? "Geschäftsführer: " : "Managing director: "}{legal.managingDirector}</p>
      <h2>{de ? "Kontakt" : "Contact"}</h2>
      <p>{de ? "Telefon: " : "Phone: "}<Phone /><br />{de ? "E-Mail: " : "Email: "}<Mail /></p>
      {legal.register && <><h2>{de ? "Registereintrag" : "Commercial register"}</h2><p>{legal.register}</p></>}
      {legal.vatId && <><h2>{de ? "Umsatzsteuer-ID" : "VAT ID"}</h2><p>{de ? "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: " : "VAT identification number pursuant to Section 27a of the German VAT Act: "}{legal.vatId}</p></>}
      <h2>{de ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Responsible for content pursuant to Section 18(2) MStV"}</h2>
      <p>{legal.contentResponsible}<br />{company.address}</p>
      <h2>{de ? "Verbraucherstreitbeilegung" : "Consumer dispute resolution"}</h2>
      <p>{de ? "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." : "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}</p>
      <h2>{de ? "Haftung für Inhalte und Links" : "Liability for content and links"}</h2>
      <p>{de ? "Wir erstellen die Inhalte dieser Website mit Sorgfalt, können für Richtigkeit, Vollständigkeit und Aktualität jedoch keine Gewähr übernehmen. Für Inhalte externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Inhalte oder Links umgehend." : "We prepare the content of this website with care but cannot guarantee that it is accurate, complete or up to date. The operators of external websites we link to are solely responsible for their content. If we become aware of any legal violations, we will remove the content or links concerned immediately."}</p>
      <h2>{de ? "Bildnachweis" : "Image credits"}</h2>
      <p>{de ? "Fotos: Alfa66Bau GmbH. Die als KI-generiert gekennzeichneten Symbolbilder wurden mit Bildgenerierungssoftware erstellt." : "Photos: Alfa66Bau GmbH. The illustrations labelled as AI-generated were created with image generation software."}</p>
    </Legal></>;
}

export function PrivacyPage() {
  const { locale } = useTranslation();
  const de = locale === "de";
  const days = legal.logRetentionDays;
  return <><PageIntro title={de ? "Datenschutzerklärung" : "Privacy policy"} description={de ? "Wie wir mit Ihren Daten umgehen, wenn Sie unsere Website besuchen oder uns kontaktieren." : "How we handle your data when you visit our website or contact us."} />
    <Legal>{de ? <>
      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
      <Address />
      <p>Geschäftsführer: {legal.managingDirector}<br />Telefon: <Phone /><br />E-Mail: <Mail /></p>

      <h2>2. Überblick</h2>
      <p>Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Werkzeuge und lädt keine Schriften, Skripte oder Karten von fremden Servern. Personenbezogene Daten verarbeiten wir nur, soweit dies für den Betrieb der Website und die Bearbeitung Ihrer Anfragen erforderlich ist.</p>

      <h2>3. Hosting und Server-Logdateien</h2>
      <p>Die Website wird auf einem von uns betriebenen Server bei Google Cloud gehostet (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Mit Google besteht ein Vertrag zur Auftragsverarbeitung. Eine Übermittlung von Daten an die Google LLC in den USA ist nicht auszuschließen; die Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO).</p>
      <p>Bei jedem Aufruf speichert der Webserver automatisch: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene Datenmenge, Statuscode, die zuvor besuchte Seite (Referrer) sowie Browser und Betriebssystem. Diese Daten dienen der sicheren und stabilen Bereitstellung der Website und der Abwehr von Angriffen. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Die Logdateien werden nach {days} Tagen automatisch gelöscht.</p>

      <h2>4. Kontaktformular</h2>
      <p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, optional Ihre Telefonnummer, das gewählte Anliegen, den Betreff und Ihre Nachricht. Die Angaben werden über eine verschlüsselte Verbindung an unseren Server übertragen und von dort als E-Mail an unser Postfach gesendet. Auf dem Webserver selbst wird der Inhalt Ihrer Nachricht nicht gespeichert.</p>
      <p>Zum Schutz vor Missbrauch speichert der Server für höchstens 24 Stunden einen nicht umkehrbaren Hash-Wert Ihrer IP-Adresse zusammen mit dem Zeitpunkt der Anfrage, um die Anzahl der Anfragen zu begrenzen.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit einem Vertrag oder einer vorvertraglichen Maßnahme zusammenhängt, und im Übrigen unser berechtigtes Interesse an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Pflichtangaben sind Name, E-Mail-Adresse und Nachricht; ohne sie können wir Ihre Anfrage nicht beantworten.</p>

      <h2>5. Kontakt per E-Mail und Telefon</h2>
      <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens auf denselben Rechtsgrundlagen wie beim Kontaktformular. Für unser E-Mail-Postfach nutzen wir Google Workspace (Google Ireland Limited) als Auftragsverarbeiter; auch hier ist eine Übermittlung in die USA nach dem EU-US Data Privacy Framework möglich.</p>
      <p>Wir löschen Anfragen, sobald sie abschließend bearbeitet sind und keine gesetzlichen Aufbewahrungspflichten bestehen. Geschäftsbriefe bewahren wir nach den handels- und steuerrechtlichen Vorschriften bis zu sechs bzw. zehn Jahre auf.</p>

      <h2>6. Bewerbungen</h2>
      <p>Bewerbungen, die Sie uns über das Formular oder per E-Mail senden, verwenden wir ausschließlich für das Bewerbungsverfahren (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Kommt keine Zusammenarbeit zustande, löschen wir Ihre Unterlagen spätestens sechs Monate nach Abschluss des Verfahrens.</p>

      <h2>7. Externe Links</h2>
      <p>Der Link „Adresse in Karten öffnen" führt zu Google Maps. Erst wenn Sie ihn anklicken, wird eine Verbindung zu Google hergestellt; dafür gelten die Datenschutzhinweise von Google.</p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Wenden Sie sich dazu einfach an <Mail />.</p>
      <p>Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Hamburgischen Beauftragten für Datenschutz und Informationsfreiheit, Ludwig-Erhard-Straße 22, 20459 Hamburg.</p>

      <h2>9. Verschlüsselung</h2>
      <p>Diese Website ist ausschließlich über eine verschlüsselte HTTPS-Verbindung erreichbar.</p>
      <p className="legal-updated">Stand: November 2026</p>
    </> : <>
      <h2>1. Controller</h2>
      <p>The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:</p>
      <Address />
      <p>Managing director: {legal.managingDirector}<br />Phone: <Phone /><br />Email: <Mail /></p>

      <h2>2. Overview</h2>
      <p>This website does not set cookies, does not use analytics or tracking tools and does not load fonts, scripts or maps from third-party servers. We only process personal data where this is necessary to operate the website and to handle your enquiries.</p>

      <h2>3. Hosting and server log files</h2>
      <p>The website is hosted on a server we operate at Google Cloud (provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). We have a data processing agreement with Google. A transfer of data to Google LLC in the USA cannot be ruled out; Google LLC is certified under the EU-US Data Privacy Framework (Art. 45 GDPR).</p>
      <p>Each time the site is accessed, the web server automatically stores: IP address, date and time, the page requested, the amount of data transferred, the status code, the previously visited page (referrer), and the browser and operating system. This data is used to provide the website securely and reliably and to fend off attacks. The legal basis is our legitimate interest under Art. 6(1)(f) GDPR. Log files are deleted automatically after {days} days.</p>

      <h2>4. Contact form</h2>
      <p>When you write to us using the contact form, we process your name, email address, optionally your phone number, the selected topic, the subject and your message. This information is sent to our server over an encrypted connection and from there forwarded as an email to our mailbox. The content of your message is not stored on the web server itself.</p>
      <p>To prevent misuse, the server stores an irreversible hash of your IP address together with the time of the request for no more than 24 hours in order to limit the number of requests.</p>
      <p>The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract or pre-contractual measures, and otherwise our legitimate interest in answering enquiries (Art. 6(1)(f) GDPR). Name, email address and message are required; without them we cannot answer your enquiry.</p>

      <h2>5. Contact by email and phone</h2>
      <p>If you contact us by email or phone, we process your information to handle your request on the same legal bases as for the contact form. Our mailbox is provided by Google Workspace (Google Ireland Limited) as a processor; here too a transfer to the USA under the EU-US Data Privacy Framework is possible.</p>
      <p>We delete enquiries once they have been dealt with and no statutory retention obligations apply. Business correspondence is retained for up to six or ten years in accordance with commercial and tax law.</p>

      <h2>6. Job applications</h2>
      <p>We use applications you send us via the form or by email exclusively for the application process (Section 26 BDSG, Art. 6(1)(b) GDPR). If no employment relationship results, we delete your documents no later than six months after the process has ended.</p>

      <h2>7. External links</h2>
      <p>The "Open address in maps" link leads to Google Maps. A connection to Google is only established when you click it; Google's privacy notice applies there.</p>

      <h2>8. Your rights</h2>
      <p>You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21). Simply contact <Mail />.</p>
      <p>You may also lodge a complaint with a data protection supervisory authority, for example the Hamburg Commissioner for Data Protection and Freedom of Information, Ludwig-Erhard-Straße 22, 20459 Hamburg.</p>

      <h2>9. Encryption</h2>
      <p>This website is only accessible via an encrypted HTTPS connection.</p>
      <p className="legal-updated">Last updated: November 2026</p>
    </>}</Legal></>;
}
