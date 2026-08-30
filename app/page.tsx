import Link from "next/link";
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

function IndexedProject({ project, index, sizes }: { project: Project; index: number; sizes?: string }) {
  return (
    <div className={styles.indexedProject}>
      <span className={styles.projectIndex} aria-hidden="true">{String(index).padStart(2, "0")}</span>
      <ProjectFigure project={project} sizes={sizes} />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main-content">
        <ArchitecturalOrbit />

        <section className={`${styles.statement} section-space`}>
          <div className="page-shell">
            <div className={styles.statementGrid}>
              <div className="mono-label">
                <p>Paper Brick Architects</p>
                <p>Thoothukudi, Tamil Nadu</p>
              </div>
              <div>
                <h2>Architecture and interiors shaped around how people live.</h2>
                <p>Paper Brick Architects designs individual homes and interior environments with attention to proportion, material, light and everyday use.</p>
                <Link className={styles.textLink} href="/studio">View the studio →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.selected} aria-labelledby="selected-work-title">
          <div className={styles.sectionHeading}>
            <p className="mono-label">Selected work</p>
            <h2 id="selected-work-title">Projects</h2>
          </div>
          <div className={styles.fullProject}><IndexedProject project={selected[0]} index={1} sizes="100vw" /></div>
          <div className={styles.pair}>
            <IndexedProject project={selected[1]} index={2} />
            <IndexedProject project={selected[2]} index={3} />
          </div>
          <div className={styles.fullProject}><IndexedProject project={selected[3]} index={4} sizes="100vw" /></div>
          <div className={styles.pair}>
            <IndexedProject project={selected[4]} index={5} />
            <IndexedProject project={selected[5]} index={6} />
          </div>
          <div className={styles.archiveLink}><Link href="/work">View all work →</Link></div>
        </section>

        <section className={`${styles.services} section-space`} aria-labelledby="services-title">
          <div className="page-shell">
            <p className="mono-label">What we do</p>
            <h2 id="services-title" className="visually-hidden">Services</h2>
            <ol>
              <li><span>01</span><Link href="/services#architecture">Architecture</Link></li>
              <li><span>02</span><Link href="/services#interiors">Interiors</Link></li>
              <li><span>03</span><Link href="/services#integrated">Architecture + Interiors</Link></li>
            </ol>
          </div>
        </section>

        <section className={styles.filmSection} aria-labelledby="film-title">
          <div className={styles.filmHeading}>
            <p className="mono-label">Moving study</p>
            <h2 id="film-title">House / light / material</h2>
          </div>
          <ProjectFilm />
        </section>

        <StartProjectCTA sourcePage="/" />
      </main>
      <SiteFooter />
    </>
  );
}
