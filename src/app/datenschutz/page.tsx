import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Rechtliches</div>
          <h1 className="section-title">Datenschutzerklärung</h1>
          <p className="placeholder-note">
            Platzhalter / Vorlage — vor Go-Live rechtlich prüfen lassen. Keine
            Rechtsberatung.
          </p>
        </Reveal>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="prose">
          <h2>1. Verantwortlicher</h2>
          <p>
            {SITE.legalName}, {SITE.address.locality} — Kontakt: {SITE.email}.
            Vollständige Anschrift siehe Impressum.
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei einem Dienstleister gehostet
            [PLATZHALTER: z. B. Vercel Inc.]. Beim Aufruf werden technisch
            notwendige Server-Logs (IP-Adresse, Zeitpunkt, abgerufene Ressource)
            verarbeitet — Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an sicherem Betrieb).
          </p>

          <h2>3. Cookies</h2>
          <p>
            Es werden ausschließlich technisch notwendige Cookies verwendet. Es
            findet kein Tracking über Cookies statt.
          </p>

          <h2>4. Reichweitenmessung</h2>
          <p>
            [PLATZHALTER: Falls Plausible Analytics eingesetzt wird —
            cookielose, anonyme Messung ohne Personenbezug beschreiben.
            Andernfalls diesen Abschnitt entfernen.]
          </p>

          <h2>5. Kontaktformular</h2>
          <p>
            Wenn du das Kontaktformular nutzt, verarbeiten wir die angegebenen
            Daten (Name, E-Mail, ggf. Telefon, Nachricht) zur Bearbeitung deiner
            Anfrage — Rechtsgrundlage Art. 6 Abs. 1 lit. b und f DSGVO. Die Daten
            werden gelöscht, sobald sie nicht mehr benötigt werden.
          </p>

          <h2>6. Deine Rechte</h2>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
            sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.
          </p>

          <p>
            <strong>Hinweis:</strong> Diese Vorlage ersetzt keine
            Rechtsberatung. Vor Veröffentlichung von einer fachkundigen Stelle
            prüfen lassen.
          </p>
        </div>
      </section>
    </>
  );
}
