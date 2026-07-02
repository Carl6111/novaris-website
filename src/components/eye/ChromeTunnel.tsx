"use client";

import { useMemo } from "react";
import { Instances, Instance } from "@react-three/drei";

export const TUNNEL_RADIUS = 1.5;
export const TUNNEL_DEPTH = 34;

type Pipe = { a: number; r: number; thick: number };

// Radial chrome pipes running the length of the tunnel + ring bands. Parallel
// pipes converge to the center vanishing point under perspective — the reactor
// look from the reference. Static instanced geometry = cheap, reflective chrome.
export function ChromeTunnel() {
  const pipes = useMemo<Pipe[]>(() => {
    const arr: Pipe[] = [];
    const N = 32;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      arr.push({ a, r: TUNNEL_RADIUS, thick: 0.14 + Math.random() * 0.06 });
      if (i % 2 === 0) arr.push({ a: a + 0.05, r: TUNNEL_RADIUS * 1.22, thick: 0.1 });
    }
    return arr;
  }, []);

  const rings = useMemo(() => {
    const arr: number[] = [];
    const count = 16;
    for (let i = 1; i < count; i++) arr.push(-(i / count) * TUNNEL_DEPTH);
    return arr;
  }, []);

  return (
    <group>
      {/* Pipes — cylinders along z */}
      <Instances limit={pipes.length} range={pipes.length} frustumCulled={false}>
        <cylinderGeometry args={[1, 1, 1, 14]} />
        <meshStandardMaterial color="#9aa4b0" metalness={0.85} roughness={0.32} envMapIntensity={1.3} />
        {pipes.map((p, i) => (
          <Instance
            key={i}
            position={[Math.cos(p.a) * p.r, Math.sin(p.a) * p.r, -TUNNEL_DEPTH / 2]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[p.thick, TUNNEL_DEPTH, p.thick]}
          />
        ))}
      </Instances>

      {/* Ring bands */}
      <Instances limit={rings.length} range={rings.length} frustumCulled={false}>
        <torusGeometry args={[TUNNEL_RADIUS, 0.1, 8, 36]} />
        <meshStandardMaterial color="#8b95a1" metalness={0.8} roughness={0.35} envMapIntensity={1.1} />
        {rings.map((z, i) => (
          <Instance key={i} position={[0, 0, z]} />
        ))}
      </Instances>
    </group>
  );
}
