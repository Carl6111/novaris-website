import { NextResponse } from "next/server";

const MIN_FILL_MS = 2000; // submissions faster than this are almost certainly bots

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field.
  if (isNonEmptyString(data.website)) {
    return NextResponse.json({ ok: true }); // silently accept, drop
  }

  // Timing: a human takes more than two seconds to fill the form.
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }); // silently accept, drop
  }

  if (!isNonEmptyString(data.name)) {
    return NextResponse.json({ error: "Name fehlt." }, { status: 422 });
  }
  if (!isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "Gültige E-Mail fehlt." },
      { status: 422 },
    );
  }
  if (!isNonEmptyString(data.nachricht)) {
    return NextResponse.json({ error: "Nachricht fehlt." }, { status: 422 });
  }

  // TODO[carl]: Hier echten Versand anbinden — z. B. E-Mail (Resend) oder
  // CRM (Airtable/Notion). Aktuell wird die Anfrage validiert und akzeptiert,
  // aber noch nicht weitergeleitet. Secrets ausschließlich via env-Variablen.

  return NextResponse.json({ ok: true });
}
