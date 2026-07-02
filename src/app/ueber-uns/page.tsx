import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Warum diese Agency existiert: lokale Unternehmen mit moderner KI sichtbar und effizient machen — ohne Agentur-Blabla.",
  alternates: { canonical: "/ueber-uns" },
};

const VALUES = [
  {
    title: "Transparenz",
    desc: "Klare Preise, klare Schritte, regelmäßige Updates. Keine versteckten Kosten, kein Blabla.",
  },
  {
    title: "Technologie",
    desc: "Wir bauen mit aktuellen Tools — moderne Websites, sauberes SEO, KI da wo sie wirklich hilft.",
  },
  {
    title: "Messbare Ergebnisse",
    desc: "Jedes System hat ein Ziel: Zeit sparen, Anfragen gewinnen, Aufwand senken.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Über uns", url: "/ueber-uns" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Über uns</div>
          <h1 className="section-title">Wer hinter Novaris steht</h1>
          <p className="section-sub">
            Wir bauen Websites und machen lokale Unternehmen im Netz sichtbar —
            weil viele Betriebe digital unsichtbar bleiben und Anfragen
            verlieren, die längst hätten ankommen können.
          </p>
        </Reveal>
      </header>

      <section className="section two-col" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="label-mono">Mission</div>
          <h2 className="section-title" style={{ fontSize: "2rem" }}>
            Lokale Unternehmen
            <br />
            stärker machen
          </h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>
            Mit moderner Technologie und ohne Agentur-Blabla. Verständlich
            erklärt, sauber umgesetzt, langfristig betreut.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <ul className="feature-list">
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <span className="feature-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong style={{ color: "var(--text)" }}>{v.title}.</strong>{" "}
                  {v.desc}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section cta-banner">
        <Reveal>
          <div className="cta-inner">
            <h2 className="section-title">Lust auf ein Gespräch?</h2>
            <p className="section-sub">
              Erzähl uns, woran es gerade hakt — wir sagen dir ehrlich, ob wir
              helfen können.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Kontakt aufnehmen
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
