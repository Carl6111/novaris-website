// Clean-modern, anti-"AI-look" palette. Monochrome base + one warm signal accent.
// No neon, no cyan/purple gradients. Warm pulse reads human, not machine.
export const PALETTE = {
  paper: "#F7F6F3", // off-white base
  ink: "#0B0B0C", // near-black text
  graphite: "#3A3A3E", // mid structure
  mist: "#C9C7C0", // light grey lines
  steel: "#9A9A95", // matte machinery
  aluminium: "#E4E2DC", // bright machine surfaces
  accent: "#FF4A1C", // warm vermilion — used sparingly (CTA + data pulse)
  accentSoft: "#FF7A52",
} as const;
