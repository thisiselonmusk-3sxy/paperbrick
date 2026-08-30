"use client";

import { useEffect, useRef } from "react";
import { houseBoxSpecs, type HouseMaterialName } from "./house-geometry";
import styles from "./architectural-orbit.module.css";

type Point3 = readonly [number, number, number];
type Face = { points: Point3[]; normal: Point3; material: HouseMaterialName; depth: number; edges: boolean };

const faceDefinitions: ReadonlyArray<{ indices: readonly number[]; normal: Point3 }> = [
  { indices: [4, 5, 6, 7], normal: [0, 0, 1] },
  { indices: [1, 0, 3, 2], normal: [0, 0, -1] },
  { indices: [5, 1, 2, 6], normal: [1, 0, 0] },
  { indices: [0, 4, 7, 3], normal: [-1, 0, 0] },
  { indices: [7, 6, 2, 3], normal: [0, 1, 0] },
  { indices: [0, 1, 5, 4], normal: [0, -1, 0] },
];

const baseColors: Record<HouseMaterialName, readonly [number, number, number, number]> = {
  plaster: [232, 230, 223, 1],
  graphite: [35, 37, 37, 1],
  timber: [145, 96, 58, 1],
  glass: [125, 153, 160, 0.4],
  glow: [255, 178, 98, 0.9],
  curtain: [215, 208, 196, 0.52],
  metal: [172, 169, 160, 1],
  landscape: [86, 104, 82, 1],
};

function vertices(size: Point3, position: Point3): Point3[] {
  const [sx, sy, sz] = size.map((value) => value / 2) as [number, number, number];
  const [x, y, z] = position;
  return [
    [x - sx, y - sy, z - sz], [x + sx, y - sy, z - sz],
    [x + sx, y + sy, z - sz], [x - sx, y + sy, z - sz],
    [x - sx, y - sy, z + sz], [x + sx, y - sy, z + sz],
    [x + sx, y + sy, z + sz], [x - sx, y + sy, z + sz],
  ];
}

function drawSoftwareHouse(canvas: HTMLCanvasElement, progress: number) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  const preferredRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  let bufferWidth = Math.round(width * preferredRatio);
  let bufferHeight = Math.round(height * preferredRatio);
  const maxPixelCount = 2560 * 1440;
  if (bufferWidth * bufferHeight > maxPixelCount) {
    const bufferScale = Math.sqrt(maxPixelCount / (bufferWidth * bufferHeight));
    bufferWidth = Math.round(bufferWidth * bufferScale);
    bufferHeight = Math.round(bufferHeight * bufferScale);
  }
  if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
    canvas.width = bufferWidth;
    canvas.height = bufferHeight;
  }
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  context.setTransform(bufferWidth / width, 0, 0, bufferHeight / height, 0, 0);
  const darkness = progress < 0.82 ? progress / 0.82 : (1 - progress) / 0.18;
  const backgroundLightness = 78 - darkness * 68;
  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, `hsl(205 8% ${backgroundLightness + 4}%)`);
  background.addColorStop(0.58, `hsl(205 7% ${backgroundLightness}%)`);
  background.addColorStop(1, `hsl(205 6% ${Math.max(7, backgroundLightness - 6)}%)`);
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  const ambientLight = context.createRadialGradient(
    width * (0.18 + progress * 0.64),
    height * 0.3,
    0,
    width * (0.18 + progress * 0.64),
    height * 0.3,
    Math.max(width, height) * 0.55,
  );
  ambientLight.addColorStop(0, "rgba(255, 255, 255, 0.24)");
  ambientLight.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = ambientLight;
  context.fillRect(0, 0, width, height);

  const angle = -0.42 + progress * 1.12;
  const pitch = -0.15 - Math.max(0, progress - 0.86) * 0.42;
  const cosY = Math.cos(angle);
  const sinY = Math.sin(angle);
  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  const cameraDistance = 19;
  const focal = Math.min(width, height) * (width < 700 ? 1.42 : 1.58);
  const centerX = width * (0.49 + Math.sin(progress * Math.PI) * 0.025);
  const centerY = height * (0.57 - Math.max(0, progress - 0.86) * 0.08);

  const transform = ([x, y, z]: Point3): Point3 => {
    const rotatedX = x * cosY + z * sinY;
    const rotatedZ = -x * sinY + z * cosY;
    const centeredY = y - 2.8;
    return [rotatedX, centeredY * cosX - rotatedZ * sinX, centeredY * sinX + rotatedZ * cosX];
  };
  const rotateNormal = ([x, y, z]: Point3): Point3 => {
    const rotatedX = x * cosY + z * sinY;
    const rotatedZ = -x * sinY + z * cosY;
    return [rotatedX, y * cosX - rotatedZ * sinX, y * sinX + rotatedZ * cosX];
  };
  const project = ([x, y, z]: Point3): readonly [number, number] => {
    const scale = focal / Math.max(7, cameraDistance - z);
    return [centerX + x * scale, centerY - y * scale];
  };

  context.strokeStyle = "rgba(50, 52, 52, 0.12)";
  context.lineWidth = 1;
  for (let grid = -18; grid <= 18; grid += 2) {
    const lines: Array<[Point3, Point3]> = [
      [[grid, -0.18, -18], [grid, -0.18, 18]],
      [[-18, -0.18, grid], [18, -0.18, grid]],
    ];
    lines.forEach(([start, end]) => {
      const [x1, y1] = project(transform(start));
      const [x2, y2] = project(transform(end));
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    });
  }

  const shadowCenter = project(transform([0, -0.13, 0]));
  context.save();
  context.filter = `blur(${Math.max(8, Math.min(width, height) * 0.018)}px)`;
  context.fillStyle = `rgba(0, 0, 0, ${0.2 + darkness * 0.08})`;
  context.beginPath();
  context.ellipse(
    shadowCenter[0],
    shadowCenter[1] + height * 0.015,
    Math.min(width * 0.33, 470),
    Math.min(height * 0.09, 76),
    angle * -0.25,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.restore();

  const faces: Face[] = [];
  houseBoxSpecs.forEach((box) => {
    if (box.material === "curtain" && progress < 0.68) return;
    const boxVertices = vertices(box.size, box.position).map(transform);
    faceDefinitions.forEach((definition) => {
      const normal = rotateNormal(definition.normal);
      if (normal[2] <= 0.015) return;
      const points = definition.indices.map((index) => boxVertices[index]);
      faces.push({
        points,
        normal,
        material: box.material,
        depth: points.reduce((sum, point) => sum + point[2], 0) / points.length,
        edges: Boolean(box.edges),
      });
    });
  });
  faces.sort((left, right) => left.depth - right.depth);

  faces.forEach((face) => {
    const [red, green, blue, alpha] = baseColors[face.material];
    const light = Math.max(0.48, Math.min(1.08, 0.7 + face.normal[0] * -0.12 + face.normal[1] * 0.28 + face.normal[2] * 0.14));
    const warmth = Math.max(0, (progress - 0.48) / 0.34);
    const glow = face.material === "glow" ? warmth : 0;
    const projected = face.points.map(project);
    const xs = projected.map(([x]) => x);
    const ys = projected.map(([, y]) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const faceGradient = context.createLinearGradient(minX, minY, maxX || minX + 1, maxY || minY + 1);
    const shade = (amount: number) => `rgba(${Math.min(255, red * light * amount + glow * 26)}, ${Math.min(255, green * light * amount + glow * 8)}, ${Math.min(255, blue * light * amount)}, ${alpha})`;
    faceGradient.addColorStop(0, shade(face.material === "glass" ? 1.22 : 1.08));
    faceGradient.addColorStop(0.55, shade(1));
    faceGradient.addColorStop(1, shade(face.material === "glass" ? 0.84 : 0.9));
    context.fillStyle = faceGradient;
    context.beginPath();
    projected.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
    context.closePath();
    context.fill();

    if (face.material === "timber" && maxX - minX > 8) {
      context.save();
      context.clip();
      context.strokeStyle = "rgba(63, 38, 22, 0.2)";
      context.lineWidth = 0.65;
      const spacing = Math.max(5, (maxX - minX) / 14);
      for (let grainX = minX + spacing; grainX < maxX; grainX += spacing) {
        context.beginPath();
        context.moveTo(grainX, minY);
        context.lineTo(grainX + Math.sin(grainX * 0.08) * 2, maxY);
        context.stroke();
      }
      context.restore();
    }

    if (face.material === "glass") {
      context.save();
      context.clip();
      const reflection = context.createLinearGradient(minX, maxY, maxX, minY);
      reflection.addColorStop(0, "rgba(255,255,255,0)");
      reflection.addColorStop(0.46, "rgba(255,255,255,0.04)");
      reflection.addColorStop(0.54, "rgba(255,255,255,0.3)");
      reflection.addColorStop(0.62, "rgba(255,255,255,0.03)");
      reflection.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = reflection;
      context.fillRect(minX, minY, maxX - minX, maxY - minY);
      context.restore();
    }

    if (face.edges || face.material === "glass" || face.material === "timber") {
      context.strokeStyle = face.material === "glass"
        ? "rgba(226, 242, 244, 0.42)"
        : "rgba(48, 49, 48, 0.5)";
      context.lineWidth = face.edges ? 0.85 : 0.55;
      context.beginPath();
      projected.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
      context.closePath();
      context.stroke();
    }
  });
}

export function SoftwareHouseCanvas({ progress, active }: { progress: number; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const progressRef = useRef(progress);
  const activeRef = useRef(active);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scheduleDraw = () => {
      if (!activeRef.current) return;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => drawSoftwareHouse(canvas, progressRef.current));
    };
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(canvas);
    scheduleDraw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
    activeRef.current = active;
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => drawSoftwareHouse(canvas, progress));
  }, [active, progress]);

  return <canvas ref={canvasRef} className={styles.softwareCanvas} aria-hidden="true" />;
}
