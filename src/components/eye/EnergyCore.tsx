"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TUNNEL_DEPTH } from "./ChromeTunnel";

const COLORS = ["#39d8ff", "#ff3df0", "#7bff5a", "#bda3ff", "#ffd23d", "#ff7a3d"];
const STRANDS = 18;
const PACKETS = 90;
const CORE_Z = -TUNNEL_DEPTH + 2; // bright nexus at the far vanishing point

const hdr = (hex: string, mul: number) => new THREE.Color(hex).multiplyScalar(mul);
const HDR_WHITE = new THREE.Color(3, 3, 3.4);

type Strand = { curve: THREE.CatmullRomCurve3; color: THREE.Color };

// Light streams that radiate from a bright core at the far vanishing point out
// toward the camera — the reference's reactor. Camera flies toward the nexus.
export function EnergyCore() {
  const strands = useMemo<Strand[]>(() => {
    const arr: Strand[] = [];
    for (let s = 0; s < STRANDS; s++) {
      const ang0 = (s / STRANDS) * Math.PI * 2 + Math.random() * 0.3;
      const spin = (Math.random() - 0.5) * 4;
      const wallR = 1.2 + Math.random() * 1.1;
      const pts = Array.from({ length: 20 }, (_, i) => {
        const t = i / 19;
        const z = -2 - t * (TUNNEL_DEPTH - 2);
        const radius = 0.04 + (1 - t) ** 1.4 * wallR; // wide near, converge far
        const ang = ang0 + (1 - t) * spin;
        return new THREE.Vector3(Math.cos(ang) * radius, Math.sin(ang) * radius, z);
      });
      arr.push({
        curve: new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5),
        color: hdr(COLORS[s % COLORS.length], 2.6),
      });
    }
    return arr;
  }, []);

  const strandGeos = useMemo(
    () => strands.map((s) => new THREE.TubeGeometry(s.curve, 140, 0.012, 5, false)),
    [strands]
  );

  const coreRef = useRef<THREE.Mesh>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKETS }, () => ({
        strand: Math.floor(Math.random() * STRANDS),
        offset: Math.random(),
        speed: 0.07 + Math.random() * 0.1,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      const p = 1 + Math.sin(t * 16) * 0.12; // flicker
      coreRef.current.scale.setScalar(p);
    }
    const mesh = packetsRef.current;
    if (!mesh) return;
    packets.forEach((p, i) => {
      const u = (p.offset + t * p.speed) % 1;
      const pos = strands[p.strand].curve.getPointAt(1 - u); // flow toward the core
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.03 * (0.7 + Math.sin(t * 8 + i) * 0.3));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Radiating colored strands */}
      {strandGeos.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshBasicMaterial color={strands[i].color} toneMapped={false} />
        </mesh>
      ))}

      {/* Flowing light packets */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, PACKETS]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={HDR_WHITE} toneMapped={false} />
      </instancedMesh>

      {/* Bright nexus at the far vanishing point */}
      <mesh ref={coreRef} position={[0, 0, CORE_Z]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color={HDR_WHITE} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, CORE_Z + 1]} intensity={40} distance={26} color="#cfeaff" />
      <pointLight position={[0, 0, -8]} intensity={10} distance={16} color="#ff8df0" />
    </group>
  );
}
