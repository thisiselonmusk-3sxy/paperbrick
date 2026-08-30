export type ModelMode = "procedural" | "gltf";

export const sceneConfig: {
  modelMode: ModelMode;
  modelUrl: string;
} = {
  modelMode: "procedural",
  modelUrl: "/media/3d/paperbrick-house.glb",
};

export const chapterStops = [0, 0.17, 0.37, 0.57, 0.77, 1] as const;
