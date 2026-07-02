import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  JsonLd,
  serviceSchema,
  breadcrumbSchema,
} from "@/components/JsonLd";
import { SERVICES } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.intro,
    alternates: { canonical: `/leistungen/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema(service.name, service.intro, service.slug)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Leistungen", url: "/leistungen" },
          { name: service.name, url: `/leistungen/${service.slug}` },
        ])}
      />

      <header className="page-head">
        <Reveal>
          <div className="label-mono">{service.tag}</div>
          <h1 className="section-title" style={{ maxWidth: "12ch" }}>
            {service.headline}
          </h1>
          <p className="section-sub">{service.intro}</p>
        </Reveal>
      </header>

      <section className="section two-col" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="label-mono">Was du bekommst</div>
          <ul className="feature-list">
            {service.features.map((f, i) => (
              <li key={f}>
                <span className="feature-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={2}>
          <div
            style={{
              border: "1px solid var(--border)",
              padding: "2.5rem 2rem",
              background: "var(--surface)",
            }}
          >
            <div className="service-icon" style={{ color: "var(--accent)" }}>
              {service.icon}
            </div>
            <h2
              className="section-title"
              style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}
            >
              {service.name}
            </h2>
            <p className="service-desc" style={{ marginBottom: "2rem" }}>
              {service.short}
            </p>
            <Link href="/kontakt" className="btn-primary">
              Projekt anfragen
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section cta-banner">
        <Reveal>
          <div className="cta-inner">
            <h2 className="section-title">Klingt passend?</h2>
            <p className="section-sub">
              Kurzes Erstgespräch, unverbindlich. Wir klären, ob und wie das für
              dich Sinn ergibt.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Erstgespräch vereinbaren
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
