import type { CaseStudy } from "@/lib/site";

/**
 * Renders a case study. When isPlaceholder is true a visible "Beispiel"
 * badge is shown so muster data is never mistaken for a real client result.
 */
export default function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="case-card" tabIndex={0}>
      {study.isPlaceholder && (
        <span className="case-placeholder-badge">Beispiel</span>
      )}
      <div className="case-card-front">
        <span className="case-card-icon" aria-hidden>
          {study.icon}
        </span>
        <div className="case-card-industry">{study.industry}</div>
        <div className="case-card-company">{study.company}</div>
        <div className="case-card-metric">{study.metric}</div>
        <div className="case-card-metric-label">{study.metricLabel}</div>
      </div>
      <div className="case-card-overlay">
        <div className="overlay-item">
          <span className="overlay-label problem">Problem</span>
          <span className="overlay-text">{study.problem}</span>
        </div>
        <div className="overlay-divider" />
        <div className="overlay-item">
          <span className="overlay-label solution">Lösung</span>
          <span className="overlay-text">{study.solution}</span>
        </div>
        <div className="overlay-divider" />
        <div className="overlay-item">
          <span className="overlay-label result">Ergebnis</span>
          <span className="overlay-text">{study.result}</span>
        </div>
      </div>
    </article>
  );
}
