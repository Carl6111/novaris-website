"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
};

/** Wrapper that fades + slides its content in once it scrolls into view. */
export default function Reveal({
  children,
  as: Tag = "div",
  delay,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return createElement(
    Tag,
    { ref, className: `reveal${delayClass} ${className}`.trim() },
    children,
  );
}
