"use client";

import { useRef, useState } from "react";
import styles from "./ProjectFilm.module.css";

export function ProjectFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={styles.frame}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster="/media/video/house-film-poster.jpg"
        onEnded={() => setPlaying(false)}
      >
        <source src="/media/video/house-film.mp4" type="video/mp4" />
      </video>
      <button type="button" onClick={togglePlayback}>
        {playing ? "Pause" : "Play film"}
      </button>
    </div>
  );
}
