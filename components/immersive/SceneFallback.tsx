import type { CSSProperties } from "react";
import { SoftwareHouseCanvas } from "./SoftwareHouseCanvas";
import styles from "./architectural-orbit.module.css";

type FallbackStyle = CSSProperties & {
  "--fallback-bg": string;
  "--fallback-light-x": string;
  "--fallback-warmth": string;
  "--fallback-model": string;
  "--orbit-angle": string;
  "--orbit-tilt": string;
  "--orbit-x": string;
  "--orbit-y": string;
  "--orbit-scale": string;
};

export function SceneFallback({ progress, active }: { progress: number; active: boolean }) {
  const darkness = progress < 0.82 ? progress / 0.82 : (1 - progress) / 0.18;
  const warmth = Math.min(1, Math.max(0, (progress - 0.5) / 0.34));
  const material = Math.min(1, progress / 0.55);
  const release = Math.max(0, (progress - 0.88) / 0.12);
  const style: FallbackStyle = {
    "--fallback-bg": `hsl(205 7% ${78 - darkness * 68}%)`,
    "--fallback-light-x": `${18 + progress * 64}%`,
    "--fallback-warmth": String(warmth),
    "--fallback-model": `hsl(45 10% ${91 - material * 9}%)`,
    "--orbit-angle": `${-10 + progress * 38}deg`,
    "--orbit-tilt": `${-1 - release * 7}deg`,
    "--orbit-x": `${Math.sin(progress * Math.PI * 1.35) * -4.5}vw`,
    "--orbit-y": `${release * -5}vh`,
    "--orbit-scale": String(1 + Math.sin(progress * Math.PI) * 0.055 - release * 0.12),
  };

  return (
    <div className={styles.fallback} style={style} aria-hidden="true">
      <div className={styles.fallbackHouse}>
        <span /><span /><span /><span />
      </div>
      <SoftwareHouseCanvas progress={progress} active={active} />
    </div>
  );
}
