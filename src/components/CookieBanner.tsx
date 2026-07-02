"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "carl_ai_cookie_ack";

/**
 * Minimaler Datenschutz-Hinweis. Die Seite nutzt nur technisch notwendige
 * Cookies (kein Tracking-Cookie) — daher reine Information, kein Consent-Gate.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // One-shot read of external storage on mount to decide visibility.
    // localStorage is client-only, so this cannot run during render/SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  const ack = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };

  return (
    <div className="cookie-banner" role="region" aria-label="Datenschutzhinweis">
      <p>
        Diese Seite nutzt nur technisch notwendige Cookies. Mehr in der{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button className="btn-primary" onClick={ack}>
        Verstanden
      </button>
    </div>
  );
}
