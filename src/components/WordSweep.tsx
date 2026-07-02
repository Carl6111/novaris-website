"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Apple-artiges Wort-für-Wort-Aufhellen beim Scrollen: jedes Wort geht von
 * gedimmt auf hell, an den Scroll-Fortschritt des Blocks gekoppelt (scrub).
 * Fallback bei reduced-motion: alles sofort hell.
 */
export default function WordSweep({ text, as: Tag = "p", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = el.querySelectorAll<HTMLElement>(".sweep-word");
    if (reduce) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 52%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return createElement(
    Tag,
    { ref, className: `word-sweep ${className}`.trim() },
    words.map((w, i) => (
      <span key={i} className="sweep-word">
        {w}
        {i < words.length - 1 ? " " : ""}
      </span>
    )),
  );
}
