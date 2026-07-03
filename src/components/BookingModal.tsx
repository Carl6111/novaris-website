"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export const OPEN_BOOKING_EVENT = "novaris:open-booking";

/**
 * Zentrales Buchungs-Modal: ersetzt den Dead-End-Link zu #kontakt.
 * Kurzes 4-Feld-Formular (Name, Firma, E-Mail, größte Herausforderung) →
 * /api/contact. Öffnet global via window-Event (siehe BookingButton).
 * Sobald eine echte Termin-URL (Cal.com) in BOOKING.calUrl steht, wird sie
 * im Erfolgs-Screen als direkter Terminlink angeboten.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const loadedAt = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setError("");
      setOpen(true);
    };
    window.addEventListener(OPEN_BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    loadedAt.current = Date.now();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - loadedAt.current,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Senden fehlgeschlagen.");
      }
      setStatus("ok");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  if (!open) return null;

  const calUrl = (BOOKING as { calUrl?: string }).calUrl;

  return (
    <div
      className="book-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="book-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        ref={dialogRef}
      >
        <button
          className="book-close"
          aria-label="Schließen"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        {status === "ok" ? (
          <div className="book-success">
            <div className="label-mono">Angekommen</div>
            <h2 id="book-title" className="book-title">
              Danke — wir melden uns.
            </h2>
            <p className="book-sub">
              Antwort innerhalb von 24 Stunden. Wir schauen uns deinen Betrieb an
              und bringen einen konkreten Vorschlag mit.
            </p>
            {calUrl && (
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Termin direkt wählen
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="label-mono">Erstgespräch</div>
            <h2 id="book-title" className="book-title">
              Gespräch buchen
            </h2>
            <p className="book-sub">
              Kostenlos, unverbindlich, 20 Minuten. Sag uns kurz, worum es geht —
              wir melden uns innerhalb von 24 Stunden.
            </p>

            <form className="book-form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="honeypot"
              />
              <div className="form-row">
                <label className="form-field">
                  <span>Name *</span>
                  <input ref={firstFieldRef} type="text" name="name" required />
                </label>
                <label className="form-field">
                  <span>Firma</span>
                  <input type="text" name="firma" />
                </label>
              </div>
              <label className="form-field">
                <span>E-Mail *</span>
                <input type="email" name="email" required />
              </label>
              <label className="form-field">
                <span>Größte Herausforderung *</span>
                <textarea
                  name="nachricht"
                  rows={3}
                  required
                  placeholder="z. B. zu wenig Anfragen, zu viel Büroarbeit, unsichtbar bei Google…"
                />
              </label>

              {status === "error" && <p className="form-error">{error}</p>}

              <button
                type="submit"
                className="btn-primary book-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sende…" : "Gespräch anfragen"}
              </button>
              <p className="book-trust">
                Kostenlos &amp; unverbindlich · Monatlich kündbar · DSGVO-konform
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
