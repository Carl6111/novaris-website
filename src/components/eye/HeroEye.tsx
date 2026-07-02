"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Interaktives Marken-Auge: statischer Roboter-Sockel + separate Iris-Scheibe,
 * die dem Cursor folgt (im Sockel "wandert"). Geometrie als % der quadratischen
 * Sockel-Box — aus dem generierten Bild vermessen.
 */
const CAVITY_X = 46.82; // Höhlen-Zentrum X in %
const CAVITY_Y = 50.51; // Höhlen-Zentrum Y in %
const IRIS = 21.09; // Iris-Durchmesser in % der Breite
const MOVE = 3.71; // max. Wander-Weg in % der Breite
const RAMP_PX = 420; // ab dieser Cursor-Distanz volle Auslenkung

export default function HeroEye() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const iris = irisRef.current;
    if (!wrap || !iris) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      iris.style.transform = "translate(-50%, -50%)";
      return;
    }
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      idle = 0;

    const maxPx = () => (wrap.clientWidth * MOVE) / 100;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const ex = r.left + (r.width * CAVITY_X) / 100;
      const ey = r.top + (r.height * CAVITY_Y) / 100;
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(len, RAMP_PX) / RAMP_PX;
      const m = maxPx();
      tx = (dx / len) * m * k;
      ty = (dy / len) * m * k;
    };

    const loop = () => {
      if (!fine) {
        // sanfte Idle-Drift auf Touch (kein Cursor)
        idle += 0.012;
        const m = maxPx();
        tx = Math.cos(idle) * m * 0.7;
        ty = Math.sin(idle * 0.8) * m * 0.7;
      }
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      iris.style.transform = `translate(-50%, -50%) translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };

    if (fine) window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="hero-eye" ref={wrapRef} aria-hidden>
      <Image
        src="/images/eye-socket.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 860px) 90vw, 50vw"
        className="hero-eye-socket"
      />
      <div
        className="hero-eye-iris"
        ref={irisRef}
        style={{
          left: `${CAVITY_X}%`,
          top: `${CAVITY_Y}%`,
          width: `${IRIS}%`,
        }}
      >
        <Image src="/images/eye-iris.png" alt="" fill sizes="20vw" />
      </div>
    </div>
  );
}
