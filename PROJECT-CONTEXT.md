# Novaris — Projekt-Kontext (vollständig)

Stand: 2026-06-14. Komplett-Brief zur Website. In neue Session einfügbar.

## 1. Was es ist
Marketing- + Lead-Gen-Website für **Novaris**, eine AI Automation Agency.
Inhaber: Carl Staerke (volljährig, eigener Vertragspartner). Solo, tritt aber als
**Kompanie auf → Stimme „wir"**, nie „ich".

## 2. Speicherort + Tech + Start
- Projekt: `~/Downloads/agency-website-next/`
- Alte Single-Page (Ursprungs-Design, NICHT anfassen): `~/Downloads/agency-website/index.html`
- Stack: Next.js 16 (App Router), TypeScript strict, Tailwind v4, Vercel-ready
- Start: `cd ~/Downloads/agency-website-next && PORT=3001 npm run dev` → http://localhost:3001
- Build: `npm run build` · Lint: `npx eslint src`

## 3. Brand
- Name: **Novaris** (Logo: „Nova" + „ris" in Akzentfarbe)
- Voice: locker, direkt, kein Corporate-Speak, „wir bauen" statt Passiv, kurze Sätze
- Tagline: „Websites, Sichtbarkeit und KI-Anfragen für lokale Unternehmen"

## 4. Fokus — WAS dazugehört
Nur **Website + Sichtbarkeit im Netz + damit verbundene LLM-Pipelines**:
1. **Website-Entwicklung** — modern, schnell, conversion-orientiert, SEO von Anfang an
2. **Sichtbarkeit & SEO/GEO** — auf Google + in KI-Suchen (ChatGPT, Perplexity, AI Overviews) gefunden werden, lokales SEO
3. **KI-Chatbot** — auf der Website, beantwortet Fragen + qualifiziert Anfragen (RAG/Claude)
4. **Anfrage-Automatisierung** — LLM-Pipeline: eingehende Website-Anfragen automatisch erfassen, qualifizieren, sortieren, weiterleiten

Chatbot + Workflows + Agenten NUR wenn sie mit Website/Sichtbarkeit zu tun haben.

## 5. Was NICHT dazugehört (explizit ausgeschlossen)
- Keine generischen „autonomen KI-Agenten" für beliebige Geschäftsprozesse
- Keine Content-Systeme/Social-Automation ohne Website-/SEO-Bezug
- Keine Workflow-Tools: **Make.com, n8n, Zapier** — niemals vorschlagen
- Keine website-fremden Automatisierungen
- Nichts erfinden, das nicht zum Website-/Sichtbarkeits-Kern gehört

## 6. Zielgruppe (ICP)
- Betriebe / lokale Unternehmen, **15–100 Mitarbeiter**, alle Branchen (DE)
- Inhaber-/kleines Management-Team, Tech-Affinität niedrig–mittel
- Problem: zu wenig digitale Sichtbarkeit, Anfragen nur über Empfehlung
- Akquise (Geschäft, nicht Website): **Kaltakquise per Anruf**

## 7. Design-System (aktueller Stand: Dark Luxury / Editorial)
Verlauf: Spec wollte helles Trust-Blau → verworfen. Dann Dark Cyan/Grün (altes
Design portiert) → User wollte kein Blau → Orange. Dann „edel, nicht futuristisch,
leicht futuristisch, geile Animationen" → finaler Stand:
- **Typo:** Cormorant Garamond (Serif-Display, leicht/elegant) + Plus Jakarta Sans (Body)
- **Farbe:** Champagner-Gold `#c9a96a` + Soft-Gold `#e6c697` + warmes Amber `#d99a52`,
  auf tiefem Espresso-Schwarz `#0c0a08`, warmes Creme-Text `#f3ece1`
- **Stil:** Gold-Hairlines statt Neon-Glow, weiche Schatten, ruhige Komposition, viel Raum
- **Animationen:** Hero-Lade-Reveals (rise+blur), driftende Gold-Aurora, Shimmer auf
  Gold-Headline, Button-Shimmer-Sweep, Nav-Underline-Draw, Scroll-Reveals (rise+blur),
  Prozess-Ziffern Outline→Gold-Fill
- Alle Tokens zentral in `src/app/globals.css` (`:root`) — Farbe/Font dort 1 Stelle ändern
- Entfernt: Custom-Cursor, starkes Grain, Mono-`//`-Code-Labels (futuristischer Look)
- Dead Code: `src/components/Cursor.tsx` ungenutzt (kann weg)

## 8. Seitenstruktur (22 Routes)
- `/` Homepage (Hero, Services, Sichtbarkeit-Kern, Prozess, Anwendungsfälle, FAQ, CTA)
- `/leistungen` + `/leistungen/[slug]`: website-entwicklung, sichtbarkeit-seo, ki-chatbot, anfrage-automatisierung
- `/referenzen` (Branchenfilter)
- `/blog` + `/blog/[slug]` (3 Starter-Stubs: KI-Suchen, Google-Findbarkeit, Anfragen qualifizieren)
- `/ueber-uns`, `/kontakt` (Formular Honeypot+Timing), `/preise`
- `/impressum`, `/datenschutz` (Platzhalter)
- `/sitemap.xml`, `/robots.txt` (auto), JSON-LD überall

## 9. Inhalts-Entscheidungen (wichtig, rechtlich)
- **0 echte Kunden** → Anwendungsfälle/Case Studies sind **Platzhalter** mit sichtbarem
  „Beispiel"-Badge (`isPlaceholder` in `site.ts`). Nie als echte Ergebnisse darstellen
  (UWG §5 — irreführende Werbung = abmahnbar). Erst bei echten Kunden ersetzen.
- **Preise:** „auf Anfrage", keine fixen Zahlen (Spec hatte 1.500/2.800/4.500€ → verworfen)
- **Alter:** nicht prominent (Spec-Story „mit 16 gegründet" → raus). Carl 18, selbst im Impressum
- **Keine Fake-Verknappung** („nur 3 Plätze" aus Spec → raus). Exit-Popup = ehrliche Einladung
- Analytics-Empfehlung: **Plausible** (cookieless, DSGVO-first) statt GA4

## 10. Higgsfield-Bilder
2 generiert (nano_banana_pro), in `public/images/`: `hero.png` (Hero-BG), `section.png`
(Agents-Visual). Dark, amber/gold, kein Stock-Look. Credits-Rest ~0.55 → für mehr aufladen.

## 11. Offen vor Go-Live (im Code als TODO[carl] / [PLATZHALTER])
- Echte Domain in `src/lib/site.ts` (`SITE.url`, aktuell novaris.de Platzhalter)
- Echte Telefonnummer + optional WhatsApp in `site.ts`
- Impressum: echte Anschrift + USt/Kleinunternehmer (§19) Hinweis
- Datenschutz: rechtlich prüfen lassen (Vorlage ≠ Beratung)
- Kontaktformular-Versand anbinden (`src/app/api/contact/route.ts`, z.B. Resend) — Secrets nur env
- Blog-Texte finalisieren (aktuell Entwürfe)
- Echte Referenzen sobald erste Kunden → Platzhalter ersetzen

## 12. Zentrale Dateien
- `src/lib/site.ts` — Brand, NAP, Kontakt, Nav, SERVICES, CASE_STUDIES, FAQ, PROCESS, TECH_TAGS
- `src/lib/posts.ts` — Blog-Posts
- `src/app/globals.css` — Design-Tokens + komplettes CSS
- `src/app/layout.tsx` — Fonts, Metadata, Header/Footer/Widgets mounten
- `src/components/` — Header, Footer, ServiceCard, CaseCard, FaqAccordion, ReferenzenGrid,
  ContactForm, ChatWidget, CookieBanner, ExitIntentPopup, Reveal, JsonLd

## 13. Deploy
Repo public + vorhandene `.gitignore` → Vercel unproblematisch. `npx vercel` (Preview) /
`npx vercel --prod`. Kein `Co-Authored-By` in Commits (blockt Vercel-Deploy).
