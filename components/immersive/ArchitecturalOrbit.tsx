"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ArchitecturalScene } from "./ArchitecturalScene";
import { SceneFallback } from "./SceneFallback";
import { chapterStops } from "./scene-config";
import { ScrollNarrative } from "./ScrollNarrative";
import styles from "./architectural-orbit.module.css";

type WebGLSupport = "webgl2" | "webgl1" | null;

function detectWebGLSupport(): WebGLSupport {
  const probe = document.createElement("canvas");
  const attributes: WebGLContextAttributes = {
    alpha: false,
    antialias: false,
    depth: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "default",
    stencil: false,
  };

  try {
    const webgl2 = probe.getContext("webgl2", attributes);
    if (webgl2) {
      webgl2.getExtension("WEBGL_lose_context")?.loseContext();
      return "webgl2";
    }
    const webgl1 = probe.getContext("webgl", attributes)
      || (probe.getContext("experimental-webgl", attributes) as WebGLRenderingContext | null);
    if (webgl1) {
      webgl1.getExtension("WEBGL_lose_context")?.loseContext();
      return "webgl1";
    }
  } catch {
    return null;
  }
  return null;
}

export function ArchitecturalOrbit() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ArchitecturalScene | null>(null);
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let cancelled = false;
    let initializationFrame = 0;
    let initializationStarted = false;
    section.dataset.renderer = "canvas2d";

    const initializeScene = async () => {
      if (cancelled || initializationStarted) return;
      initializationStarted = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const support = detectWebGLSupport();
      section.dataset.renderer = support ?? "canvas2d";
      if (!support) {
        setWebglFailed(true);
        return;
      }

      try {
        const { ArchitecturalScene: Scene } = await import("./ArchitecturalScene");
        if (cancelled) return;
        sceneRef.current = new Scene(canvas);
        const rect = section.getBoundingClientRect();
        const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
        sceneRef.current.setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
        setSceneReady(true);
      } catch {
        section.dataset.renderer = "canvas2d";
        setWebglFailed(true);
      }
    };

    const requestInitialization = () => {
      if (cancelled || initializationStarted || initializationFrame) return;
      initializationFrame = requestAnimationFrame(() => {
        initializationFrame = 0;
        void initializeScene();
      });
    };

    let ticking = false;
    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, -rect.top / travel));
      sceneRef.current?.setProgress(next);
      setProgress(next);
      ticking = false;
    };
    const onScroll = () => {
      requestInitialization();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      requestInitialization();
      sceneRef.current?.setPointer((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    };
    const pointerParallax = window.matchMedia("(pointer: fine)").matches;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      sceneRef.current?.setActive(false);
      setSceneReady(false);
      setWebglFailed(true);
    };
    const onContextRestored = () => {
      setWebglFailed(false);
      setSceneReady(true);
      sceneRef.current?.resize();
      updateActivity();
    };
    let sectionVisible = true;
    const updateActivity = () => sceneRef.current?.setActive(sectionVisible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      sectionVisible = entry.isIntersecting;
      updateActivity();
    }, { rootMargin: "25% 0px" });
    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        sceneRef.current?.resize();
        updateProgress();
      });
    };
    const visualViewport = window.visualViewport;
    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    visualViewport?.addEventListener("resize", onResize);
    if (pointerParallax) window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    document.addEventListener("visibilitychange", updateActivity);
    updateProgress();

    return () => {
      cancelled = true;
      cancelAnimationFrame(initializationFrame);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      visualViewport?.removeEventListener("resize", onResize);
      if (pointerParallax) window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", updateActivity);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  let activeChapter = 0;
  for (let index = 1; index < chapterStops.length; index += 1) {
    const midpoint = (chapterStops[index - 1] + chapterStops[index]) / 2;
    if (progress >= midpoint) activeChapter = index;
  }

  const scrollToProgress = useCallback((targetProgress: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: sectionTop + travel * targetProgress,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);

  const selectChapter = useCallback((index: number) => {
    scrollToProgress(chapterStops[Math.min(Math.max(index, 0), chapterStops.length - 1)]);
  }, [scrollToProgress]);

  const moveNext = useCallback(() => {
    if (activeChapter < chapterStops.length - 1) {
      selectChapter(activeChapter + 1);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop + section.offsetHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeChapter, selectChapter]);

  return (
    <section ref={sectionRef} className={styles.orbit} data-hero aria-labelledby="orbit-title">
      <h1 id="orbit-title" className="visually-hidden">Paper Brick Architects — Architecture in Orbit</h1>
      <div className={styles.sticky}>
        <SceneFallback progress={progress} active={!sceneReady || webglFailed} />
        <canvas ref={canvasRef} className={`${styles.canvas} ${sceneReady ? styles.canvasReady : ""}`} aria-hidden="true" />
        <ScrollNarrative
          activeChapter={activeChapter}
          progress={progress}
          onSelectChapter={selectChapter}
          onNext={moveNext}
        />
      </div>
    </section>
  );
}
