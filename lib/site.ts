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
  { slug: "tiefbaukolonnen", title: "Tiefbaukolonnen", icon: "worker", description: "Erfahrene Teams für alle Bereiche des Tiefbaus.", detail: "Besprechen Sie mit uns Ihren Bedarf an Fachkräften für Erdarbeiten, Kanalbau und Leitungsbau. Gemeinsam stimmen wir Aufgaben, Teamgröße und Einsatzzeitraum ab." },
  { slug: "maschinenfuehrer", title: "Maschinenführer", icon: "machine", description: "Qualifizierte Bagger-, Radlader- und Geräteführer.", detail: "Für den Einsatz Ihrer Baumaschinen klären wir die benötigte Erfahrung, die Geräteklasse und die Anforderungen auf Ihrer Baustelle." },
  { slug: "pflasterkolonnen", title: "Pflasterkolonnen", icon: "paving", description: "Fachkräfte für Pflaster- und Wegebauarbeiten.", detail: "Ob Wege, Plätze oder Außenanlagen: Wir besprechen die Flächen, Materialien und den geplanten Ablauf Ihres Vorhabens." },
  { slug: "rohrleitungskolonnen", title: "Rohrleitungskolonnen", icon: "pipe", description: "Fachkräfte für Rohr-, Kanal- und Leitungsbau.", detail: "Teilen Sie uns die Art der Leitungsarbeiten und die Anforderungen Ihres Projekts mit. Wir klären die passende Unterstützung für Ihren Einsatz." },
  { slug: "baustellenpersonal", title: "Baustellenpersonal", icon: "helmet", description: "Allrounder, Hilfs- und Facharbeiter für Ihr Projekt.", detail: "Unterstützung bei den täglichen Aufgaben auf Ihrer Baustelle. Wir stimmen mit Ihnen ab, welche Tätigkeiten und Qualifikationen benötigt werden." },
  { slug: "flexible-einsatzteams", title: "Flexible Einsatzteams", icon: "team", description: "Passende Teams für Ihren Bedarf und Projektablauf.", detail: "Ihr Bedarf verändert sich im Projektverlauf? Sprechen Sie mit uns über den gewünschten Umfang und Zeitraum Ihres Einsatzteams." },
  // Existing service routes remain available outside the main six-card overview.
  { slug: "gartenbau", title: "Gartenbau", icon: "paving", description: "Gestaltung und Pflege von Gärten, Grünflächen und Pflanzungen.", detail: "Sprechen Sie mit uns über die Gestaltung und Pflege Ihres Gartens. Wir klären Ihre Wünsche und den Umfang der Arbeiten." },
  { slug: "tiefbau", title: "Tiefbau", icon: "worker", description: "Erdarbeiten, Fundamente und Arbeiten an unterirdischen Leitungen.", detail: "Wir besprechen Ihr Bauvorhaben und die passende Unterstützung für Erdarbeiten, Fundamente und Leitungsarbeiten." },
  { slug: "landschaftsbau", title: "Landschaftsbau", icon: "paving", description: "Außenanlagen, Wege und Flächen für Ihre Außenräume.", detail: "Beschreiben Sie uns Ihre Außenanlage und die geplanten Arbeiten. Gemeinsam klären wir die nächsten Schritte." },
] as const;

export const personnel = [
  { title: "Baggerfahrer", description: "Maschinenführer für den Einsatz auf Ihrer Baustelle.", type: "maschinenfuehrer" },
  { title: "Radladerfahrer", description: "Unterstützung bei Materialumschlag und Erdbewegung.", type: "maschinenfuehrer" },
  { title: "LKW-Fahrer", description: "Transport und Materiallogistik auf der Baustelle.", type: "baustellenpersonal" },
  { title: "Pflasterkolonnen", description: "Fachkräfte für den Bau von Wegen und Plätzen.", type: "pflasterkolonnen" },
  { title: "Tiefbaukolonnen", description: "Teams für Kanal-, Rohr- und Leitungsbau.", type: "tiefbaukolonnen" },
  { title: "Baustellenpersonal", description: "Unterstützung bei den täglichen Aufgaben.", type: "baustellenpersonal" },
];

export const projectCategories = ["Alle", "Tiefbau", "Leitungsbau", "Pflasterbau", "Außenanlagen"] as const;
export const projects = [
  { id: "erdarbeiten", title: "Erdarbeiten & Tiefbau", category: "Tiefbau", description: "Platz für Einblicke in Erdarbeiten und Baustellenvorbereitung." },
  { id: "leitungen", title: "Kanal- & Leitungsbau", category: "Leitungsbau", description: "Platz für Projekte rund um Leitungen und Infrastruktur." },
  { id: "wege", title: "Wege & Pflasterflächen", category: "Pflasterbau", description: "Platz für Pflasterarbeiten, Wege und Plätze." },
  { id: "baustellen", title: "Teams im Einsatz", category: "Tiefbau", description: "Platz für Einblicke in den Baustellenalltag." },
  { id: "aussenanlagen", title: "Außenanlagen", category: "Außenanlagen", description: "Platz für die Gestaltung von Außenräumen." },
];

export function inquiryHref(type = "projekt") { return "/kontakt?anfrage=" + encodeURIComponent(type) + "#anfrage"; }
