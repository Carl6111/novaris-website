/**
 * Zentrale Seiten-Konfiguration: NAP, Kontakt, Navigation, Inhalte.
 * Eine Quelle der Wahrheit — Footer, Schema, Kontaktseite ziehen von hier.
 *
 * PLATZHALTER-Werte sind mit TODO markiert. Carl füllt vor Go-Live.
 */

export const SITE = {
  name: "Novaris",
  legalName: "Carl Staerke", // volljährig, eigener Vertragspartner
  fullTitle: "Novaris — AI Automation Agency",
  tagline: "Websites, Sichtbarkeit und KI-Anfragen für lokale Unternehmen",
  // TODO[carl]: echte Produktions-Domain eintragen
  url: "https://novaris.de",
  email: "tafkac@icloud.com",
  // TODO[carl]: echte Telefonnummer für Akquise-Rückrufe
  phone: "+49 000 0000000",
  phoneHref: "tel:+490000000000",
  // TODO[carl]: optional WhatsApp-Nummer
  whatsapp: "",
  address: {
    // TODO[carl]: echte Anschrift fürs Impressum
    locality: "Magdeburg",
    region: "Sachsen-Anhalt",
    country: "DE",
  },
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export type Service = {
  slug: string;
  icon: string;
  name: string;
  tag: string;
  short: string;
  headline: string;
  intro: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "website-entwicklung",
    icon: "◻",
    name: "Website-Entwicklung",
    tag: "Next.js · React",
    short:
      "Moderne, schnelle Websites — gebaut für Conversions und von Anfang an auf Auffindbarkeit ausgelegt.",
    headline: "Websites, die laden, ranken und konvertieren",
    intro:
      "Schnell, mobil-first und auf Anfragen ausgerichtet. Technisches SEO und saubere Core Web Vitals von Anfang an mitgedacht.",
    features: [
      "Mobile-first, optimierte Core Web Vitals",
      "On-Page-SEO und strukturierte Daten (JSON-LD)",
      "Conversion-orientierte Layouts statt Deko",
      "DSGVO-konform von Tag eins",
    ],
  },
  {
    slug: "sichtbarkeit-seo",
    icon: "◈",
    name: "Sichtbarkeit & SEO",
    tag: "SEO · GEO",
    short:
      "Auf Google gefunden werden — und in KI-Suchen wie ChatGPT und Perplexity empfohlen werden.",
    headline: "Gefunden werden — auf Google und in KI-Suchen",
    intro:
      "Klassisches SEO für Google plus GEO: Wir sorgen dafür, dass dein Unternehmen auch von KI-Suchmaschinen genannt wird, wenn jemand in deiner Region sucht.",
    features: [
      "Lokales SEO: gefunden werden, wenn Kunden in deiner Stadt suchen",
      "GEO: Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews",
      "Strukturierte Daten, damit Suchmaschinen dich verstehen",
      "Technisches SEO: Speed, Indexierung, saubere Struktur",
    ],
  },
  {
    slug: "ki-chatbot",
    icon: "⬡",
    name: "KI-Chatbot",
    tag: "RAG · Claude",
    short:
      "Ein Chatbot auf deiner Website, der Fragen beantwortet und Anfragen vorqualifiziert — rund um die Uhr.",
    headline: "24/7 Anfragen beantworten direkt auf der Website",
    intro:
      "Ein Chatbot mit deinem Unternehmenswissen (RAG), eingebaut in deine Website. Beantwortet Standardfragen, qualifiziert Anfragen vor und leitet sie an dich weiter.",
    features: [
      "Antworten aus deinem eigenen Website-Wissen (RAG)",
      "Vorqualifizierung: Name, Anliegen, Dringlichkeit",
      "Übergabe der Anfrage per E-Mail",
      "Direkt in deine Website integriert",
    ],
  },
  {
    slug: "anfrage-automatisierung",
    icon: "⚙",
    name: "Anfrage-Automatisierung",
    tag: "LLM-Pipeline",
    short:
      "Anfragen, die über die Website reinkommen, werden automatisch erfasst, qualifiziert und sortiert.",
    headline: "Keine Website-Anfrage geht mehr verloren",
    intro:
      "Eine LLM-Pipeline rund um deine Website: Jede eingehende Anfrage wird automatisch verstanden, kategorisiert und an die richtige Stelle weitergeleitet — du verlierst keine mehr.",
    features: [
      "Automatische Erfassung aller Website-Anfragen",
      "KI sortiert nach Anliegen und Dringlichkeit",
      "Weiterleitung per E-Mail an die richtige Stelle",
      "Optional: automatische Erstantwort an den Interessenten",
    ],
  },
];

export const PROCESS = [
  {
    num: "01",
    title: "Analyse & Konzept",
    desc: "Wir schauen uns deine aktuelle Website und Auffindbarkeit an und finden den größten Hebel. Kostenlos und unverbindlich.",
  },
  {
    num: "02",
    title: "Umsetzung",
    desc: "Wir bauen die Website und richten Sichtbarkeit und Anfrage-Automatisierung ein — transparent, mit regelmäßigen Updates.",
  },
  {
    num: "03",
    title: "Launch & Betreuung",
    desc: "Deployment, Testing, Einweisung. Nach dem Launch bleiben wir erreichbar für SEO, Anpassungen und Weiterentwicklung.",
  },
];

export const TECH_TAGS = [
  "Next.js",
  "React",
  "Vercel",
  "Claude API",
  "Anthropic SDK",
  "Schema.org",
  "Core Web Vitals",
  "Lokales SEO",
];

/**
 * Case Studies / Referenzen.
 *
 * WICHTIG: Carl hat aktuell 0 abgeschlossene Referenzkunden.
 * Diese Einträge sind PLATZHALTER (isPlaceholder: true) und werden im UI
 * sichtbar als Beispiel/Muster gekennzeichnet — niemals als echte Ergebnisse
 * dargestellt (UWG §5: irreführende Werbung).
 * Sobald echte Kunden existieren: isPlaceholder entfernen + echte Daten.
 */
export type CaseStudy = {
  isPlaceholder: boolean;
  icon: string;
  industry: string;
  company: string;
  metric: string;
  metricLabel: string;
  problem: string;
  solution: string;
  result: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    isPlaceholder: true,
    icon: "◻",
    industry: "Handwerk",
    company: "Beispiel: Handwerksbetrieb",
    metric: "Sichtbar",
    metricLabel: "Beispiel: bessere Auffindbarkeit auf Google",
    problem:
      "Veraltete Website, kaum über Google auffindbar — Anfragen kommen fast nur über Empfehlung.",
    solution:
      "Neue, schnelle Website plus lokales SEO, damit der Betrieb bei Suchen in der Region oben erscheint.",
    result:
      "Beispielhaft: deutlich bessere Sichtbarkeit und mehr Anfragen direkt über die Website.",
  },
  {
    isPlaceholder: true,
    icon: "⬡",
    industry: "Dienstleistung",
    company: "Beispiel: Dienstleister",
    metric: "vorqualifiziert",
    metricLabel: "Beispiel: Anfragen kommen vorqualifiziert an",
    problem:
      "Viele gleiche Standardfragen über das Kontaktformular — viel Hin und Her vor dem eigentlichen Gespräch.",
    solution:
      "KI-Chatbot auf der Website beantwortet Standardfragen und qualifiziert Anfragen vor der Weiterleitung.",
    result:
      "Beispielhaft: Anfragen kommen vorbereitet an, weniger Rückfragen, schnellere Reaktion.",
  },
  {
    isPlaceholder: true,
    icon: "◈",
    industry: "Lokal & Einzelhandel",
    company: "Beispiel: Lokales Unternehmen",
    metric: "KI-Suche",
    metricLabel: "Beispiel: Sichtbarkeit in KI-Suchen",
    problem:
      "Taucht in KI-Antworten (ChatGPT, Perplexity) nicht auf, wenn jemand nach der Leistung in der Region fragt.",
    solution:
      "Inhalte und strukturierte Daten so aufbereitet, dass KI-Suchmaschinen das Unternehmen verstehen und nennen.",
    result:
      "Beispielhaft: wird in KI-Antworten als lokale Option genannt.",
  },
];

/**
 * Buchungs-Ziel für den primären Call-to-Action der Startseite.
 * Zentrales Ziel der Seite: Besucher ins Erstgespräch führen.
 * TODO[carl]: sobald Cal.com/Terminbuchung live ist, hier echte URL eintragen.
 */
export const BOOKING = {
  label: "Gespräch buchen",
  href: "/kontakt",
} as const;

/**
 * Growth Engine Plus — die Module der Full-Operation-Plattform.
 * Kern-Erzählung der Startseite: EIN System statt zehn Insellösungen.
 * `image` verweist auf echte Produkt-Screenshots in /public/images.
 * `panel` = ohne Screenshot, wird als abstrakte UI-Komposition gerendert.
 */
export type PlatformModule = {
  id: string;
  index: string;
  kicker: string;
  name: string;
  tagline: string;
  desc: string;
  points: string[];
  metric: string;
  metricLabel: string;
  visual: "image" | "panel";
  image?: string;
  panel?: "site" | "search" | "chat" | "flow" | "invoice";
};

export const MODULES: PlatformModule[] = [
  {
    id: "website",
    index: "01",
    kicker: "Fundament",
    name: "Website",
    tagline: "Schnell, edel, gebaut zum Konvertieren.",
    desc: "Deine Website ist das Zentrum. Mobil-first, in Millisekunden geladen, von Tag eins auf Anfragen ausgelegt — nicht auf Deko.",
    points: [
      "Optimierte Core Web Vitals",
      "Conversion-Layouts statt Baukasten",
      "DSGVO-konform ab Zeile eins",
    ],
    metric: "< 1s",
    metricLabel: "Ladezeit als Ziel",
    visual: "panel",
    panel: "site",
  },
  {
    id: "sichtbarkeit",
    index: "02",
    kicker: "Reichweite",
    name: "Sichtbarkeit · SEO & GEO",
    tagline: "Gefunden auf Google — und in KI-Suchen.",
    desc: "Klassisches lokales SEO plus GEO: Dein Betrieb wird genannt, wenn jemand in deiner Region bei Google, ChatGPT oder Perplexity sucht.",
    points: [
      "Lokales SEO für deine Stadt",
      "Sichtbar in ChatGPT & AI Overviews",
      "Strukturierte Daten (Schema.org)",
    ],
    metric: "Top 3",
    metricLabel: "Ziel: lokale Ergebnisse",
    visual: "panel",
    panel: "search",
  },
  {
    id: "chatbot",
    index: "03",
    kicker: "Immer erreichbar",
    name: "KI-Chatbot",
    tagline: "Beantwortet Fragen. Qualifiziert vor. 24/7.",
    desc: "Ein Chatbot mit deinem Unternehmenswissen (RAG), direkt auf der Website. Antwortet nachts, filtert ernste Anfragen heraus und reicht sie vorbereitet weiter.",
    points: [
      "Antworten aus deinem eigenen Wissen",
      "Vorqualifizierung: Anliegen & Dringlichkeit",
      "Saubere Übergabe an dich",
    ],
    metric: "24/7",
    metricLabel: "nie offline",
    visual: "panel",
    panel: "chat",
  },
  {
    id: "automatisierung",
    index: "04",
    kicker: "Kein Lead verloren",
    name: "Anfrage-Automatisierung",
    tagline: "Jede Anfrage landet automatisch am richtigen Ort.",
    desc: "Eine LLM-Pipeline verstehen, sortiert und leitet jede eingehende Anfrage weiter. Nichts versickert mehr im Postfach.",
    points: [
      "Automatische Erfassung aller Anfragen",
      "KI sortiert nach Dringlichkeit",
      "Optional: sofortige Erstantwort",
    ],
    metric: "0",
    metricLabel: "verlorene Anfragen",
    visual: "panel",
    panel: "flow",
  },
  {
    id: "crm",
    index: "05",
    kicker: "Überblick",
    name: "CRM",
    tagline: "Kunden, Leads und Pipeline an einem Ort.",
    desc: "Jeder Kontakt, jede Anfrage, jeder Deal in einem klaren System. Du siehst auf einen Blick, wo jeder Interessent steht.",
    points: [
      "Leads & Kunden zentral",
      "Pipeline-Status pro Deal",
      "Verknüpft mit Website-Anfragen",
    ],
    metric: "1",
    metricLabel: "Ort für alles",
    visual: "image",
    image: "/images/crm.png",
  },
  {
    id: "aidocs",
    index: "06",
    kicker: "Tempo",
    name: "AI Docs",
    tagline: "Angebote und Dokumente in Minuten, nicht Stunden.",
    desc: "Angebote, Rechnungsentwürfe und Dokumente per KI erstellt — aus deinen Daten, in deinem Stil. Weniger Büroarbeit, mehr Betrieb.",
    points: [
      "KI-generierte Angebote & Dokumente",
      "Aus deinen CRM-Daten befüllt",
      "Dein Branding, dein Ton",
    ],
    metric: "10×",
    metricLabel: "schneller als Hand",
    visual: "image",
    image: "/images/aidocs.png",
  },
  {
    id: "portal",
    index: "07",
    kicker: "Vertrauen",
    name: "Client Portal",
    tagline: "Ein Login. Dein Kunde sieht alles.",
    desc: "Kunden bekommen ein eigenes Portal: Status, Dokumente, Rechnungen, Kommunikation. Professionell — ohne dass du hinterhertelefonierst.",
    points: [
      "Eigener Kundenzugang",
      "Dokumente & Status transparent",
      "Weniger Rückfragen, mehr Vertrauen",
    ],
    metric: "24/7",
    metricLabel: "Selbstbedienung",
    visual: "image",
    image: "/images/clientportal.png",
  },
  {
    id: "invoicing",
    index: "08",
    kicker: "Umsatz",
    name: "Invoicing",
    tagline: "Rechnungen raus, Geld rein — automatisch.",
    desc: "Rechnungen erstellen, versenden und nachverfolgen im selben System. Zahlungen sind mit dem CRM verknüpft, damit nichts offen bleibt.",
    points: [
      "Rechnungen aus dem CRM",
      "Automatische Erinnerungen",
      "Zahlungsstatus im Blick",
    ],
    metric: "Auto",
    metricLabel: "Follow-ups",
    visual: "panel",
    panel: "invoice",
  },
];

export const FAQ = [
  {
    q: "Wie lange dauert eine Website?",
    a: "Typisch 2–4 Wochen, je nach Umfang. SEO und Sichtbarkeit bauen sich danach weiter auf.",
  },
  {
    q: "Was kostet das?",
    a: "Hängt vom Umfang ab. Wir klären deinen Bedarf im kostenlosen Erstgespräch und du bekommst ein konkretes Angebot — keine versteckten Kosten.",
  },
  {
    q: "Was bedeutet Sichtbarkeit in KI-Suchen (GEO)?",
    a: "Immer mehr Menschen fragen ChatGPT oder Perplexity statt Google. Wir sorgen dafür, dass dein Unternehmen dort als lokale Option genannt wird.",
  },
  {
    q: "Kümmert ihr euch auch um das Google-Ranking?",
    a: "Ja. Lokales und technisches SEO gehören dazu — damit dich Kunden finden, wenn sie in deiner Region suchen.",
  },
  {
    q: "Muss ich technisches Wissen haben?",
    a: "Nein. Wir übernehmen Aufbau, Deployment und Einweisung. Du gibst die Richtung vor.",
  },
];
