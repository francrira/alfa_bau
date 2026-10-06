import { photos } from "./photos";
export const siteUrl = "https://alfa66bau.de";
export const company = {
  name: "Alfa66Bau GmbH",
  phone: "+49 160 96341086",
  phoneHref: "tel:+4916096341086",
  email: "info@alfa66bau.de",
  address: "Wendenstraße 309, 20537 Hamburg",
};

export const navigation = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/personal", label: "Personal" },
  { href: "/einsatzteams", label: "Einsatzteams" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/karriere", label: "Karriere" },
];

export const services = [
  { slug: "tiefbaukolonnen", photo: photos.siteTeam, gallery: [photos.excavation, photos.shaft, photos.trench], title: "Tiefbaukolonnen", icon: "worker", description: "Erfahrene Teams für alle Bereiche des Tiefbaus.", detail: "Besprechen Sie mit uns Ihren Bedarf an Fachkräften für Erdarbeiten, Kanalbau und Leitungsbau. Gemeinsam stimmen wir Aufgaben, Teamgröße und Einsatzzeitraum ab." },
  { slug: "maschinenfuehrer", photo: photos.excavation, gallery: [photos.siteTeam, photos.shaft], title: "Maschinenführer", icon: "machine", description: "Qualifizierte Bagger-, Radlader- und Geräteführer.", detail: "Für den Einsatz Ihrer Baumaschinen klären wir die benötigte Erfahrung, die Geräteklasse und die Anforderungen auf Ihrer Baustelle." },
  { slug: "pflasterkolonnen", photo: photos.path, gallery: [photos.pavingDetail, photos.trackPaving, photos.pavingWorker], title: "Pflasterkolonnen", icon: "paving", description: "Fachkräfte für Pflaster- und Wegebauarbeiten.", detail: "Ob Wege, Plätze oder Außenanlagen: Wir besprechen die Flächen, Materialien und den geplanten Ablauf Ihres Vorhabens." },
  { slug: "rohrleitungskolonnen", photo: photos.ducts, gallery: [photos.trench, photos.drainage, photos.ductEntry], title: "Rohrleitungskolonnen", icon: "pipe", description: "Fachkräfte für Rohr-, Kanal- und Leitungsbau.", detail: "Teilen Sie uns die Art der Leitungsarbeiten und die Anforderungen Ihres Projekts mit. Wir klären die passende Unterstützung für Ihren Einsatz." },
  { slug: "baustellenpersonal", photo: photos.pavingWorker, gallery: [photos.siteTeam, photos.pavingDetail], title: "Baustellenpersonal", icon: "helmet", description: "Allrounder, Hilfs- und Facharbeiter für Ihr Projekt.", detail: "Unterstützung bei den täglichen Aufgaben auf Ihrer Baustelle. Wir stimmen mit Ihnen ab, welche Tätigkeiten und Qualifikationen benötigt werden." },
  { slug: "flexible-einsatzteams", photo: photos.siteTeam, gallery: [photos.pavingWorker, photos.excavation], title: "Flexible Einsatzteams", icon: "team", description: "Passende Teams für Ihren Bedarf und Projektablauf.", detail: "Ihr Bedarf verändert sich im Projektverlauf? Sprechen Sie mit uns über den gewünschten Umfang und Zeitraum Ihres Einsatzteams." },
  // Existing service routes remain available outside the main six-card overview.
  { slug: "gartenbau", photo: photos.path, gallery: [photos.steps, photos.pavingDetail], title: "Gartenbau", icon: "paving", description: "Gestaltung und Pflege von Gärten, Grünflächen und Pflanzungen.", detail: "Sprechen Sie mit uns über die Gestaltung und Pflege Ihres Gartens. Wir klären Ihre Wünsche und den Umfang der Arbeiten." },
  { slug: "tiefbau", photo: photos.excavation, gallery: [photos.shaft, photos.trench, photos.ducts], title: "Tiefbau", icon: "worker", description: "Erdarbeiten, Fundamente und Arbeiten an unterirdischen Leitungen.", detail: "Wir besprechen Ihr Bauvorhaben und die passende Unterstützung für Erdarbeiten, Fundamente und Leitungsarbeiten." },
  { slug: "landschaftsbau", photo: photos.path, gallery: [photos.steps, photos.trackPaving], title: "Landschaftsbau", icon: "paving", description: "Außenanlagen, Wege und Flächen für Ihre Außenräume.", detail: "Beschreiben Sie uns Ihre Außenanlage und die geplanten Arbeiten. Gemeinsam klären wir die nächsten Schritte." },
] as const;

export const personnel = [
  { title: "Baggerfahrer", photo: photos.excavation, description: "Maschinenführer für den Einsatz auf Ihrer Baustelle.", type: "maschinenfuehrer" },
  { title: "Radladerfahrer", photo: photos.loader, description: "Unterstützung bei Materialumschlag und Erdbewegung.", type: "maschinenfuehrer" },
  { title: "LKW-Fahrer", photo: photos.truck, description: "Transport und Materiallogistik auf der Baustelle.", type: "baustellenpersonal" },
  { title: "Pflasterkolonnen", photo: photos.pavingWorker, description: "Fachkräfte für den Bau von Wegen und Plätzen.", type: "pflasterkolonnen" },
  { title: "Tiefbaukolonnen", photo: photos.siteTeam, description: "Teams für Kanal-, Rohr- und Leitungsbau.", type: "tiefbaukolonnen" },
  { title: "Baustellenpersonal", photo: photos.siteTeam, description: "Unterstützung bei den täglichen Aufgaben.", type: "baustellenpersonal" },
];

export const projectCategories = ["Alle", "Tiefbau", "Leitungsbau", "Pflasterbau", "Außenanlagen"] as const;
export const projects = [
  { id: "erdarbeiten", photo: photos.excavation, title: "Erdarbeiten & Tiefbau", category: "Tiefbau", description: "Aushubarbeiten in einer gesicherten Baugrube." },
  { id: "leitungen", photo: photos.ducts, title: "Kanal- & Leitungsbau", category: "Leitungsbau", description: "Verlegung von Schutzrohren und Leitungen im Graben." },
  { id: "wege", photo: photos.path, title: "Wege & Pflasterflächen", category: "Pflasterbau", description: "Geschwungener Pflasterweg mit Einfassung und Bepflanzung." },
  { id: "baustellen", photo: photos.pavingWorker, title: "Teams im Einsatz", category: "Pflasterbau", description: "Verdichtung einer Pflasterfläche bei der Ausführung." },
  { id: "aussenanlagen", photo: photos.steps, title: "Außenanlagen", category: "Außenanlagen", description: "Treppenanlage und angrenzende Außenflächen." },
];

export function inquiryHref(type = "projekt") { return "/kontakt?anfrage=" + encodeURIComponent(type) + "#anfrage"; }
