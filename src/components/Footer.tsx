import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="footer-logo">
            Nova<span style={{ color: "var(--accent)" }}>ris</span>
          </span>
          <p className="footer-nap">
            {SITE.legalName} · {SITE.address.locality}
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link href="/leistungen">Leistungen</Link>
          <Link href="/referenzen">Referenzen</Link>
          <Link href="/ueber-uns">Über uns</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {SITE.legalName} · AI Automation Agency
        </span>
        <span className="footer-built">Gebaut mit Claude Code</span>
      </div>
    </footer>
  );
}
