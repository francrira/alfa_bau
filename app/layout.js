import "./globals.css";

export const metadata = {
  title: "Alfa66 Bau GmbH | Tiefbau in Hamburg",
  description: "Alfa66 Bau GmbH – Tiefbau, Erdarbeiten, Kabeltiefbau, Rohrleitungsbau und Pflasterarbeiten in Hamburg und Umgebung.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
