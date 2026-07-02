import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Website-Entwicklung, Sichtbarkeit (SEO & GEO), KI-Chatbot und Anfrage-Automatisierung für lokale Unternehmen.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Leistungen", url: "/leistungen" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Leistungen</div>
          <h1 className="section-title">Was wir bauen</h1>
          <p className="section-sub">
            Vier Bausteine rund um deinen Auftritt im Netz — einzeln oder
            kombiniert. Website, Sichtbarkeit, Chatbot, Anfrage-Automatisierung.
          </p>
        </Reveal>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section cta-banner">
        <Reveal>
          <div className="cta-inner">
            <h2 className="section-title">Nicht sicher, was passt?</h2>
            <p className="section-sub">
              Im kostenlosen Erstgespräch finden wir den größten Hebel für dein
              Unternehmen.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Kostenloses Erstgespräch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
