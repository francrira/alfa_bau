const services = [
  ["01", "Tiefbau", "Aushub, Baugruben, Gelände- und Infrastrukturarbeiten für Industrie, Gewerbe und Kommunen."],
  ["02", "Erdarbeiten", "Bodenaushub, Abtrag, Verfüllung, Verdichtung und vorbereitende Arbeiten."],
  ["03", "Kabeltiefbau", "Kabelgräben, Leerrohre und Trassenarbeiten für Versorgungs- und Infrastrukturprojekte."],
  ["04", "Rohrleitungsbau", "Erd- und Tiefbauarbeiten für Rohr- und Versorgungsleitungen."],
  ["05", "Pflaster- & Oberflächenarbeiten", "Pflasterflächen, Gehwege, Betriebsflächen und Wiederherstellung nach Tiefbauarbeiten."],
  ["06", "Industrie- & Gewerbetiefbau", "Flexible Tiefbauleistungen auf laufenden Industrie- und Gewerbestandorten."]
];

const projects = [
  ["Airbus Hamburg", "Rohrleitungen · Erdarbeiten · Tiefbau · Pflasterarbeiten", "Projektarbeit im Rahmen der Zusammenarbeit mit Rudolf Neber."],
  ["Aurubis Hamburg", "Tiefbau · Erdarbeiten · Kabelarbeiten", "Erfahrung auf anspruchsvollen Industrieflächen."],
  ["Mercedes-Benz", "Tiefbau · Parkflächen · Neubauprojekte", "Projektarbeit im Rahmen langjähriger Partnerleistungen."],
  ["Jungheinrich", "Tiefbauarbeiten", "Ausführung auf Gewerbe- und Industrieflächen."]
];

const strengths = [
  "Erfahrene Tiefbaukolonnen",
  "Qualifizierte Maschinenführer",
  "Flexible Einsatzteams",
  "Direkte Ansprechpartner",
  "Zuverlässige Ausführung",
  "Hamburg & Umgebung"
];

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <div className="topbar">
          <div className="container topbarInner">
            <span>Hamburg & Umgebung</span>
            <div>
              <a href="tel:+4916096341086">+49 160 96341086</a>
              <a href="mailto:info@alfa66bau.de">info@alfa66bau.de</a>
            </div>
          </div>
        </div>

        <div className="container nav">
          <a className="brand" href="#top" aria-label="Alfa66 Bau Startseite">
            <span className="brandMain">ALFA<span>66</span></span>
            <span className="brandSub">BAU GMBH</span>
          </a>

          <nav className="navLinks">
            <a href="#leistungen">Leistungen</a>
            <a href="#projekte">Projekte</a>
            <a href="#unternehmen">Unternehmen</a>
            <a href="#kleinprojekte">Kleinprojekte</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <a className="btn small" href="mailto:info@alfa66bau.de?subject=Projektanfrage Alfa66">
            Projekt anfragen
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="heroBg" />
        <div className="container heroInner">
          <div className="heroCopy">
            <p className="eyebrow light">Tiefbau · Industrie · Infrastruktur</p>
            <h1>Tiefbau.<br/><span>Zuverlässig.</span><br/>Aus Hamburg.</h1>
            <p className="heroText">
              Alfa66 Bau GmbH realisiert Tiefbau-, Erd-, Kabel-, Rohrleitungs- und Pflasterarbeiten für Industrie, Gewerbe und Partnerunternehmen in Hamburg und Umgebung.
            </p>
            <div className="actions">
              <a className="btn" href="#projekte">Für Unternehmen</a>
              <a className="btn ghost" href="#kontakt">Projekt anfragen</a>
            </div>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="container proofGrid">
          {strengths.map((item) => (
            <div className="proofItem" key={item}><span />{item}</div>
          ))}
        </div>
      </section>

      <section id="leistungen" className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">Leistungen</p>
              <h2>Kompetenz im Tiefbau. Flexibel in der Ausführung.</h2>
            </div>
            <p>Wir stellen erfahrene Fachkräfte und eingespielte Teams für anspruchsvolle Tiefbauprojekte bereit.</p>
          </div>

          <div className="serviceGrid">
            {services.map(([n,title,text]) => (
              <article className="serviceCard" key={n}>
                <span className="number">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projekte" className="section soft">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">Projekterfahrung</p>
              <h2>Im Einsatz auf anspruchsvollen Standorten.</h2>
            </div>
            <p>Ausgewählte Projekterfahrung aus Industrie, Gewerbe und Infrastruktur – vielfach im Rahmen langjähriger Zusammenarbeit mit etablierten deutschen Bauunternehmen.</p>
          </div>

          <div className="projectGrid">
            {projects.map(([place,work,note],i) => (
              <article className="projectCard" key={place}>
                <div className={"projectImage p"+i} />
                <div className="projectBody">
                  <h3>{place}</h3>
                  <p className="projectWork">{work}</p>
                  <p>{note}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="disclaimer">Genannte Standorte beschreiben Projekterfahrung. Vertrags- und Auftraggeberbeziehungen können über Partner- und Nachunternehmerleistungen erfolgt sein.</p>
        </div>
      </section>

      <section id="unternehmen" className="section">
        <div className="container companySplit">
          <div>
            <p className="eyebrow">Alfa66 Bau GmbH</p>
            <h2>Fachkräfte, die anpacken. Partner, auf die man sich verlassen kann.</h2>
          </div>
          <div className="bodyCopy">
            <p>Alfa66 ist ein familiengeführtes Bauunternehmen aus Hamburg. Unser Schwerpunkt liegt auf zuverlässiger Ausführung, flexiblen Einsatzteams und praktischer Erfahrung auf komplexen Baustellen.</p>
            <p>Für größere Partnerunternehmen bedeutet das: kurze Wege, eingespielte Kolonnen, qualifizierte Maschinenführer und direkte Kommunikation mit den Verantwortlichen vor Ort.</p>
          </div>
        </div>

        <div className="container workforce">
          {[
            ["01","Tiefbaukolonnen","Erfahrene Teams für Erd-, Kabel-, Rohrleitungs- und Tiefbauarbeiten."],
            ["02","Maschinenführer","Qualifizierte Fahrer und Bediener für den Baustelleneinsatz."],
            ["03","Pflasterkolonnen","Fachkräfte für Pflaster- und Wiederherstellungsarbeiten."],
            ["04","Flexible Einsatzteams","Projektbezogene Verstärkung passend zum tatsächlichen Bedarf."]
          ].map(([n,t,x]) => (
            <article key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></article>
          ))}
        </div>
      </section>

      <section id="kleinprojekte" className="section smallProjects">
        <div className="container smallGrid">
          <div>
            <p className="eyebrow">Kleinprojekte</p>
            <h2>Eine Fläche. Eine Idee. Eine einfache Anfrage.</h2>
            <p>Für Einfahrten, Parkflächen, Gehwege, Höfe und kleinere Pflasterarbeiten machen wir den Kontakt bewusst unkompliziert.</p>
            <a className="btn" href="mailto:info@alfa66bau.de?subject=Kleinprojekt Anfrage">Foto & Anfrage senden</a>
          </div>
          <div className="beforeAfter">
            <div className="preview"><span>Vorher</span><strong>Ihre Fläche</strong></div>
            <div className="arrow">→</div>
            <div className="preview after"><span>Vorschau</span><strong>Geplantes Ergebnis</strong></div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="container contactGrid">
          <div>
            <p className="eyebrow light">Projekt geplant?</p>
            <h2>Sprechen Sie direkt mit uns.</h2>
            <p>Ob Industrieprojekt, Partnerleistung oder kleinere Außenfläche – senden Sie uns die wichtigsten Informationen und wir melden uns.</p>
          </div>
          <div className="contactActions">
            <a href="tel:+4916096341086">+49 160 96341086</a>
            <a href="mailto:info@alfa66bau.de">info@alfa66bau.de</a>
            <span>Wendenstraße 309 · 20537 Hamburg</span>
            <a className="btn lightBtn" href="mailto:info@alfa66bau.de?subject=Projektanfrage Alfa66">Projekt anfragen</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footerInner">
          <div className="brand">
            <span className="brandMain">ALFA<span>66</span></span>
            <span className="brandSub">BAU GMBH</span>
          </div>
          <p>© 2026 Alfa66 Bau GmbH · Hamburg</p>
        </div>
      </footer>
    </main>
  );
}
