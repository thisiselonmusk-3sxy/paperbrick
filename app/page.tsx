import type { CSSProperties } from "react";
import { HomeServices } from "@/components/HomeServices";
import { DrawRule } from "@/components/motion/DrawRule";
import { MotionLink } from "@/components/motion/MotionLink";
import { ArchitecturalOrbit } from "@/components/immersive/ArchitecturalOrbit";
import { ProjectFilm } from "@/components/ProjectFilm";
import { ProjectFigure } from "@/components/ProjectFigure";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { projectsBySlug } from "@/content/projects";
import type { Project } from "@/content/types";
import styles from "./page.module.css";

const selectedSlugs = ["perumal", "ramkumar", "balaji", "alagiri", "nisha", "tilak"];
const selected = selectedSlugs.map((slug) => projectsBySlug.get(slug)!);

function IndexedProject({ project, index, sizes, origin = "left" }: { project: Project; index: number; sizes?: string; origin?: "left" | "right" | "bottom" }) {
  return (
    <div className={styles.indexedProject} data-selected-project>
      <div className={styles.projectRule}><DrawRule /></div>
      <span className={styles.projectIndex} aria-hidden="true" data-reveal="text">{String(index).padStart(2, "0")}</span>
      <ProjectFigure project={project} sizes={sizes} revealOrigin={origin} />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main-content">
        <ArchitecturalOrbit />

        <section className={`${styles.statement} section-space`} data-reveal="section" data-section-progress>
          <span className={styles.handoffPlane} aria-hidden="true" />
          <span className={styles.statementDatum} aria-hidden="true" data-reveal="rule" />
          <div className="page-shell">
            <div className={styles.statementGrid}>
              <div className="mono-label" data-reveal="text">
                <p>Paper Brick Architects</p>
                <p>Thoothukudi, Tamil Nadu</p>
              </div>
              <div>
                <h2 data-reveal="text">Architecture and interiors shaped around how people live.</h2>
                <p data-reveal="text" style={{ "--reveal-delay": "120ms" } as CSSProperties}>Paper Brick Architects designs individual homes and interior environments with attention to proportion, material, light and everyday use.</p>
                <MotionLink className={styles.textLink} href="/studio">View the studio →</MotionLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.selected} aria-labelledby="selected-work-title">
          <div className={styles.sectionHeading} data-reveal="text">
            <p className="mono-label">Selected work</p>
            <h2 id="selected-work-title">Projects</h2>
          </div>
          <div className={styles.fullProject}><IndexedProject project={selected[0]} index={1} sizes="100vw" /></div>
          <div className={styles.pair}>
            <IndexedProject project={selected[1]} index={2} origin="left" />
            <IndexedProject project={selected[2]} index={3} origin="right" />
          </div>
          <div className={styles.fullProject}><IndexedProject project={selected[3]} index={4} sizes="100vw" origin="bottom" /></div>
          <div className={styles.pair}>
            <IndexedProject project={selected[4]} index={5} origin="right" />
            <IndexedProject project={selected[5]} index={6} origin="left" />
          </div>
          <div className={styles.archiveLink}><MotionLink href="/work">View all work →</MotionLink></div>
          <div className={styles.selectedProgress} data-selected-progress aria-label="Selected work: six projects">01 / 06</div>
        </section>

        <HomeServices />

        <section className={styles.filmSection} aria-labelledby="film-title">
          <div className={styles.filmHeading} data-reveal="text">
            <p className="mono-label">Moving study</p>
            <div><span className={styles.filmCode}>Film / 01</span><h2 id="film-title">House / light / material</h2></div>
          </div>
          <ProjectFilm />
        </section>

        <StartProjectCTA sourcePage="/" />
      </main>
      <SiteFooter />
    </>
  );
}
