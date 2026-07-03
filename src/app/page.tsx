import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookingButton from "@/components/BookingButton";
import HeroVisual from "@/components/HeroVisual";
import ModuleIcon from "@/components/ModuleIcon";
import PlatformShowcase from "@/components/PlatformShowcase";
import WordSweep from "@/components/WordSweep";
import CountUp from "@/components/CountUp";
import FaqAccordion from "@/components/FaqAccordion";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { MODULES, PROCESS, FAQ, BOOKING, SITE } from "@/lib/site";

const MARQUEE = [
  "Website",
  "SEO & GEO",
  "KI-Chatbot",
  "Anfrage-Automatisierung",
  "CRM",
  "AI Docs",
  "Client Portal",
  "Invoicing",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* ============ HERO (bewahrt) ============ */}
      <section className="hero">
        <HeroVisual />
        <div className="hero-glow" aria-hidden />
        <div className="hero-content">
          <div className="hero-label">Growth Engine Plus</div>
          <h1 className="hero-title">
            Dein Betrieb.
            <br />
            <em>Sichtbar.</em>
            <br />
            <span className="hl">Auf Autopilot.</span>
          </h1>
          <p className="hero-desc">
            Website, Sichtbarkeit, KI-Chatbot, CRM, Angebote, Kundenportal und
            Rechnungen — eine Plattform, die deinen ganzen Betrieb online laufen
            lässt.
          </p>
          <div className="hero-actions">
            <BookingButton className="btn-primary">
              {BOOKING.label}
            </BookingButton>
            <Link href="#plattform" className="btn-ghost">
              Plattform ansehen
            </Link>
          </div>
          <p className="cta-trust">
            Kostenlos &amp; unverbindlich · Monatlich kündbar · DSGVO-konform
          </p>
        </div>
        <div className="scroll-cue" aria-hidden>
          <span className="scroll-cue-line" />
          scroll
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee" aria-hidden>
        <div className="marquee-row">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="marquee-item">
              {w}
              <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ THE SHIFT ============ */}
      <section className="section shift" id="warum">
        <Reveal>
          <div className="label-mono">Warum</div>
        </Reveal>
        <WordSweep
          as="h2"
          className="shift-statement"
          text="Die meisten lokalen Betriebe verlieren keine Kunden, weil sie schlecht sind. Sondern weil man sie online nicht findet — und weil Anfragen im Postfach versickern."
        />
        <Reveal>
          <p className="shift-foot">
            Growth Engine Plus schließt genau diese Lücke. Ein System, das dich
            sichtbar macht und keine Anfrage mehr verlieren lässt.
          </p>
        </Reveal>
      </section>

      {/* ============ PLATFORM INTRO ============ */}
      <section className="section platform-intro">
        <Reveal>
          <div className="label-mono" style={{ justifyContent: "center" }}>
            Growth Engine Plus
          </div>
          <h2 className="platform-title">
            Nicht zehn Tools.
            <br />
            <em>Ein</em> System.
          </h2>
          <p className="platform-sub">
            Alles, was ein Betrieb online braucht, greift ineinander — von der
            ersten Google-Suche bis zur bezahlten Rechnung. Scroll dich durch die
            Bausteine.
          </p>
        </Reveal>
      </section>

      {/* ============ BENTO — alle Module auf einen Blick ============ */}
      <section className="section bento-section">
        <div className="bento-grid">
          {MODULES.map((m, i) => (
            <Reveal
              key={m.id}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className={`bento-cell bento-${m.id}`}
            >
              <span className="bento-icon">
                <ModuleIcon id={m.id} />
              </span>
              <div className="bento-text">
                <span className="bento-index">{m.index}</span>
                <h3 className="bento-name">{m.name}</h3>
                <p className="bento-tagline">{m.tagline}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SHOWCASE (Kino-Kern) ============ */}
      <PlatformShowcase modules={MODULES} />

      {/* ============ PROCESS ============ */}
      <section className="section process-cinematic surface" id="ablauf">
        <Reveal>
          <div className="label-mono">Ablauf</div>
          <h2 className="section-title">
            Vom Gespräch
            <br />
            zum laufenden System.
          </h2>
          <p className="section-sub">
            Drei klare Schritte. Kein Fachchinesisch, kein Risiko im ersten
            Schritt.
          </p>
        </Reveal>
        <div className="process-line">
          {PROCESS.map((step, i) => (
            <Reveal
              key={step.num}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="process-node"
            >
              <div className="node-rail" aria-hidden>
                <span className="node-dot" />
              </div>
              <div className="node-body">
                <div className="node-num">{step.num}</div>
                <h3 className="node-title">{step.title}</h3>
                <p className="node-desc">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ OUTCOME ============ */}
      <section className="section outcome">
        <Reveal>
          <div className="label-mono" style={{ justifyContent: "center" }}>
            Was sich ändert
          </div>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Mehr Output.
            <br />
            <em>Gleiches Team.</em>
          </h2>
        </Reveal>
        <div className="outcome-grid">
          <Reveal delay={1} className="outcome-cell">
            <span className="outcome-num">
              <CountUp to={24} suffix="/7" />
            </span>
            <span className="outcome-label">
              erreichbar — Chatbot & Automatisierung schlafen nie
            </span>
          </Reveal>
          <Reveal delay={2} className="outcome-cell">
            <span className="outcome-num">
              <CountUp to={0} />
            </span>
            <span className="outcome-label">
              verlorene Anfragen — jede landet automatisch im System
            </span>
          </Reveal>
          <Reveal delay={3} className="outcome-cell">
            <span className="outcome-num">
              <CountUp to={1} />
            </span>
            <span className="outcome-label">
              Plattform statt Zettelwirtschaft aus zehn Insellösungen
            </span>
          </Reveal>
        </div>
      </section>

      {/* ============ TECH-STRIP (ehrlich: echter Code, kein Baukasten) ============ */}
      <section className="section tech-strip">
        <Reveal>
          <div className="label-mono" style={{ justifyContent: "center" }}>
            Gebaut auf echtem Code
          </div>
          <p className="tech-strip-line">
            Kein Baukasten, kein Zapier-Bastelwerk. Deine Plattform läuft auf dem
            gleichen Stack wie moderne Software-Produkte.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="tech-logos">
            {[
              "Next.js",
              "React",
              "Claude",
              "OpenAI",
              "Supabase",
              "Stripe",
              "Vercel",
            ].map((t) => (
              <span className="tech-logo" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section surface" id="faq">
        <Reveal>
          <div className="label-mono">Häufige Fragen</div>
          <h2 className="section-title">FAQ</h2>
        </Reveal>
        <Reveal delay={1}>
          <FaqAccordion items={FAQ} />
        </Reveal>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section cta-final" id="kontakt">
        <div className="cta-final-glow" aria-hidden />
        <Reveal>
          <div className="cta-final-inner">
            <div className="label-mono" style={{ justifyContent: "center" }}>
              Nächster Schritt
            </div>
            <h2 className="cta-final-title">
              Lass uns dein System
              <br />
              <span className="hl-inline">aufbauen.</span>
            </h2>
            <p className="cta-final-sub">
              Kostenloses Erstgespräch, unverbindlich. Wir schauen uns deinen
              Betrieb an und zeigen dir den größten Hebel — in 20 Minuten.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <BookingButton className="btn-primary">
                {BOOKING.label}
              </BookingButton>
              <a href={SITE.phoneHref} className="btn-ghost">
                Direkt anrufen
              </a>
            </div>
            <p className="cta-trust" style={{ textAlign: "center" }}>
              Kostenlos &amp; unverbindlich · Monatlich kündbar · DSGVO-konform
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
