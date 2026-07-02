"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "carl_ai_exit_seen";

/**
 * Exit-Intent-Popup (nur Desktop). Bietet ein kostenloses Erstgespräch an —
 * ehrliche Einladung, keine erfundene Verknappung. Einmal pro Browser.
 */
export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem(KEY, "1");
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={() => setShow(false)}>
      <div
        className="popup"
        role="dialog"
        aria-label="Angebot"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup-close"
          aria-label="Schließen"
          onClick={() => setShow(false)}
        >
          ×
        </button>
        <div className="label-mono">Bevor du gehst</div>
        <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
          Kostenloses Erstgespräch
        </h2>
        <p className="service-desc" style={{ margin: "1rem 0 2rem" }}>
          Unverbindlich klären, wo KI deinem Unternehmen wirklich hilft. 15
          Minuten, ehrliche Einschätzung.
        </p>
        <Link
          href="/kontakt"
          className="btn-primary"
          onClick={() => setShow(false)}
        >
          Termin anfragen
        </Link>
      </div>
    </div>
  );
}
