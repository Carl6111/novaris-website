import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum gemäß § 5 DDG.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Rechtliches</div>
          <h1 className="section-title">Impressum</h1>
          <p className="placeholder-note">
            Platzhalter — echte Angaben vor Go-Live eintragen (§ 5 DDG).
          </p>
        </Reveal>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="prose">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {SITE.legalName}
            <br />
            [PLATZHALTER: Straße &amp; Hausnummer]
            <br />
            [PLATZHALTER: PLZ] {SITE.address.locality}
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: {SITE.phone}
            <br />
            E-Mail: {SITE.email}
          </p>

          <h2>Umsatzsteuer</h2>
          <p>
            [PLATZHALTER: USt-IdNr. gemäß § 27a UStG — oder Hinweis auf
            Kleinunternehmerregelung nach § 19 UStG]
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>{SITE.legalName} (Anschrift wie oben)</p>

          <h2>Streitschlichtung</h2>
          <p>
            Die EU-Kommission stellt eine Plattform zur
            Online-Streitbeilegung bereit. Wir sind nicht verpflichtet und
            nicht bereit, an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </section>
    </>
  );
}
