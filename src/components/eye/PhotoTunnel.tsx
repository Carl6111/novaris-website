"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const TUNNEL_DEPTH = 17;
const PACKETS = 55;
const HDR_WHITE = new THREE.Color(1.7, 1.7, 2.1);

// The depth-extended reactor photo, bent into a funnel so its centre sits far
// back — giving real 3D depth to fly into. Light packets stream along the axis
// so the baked data streams read as alive. Robots stay as painted detail.
export function PhotoTunnel() {
  const tex = useTexture("/eye/tunnel-deep.jpg");

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(12, 12, 100, 100);
    const pos = g.attributes.position;
    const maxR = Math.hypot(6, 6);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const t = Math.min(Math.hypot(x, y) / maxR, 1);
      // Steep funnel: outer ring near the camera, centre pushed far back, so
      // flying forward sends the near walls streaming past — a real fly-through.
      pos.setZ(i, -TUNNEL_DEPTH * Math.pow(1 - t, 2.0));
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKETS }, () => ({
        ang: Math.random() * Math.PI * 2,
        rad: 0.04 + Math.random() * 0.28,
        off: Math.random(),
        speed: 0.05 + Math.random() * 0.08,
        swirl: (Math.random() - 0.5) * 2.2,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = packetsRef.current;
    if (!m) return;
    packets.forEach((p, i) => {
      const u = (p.off + t * p.speed) % 0.62; // stay in the deep half, never near camera
      const z = -TUNNEL_DEPTH * (1 - u);
      const rad = p.rad * (0.1 + u * 0.4); // tight at the far core
      const ang = p.ang + p.swirl * (1 - u) * 2;
      dummy.position.set(Math.cos(ang) * rad, Math.sin(ang) * rad, z);
      dummy.scale.setScalar(0.01 + u * 0.012);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <instancedMesh ref={packetsRef} args={[undefined, undefined, PACKETS]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={HDR_WHITE} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
