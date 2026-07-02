"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { PALETTE } from "./palette";
import type { ProgressRef } from "./EyeScene";

const EyeScene = dynamic(() => import("./EyeScene"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function LoadingScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: PALETTE.paper,
        display: "grid",
        placeItems: "center",
        color: PALETTE.ink,
        fontFamily: "var(--font-body), system-ui, sans-serif",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        fontSize: "0.7rem",
        opacity: 0.5,
        zIndex: 2,
      }}
    >
      Novaris
    </div>
  );
}

function ReducedMotionHero() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: PALETTE.paper,
        color: PALETTE.ink,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1rem",
        padding: "2rem",
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: "0.78rem", letterSpacing: "0.42em", textTransform: "uppercase", opacity: 0.6, margin: 0 }}>
        Novaris
      </p>
      <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
        Wir bauen das System,<br />das in Ihnen arbeitet.
      </h1>
      <p style={{ fontSize: "1rem", opacity: 0.6, maxWidth: 520, margin: 0 }}>
        Hunderte Agenten im Inneren Ihres Unternehmens. Drei Pakete, ein System.
      </p>
    </main>
  );
}

const ink = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: "var(--font-body), system-ui, sans-serif",
  color: PALETTE.ink,
  margin: 0,
  ...extra,
});

const PACKAGES = [
  { title: "Automations", price: "500 €/Mo", stripe: "#22C4D6", desc: "Einzelne automatisierte Lösungen für konkrete Probleme.", featured: false },
  { title: "Pipeline", price: "2.000 €/Mo", stripe: "#E8479B", desc: "Lead- & Sales-Pipeline plus Automatisierungen.", featured: false },
  { title: "Growth Engine Plus", price: "4.000 €/Mo", stripe: "#F6A623", desc: "Website, CRM, AI Docs, Client Portal & Invoicing in einem System.", featured: true },
];

export default function EyeHero() {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const progressRef = useRef<{ v: number }>({ v: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setReady(true);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || !ready) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      progressRef.current.v = p;

      // Packages emerge from the tunnel's vanishing point and approach the
      // camera as you scroll the final stretch — the clean transition.
      const prog = Math.min(Math.max((p - 0.8) / 0.2, 0), 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      if (dimRef.current) dimRef.current.style.opacity = String(eased * 0.5);
      if (headingRef.current) headingRef.current.style.opacity = String(Math.max((prog - 0.25) / 0.75, 0));
      if (cardsWrapRef.current) cardsWrapRef.current.style.pointerEvents = prog > 0.92 ? "auto" : "none";
      const spread = Math.min(window.innerWidth * 0.26, 340);
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const tx = (i - 1) * spread * eased;
        const scale = 0.18 + eased * 0.82;
        card.style.opacity = String(Math.min(eased * 1.4, 1));
        card.style.transform = `translate(-50%, -50%) translateX(${tx}px) scale(${scale})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, ready]);

  if (!ready) return <LoadingScreen />;
  if (reduced) return <ReducedMotionHero />;

  return (
    <div ref={wrapRef} style={{ position: "relative", background: PALETTE.paper }}>
      <EyeScene progressRef={progressRef as ProgressRef} />

      {/* Dim — darkens the tunnel slightly so the approaching cards read. */}
      <div
        ref={dimRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(8,10,16,0) 18%, rgba(8,10,16,0.85) 80%)",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Scroll track — drives the camera. Overlays sit over the fixed canvas. */}
      <div style={{ position: "relative", height: "420vh", zIndex: 1, pointerEvents: "none" }}>
        {/* Intro */}
        <div style={{ position: "absolute", top: "7vh", width: "100%", textAlign: "center", padding: "0 1.5rem" }}>
          <p style={ink({ fontSize: "0.78rem", letterSpacing: "0.42em", textTransform: "uppercase", opacity: 0.55 })}>
            Novaris
          </p>
          <h1 style={ink({ fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.02, marginTop: "0.7rem" })}>
            Wir bauen das System,<br />das in Ihnen arbeitet.
          </h1>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", top: "78vh", width: "100%", textAlign: "center" }}>
          <p style={ink({ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.4 })}>
            Scrollen ↓
          </p>
        </div>

        {/* Inside the eye */}
        <div style={{ position: "absolute", top: "250vh", width: "100%", textAlign: "center", padding: "0 1.5rem" }}>
          <h2 style={ink({ color: "#fff", fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.02em" })}>
            Im Inneren: hunderte Agenten,<br />die für Sie arbeiten.
          </h2>
        </div>
      </div>

      {/* Packages approaching from inside the tunnel */}
      <div ref={cardsWrapRef} style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}>
        <div
          ref={headingRef}
          style={{
            position: "absolute",
            top: "11vh",
            width: "100%",
            textAlign: "center",
            opacity: 0,
            color: "#fff",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
            Drei Pakete. Ein System.
          </h2>
        </div>

        {PACKAGES.map((pkg, i) => (
          <div
            key={pkg.title}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "56%",
              width: 290,
              opacity: 0,
              transform: "translate(-50%, -50%) scale(0.18)",
              willChange: "transform, opacity",
              borderRadius: 18,
              padding: "1.6rem 1.4rem",
              background: pkg.featured ? "#111114" : "#ffffff",
              color: pkg.featured ? "#fff" : PALETTE.ink,
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              textAlign: "left",
            }}
          >
            <div style={{ height: 4, width: 48, borderRadius: 4, background: pkg.stripe, marginBottom: "1rem" }} />
            <div style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.01em" }}>{pkg.title}</div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.02em", marginTop: "0.4rem", color: pkg.featured ? "#F6A623" : PALETTE.ink }}>
              {pkg.price}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.55, marginTop: "0.5rem" }}>Richtpreis · monatlich</div>
            <div style={{ fontSize: "0.82rem", opacity: 0.7, marginTop: "0.9rem", lineHeight: 1.45 }}>{pkg.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
