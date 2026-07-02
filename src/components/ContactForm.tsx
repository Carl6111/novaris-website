"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

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
          // anti-spam signals: time on form + hidden honeypot
          elapsedMs: Date.now() - loadedAt.current,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Senden fehlgeschlagen.");
      }
      setStatus("ok");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-success">
        <div className="label-mono">Danke!</div>
        <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
          Nachricht ist da.
        </h2>
        <p className="service-desc">
          Wir melden uns innerhalb von 24 Stunden bei dir.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — must stay empty. Hidden from users + screen readers. */}
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
          <input type="text" name="name" required />
        </label>
        <label className="form-field">
          <span>Firma</span>
          <input type="text" name="firma" />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span>E-Mail *</span>
          <input type="email" name="email" required />
        </label>
        <label className="form-field">
          <span>Telefon</span>
          <input type="tel" name="telefon" />
        </label>
      </div>

      <label className="form-field">
        <span>Budget-Range</span>
        <select name="budget" defaultValue="">
          <option value="">Keine Angabe</option>
          <option value="bis-1000">bis 1.000 €</option>
          <option value="1000-3000">1.000 – 3.000 €</option>
          <option value="3000-plus">über 3.000 €</option>
          <option value="unsicher">Noch unklar</option>
        </select>
      </label>

      <label className="form-field">
        <span>Nachricht *</span>
        <textarea name="nachricht" rows={5} required />
      </label>

      {status === "error" && <p className="form-error">{error}</p>}

      <button
        type="submit"
        className="btn-primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sende…" : "Nachricht senden"}
      </button>
    </form>
  );
}
