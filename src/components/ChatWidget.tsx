"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Chat-Widget — UI-Platzhalter. Zeigt Begrüßung + schnelle Aktionen.
 * Echte KI-Antworten kommen später über /api/chatbot (TODO).
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat">
          <div className="chat-head">
            <span>
              <span className="logo-dot" aria-hidden /> Novaris
            </span>
            <button
              className="chat-close"
              aria-label="Chat schließen"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="chat-body">
            <div className="chat-msg">
              Hallo! 👋 Wie können wir helfen? Mehr über Website, Sichtbarkeit
              und Anfrage-Automatisierung erfahren oder direkt ein Erstgespräch
              vereinbaren?
            </div>
            <p className="chat-note">
              Live-Chat folgt in Kürze. Bis dahin am schnellsten direkt:
            </p>
          </div>
          <div className="chat-actions">
            <a href={SITE.phoneHref} className="btn-primary">
              Anrufen
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              E-Mail
            </a>
          </div>
        </div>
      )}
      <button
        className="chat-fab"
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "💬"}
      </button>
    </>
  );
}
