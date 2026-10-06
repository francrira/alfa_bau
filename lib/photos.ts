export type SitePhoto = {
  src: string;
  smallSrc: string;
  alt: string;
  position?: string;
  generated?: boolean;
};

function work(name: string, alt: string, position = "50% 50%"): SitePhoto {
  return { src: "/images/work/" + name + ".webp", smallSrc: "/images/work/" + name + "-640.webp", alt, position };
}
function illustration(name: string, alt: string): SitePhoto {
  return { src: "/images/generated/" + name + ".webp", smallSrc: "/images/generated/" + name + "-640.webp", alt, generated: true };
}

// Approved shortlist sources and export provenance: photo-candidates/IMPLEMENTED.md.
export const photos = {
  excavation: work("excavation", "Bagger bei Aushubarbeiten in einer gesicherten Baugrube.", "50% 40%"),
  siteTeam: work("site-team", "Mitarbeiter bei Bauarbeiten mit einem Bagger und Anbaugerät.", "50% 70%"),
  shaft: work("shaft-installation", "Betonschacht mit angeschlossener Rohrleitung."),
  ducts: work("utility-ducts", "Parallel verlegte Schutzrohre mit Abstandshaltern im Graben.", "50% 55%"),
  trench: work("trench-pipework", "Leitungen in einem gesicherten Leitungsgraben."),
  drainage: work("drainage-connections", "Grüne Rohrleitungen und Anschlüsse im Erdreich."),
  ductEntry: work("duct-entry", "Einführung von Schutzrohren in ein Bauwerk."),
  path: work("paved-path", "Geschwungener Pflasterweg mit Einfassung und angrenzender Bepflanzung.", "50% 60%"),
  pavingDetail: work("paving-detail", "Pflastersteine um eine runde Schachtabdeckung."),
  steps: work("outdoor-steps", "Treppenanlage mit angrenzenden Außenflächen."),
  pavingWorker: work("paving-worker", "Mitarbeiter beim Verdichten einer Pflasterfläche.", "60% 12%"),
  trackPaving: work("paving-along-tracks", "Gepflasterte Fläche neben Gleisen."),
  loader: illustration("wheel-loader", "Radlader auf einer Baustelle – KI-generiertes Symbolbild."),
  truck: illustration("tipper-truck", "Kipper auf einer Baustelle – KI-generiertes Symbolbild."),
};
