import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReferenzenGrid from "@/components/ReferenzenGrid";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { CASE_STUDIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referenzen",
  description:
    "Beispielhafte Einsatzszenarien rund um Website, Sichtbarkeit und Anfrage-Automatisierung. Echte Referenzen folgen mit den ersten Projekten.",
  alternates: { canonical: "/referenzen" },
};

export default function ReferenzenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Referenzen", url: "/referenzen" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Referenzen</div>
          <h1 className="section-title">Anwendungsfälle</h1>
          <p className="section-sub">
            Hover über eine Karte für Problem, Lösung und Ergebnis.
          </p>
          <p className="placeholder-note">
            Hinweis: Beispielszenarien — noch keine abgeschlossenen
            Referenzkunden. Echte Projekte ersetzen diese Beispiele.
          </p>
        </Reveal>
      </header>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <ReferenzenGrid studies={CASE_STUDIES} />
      </section>

      <section className="section cta-banner">
        <Reveal>
          <div className="cta-inner">
            <h2 className="section-title">Werde die erste Referenz</h2>
            <p className="section-sub">
              Frühe Projekte bekommen besondere Aufmerksamkeit. Lass uns reden.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Projekt anfragen
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
