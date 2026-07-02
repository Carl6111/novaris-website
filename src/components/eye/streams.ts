import * as THREE from "three";

export const CORRIDOR_DEPTH = 26;
export const FLOOR_Y = -1.62;

export type Stream = {
  curve: THREE.CatmullRomCurve3;
  color: string;
};

// Colorful data streams running the length of the corridor. The little robots
// cluster on these and "work" on them. Playful palette (toy robots), not cyber-neon.
const COLORS = ["#22C4D6", "#E8479B", "#9BD13A", "#F6A623", "#7C5CFF"];

function makeStream(lane: number, yBase: number, color: string): Stream {
  const pts: THREE.Vector3[] = [];
  const segs = 6;
  for (let i = 0; i <= segs; i++) {
    const z = -((i / segs) * CORRIDOR_DEPTH);
    const wob = Math.sin(i * 1.3 + lane) * 0.5;
    pts.push(new THREE.Vector3(lane + wob, yBase + Math.sin(i * 0.9) * 0.4, z));
  }
  return { curve: new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5), color };
}

export const STREAMS: Stream[] = [
  makeStream(-1.4, 0.2, COLORS[0]),
  makeStream(1.5, -0.3, COLORS[1]),
  makeStream(-0.4, 0.9, COLORS[2]),
  makeStream(0.8, 0.4, COLORS[3]),
  makeStream(-1.7, -0.7, COLORS[4]),
];

// Work spots: points sampled along the streams where robots gather to "repair".
export function workSpots(): { pos: THREE.Vector3; color: string }[] {
  const spots: { pos: THREE.Vector3; color: string }[] = [];
  for (const s of STREAMS) {
    for (let i = 0; i < 7; i++) {
      const t = 0.06 + (i / 7) * 0.88 + Math.random() * 0.04;
      const p = s.curve.getPointAt(Math.min(t, 1));
      spots.push({ pos: p.clone(), color: s.color });
    }
  }
  return spots;
}
