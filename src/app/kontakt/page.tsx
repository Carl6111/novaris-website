import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Projekt anfragen oder anrufen — Antwort innerhalb von 24 Stunden.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Kontakt", url: "/kontakt" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Kontakt</div>
          <h1 className="section-title">Starten wir.</h1>
          <p className="section-sub">
            Projekt im Kopf? Schreib uns über das Formular oder ruf direkt an —
            Antwort innerhalb von 24 Stunden.
          </p>
        </Reveal>
      </header>

      <section className="section two-col" style={{ paddingTop: 0 }}>
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={2}>
          <div className="contact-direct">
            <div className="label-mono">Direkt</div>
            <a href={SITE.phoneHref} className="contact-direct-line">
              <span>Telefon</span>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="contact-direct-line">
              <span>E-Mail</span>
              {SITE.email}
            </a>
            {SITE.whatsapp && (
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-line"
              >
                <span>WhatsApp</span>
                Nachricht schreiben
              </a>
            )}
            <p
              className="service-desc"
              style={{ marginTop: "2rem", maxWidth: "32ch" }}
            >
              {SITE.legalName} · {SITE.address.locality},{" "}
              {SITE.address.region}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
