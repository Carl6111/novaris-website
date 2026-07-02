"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STREAMS } from "./streams";

const PACKETS_PER_STREAM = 6;

type Packet = { stream: number; offset: number; speed: number };

// Colorful conduits with packets of light flowing along them = the data streams.
export function DataStreams() {
  const tubes = useMemo(
    () =>
      STREAMS.map((s) => ({
        geom: new THREE.TubeGeometry(s.curve, 120, 0.045, 10, false),
        color: s.color,
      })),
    []
  );

  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const packets = useMemo<Packet[]>(() => {
    const arr: Packet[] = [];
    STREAMS.forEach((_, s) => {
      for (let i = 0; i < PACKETS_PER_STREAM; i++) {
        arr.push({ stream: s, offset: i / PACKETS_PER_STREAM, speed: 0.05 + Math.random() * 0.05 });
      }
    });
    return arr;
  }, []);

  useFrame((state) => {
    const mesh = packetsRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    packets.forEach((p, i) => {
      const u = (p.offset + t * p.speed) % 1;
      const pos = STREAMS[p.stream].curve.getPointAt(u);
      dummy.position.copy(pos);
      const pulse = 0.7 + Math.sin(t * 6 + i) * 0.3;
      dummy.scale.setScalar(0.07 * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {tubes.map((t, i) => (
        <mesh key={i} geometry={t.geom}>
          <meshStandardMaterial
            color={t.color}
            emissive={t.color}
            emissiveIntensity={1.4}
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      <instancedMesh ref={packetsRef} args={[undefined, undefined, packets.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
