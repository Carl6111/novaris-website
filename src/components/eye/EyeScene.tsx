"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { PALETTE } from "./palette";
import { Eye } from "./Eye";

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export type ProgressRef = React.RefObject<{ v: number }>;
type PortalRef = React.RefObject<THREE.ShaderMaterial | null>;

// Scroll-driven cinematic camera. Progress (0..1) comes from page scroll,
// read every frame from a ref so scrolling never re-renders React.
function CameraRig({ progressRef, portalRef }: { progressRef: ProgressRef; portalRef: PortalRef }) {
  const smooth = useRef(0);
  useFrame((state) => {
    const target = progressRef.current?.v ?? 0;
    smooth.current += (target - smooth.current) * 0.09; // cinematic damping
    const o = smooth.current;

    // Fly up to the pupil, then dive into the funnel toward the far core.
    const approach = THREE.MathUtils.clamp(o / 0.45, 0, 1);
    const zApproach = THREE.MathUtils.lerp(4.6, 0.3, easeInOut(approach));
    const zoom = THREE.MathUtils.clamp((o - 0.45) / 0.5, 0, 1);
    const zZoom = THREE.MathUtils.lerp(0.3, -14, easeInOut(zoom));
    const z = o < 0.45 ? zApproach : zZoom;

    // Continuous parallax sway — stronger once inside — so the depth reads as
    // real 3D and the scene feels alive even while idle.
    const t = state.clock.elapsedTime;
    const inside01 = THREE.MathUtils.clamp((o - 0.45) / 0.3, 0, 1);
    const swayAmp = 0.05 + inside01 * 0.22;
    const swayX = Math.sin(t * 0.45) * swayAmp;
    const swayY = Math.cos(t * 0.37) * swayAmp * 0.7;

    // At the start the eye sits lower in frame (clears the headline); as the
    // camera dives in, the view recenters on the pupil.
    const lookY = 0.3 * (1 - approach);
    state.camera.position.set(swayX, swayY, z);
    state.camera.lookAt(0, lookY, z - 3);

    const blend = THREE.MathUtils.clamp((o - 0.4) / (0.58 - 0.4), 0, 1);
    const mat = portalRef.current as unknown as { blend: number } | null;
    if (mat) mat.blend = blend;
  });
  return null;
}

export default function EyeScene({ progressRef }: { progressRef: ProgressRef }) {
  const portalRef = useRef<THREE.ShaderMaterial | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 40, near: 0.01, far: 120 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={[PALETTE.paper]} />
      <CameraRig progressRef={progressRef} portalRef={portalRef} />
      <group scale={1.25}>
        <Eye portalRef={portalRef} />
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0.95} luminanceSmoothing={0.2} intensity={0.55} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
