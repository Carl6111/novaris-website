# Carl.AI — AI Automation Agency Website

Marketing- und Lead-Gen-Website für Carl Staerkes AI Automation Agency.
Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel-ready.

Das Dark-Design ist aus der bestehenden Landing-Page
(`~/Downloads/agency-website/index.html`) portiert und auf eine
Multi-Page-Struktur erweitert.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production-Build
npm start        # Build lokal starten
```

## Seitenstruktur

| Route | Inhalt |
|---|---|
| `/` | Homepage: Hero, Services, Agents, Process, Anwendungsfälle, FAQ, CTA |
| `/leistungen` + `/leistungen/[slug]` | Übersicht + 4 Detailseiten |
| `/referenzen` | Anwendungsfälle mit Branchenfilter |
| `/blog` + `/blog/[slug]` | Blog (Starter-Stubs in `src/lib/posts.ts`) |
| `/ueber-uns`, `/kontakt`, `/preise` | Standardseiten |
| `/impressum`, `/datenschutz` | Rechtliches (Platzhalter) |
| `/sitemap.xml`, `/robots.txt` | Auto-generiert |

## Zentrale Konfiguration

Fast alle Inhalte/Daten liegen in:

- `src/lib/site.ts` — NAP, Kontakt, Navigation, Services, Anwendungsfälle, FAQ
- `src/lib/posts.ts` — Blog-Posts

## Wichtig vor Go-Live (Carl)

Im Code mit `TODO[carl]` oder `[PLATZHALTER]` markiert:

- [ ] **Echte Domain** in `src/lib/site.ts` (`SITE.url`)
- [ ] **Telefonnummer** + optional WhatsApp in `src/lib/site.ts`
- [ ] **Impressum** mit echter Anschrift + USt/Kleinunternehmer-Hinweis
- [ ] **Datenschutzerklärung** rechtlich prüfen lassen (Vorlage ≠ Beratung)
- [ ] **Kontaktformular-Versand** anbinden (`src/app/api/contact/route.ts`)
- [ ] **Anwendungsfälle**: Sobald echte Kunden existieren, `isPlaceholder`
      entfernen und echte Daten eintragen. Bis dahin sichtbar als „Beispiel"
      gekennzeichnet (UWG §5 — keine erfundenen Ergebnisse live).
- [ ] **Blog-Texte** finalisieren (aktuell Entwürfe)

## Geplante Integrationen (noch Platzhalter)

| Feature | Status | Ort |
|---|---|---|
| Kontaktformular-Versand | Validierung steht, Versand offen | `api/contact/route.ts` |
| KI-Chatbot | UI-only | `components/ChatWidget.tsx` |
| Analytics | nicht eingebunden | Empfehlung: Plausible (cookieless) |

## Env-Variablen

Aktuell keine zwingend nötig. Für spätere Integrationen
(`.env.local`, nie committen):

```bash
# Kontaktformular-Versand (z. B. Resend)
RESEND_API_KEY=

# KI-Chatbot (Anthropic)
ANTHROPIC_API_KEY=

# optional: Analytics-Domain (Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

> Secrets ausschließlich serverseitig. Nur Variablen mit `NEXT_PUBLIC_`
> landen im Client-Bundle.

## Deploy (Vercel)

```bash
npx vercel        # Preview
npx vercel --prod # Production
```

Repo public halten + diese `.gitignore` → Vercel-Deploy bleibt unproblematisch.
