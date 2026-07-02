"use client";

import { forwardRef, Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, MeshPortalMaterial } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "./palette";
import { PhotoTunnel } from "./PhotoTunnel";

const PUPIL_RADIUS = 0.55;

// Almond eye outline, parametric — matches the Novaris logo silhouette.
function useAlmondPoints() {
  return useMemo(() => {
    const halfW = 1.35;
    const peak = 0.66;
    const top: THREE.Vector3[] = [];
    const bottom: THREE.Vector3[] = [];
    const steps = 96;
    for (let i = 0; i <= steps; i++) {
      const x = -halfW + (2 * halfW * i) / steps;
      const k = 1 - (x / halfW) ** 2;
      const y = peak * Math.sign(k) * Math.pow(Math.abs(k), 0.85);
      top.push(new THREE.Vector3(x, y, 0));
      bottom.push(new THREE.Vector3(x, -y, 0));
    }
    return [...top, ...bottom.reverse()];
  }, []);
}

// Fine radial striations around the iris — precision detail, low opacity.
function IrisStriations() {
  const geo = useMemo(() => {
    const inner = PUPIL_RADIUS + 0.15;
    const outer = PUPIL_RADIUS + 0.27;
    const n = 84;
    const pts: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const len = i % 2 === 0 ? outer : inner + 0.05;
      pts.push(Math.cos(a) * inner, Math.sin(a) * inner, 0);
      pts.push(Math.cos(a) * len, Math.sin(a) * len, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={PALETTE.ink} transparent opacity={0.28} />
    </lineSegments>
  );
}

// One circuit node with a subtle warm pulse — sign of life, not neon.
function PulseNode({ position }: { position: THREE.Vector3 }) {
  const dot = useRef<THREE.MeshBasicMaterial>(null);
  const ring = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const p = (Math.sin(state.clock.elapsedTime * 1.6 + phase) + 1) / 2;
    if (dot.current) dot.current.opacity = 0.35 + p * 0.55;
    if (ring.current) ring.current.scale.setScalar(1 + p * 0.18);
  });

  return (
    <group position={position}>
      <mesh ref={ring}>
        <ringGeometry args={[0.045, 0.072, 28]} />
        <meshBasicMaterial color={PALETTE.ink} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.03, 20]} />
        <meshBasicMaterial ref={dot} color={PALETTE.accent} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Circuit traces on the right — mirrors the logo's three tech nodes.
function CircuitTraces() {
  const traces = useMemo(() => {
    const make = (y: number, len: number): THREE.Vector3[] => [
      new THREE.Vector3(0.95, y * 0.25, 0),
      new THREE.Vector3(1.15, y, 0),
      new THREE.Vector3(1.15 + len, y, 0),
    ];
    return [
      { pts: make(0.34, 0.22), node: new THREE.Vector3(1.15 + 0.22, 0.34, 0) },
      { pts: make(0.04, 0.42), node: new THREE.Vector3(1.15 + 0.42, 0.04, 0) },
      { pts: make(-0.28, 0.3), node: new THREE.Vector3(1.15 + 0.3, -0.28, 0) },
    ];
  }, []);

  return (
    <group>
      {traces.map((t, i) => (
        <group key={i}>
          <Line points={t.pts} color={PALETTE.ink} lineWidth={2} />
          <PulseNode position={t.node} />
        </group>
      ))}
    </group>
  );
}

type EyeProps = {
  portalRef: React.RefObject<THREE.ShaderMaterial | null>;
};

export const Eye = forwardRef<THREE.Group, EyeProps>(function Eye({ portalRef }, ref) {
  const almond = useAlmondPoints();

  return (
    <group ref={ref}>
      {/* Almond outline */}
      <Line points={almond} color={PALETTE.ink} lineWidth={2.5} />

      {/* Iris detailing */}
      <IrisStriations />

      {/* Iris ring around the pupil */}
      <mesh>
        <ringGeometry args={[PUPIL_RADIUS, PUPIL_RADIUS + 0.11, 80]} />
        <meshBasicMaterial color={PALETTE.ink} side={THREE.DoubleSide} />
      </mesh>

      {/* Pupil = portal into the interior */}
      <mesh>
        <circleGeometry args={[PUPIL_RADIUS, 80]} />
        {/* @ts-expect-error drei portal material ref is a ShaderMaterial */}
        <MeshPortalMaterial ref={portalRef} blend={0} worldUnits resolution={1024}>
          <color attach="background" args={["#0a0e16"]} />
          <Suspense fallback={null}>
            <PhotoTunnel />
          </Suspense>
        </MeshPortalMaterial>
      </mesh>

      <CircuitTraces />
    </group>
  );
});
