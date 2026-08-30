import Link from "next/link";
import styles from "./architectural-orbit.module.css";

const chapters = [
  {
    eyebrow: "Paper Brick Architects / Thoothukudi",
    title: <>Every building begins<br />as a relationship.</>,
    body: "Between site, proportion, light and everyday life.",
  },
  {
    eyebrow: "02 / Volume",
    title: <>Proportion</>,
    body: "Building shell, room and movement are developed as one spatial system.",
  },
  {
    eyebrow: "03 / Material",
    title: <>Material gives<br />proportion weight.</>,
    body: "Architecture and interiors are considered as one continuous environment.",
    meta: <>01 Architecture&nbsp;&nbsp; 02 Interiors&nbsp;&nbsp; 03 Architecture + Interiors</>,
  },
  {
    eyebrow: "04 / Light",
    title: <>Light is part<br />of the plan.</>,
    body: "Spaces are shaped around climate, shade, movement and everyday use.",
    meta: <>Thoothukudi&nbsp;&nbsp; Tiruchendur&nbsp;&nbsp; Tirunelveli&nbsp;&nbsp; Trichy</>,
  },
  {
    eyebrow: "05 / Inhabitation",
    title: <>Architecture shaped<br />around how people live.</>,
    body: "Individual homes and interior environments considered through proportion, material, light and everyday use.",
    actions: true,
  },
  {
    eyebrow: "06 / Release",
    title: <>Drawing → Volume<br />→ Material → Light</>,
    body: "Scroll to enter the archive",
  },
] as const;

const spatialLabels = ["Threshold", "Courtyard", "Shade", "Living", "Light"];

type ScrollNarrativeProps = {
  activeChapter: number;
  progress: number;
  onSelectChapter: (index: number) => void;
  onNext: () => void;
};

export function ScrollNarrative({
  activeChapter,
  progress,
  onSelectChapter,
  onNext,
}: ScrollNarrativeProps) {
  return (
    <div className={`${styles.narrative} ${activeChapter === 0 ? styles.darkInk : ""}`}>
      <div className={styles.gridOverlay} aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className={styles.topMeta} aria-hidden="true">
        <span>PB / 08°48′N</span>
        <span>Scale / 1:100</span>
      </div>
      <div className={styles.datum} style={{ left: `${8 + progress * 84}%` }} aria-hidden="true" />
      <div className={styles.progressRail} aria-hidden="true">
        <span>{String(activeChapter + 1).padStart(2, "0")}</span>
        <b style={{ transform: `scaleY(${progress})` }} />
      </div>

      {chapters.map((chapter, index) => (
        <article
          key={chapter.eyebrow}
          className={`${styles.chapter} ${styles[`chapter${index + 1}`]} ${activeChapter === index ? styles.chapterActive : ""}`}
          aria-hidden={activeChapter !== index}
        >
          <p className={styles.eyebrow}>{chapter.eyebrow}</p>
          <h2>{chapter.title}</h2>
          <p className={styles.chapterBody}>{chapter.body}</p>
          {"meta" in chapter && <p className={styles.chapterMeta}>{chapter.meta}</p>}
          {"actions" in chapter && (
            <div className={styles.actions}>
              <Link href="/work">View selected work</Link>
              <Link href="/studio">Meet the studio</Link>
            </div>
          )}
        </article>
      ))}

      <div className={`${styles.spatialLabels} ${activeChapter === 1 ? styles.spatialLabelsVisible : ""}`} aria-hidden="true">
        {spatialLabels.map((label) => <span key={label}>{label}</span>)}
      </div>
      <nav className={styles.orbitNavigation} aria-label="Orbit chapters">
        <div className={styles.selectorDots}>
          {chapters.map((chapter, index) => (
            <button
              key={chapter.eyebrow}
              type="button"
              className={`${styles.selectorDot} ${activeChapter === index ? styles.selectorDotActive : ""}`}
              aria-label={`Go to chapter ${index + 1}: ${chapter.eyebrow}`}
              aria-current={activeChapter === index ? "step" : undefined}
              onClick={() => onSelectChapter(index)}
            />
          ))}
        </div>
        <button type="button" className={styles.nextButton} onClick={onNext}>
          <span>{activeChapter === chapters.length - 1 ? "Projects" : "Next"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>
      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll / select</span>
        <i />
      </div>
    </div>
  );
}
