"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/types";
import { trackEvent } from "@/lib/analytics";
import { ProjectFigure } from "./ProjectFigure";
import styles from "./WorkArchive.module.css";

const filters = ["All", "Residential", "Hospital", "Completed", "Ongoing"] as const;
type Filter = (typeof filters)[number];

export function WorkArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = useMemo(
    () => projects.filter((project) =>
      filter === "All" || project.category === filter || project.status === filter,
    ),
    [filter, projects],
  );

  function applyFilter(next: Filter) {
    setFilter(next);
    trackEvent({ name: "filter_work", filter: next });
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter work">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => applyFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {filter === "All" ? "All projects shown." : `${filter} projects shown.`}
      </p>
      <div className={styles.grid}>
        {filtered.map((project, index) => (
          <div key={project.slug} className={index % 3 === 0 ? styles.full : styles.half}>
            <ProjectFigure
              project={project}
              priority={index === 0}
              sizes={index % 3 === 0 ? "100vw" : "(max-width: 767px) 100vw, 50vw"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
