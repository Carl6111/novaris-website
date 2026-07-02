"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { ChromeTunnel, TUNNEL_DEPTH } from "./ChromeTunnel";
import { EnergyCore } from "./EnergyCore";
import { Robots } from "./Robots";
import { PackageCards } from "./PackageCards";

// The world behind the pupil, rebuilt as the reactor from the reference:
// a chrome pipe tunnel, a glowing energy core down the axis, worker robots,
// and the package cards waiting at the far end for the exit segue.
export function RobotInterior() {
  return (
    <group>
      <fog attach="fog" args={["#0a0e16", 7, TUNNEL_DEPTH]} />

      {/* Bright env for the chrome reflections (background stays dark, so the
          metal reads as shiny tubes against black — the reactor contrast). */}
      <Environment preset="warehouse" environmentIntensity={1.6} />

      <ChromeTunnel />
      <EnergyCore />

      <Suspense fallback={null}>
        <Robots />
      </Suspense>

      <PackageCards />

      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 2]} intensity={0.6} />
      {/* Near fill so the entrance pipes catch light */}
      <pointLight position={[0, 0, 2]} intensity={22} distance={14} color="#dfe9ff" />
    </group>
  );
}
