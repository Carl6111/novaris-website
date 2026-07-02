"use client";

import { useEffect, useRef } from "react";
import ModuleIcon from "./ModuleIcon";

/**
 * Cleane Hero-Grafik: die Module als verbundene Nodes in einem lockeren Netz
 * (kein Kreis, kein Foto-Realismus). Sanftes Schweben + dezente Maus-Parallaxe.
 * Zeigt sofort: EIN verbundenes System aus echten Komponenten.
 */
type Node = {
  id:
    | "website"
    | "sichtbarkeit"
    | "chatbot"
    | "automatisierung"
    | "crm"
    | "aidocs"
    | "portal"
    | "invoicing";
  label: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "sichtbarkeit", label: "SEO & GEO", x: 30, y: 15 },
  { id: "website", label: "Website", x: 62, y: 12 },
  { id: "chatbot", label: "KI-Chatbot", x: 82, y: 26 },
  { id: "crm", label: "CRM", x: 50, y: 33 },
  { id: "aidocs", label: "AI Docs", x: 18, y: 34 },
  { id: "automatisierung", label: "Automatik", x: 74, y: 46 },
  { id: "portal", label: "Portal", x: 34, y: 52 },
  { id: "invoicing", label: "Rechnungen", x: 62, y: 60 },
];

// Kanten als Node-Index-Paare — lockeres Mesh.
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 4],
  [0, 4],
  [3, 5],
  [2, 5],
  [4, 6],
  [3, 6],
  [3, 7],
  [5, 7],
  [6, 7],
];

export default function HeroVisual() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tx = nx * -22;
      ty = ny * -14;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layer.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-net" aria-hidden>
      <div className="hero-net-layer" ref={layerRef}>
        <svg
          className="hero-net-lines"
          viewBox="0 0 100 72"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(201,169,106,0.05)" />
              <stop offset="0.5" stopColor="rgba(201,169,106,0.4)" />
              <stop offset="1" stopColor="rgba(201,169,106,0.05)" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="url(#edgeGrad)"
              strokeWidth={0.18}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {NODES.map((n, i) => (
          <div
            key={n.id}
            className="net-node"
            style={{
              left: `${n.x}%`,
              top: `${(n.y / 72) * 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          >
            <span className="net-node-icon">
              <ModuleIcon id={n.id} />
            </span>
            <span className="net-node-label">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
