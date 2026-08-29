import { access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { projects } from "../content/projects";

const root = process.cwd();
const galleryImages = projects.flatMap((project) => project.gallery);
const errors: string[] = [];

if (projects.length !== 13) errors.push(`Expected 13 projects, found ${projects.length}.`);
if (galleryImages.length !== 73) errors.push(`Expected 73 images, found ${galleryImages.length}.`);
if (new Set(galleryImages.map((image) => image.src)).size !== galleryImages.length) {
  errors.push("Project image paths are not unique.");
}

for (const image of galleryImages) {
  const file = path.join(root, "public", image.src);
  try {
    await access(file);
    const metadata = await sharp(file).metadata();
    if (metadata.width !== image.width || metadata.height !== image.height) {
      errors.push(`${image.src}: expected ${image.width}×${image.height}, found ${metadata.width}×${metadata.height}.`);
    }
    if (!image.alt.trim() || /^project image/i.test(image.alt)) {
      errors.push(`${image.src}: alt text is missing or generic.`);
    }
  } catch (error) {
    errors.push(`${image.src}: ${String(error)}`);
  }
}

for (const required of [
  "public/media/brand/logo-light.svg",
  "public/media/brand/logo-dark.svg",
  "public/media/video/house-film.mp4",
  "public/media/video/house-film-poster.jpg",
]) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`${required}: required asset is missing.`); }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${projects.length} projects and ${galleryImages.length} unique images.`);
