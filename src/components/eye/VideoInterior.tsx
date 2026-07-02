"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ProgressRef } from "./EyeScene";

// The reactor-tunnel fly-through (MuAPI seedance, 1:1) lives inside the pupil.
// Scroll scrubs the video timeline → the camera travels down the tunnel while
// the robots work and the streams flow. All-intra encode keeps seeking smooth.
export function VideoInterior({ progressRef }: { progressRef: ProgressRef }) {
  const video = useMemo(() => {
    const v = document.createElement("video");
    v.src = "/eye/tunnel.mp4";
    v.muted = true;
    v.loop = false;
    v.playsInline = true;
    v.preload = "auto";
    v.crossOrigin = "anonymous";
    return v;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [video]);

  const smooth = useRef(0);
  const ready = useRef(false);

  useEffect(() => {
    const onReady = () => {
      ready.current = true;
      video.pause();
    };
    video.addEventListener("loadeddata", onReady);
    video.load();
    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.pause();
    };
  }, [video]);

  useFrame(() => {
    if (!ready.current) return;
    const o = progressRef.current?.v ?? 0;
    const target = THREE.MathUtils.clamp((o - 0.38) / 0.6, 0, 1); // enter → scrub
    smooth.current += (target - smooth.current) * 0.12; // no stutter
    const dur = video.duration || 5;
    const t = smooth.current * (dur - 0.04);
    if (Math.abs(video.currentTime - t) > 0.004) video.currentTime = t;
    texture.needsUpdate = true;
  });

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[13, 13]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
