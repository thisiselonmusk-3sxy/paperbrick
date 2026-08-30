import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { WorkArchive } from "@/components/WorkArchive";
import { projects } from "@/content/projects";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Architecture and interior projects by Paper Brick Architects across Tamil Nadu.",
  alternates: { canonical: "/work" },
};

const builtUpAreas = projects.flatMap((project) => project.builtUpAreaSqFt ?? []);
const formatArea = new Intl.NumberFormat("en-IN").format;
const areaRange = `${formatArea(Math.min(...builtUpAreas))}–${formatArea(Math.max(...builtUpAreas))} sq ft`;

const practiceMetrics = [
  { label: "Project scale", value: areaRange },
  { label: "Integrated scope", value: "Architecture + Interiors" },
  { label: "Design focus", value: "Homes + Healthcare" },
  { label: "Regional reach", value: "Thoothukudi → Trichy" },
] as const;

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <header className={styles.intro}>
          <p className="mono-label">Project archive</p>
          <h1>Work</h1>
          <p className={styles.introCopy}>Explore spaces developed as complete environments—from building form and climate response to material, light and interior detail.</p>
          <dl className={styles.metrics} aria-label="Practice capabilities">
            {practiceMetrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </header>
        <section className={styles.archive} aria-label="Project archive">
          <WorkArchive projects={projects} />
        </section>
        <StartProjectCTA sourcePage="/work" />
      </main>
      <SiteFooter />
    </>
  );
}
