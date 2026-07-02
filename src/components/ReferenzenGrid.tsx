"use client";

import { useState } from "react";
import CaseCard from "@/components/CaseCard";
import type { CaseStudy } from "@/lib/site";

export default function ReferenzenGrid({
  studies,
}: {
  studies: CaseStudy[];
}) {
  const industries = ["Alle", ...new Set(studies.map((s) => s.industry))];
  const [active, setActive] = useState("Alle");

  const filtered =
    active === "Alle" ? studies : studies.filter((s) => s.industry === active);

  return (
    <>
      <div className="filter-bar">
        {industries.map((ind) => (
          <button
            key={ind}
            className={ind === active ? "filter-chip active" : "filter-chip"}
            onClick={() => setActive(ind)}
          >
            {ind}
          </button>
        ))}
      </div>
      <div className="cases-grid">
        {filtered.map((study) => (
          <CaseCard key={study.company} study={study} />
        ))}
      </div>
    </>
  );
}
