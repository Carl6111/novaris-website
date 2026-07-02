"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ModuleIcon from "./ModuleIcon";
import type { PlatformModule } from "@/lib/site";

type Props = {
  modules: PlatformModule[];
};

/**
 * Kino-Kern der Startseite: links eine sticky Bühne, die zwischen den Modul-
 * Visuals überblendet, rechts eine hohe Spalte von Modul-Beschreibungen.
 * Ein IntersectionObserver setzt das aktive Modul, sobald es die Bildmitte
 * erreicht — so „läuft" die Plattform wie ein Video am Cursor vorbei.
 */
export default function PlatformShowcase({ modules }: Props) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const current = modules[active];

  return (
    <section className="showcase" id="plattform" aria-label="Growth Engine Plus — Module">
      <div className="showcase-inner">
        {/* Sticky visual stage */}
        <div className="showcase-stage">
          <div className="stage-rail" aria-hidden>
            {modules.map((m, i) => (
              <span
                key={m.id}
                className={i === active ? "rail-tick on" : "rail-tick"}
              />
            ))}
          </div>

          <div className="stage-frame">
            <div className="stage-head" aria-hidden>
              <span className="stage-dot" />
              <span className="stage-dot" />
              <span className="stage-dot" />
              <span className="stage-crumb">
                <span className="stage-crumb-icon">
                  <ModuleIcon id={current.id} />
                </span>
                {current.name}
              </span>
            </div>

            <div className="stage-canvas">
              {modules.map((m, i) => (
                <div
                  key={m.id}
                  className={i === active ? "stage-visual on" : "stage-visual"}
                  aria-hidden={i !== active}
                >
                  {m.visual === "image" && m.image ? (
                    <Image
                      src={m.image}
                      alt={`${m.name} — Vorschau`}
                      fill
                      sizes="(max-width: 960px) 90vw, 46vw"
                      className="stage-shot"
                    />
                  ) : (
                    <Panel kind={m.panel ?? "site"} />
                  )}
                </div>
              ))}
              <div className="stage-metric" aria-hidden>
                <span className="metric-num">{current.metric}</span>
                <span className="metric-label">{current.metricLabel}</span>
              </div>
            </div>
          </div>
          <div className="stage-glow" aria-hidden />
        </div>

        {/* Scrolling module descriptions */}
        <div className="showcase-track">
          {modules.map((m, i) => (
            <div
              key={m.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className={i === active ? "showcase-step on" : "showcase-step"}
            >
              <div className="step-top">
                <span className="step-icon">
                  <ModuleIcon id={m.id} />
                </span>
                <div className="step-index">{m.index}</div>
              </div>
              <div className="step-kicker">{m.kicker}</div>
              <h3 className="step-name">{m.name}</h3>
              <p className="step-tagline">{m.tagline}</p>
              <p className="step-body">{m.desc}</p>
              <ul className="step-points">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Abstrakte, marken-treue App-Mockups für Module ohne echten Screenshot. */
function Panel({ kind }: { kind: NonNullable<PlatformModule["panel"]> }) {
  if (kind === "site") {
    return (
      <div className="panel panel-site">
        <div className="p-nav">
          <span className="p-logo" />
          <span className="p-links">
            <i /> <i /> <i />
          </span>
          <span className="p-btn" />
        </div>
        <div className="p-hero">
          <span className="p-h1" />
          <span className="p-h2" />
          <span className="p-cta" />
        </div>
        <div className="p-cards">
          <span /> <span /> <span />
        </div>
      </div>
    );
  }
  if (kind === "search") {
    return (
      <div className="panel panel-search">
        <div className="p-searchbar">
          <span className="p-mag" />
          <span className="p-query" />
        </div>
        <div className="p-result top">
          <span className="p-rank">1</span>
          <span className="p-lines">
            <i /> <i className="short" />
          </span>
          <span className="p-badge">Novaris</span>
        </div>
        <div className="p-result">
          <span className="p-rank">2</span>
          <span className="p-lines">
            <i /> <i className="short" />
          </span>
        </div>
        <div className="p-result">
          <span className="p-rank">3</span>
          <span className="p-lines">
            <i /> <i className="short" />
          </span>
        </div>
        <div className="p-ai">
          <span className="p-ai-dot" />
          <span className="p-ai-text">
            <i /> <i className="short" />
          </span>
        </div>
      </div>
    );
  }
  if (kind === "chat") {
    return (
      <div className="panel panel-chat">
        <div className="p-bubble in">
          <i /> <i className="short" />
        </div>
        <div className="p-bubble out">
          <i />
        </div>
        <div className="p-bubble in wide">
          <i /> <i /> <i className="short" />
        </div>
        <div className="p-typing">
          <span /> <span /> <span />
        </div>
      </div>
    );
  }
  if (kind === "flow") {
    return (
      <div className="panel panel-flow">
        <span className="p-node n1">Anfrage</span>
        <span className="p-edge e1" />
        <span className="p-node n2">KI liest</span>
        <span className="p-edge e2" />
        <span className="p-node n3">sortiert</span>
        <span className="p-edge e3" />
        <span className="p-node n4">weitergeleitet</span>
      </div>
    );
  }
  return (
    <div className="panel panel-invoice">
      <div className="p-inv-head">
        <span className="p-inv-title" />
        <span className="p-inv-status">bezahlt</span>
      </div>
      <div className="p-inv-rows">
        <span /> <span /> <span className="short" />
      </div>
      <div className="p-inv-total">
        <span className="p-inv-sum" />
      </div>
    </div>
  );
}
