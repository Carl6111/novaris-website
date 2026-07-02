"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "./palette";

type CardData = {
  title: string;
  price: string;
  stripe: string;
  x: number;
  featured?: boolean;
};

const CARDS: CardData[] = [
  { title: "Automations", price: "500 €/Mo", stripe: "#22C4D6", x: -1.65 },
  { title: "Pipeline", price: "2.000 €/Mo", stripe: "#E8479B", x: 0 },
  { title: "Growth Engine Plus", price: "4.000 €/Mo", stripe: "#F6A623", x: 1.65, featured: true },
];

const Z = -20.5;

function Card({ title, price, stripe, x, featured }: CardData) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const target = hovered ? 1.08 : 1;
    const s = THREE.MathUtils.lerp(g.scale.x, target, 0.15);
    g.scale.setScalar(s);
    g.position.y = THREE.MathUtils.lerp(g.position.y, hovered ? 0.35 : 0.15, 0.12);
  });

  return (
    <group
      ref={group}
      position={[x, 0.15, Z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[1.4, 1.95, 0.09]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color={featured ? "#111114" : "#ffffff"} roughness={0.5} metalness={0.05} />
      </RoundedBox>

      {/* Top color stripe */}
      <mesh position={[0, 0.82, 0.05]}>
        <planeGeometry args={[1.4, 0.16]} />
        <meshStandardMaterial color={stripe} emissive={stripe} emissiveIntensity={0.6} toneMapped={false} />
      </mesh>

      <Text position={[0, 0.4, 0.06]} fontSize={0.16} maxWidth={1.2} textAlign="center" color={featured ? "#fff" : PALETTE.ink} anchorY="middle">
        {title}
      </Text>
      <Text position={[0, -0.05, 0.06]} fontSize={0.22} color={featured ? "#F6A623" : PALETTE.ink} anchorY="middle">
        {price}
      </Text>
      <Text position={[0, -0.55, 0.06]} fontSize={0.085} color={featured ? "#aaa" : PALETTE.steel} anchorY="middle">
        Richtpreis · monatlich
      </Text>
    </group>
  );
}

// Package cards waiting deep in the corridor; the camera scrolls toward them so
// they're already approaching before the clean cut to the packages section.
export function PackageCards() {
  return (
    <group>
      {CARDS.map((c) => (
        <Card key={c.title} {...c} />
      ))}
    </group>
  );
}
