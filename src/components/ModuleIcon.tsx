import type { SVGProps } from "react";

/**
 * Cleane Line-Icons für die Growth-Engine-Plus-Module.
 * Stroke = currentColor, damit Gold/Text-Farbe per CSS gesteuert wird.
 * Bewusst schlicht und geometrisch — kein Foto-Realismus.
 */
type IconId =
  | "website"
  | "sichtbarkeit"
  | "chatbot"
  | "automatisierung"
  | "crm"
  | "aidocs"
  | "portal"
  | "invoicing";

const PATHS: Record<IconId, React.ReactNode> = {
  website: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.6" />
      <path d="M3 9h18" />
      <path d="M6 6.7h.01M8.4 6.7h.01" />
    </>
  ),
  sichtbarkeit: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5 20 20" />
    </>
  ),
  chatbot: (
    <>
      <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
      <path d="M8.5 10.7h.01M12 10.7h.01M15.5 10.7h.01" />
    </>
  ),
  automatisierung: (
    <>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
      <path d="M7.2 6h4a2 2 0 0 1 2 2v0M7.2 18h4a2 2 0 0 0 2-2v-2M15.2 12.6l1.6.9" />
    </>
  ),
  crm: (
    <>
      <circle cx="8.5" cy="8.5" r="2.8" />
      <path d="M3.5 19v-.5a5 5 0 0 1 10 0v.5" />
      <path d="M15.5 7.2a2.6 2.6 0 0 1 0 5M17 19v-.4a4.6 4.6 0 0 0-3-4.3" />
    </>
  ),
  aidocs: (
    <>
      <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V3.5Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9.2 14.2l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7L6.8 16.6l1.7-.7.7-1.7Z" />
    </>
  ),
  portal: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.6" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 16.2a3.2 3.2 0 0 1 6 0" />
      <path d="M14 10h4M14 13.5h3" />
    </>
  ),
  invoicing: (
    <>
      <path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3.5Z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </>
  ),
};

type Props = SVGProps<SVGSVGElement> & { id: string };

export default function ModuleIcon({ id, ...rest }: Props) {
  const path = PATHS[id as IconId];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {path}
    </svg>
  );
}
