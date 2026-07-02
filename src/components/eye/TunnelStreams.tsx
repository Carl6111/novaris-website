"use client";

const COLORS = ["#39d8ff", "#ff3df0", "#7bff5a", "#bda3ff", "#ffd23d", "#ff7a3d"];

// Center vanishing point in the 100x56 viewBox.
const CX = 50;
const CY = 28;
const XS = [5, 19, 33, 50, 67, 81, 95];

type Line = { d: string; color: string; delay: number; dur: number };

function buildLines(): Line[] {
  const lines: Line[] = [];
  XS.forEach((x, i) => {
    const cxMid = (CX + x) / 2;
    // floor (down to y=56) + ceiling (up to y=0), gently bowed
    lines.push({
      d: `M${CX} ${CY} Q ${cxMid} ${CY + (56 - CY) * 0.45} ${x} 56`,
      color: COLORS[i % COLORS.length],
      delay: i * 0.28,
      dur: 2.3 + (i % 3) * 0.5,
    });
    lines.push({
      d: `M${CX} ${CY} Q ${cxMid} ${CY - CY * 0.45} ${x} 0`,
      color: COLORS[(i + 3) % COLORS.length],
      delay: i * 0.33 + 0.4,
      dur: 2.5 + (i % 3) * 0.4,
    });
  });
  return lines;
}

// CSS/SVG animated data streams along the tunnel floor and ceiling — a bright
// pulse travels each conduit outward from the core (stroke-dashoffset flow),
// same technique as the Stärke & Staack loader EKG line.
export function TunnelStreams() {
  const lines = buildLines();
  return (
    <svg
      viewBox="0 0 100 56"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      aria-hidden
    >
      <style>{`@keyframes eyeStreamFlow { to { stroke-dashoffset: -100; } }`}</style>
      {lines.map((l, i) => (
        <g key={i}>
          <path d={l.d} fill="none" stroke={l.color} strokeWidth={0.35} opacity={0.22} strokeLinecap="round" />
          <path
            d={l.d}
            pathLength={100}
            fill="none"
            stroke={l.color}
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="9 91"
            style={{
              filter: `drop-shadow(0 0 1.4px #fff) drop-shadow(0 0 3px ${l.color})`,
              animation: `eyeStreamFlow ${l.dur}s linear ${l.delay}s infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
