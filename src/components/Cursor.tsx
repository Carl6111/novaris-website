"use client";

import { useEffect } from "react";

/**
 * Custom dot + ring cursor. Only activates on fine-pointer devices
 * (desktop mouse). Touch/coarse pointers keep the native cursor.
 */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    document.body.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.id = "cursor";
    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    document.body.append(dot, ring);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };

    const grow = () => {
      dot.style.transform = "translate(-50%,-50%) scale(2.2)";
      ring.style.transform = "translate(-50%,-50%) scale(1.6)";
    };
    const shrink = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.transform = "translate(-50%,-50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    const interactive = document.querySelectorAll(
      "a, button, input, [role='button'], .interactive",
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      dot.remove();
      ring.remove();
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
