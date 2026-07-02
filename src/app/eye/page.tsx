import type { Metadata } from "next";
import EyeHero from "@/components/eye/EyeHero";

export const metadata: Metadata = {
  title: "Novaris — Eye",
  description: "Clean-modern 3D Hero Prototyp.",
  robots: { index: false, follow: false },
};

export default function EyePage() {
  return <EyeHero />;
}
