import type { Metadata } from "next";
import Image from "next/image";
import { ProjectFigure } from "@/components/ProjectFigure";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { projectsBySlug } from "@/content/projects";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Studio",
  description: "Paper Brick Architects is an architecture and interior design practice based in Thoothukudi, Tamil Nadu.",
  alternates: { canonical: "/studio" },
};

const perumal = projectsBySlug.get("perumal")!;
const jvk = projectsBySlug.get("jvk")!;
const tilak = projectsBySlug.get("tilak")!;

export default function StudioPage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main-content">
        <section className={styles.hero} data-hero aria-labelledby="studio-title">
          <Image src={jvk.coverImage.src} alt={jvk.coverImage.alt} fill priority sizes="100vw" className={styles.heroImage} />
          <h1 id="studio-title">Studio</h1>
        </section>

        <section className={`${styles.intro} section-space`}>
          <div className="page-shell">
            <p className="mono-label">Practice / Thoothukudi</p>
            <div className={styles.introGrid}>
              <h2>Architecture and interiors considered as one spatial environment.</h2>
              <p>Paper Brick Architects is an architecture and interior design practice based in Thoothukudi, Tamil Nadu. The studio works across residential architecture and integrated interior projects, shaping spaces through proportion, material, light and everyday use.</p>
            </div>
          </div>
        </section>

        <section className={styles.approach} aria-labelledby="approach-title">
          <div className={styles.approachImage}>
            <Image src={perumal.gallery[7].src} alt={perumal.gallery[7].alt} width={perumal.gallery[7].width} height={perumal.gallery[7].height} sizes="(max-width: 767px) 100vw, 55vw" />
          </div>
          <div className={styles.approachText}>
            <p className="mono-label">Working approach</p>
            <h2 id="approach-title">Building shell, room, material and detail are developed as parts of the same project.</h2>
            <p>The portfolio includes architectural consultancy and combined architecture-and-interior commissions. Each project is represented here through its verified scope and imagery.</p>
          </div>
        </section>

        <section className={`${styles.locations} section-space`} aria-labelledby="locations-title">
          <div className="page-shell">
            <p className="mono-label">Project locations</p>
            <h2 id="locations-title" className="visually-hidden">Locations represented in the studio portfolio</h2>
            <ul><li>Thoothukudi</li><li>Tiruchendur</li><li>Trichy</li><li>Tirunelveli</li></ul>
          </div>
        </section>

        <section className={styles.selected} aria-labelledby="studio-selected-title">
          <div className={styles.selectedHeading}><p className="mono-label">Selected work</p><h2 id="studio-selected-title">Across scales</h2></div>
          <div className={styles.selectedGrid}><ProjectFigure project={perumal} /><ProjectFigure project={tilak} /></div>
        </section>

        <StartProjectCTA sourcePage="/studio" />
      </main>
      <SiteFooter />
    </>
  );
}
