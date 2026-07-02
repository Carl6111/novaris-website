import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Preise auf Anfrage — jedes Projekt ist anders. Im kostenlosen Erstgespräch bekommst du ein konkretes Angebot ohne versteckte Kosten.",
  alternates: { canonical: "/preise" },
};

const STEPS = [
  {
    num: "01",
    title: "Bedarf klären",
    desc: "Kostenloses Erstgespräch: Wo hakt es, was soll das System leisten?",
  },
  {
    num: "02",
    title: "Angebot",
    desc: "Du bekommst ein konkretes, schriftliches Angebot — Umfang und Preis transparent.",
  },
  {
    num: "03",
    title: "Umsetzung",
    desc: "Erst nach deiner Freigabe geht es los. Keine versteckten Kosten.",
  },
];

export default function PreisePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Preise", url: "/preise" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Preise</div>
          <h1 className="section-title">Preise auf Anfrage</h1>
          <p className="section-sub">
            Jedes Unternehmen ist anders — ein Pauschalpreis würde dir nicht
            gerecht. Du bekommst ein Angebot, das zu deinem Bedarf passt. Fair,
            transparent, ohne versteckte Kosten.
          </p>
          <Link href="/kontakt" className="btn-primary">
            Kostenloses Erstgespräch
          </Link>
        </Reveal>
      </header>

      <section className="section surface">
        <Reveal>
          <div className="label-mono">So läuft die Preisfindung</div>
          <h2 className="section-title">In drei Schritten zum Angebot</h2>
        </Reveal>
        <div className="process-steps">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.num}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="process-step"
            >
              <div className="step-number">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
