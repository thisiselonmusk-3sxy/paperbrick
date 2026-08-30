"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./motion.module.css";

const REVEAL_SELECTOR = "[data-reveal], [data-parallax], [data-section-progress], [data-motion-pause-offscreen]";

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches) {
      root.dataset.motionReady = "reduced";
      document.querySelectorAll<HTMLElement>("[data-motion-state]").forEach((element) => {
        element.dataset.motionState = "visible";
      });
      return;
    }

    const parallaxElements = new Set<HTMLElement>();
    const progressElements = new Set<HTMLElement>();
    let animationFrame = 0;

    const updateContinuousMotion = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const deviceScale = window.innerWidth <= 767 || !finePointer.matches
        ? 0
        : window.innerWidth <= 1024 ? 0.5 : 1;

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const relativeCenter = (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
        const configured = Number.parseFloat(getComputedStyle(element).getPropertyValue("--parallax-strength")) || 18;
        const offset = Math.max(-configured, Math.min(configured, relativeCenter * configured * 2)) * deviceScale;
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });

      progressElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const travel = Math.max(rect.height + viewportHeight, 1);
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / travel));
        element.style.setProperty("--section-progress", progress.toFixed(4));
      });

      const indicator = document.querySelector<HTMLElement>("[data-selected-progress]");
      if (indicator) {
        const projects = [...document.querySelectorAll<HTMLElement>("[data-selected-project]")];
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        projects.forEach((project, index) => {
          const rect = project.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });
        indicator.textContent = `${String(nearestIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
      }
    };

    const scheduleContinuousMotion = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateContinuousMotion);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (element.dataset.reveal) element.dataset.motionState = "visible";
          if (element.dataset.parallax) parallaxElements.add(element);
          if (element.dataset.sectionProgress !== undefined) progressElements.add(element);
        } else {
          parallaxElements.delete(element);
          progressElements.delete(element);
          if (element.dataset.motionPauseOffscreen !== undefined) {
            element.dispatchEvent(new CustomEvent("motion:offscreen"));
          }
          if (element.dataset.revealRepeat === "true") element.dataset.motionState = "waiting";
        }

        const oneTimeReveal = entry.isIntersecting
          && element.dataset.reveal
          && element.dataset.revealRepeat !== "true"
          && !element.dataset.parallax
          && element.dataset.sectionProgress === undefined
          && element.dataset.motionPauseOffscreen === undefined;
        if (oneTimeReveal) observer.unobserve(element);
      });
      scheduleContinuousMotion();
    }, { rootMargin: "14% 0px 14%", threshold: [0, 0.08, 0.35] });

    const registered = new WeakSet<Element>();
    const register = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        if (element.dataset.reveal) element.dataset.motionState = "waiting";
        observer.observe(element);
      });
    };

    register(document);
    root.dataset.motionReady = "true";

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches(REVEAL_SELECTOR) && !registered.has(node)) {
            if (node.dataset.reveal) node.dataset.motionState = "waiting";
            registered.add(node);
            observer.observe(node);
          }
          register(node);
        }
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", scheduleContinuousMotion, { passive: true });
    window.addEventListener("resize", scheduleContinuousMotion);
    scheduleContinuousMotion();

    return () => {
      cancelAnimationFrame(animationFrame);
      mutationObserver.disconnect();
      observer.disconnect();
      parallaxElements.clear();
      progressElements.clear();
      window.removeEventListener("scroll", scheduleContinuousMotion);
      window.removeEventListener("resize", scheduleContinuousMotion);
    };
  }, [pathname]);

  return <span className={styles.controller} aria-hidden="true" />;
}
