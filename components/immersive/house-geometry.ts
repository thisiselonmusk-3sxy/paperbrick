export type HouseMaterialName =
  | "plaster"
  | "graphite"
  | "timber"
  | "glass"
  | "glow"
  | "curtain"
  | "metal"
  | "landscape";

export type HouseBoxSpec = {
  size: readonly [number, number, number];
  position: readonly [number, number, number];
  material: HouseMaterialName;
  edges?: boolean;
};

const shell: HouseBoxSpec[] = [
  // Continuous base and ground-floor west wing.
  { size: [12.6, 0.32, 8.6], position: [0, 0.04, 0], material: "graphite" },
  { size: [6.8, 3.4, 0.24], position: [-2.1, 1.85, -1.55], material: "plaster", edges: true },
  { size: [0.24, 3.4, 4.8], position: [-5.38, 1.85, 0.85], material: "plaster", edges: true },
  { size: [0.24, 3.4, 4.8], position: [1.18, 1.85, 0.85], material: "plaster", edges: true },
  { size: [1.4, 3.4, 0.24], position: [-4.68, 1.85, 3.25], material: "plaster", edges: true },
  { size: [2.2, 3.4, 0.24], position: [0.08, 1.85, 3.25], material: "plaster", edges: true },
  { size: [2.84, 0.4, 0.24], position: [-2.5, 3.35, 3.25], material: "plaster", edges: true },

  // East wing is assembled around a correctly recessed entrance and side window.
  { size: [4.08, 3.18, 0.24], position: [3.2, 1.74, -3.05], material: "plaster", edges: true },
  { size: [4.08, 0.38, 5.0], position: [3.2, 3.28, -0.55], material: "plaster", edges: true },
  { size: [1.2, 2.8, 0.24], position: [1.75, 1.6, 1.93], material: "plaster", edges: true },
  { size: [1.7, 2.8, 0.24], position: [4.38, 1.6, 1.93], material: "plaster", edges: true },
  { size: [0.24, 3.18, 1.5], position: [5.23, 1.74, -2.3], material: "plaster", edges: true },
  { size: [0.24, 3.18, 1.36], position: [5.23, 1.74, 1.25], material: "plaster", edges: true },

  // Upper volume: a true ribbon-window opening rather than glazing over a solid cube.
  { size: [6.5, 2.62, 0.22], position: [0.95, 4.96, -1.9], material: "plaster", edges: true },
  { size: [0.22, 2.62, 3.4], position: [-2.19, 4.96, -0.2], material: "plaster", edges: true },
  { size: [0.22, 2.62, 3.4], position: [4.09, 4.96, -0.2], material: "plaster", edges: true },
  { size: [6.08, 0.88, 0.22], position: [0.95, 4.1, 1.5], material: "plaster", edges: true },
  { size: [6.08, 0.66, 0.22], position: [0.95, 5.96, 1.5], material: "plaster", edges: true },

  // Roof, cantilevers and entrance canopies align to the structural grid.
  { size: [7.25, 0.18, 4.05], position: [0.95, 6.38, -0.2], material: "graphite", edges: true },
  { size: [4.35, 0.16, 2.45], position: [-3.18, 3.66, 0.88], material: "graphite", edges: true },
  { size: [2.25, 0.15, 2.05], position: [2.96, 3.47, 2.25], material: "graphite", edges: true },
];

const openingsAndJoinery: HouseBoxSpec[] = [
  // West façade glazing and frame.
  { size: [2.7, 2.76, 0.07], position: [-2.5, 1.76, 3.39], material: "glow" },
  { size: [2.66, 2.72, 0.06], position: [-2.5, 1.76, 3.44], material: "glass" },
  { size: [0.07, 2.8, 0.1], position: [-3.91, 1.76, 3.5], material: "graphite" },
  { size: [0.07, 2.8, 0.1], position: [-1.09, 1.76, 3.5], material: "graphite" },
  { size: [0.06, 2.72, 0.1], position: [-2.5, 1.76, 3.5], material: "graphite" },
  { size: [2.86, 0.07, 0.1], position: [-2.5, 0.37, 3.5], material: "graphite" },
  { size: [2.86, 0.07, 0.1], position: [-2.5, 3.15, 3.5], material: "graphite" },

  // Main door, flush frame, threshold and handle.
  { size: [1.08, 2.56, 0.1], position: [2.96, 1.59, 2.07], material: "timber", edges: true },
  { size: [0.08, 2.66, 0.12], position: [2.36, 1.59, 2.1], material: "graphite" },
  { size: [0.08, 2.66, 0.12], position: [3.56, 1.59, 2.1], material: "graphite" },
  { size: [1.28, 0.08, 0.12], position: [2.96, 2.95, 2.1], material: "graphite" },
  { size: [0.04, 0.16, 0.09], position: [3.34, 1.55, 2.17], material: "metal" },
  { size: [1.72, 0.12, 0.62], position: [2.96, 0.23, 2.42], material: "plaster", edges: true },
  { size: [2.15, 0.12, 0.66], position: [2.96, 0.12, 2.98], material: "plaster", edges: true },

  // East-side double-height glazing with aligned jambs and mullions.
  { size: [0.07, 2.72, 1.92], position: [5.35, 1.76, -0.46], material: "glow" },
  { size: [0.06, 2.68, 1.88], position: [5.4, 1.76, -0.46], material: "glass" },
  { size: [0.1, 2.78, 0.07], position: [5.45, 1.76, -1.47], material: "graphite" },
  { size: [0.1, 2.78, 0.07], position: [5.45, 1.76, 0.55], material: "graphite" },
  { size: [0.1, 2.7, 0.06], position: [5.45, 1.76, -0.46], material: "graphite" },
  { size: [0.1, 0.07, 2.04], position: [5.45, 0.37, -0.46], material: "graphite" },
  { size: [0.1, 0.07, 2.04], position: [5.45, 3.15, -0.46], material: "graphite" },

  // Upper ribbon glazing and expressed mullions.
  { size: [5.94, 1.0, 0.07], position: [0.95, 5.0, 1.63], material: "glow" },
  { size: [5.9, 0.96, 0.06], position: [0.95, 5.0, 1.68], material: "glass" },
  { size: [0.06, 1.0, 0.1], position: [-2.02, 5.0, 1.73], material: "graphite" },
  { size: [0.06, 1.0, 0.1], position: [-0.54, 5.0, 1.73], material: "graphite" },
  { size: [0.06, 1.0, 0.1], position: [0.95, 5.0, 1.73], material: "graphite" },
  { size: [0.06, 1.0, 0.1], position: [2.44, 5.0, 1.73], material: "graphite" },
  { size: [0.06, 1.0, 0.1], position: [3.92, 5.0, 1.73], material: "graphite" },
];

const siteDetails: HouseBoxSpec[] = [
  { size: [3.2, 0.28, 1.72], position: [-4.15, 0.3, -3.2], material: "plaster", edges: true },
  { size: [2.75, 0.18, 1.28], position: [-4.15, 0.54, -3.2], material: "landscape" },
  { size: [0.18, 1.14, 5.15], position: [-5.72, 0.74, -0.72], material: "plaster", edges: true },
  { size: [3.75, 0.13, 1.2], position: [3.88, 0.27, 3.34], material: "landscape" },
  { size: [0.07, 2.72, 1.86], position: [5.25, 1.76, -0.46], material: "curtain" },
  { size: [1.8, 0.38, 0.72], position: [1.3, 0.58, -1.18], material: "graphite" },
  { size: [0.68, 0.68, 0.68], position: [0.02, 0.72, -1.3], material: "graphite" },
];

const timberScreen: HouseBoxSpec[] = Array.from({ length: 10 }, (_, index) => ({
  size: [0.09, 2.82, 0.2],
  position: [-5.08 + index * 0.17, 1.78, 3.48],
  material: "timber",
}));

const stair: HouseBoxSpec[] = Array.from({ length: 8 }, (_, index) => ({
  size: [0.88, 0.16, 0.44],
  position: [4.7, 0.68 + index * 0.3, -1.22 + index * 0.21],
  material: "graphite",
}));

export const houseBoxSpecs: readonly HouseBoxSpec[] = [
  ...shell,
  ...openingsAndJoinery,
  ...siteDetails,
  ...timberScreen,
  ...stair,
];
