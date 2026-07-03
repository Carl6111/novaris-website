"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BookingButton from "@/components/BookingButton";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={scrolled ? "site-nav scrolled" : "site-nav"}>
      <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
        <span className="logo-dot" aria-hidden />
        Nova<span className="logo-accent">ris</span>
      </Link>

      <ul className="nav-links">
        {NAV.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <BookingButton className="nav-cta">Gespräch buchen →</BookingButton>

      <button
        className="nav-burger"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "burger-line open" : "burger-line"} />
        <span className={open ? "burger-line open" : "burger-line"} />
      </button>

      {open && (
        <div className="mobile-menu">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <BookingButton
            className="btn-primary"
            onClick={() => setOpen(false)}
          >
            Gespräch buchen
          </BookingButton>
          <a
            href={SITE.phoneHref}
            className="btn-ghost"
            onClick={() => setOpen(false)}
          >
            Anrufen
          </a>
        </div>
      )}
    </nav>
  );
}
