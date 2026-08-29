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

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <header className={styles.intro}>
          <p className="mono-label">Archive / 13 projects</p>
          <h1>Work</h1>
          <p>Architecture and interior projects across Thoothukudi, Tiruchendur, Trichy and Tirunelveli.</p>
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
