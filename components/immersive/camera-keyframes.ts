import { chapterStops } from "./scene-config";

export type SceneKeyframe = {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  sun: number;
  ambient: number;
  warmth: number;
  material: number;
  edges: number;
};

export const cameraKeyframes: SceneKeyframe[] = [
  { progress: chapterStops[0], position: [14.6, 7.2, 17.8], target: [0, 2.35, 0], fov: 37, sun: 2.35, ambient: 1.85, warmth: 0, material: 0, edges: 0.46 },
  { progress: chapterStops[1], position: [17.2, 6.8, 10.8], target: [0.25, 2.45, 0], fov: 36, sun: 2.15, ambient: 1.48, warmth: 0.05, material: 0.28, edges: 0.38 },
  { progress: chapterStops[2], position: [13.8, 5.4, 11.2], target: [0.8, 2.25, 0.2], fov: 35, sun: 1.9, ambient: 1.12, warmth: 0.18, material: 0.74, edges: 0.24 },
  { progress: chapterStops[3], position: [14.8, 5.8, -8.6], target: [0, 2.3, -0.15], fov: 37, sun: 1.3, ambient: 0.7, warmth: 0.58, material: 1, edges: 0.1 },
  { progress: chapterStops[4], position: [1.4, 5.5, -15.8], target: [-0.4, 2.25, 0], fov: 36, sun: 0.72, ambient: 0.48, warmth: 1, material: 1, edges: 0.04 },
  { progress: chapterStops[5], position: [-13.8, 11.8, 12.6], target: [0, 2.05, 0], fov: 39, sun: 1.12, ambient: 1.02, warmth: 0.62, material: 1, edges: 0.02 },
];
