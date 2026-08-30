"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProjectFilm.module.css";

export function ProjectFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = videoRef.current?.parentElement;
    const pauseOffscreen = () => {
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
        setPlaying(false);
      }
    };
    frame?.addEventListener("motion:offscreen", pauseOffscreen);
    return () => frame?.removeEventListener("motion:offscreen", pauseOffscreen);
  }, []);

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
    <div className={`${styles.frame} ${playing ? styles.playing : ""}`} data-reveal="image" data-reveal-origin="left" data-motion-pause-offscreen>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster="/media/video/house-film-poster.jpg"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      >
        <source src="/media/video/house-film.mp4" type="video/mp4" />
      </video>
      <span className={styles.annotation} aria-hidden="true">House study / Thoothukudi</span>
      <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause house film" : "Play house film"}>
        <span>{playing ? "Pause" : "Play film"}</span>
      </button>
    </div>
  );
}
