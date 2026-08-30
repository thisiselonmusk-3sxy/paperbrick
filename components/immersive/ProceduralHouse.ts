import * as THREE from "three";
import { houseBoxSpecs, type HouseMaterialName } from "./house-geometry";

export type HouseMaterials = {
  plaster: THREE.MeshStandardMaterial;
  graphite: THREE.MeshStandardMaterial;
  timber: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  glow: THREE.MeshStandardMaterial;
  curtain: THREE.MeshStandardMaterial;
  metal: THREE.MeshStandardMaterial;
  landscape: THREE.MeshStandardMaterial;
  edges: THREE.LineBasicMaterial;
};

export type ProceduralHouse = {
  group: THREE.Group;
  materials: HouseMaterials;
};

function box(
  group: THREE.Group,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  edgeMaterial?: THREE.LineBasicMaterial,
) {
  const geometry = new THREE.BoxGeometry(...size);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  if (edgeMaterial) {
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), edgeMaterial);
    edge.position.copy(mesh.position);
    group.add(edge);
  }
  return mesh;
}

export function createProceduralHouse(): ProceduralHouse {
  const group = new THREE.Group();
  group.name = "Paper Brick conceptual house";

  const textureSize = 64;
  const plasterNoise = new Uint8Array(textureSize * textureSize);
  for (let index = 0; index < plasterNoise.length; index += 1) {
    const x = index % textureSize;
    const y = Math.floor(index / textureSize);
    plasterNoise[index] = 118 + Math.round(
      Math.sin(x * 1.73 + y * 2.41) * 14 + Math.sin(x * 0.31 - y * 0.47) * 9,
    );
  }
  const plasterBump = new THREE.DataTexture(plasterNoise, textureSize, textureSize, THREE.RedFormat);
  plasterBump.wrapS = THREE.RepeatWrapping;
  plasterBump.wrapT = THREE.RepeatWrapping;
  plasterBump.repeat.set(3, 3);
  plasterBump.needsUpdate = true;

  const timberData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y += 1) {
    for (let x = 0; x < textureSize; x += 1) {
      const offset = (y * textureSize + x) * 4;
      const grain = Math.sin(x * 0.48 + Math.sin(y * 0.13) * 2.2) * 14 + Math.sin(x * 0.09) * 9;
      timberData[offset] = 138 + grain;
      timberData[offset + 1] = 91 + grain * 0.48;
      timberData[offset + 2] = 55 + grain * 0.22;
      timberData[offset + 3] = 255;
    }
  }
  const timberMap = new THREE.DataTexture(timberData, textureSize, textureSize, THREE.RGBAFormat);
  timberMap.colorSpace = THREE.SRGBColorSpace;
  timberMap.wrapS = THREE.RepeatWrapping;
  timberMap.wrapT = THREE.RepeatWrapping;
  timberMap.repeat.set(2, 2);
  timberMap.anisotropy = 4;
  timberMap.needsUpdate = true;

  const plaster = new THREE.MeshStandardMaterial({
    color: 0xe9e7e0,
    roughness: 0.88,
    metalness: 0,
    bumpMap: plasterBump,
    bumpScale: 0.025,
  });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x202222, roughness: 0.64, metalness: 0.06 });
  const timber = new THREE.MeshStandardMaterial({
    color: 0xc2a284,
    map: timberMap,
    roughness: 0.68,
    metalness: 0,
  });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x8da1a5,
    roughness: 0.1,
    metalness: 0.08,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: 0x7d7466,
    emissive: 0xffb96a,
    emissiveIntensity: 0,
    roughness: 0.8,
  });
  const curtain = new THREE.MeshStandardMaterial({ color: 0xd7d0c4, transparent: true, opacity: 0, roughness: 1 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x9d9a91, roughness: 0.3, metalness: 0.86 });
  const landscape = new THREE.MeshStandardMaterial({ color: 0x596455, roughness: 0.96, metalness: 0 });
  const edges = new THREE.LineBasicMaterial({ color: 0x343434, transparent: true, opacity: 0.46 });

  const materialMap: Record<HouseMaterialName, THREE.Material> = {
    plaster,
    graphite,
    timber,
    glass,
    glow,
    curtain,
    metal,
    landscape,
  };
  Object.values(materialMap).forEach((material) => {
    material.dithering = true;
  });
  houseBoxSpecs.forEach((spec) => {
    const mesh = box(
      group,
      [...spec.size],
      [...spec.position],
      materialMap[spec.material],
      spec.edges ? edges : undefined,
    );
    if (spec.material === "glass" || spec.material === "glow" || spec.material === "curtain") {
      mesh.castShadow = false;
    }
    if (spec.material === "glass") mesh.renderOrder = 2;
  });

  return {
    group,
    materials: { plaster, graphite, timber, glass, glow, curtain, metal, landscape, edges },
  };
}
