import Image from "next/image";
import Link from "next/link";
import { ProjectFilm } from "@/components/ProjectFilm";
import { ProjectFigure } from "@/components/ProjectFigure";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { projectsBySlug } from "@/content/projects";
import styles from "./page.module.css";

const selectedSlugs = ["perumal", "ramkumar", "balaji", "alagiri", "nisha", "tilak"];
const selected = selectedSlugs.map((slug) => projectsBySlug.get(slug)!);
const hero = selected[0];

export default function HomePage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main-content">
        <section className={styles.hero} data-hero aria-labelledby="home-title">
          <h1 id="home-title" className="visually-hidden">Paper Brick Architects</h1>
          <Image
            src={hero.coverImage.src}
            alt={hero.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroCaption}>
            <span>{hero.name}</span>
            <span>{hero.location}</span>
            <span>Architecture + Interiors</span>
          </div>
        </section>

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
            <h2 id="selected-work-title">Projects / 01—06</h2>
          </div>
          <div className={styles.fullProject}><ProjectFigure project={selected[0]} sizes="100vw" /></div>
          <div className={styles.pair}>
            <ProjectFigure project={selected[1]} />
            <ProjectFigure project={selected[2]} />
          </div>
          <div className={styles.fullProject}><ProjectFigure project={selected[3]} sizes="100vw" /></div>
          <div className={styles.pair}>
            <ProjectFigure project={selected[4]} />
            <ProjectFigure project={selected[5]} />
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
