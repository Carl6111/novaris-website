"use client";

import { usePathname } from "next/navigation";

// Hides the global site chrome on the immersive /eye takeover route.
export default function HideOnEye({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/eye")) return null;
  return <>{children}</>;
}
