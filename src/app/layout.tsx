import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { JsonLd, organizationSchema } from "@/components/JsonLd";
import HideOnEye from "@/components/HideOnEye";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BookingModal from "@/components/BookingModal";
import { SITE } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.fullTitle,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Websites, Sichtbarkeit auf Google und in KI-Suchen sowie automatisierte Anfragen für lokale Unternehmen.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    title: SITE.fullTitle,
    description:
      "Websites, Sichtbarkeit (SEO & KI-Suchen) und automatisierte Anfragen für lokale Unternehmen.",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.fullTitle,
    description:
      "Websites, Sichtbarkeit (SEO & KI-Suchen) und automatisierte Anfragen für lokale Unternehmen.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <SmoothScroll />
        <HideOnEye>
          <ScrollProgress />
          <Header />
        </HideOnEye>
        <main>{children}</main>
        <HideOnEye>
          <Footer />
          <ChatWidget />
          <CookieBanner />
          <ExitIntentPopup />
          <BookingModal />
        </HideOnEye>
      </body>
    </html>
  );
}
