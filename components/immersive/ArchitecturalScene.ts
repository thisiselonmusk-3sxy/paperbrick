import * as THREE from "three";
import { cameraKeyframes, type SceneKeyframe } from "./camera-keyframes";
import { createProceduralHouse, type ProceduralHouse } from "./ProceduralHouse";
import { sceneConfig } from "./scene-config";

const smoothstep = (value: number) => value * value * (3 - 2 * value);
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

function sampleKeyframes(progress: number) {
  const nextIndex = cameraKeyframes.findIndex((frame) => frame.progress >= progress);
  if (nextIndex <= 0) return { from: cameraKeyframes[0], to: cameraKeyframes[0], amount: 0 };
  if (nextIndex === -1) {
    const last = cameraKeyframes.at(-1)!;
    return { from: last, to: last, amount: 0 };
  }
  const from = cameraKeyframes[nextIndex - 1];
  const to = cameraKeyframes[nextIndex];
  const amount = smoothstep((progress - from.progress) / (to.progress - from.progress));
  return { from, to, amount };
}

export class ArchitecturalScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  private house: ProceduralHouse;
  private sun = new THREE.DirectionalLight(0xffffff, 2.4);
  private fill = new THREE.DirectionalLight(0xb9c9d2, 0.42);
  private ambient = new THREE.HemisphereLight(0xdfe4e7, 0x32302c, 1.6);
  private warmLight = new THREE.PointLight(0xffb56e, 0, 13, 2);
  private frame = 0;
  private lastFrameTime = 0;
  private desiredProgress = 0;
  private progress = 0;
  private active = true;
  private proceduralActive = true;
  private reducedMotion: boolean;
  private pointer = new THREE.Vector2();
  private target = new THREE.Vector3();
  private background = new THREE.Color();
  private fromColor = new THREE.Color();
  private toColor = new THREE.Color();

  constructor(private canvas: HTMLCanvasElement) {
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactDevice = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
    const useAntialiasing = !this.reducedMotion
      && (window.devicePixelRatio || 1) <= 1.25
      && window.innerWidth >= 768;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: useAntialiasing,
      depth: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "default",
      stencil: false,
      precision: "highp",
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = !this.reducedMotion && !compactDevice && this.renderer.capabilities.isWebGL2;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene.fog = new THREE.FogExp2(0xe3e3df, 0.006);
    this.house = createProceduralHouse();
    this.scene.add(this.house.group);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0xaaa9a3, roughness: 0.98 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.18;
    ground.receiveShadow = true;
    this.scene.add(ground);

    this.sun.position.set(9, 14, 10);
    this.sun.castShadow = true;
    const shadowSize = this.renderer.capabilities.isWebGL2 && window.innerWidth >= 1100 ? 2048 : 1024;
    this.sun.shadow.mapSize.set(shadowSize, shadowSize);
    this.sun.shadow.bias = -0.00035;
    this.sun.shadow.normalBias = 0.028;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 40;
    this.sun.shadow.camera.left = -12;
    this.sun.shadow.camera.right = 12;
    this.sun.shadow.camera.top = 12;
    this.sun.shadow.camera.bottom = -12;
    this.sun.shadow.radius = 2;
    this.fill.position.set(-9, 7, -11);
    this.warmLight.position.set(2.5, 2.8, -0.8);
    this.scene.add(this.sun, this.fill, this.ambient, this.warmLight);

    this.addDrawingGrid();
    this.addContactShadow();
    this.resize();
    this.applyFrame(cameraKeyframes[0], cameraKeyframes[0], 0);
    void this.loadConfiguredModel();
    this.requestRender();
  }

  private addDrawingGrid() {
    const grid = new THREE.GridHelper(36, 36, 0x777777, 0xa4a4a0);
    const materials = Array.isArray(grid.material) ? grid.material : [grid.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.11;
    });
    grid.position.y = -0.165;
    this.scene.add(grid);
  }

  private addContactShadow() {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return;
    const gradient = context.createRadialGradient(size / 2, size / 2, 8, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.34)");
    gradient.addColorStop(0.55, "rgba(0, 0, 0, 0.13)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(15.5, 11),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        opacity: 0.7,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -0.145, 0);
    this.scene.add(shadow);
  }

  private async loadConfiguredModel() {
    if (sceneConfig.modelMode !== "gltf") return;
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
    new GLTFLoader().load(
      sceneConfig.modelUrl,
      (gltf) => {
        const replacement = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(replacement);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 10 / Math.max(size.x, size.z, size.y * 1.35, 1);
        replacement.scale.setScalar(scale);
        replacement.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
        replacement.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        this.scene.remove(this.house.group);
        this.disposeObject(this.house.group);
        this.proceduralActive = false;
        this.scene.add(replacement);
        this.requestRender();
      },
      undefined,
      () => undefined,
    );
  }

  setProgress(progress: number) {
    this.desiredProgress = THREE.MathUtils.clamp(progress, 0, 1);
    if (this.reducedMotion) this.progress = this.desiredProgress;
    this.requestRender();
  }

  setActive(active: boolean) {
    this.active = active;
    if (active) this.requestRender();
  }

  setPointer(x: number, y: number) {
    this.pointer.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
    this.requestRender();
  }

  resize = () => {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (!width || !height) return;
    const compactDevice = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, compactDevice ? 1.35 : 1.5);
    let drawingWidth = Math.floor(width * pixelRatio);
    let drawingHeight = Math.floor(height * pixelRatio);
    const maxPixelCount = compactDevice
      ? 1600 * 1200
      : this.renderer.capabilities.isWebGL2 && window.innerWidth >= 1100
        ? 2560 * 1440
        : 1920 * 1080;
    const pixelCount = drawingWidth * drawingHeight;
    if (pixelCount > maxPixelCount) {
      const scale = Math.sqrt(maxPixelCount / pixelCount);
      drawingWidth = Math.floor(drawingWidth * scale);
      drawingHeight = Math.floor(drawingHeight * scale);
    }
    if (this.canvas.width !== drawingWidth || this.canvas.height !== drawingHeight) {
      this.renderer.setSize(drawingWidth, drawingHeight, false);
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.requestRender();
  };

  private applyFrame(from: SceneKeyframe, to: SceneKeyframe, amount: number) {
    const position = from.position.map((value, index) => mix(value, to.position[index], amount)) as [number, number, number];
    const target = from.target.map((value, index) => mix(value, to.target[index], amount)) as [number, number, number];
    const pointerWeight = this.reducedMotion ? 0 : 0.22;
    this.camera.position.set(position[0] + this.pointer.x * pointerWeight, position[1] - this.pointer.y * 0.12, position[2]);
    this.target.set(target[0] + this.pointer.x * 0.08, target[1] - this.pointer.y * 0.05, target[2]);
    this.camera.lookAt(this.target);
    this.camera.fov = mix(from.fov, to.fov, amount);
    this.camera.updateProjectionMatrix();

    const warmth = mix(from.warmth, to.warmth, amount);
    const material = mix(from.material, to.material, amount);
    this.sun.intensity = mix(from.sun, to.sun, amount);
    this.sun.position.set(mix(12, -8, this.progress), mix(15, 7, this.progress), mix(10, -5, this.progress));
    this.ambient.intensity = mix(from.ambient, to.ambient, amount);
    this.fill.intensity = mix(0.5, 0.22, material);
    this.warmLight.intensity = warmth * 12;
    if (this.proceduralActive) {
      this.house.materials.glow.emissiveIntensity = warmth * 2.4;
      this.house.materials.curtain.opacity = Math.max(0, (this.progress - 0.68) * 1.6);
      this.house.materials.timber.color.setRGB(mix(0.73, 0.39, material), mix(0.72, 0.26, material), mix(0.69, 0.16, material));
      this.house.materials.graphite.color.setScalar(mix(0.62, 0.075, material));
      this.house.materials.edges.opacity = mix(from.edges, to.edges, amount);
      this.house.materials.glass.opacity = mix(0.18, 0.48, material);
      this.house.materials.landscape.color.setRGB(
        mix(0.45, 0.25, material),
        mix(0.48, 0.31, material),
        mix(0.43, 0.25, material),
      );
    }

    const colorStops = [0xe7e7e2, 0xbababa, 0x4b4c4d, 0x182027, 0x080d12, 0xbababa];
    const colorIndex = Math.min(Math.floor(this.progress * (colorStops.length - 1)), colorStops.length - 2);
    const colorAmount = smoothstep(this.progress * (colorStops.length - 1) - colorIndex);
    this.fromColor.setHex(colorStops[colorIndex]);
    this.toColor.setHex(colorStops[colorIndex + 1]);
    this.background.copy(this.fromColor).lerp(this.toColor, colorAmount);
    this.scene.background = this.background;
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.copy(this.background);
      this.scene.fog.density = mix(0.005, 0.012, Math.sin(this.progress * Math.PI));
    }
  }

  private requestRender = () => {
    if (!this.active || this.frame) return;
    this.frame = requestAnimationFrame(this.tick);
  };

  private tick = (time: number) => {
    this.frame = 0;
    if (!this.active) {
      return;
    }
    const delta = this.lastFrameTime ? Math.min((time - this.lastFrameTime) / 1000, 0.05) : 1 / 60;
    this.lastFrameTime = time;
    this.progress = this.reducedMotion
      ? this.desiredProgress
      : THREE.MathUtils.damp(this.progress, this.desiredProgress, 5.8, delta);
    const { from, to, amount } = sampleKeyframes(this.progress);
    this.applyFrame(from, to, amount);
    this.renderer.render(this.scene, this.camera);
    if (Math.abs(this.progress - this.desiredProgress) > 0.0001) this.requestRender();
  };

  private disposeObject(object: THREE.Object3D) {
    object.traverse((node) => {
      if (!(node instanceof THREE.Mesh) && !(node instanceof THREE.LineSegments)) return;
      node.geometry?.dispose();
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) value.dispose();
        });
        material.dispose();
      });
    });
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.disposeObject(this.scene);
    this.renderer.dispose();
  }
}
