"use client";

import type { ReactNode } from "react";
import { OPEN_BOOKING_EVENT } from "./BookingModal";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/** Öffnet das globale Buchungs-Modal — überall dort einsetzbar, wo bisher ein
 *  Link zu #kontakt stand. Ein Ziel: Besucher ins Erstgespräch. */
export default function BookingButton({ children, className = "", onClick }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));
      }}
    >
      {children}
    </button>
  );
}
