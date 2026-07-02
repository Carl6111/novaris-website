"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { workSpots, FLOOR_Y, CORRIDOR_DEPTH } from "./streams";

const URLS = [
  "/robots/r01.png",
  "/robots/r05.png",
  "/robots/r06.png",
  "/robots/r07.png",
  "/robots/r09.png",
  "/robots/r12.png",
  "/robots/r13.png",
  "/robots/r14.png",
];

type Bot = {
  home: THREE.Vector3;
  tex: number;
  phase: number;
  speed: number;
  size: number;
  pokeDir: THREE.Vector3;
  roamer: boolean;
  lane: number;
};

// Detailed cutout robots as billboarded sprites. Real leg rigging isn't possible
// from a flat reference, so liveliness = jerky ("stöckig") hops + a working poke
// toward the data stream they cluster on. Reads like ants busy on a structure.
export function Robots() {
  const textures = useTexture(URLS);

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  const bots = useMemo<Bot[]>(() => {
    const spots = workSpots();
    const arr: Bot[] = spots.slice(0, 26).map((s, i) => ({
      home: s.pos.clone(),
      tex: i % URLS.length,
      phase: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 0.7,
      size: 0.28 + Math.random() * 0.14,
      pokeDir: new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 0.5, (Math.random() - 0.5) * 2).normalize(),
      roamer: false,
      lane: 0,
    }));
    // A handful roaming the floor between stations
    for (let i = 0; i < 8; i++) {
      arr.push({
        home: new THREE.Vector3((Math.random() - 0.5) * 3, FLOOR_Y + 0.3, -Math.random() * CORRIDOR_DEPTH),
        tex: i % URLS.length,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.6,
        size: 0.26 + Math.random() * 0.12,
        pokeDir: new THREE.Vector3(0, 0, 1),
        roamer: true,
        lane: (Math.random() - 0.5) * 3,
      });
    }
    return arr;
  }, []);

  const refs = useRef<THREE.Sprite[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    bots.forEach((b, i) => {
      const sp = refs.current[i];
      if (!sp) return;

      // Jerky vertical hop, quantized for a stop-motion / ant feel
      const hump = Math.max(0, Math.sin(t * 3.4 * b.speed + b.phase));
      const stepped = Math.round(hump * 3) / 3;

      if (b.roamer) {
        let z = (b.home.z + t * b.speed * 0.8) % CORRIDOR_DEPTH;
        z = ((z % CORRIDOR_DEPTH) + CORRIDOR_DEPTH) % CORRIDOR_DEPTH - CORRIDOR_DEPTH;
        sp.position.set(b.lane, FLOOR_Y + 0.25 + stepped * 0.1, z);
      } else {
        // Working: small poke toward the stream + jerky bob
        const poke = Math.sin(t * 6 * b.speed + b.phase) * 0.06;
        sp.position.set(
          b.home.x + b.pokeDir.x * poke,
          b.home.y + b.pokeDir.y * poke + stepped * 0.08,
          b.home.z + b.pokeDir.z * poke
        );
      }

      const tex = textures[b.tex];
      const img = tex.image as { width: number; height: number } | undefined;
      const aspect = img ? img.width / img.height : 1;
      sp.scale.set(b.size * aspect, b.size, 1);
    });
  });

  return (
    <group>
      {bots.map((b, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <spriteMaterial map={textures[b.tex]} alphaTest={0.5} transparent toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}
