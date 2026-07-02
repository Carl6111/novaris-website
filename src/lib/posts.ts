/**
 * Blog-Posts als typisierte Daten (Starter-Stubs).
 *
 * Bewusst ohne MDX-Toolchain gehalten — weniger Dependencies, schneller Build.
 * Inhalt ist Platzhalter/Entwurf; Carl ersetzt Texte vor Go-Live.
 * Für echtes Markdown später: MDX oder ein Headless-CMS nachrüsten.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  body: Block[];
};

const draftBody = (intro: string): Block[] => [
  { type: "p", text: intro },
  { type: "h2", text: "Worum es geht" },
  {
    type: "p",
    text: "Dies ist ein Entwurf/Platzhalter. Der finale Text wird vor Veröffentlichung geschrieben — fundiert, konkret und ohne erfundene Zahlen.",
  },
  { type: "h2", text: "Nächster Schritt" },
  {
    type: "p",
    text: "Du willst das für dein Unternehmen umsetzen? Vereinbare ein kostenloses Erstgespräch über die Kontaktseite.",
  },
];

export const POSTS: Post[] = [
  {
    slug: "in-ki-suchen-gefunden-werden",
    title: "Warum lokale Unternehmen 2026 in KI-Suchen auftauchen müssen",
    category: "Sichtbarkeit",
    date: "2026-06-01",
    excerpt:
      "Immer mehr Menschen fragen ChatGPT statt Google. Was das für deine Auffindbarkeit bedeutet.",
    body: draftBody(
      "Wer früher bei Google ganz oben stand, gewann den Kunden. Heute fragen viele direkt eine KI — und nur wer dort genannt wird, wird gefunden.",
    ),
  },
  {
    slug: "warum-kunden-dich-bei-google-nicht-finden",
    title: "5 Gründe, warum dich Kunden über Google nicht finden",
    category: "SEO",
    date: "2026-05-20",
    excerpt:
      "Von langsamer Website bis fehlenden Standortdaten — die häufigsten Sichtbarkeits-Bremsen.",
    body: draftBody(
      "Eine schöne Website nützt nichts, wenn sie niemand findet. Diese fünf Punkte entscheiden, ob lokale Kunden dich über Google überhaupt sehen.",
    ),
  },
  {
    slug: "website-anfragen-mit-ki-qualifizieren",
    title: "Website-Anfragen automatisch qualifizieren mit KI",
    category: "Automatisierung",
    date: "2026-05-08",
    excerpt:
      "Wie eine LLM-Pipeline eingehende Anfragen sortiert, vorqualifiziert und nichts verloren geht.",
    body: draftBody(
      "Anfragen über die Website kommen oft unstrukturiert rein. Eine KI-Pipeline erfasst, qualifiziert und sortiert sie automatisch — bevor du sie überhaupt liest.",
    ),
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
