import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/studio", "/services", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" as const : "yearly" as const,
    priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
  }));
  return [...pages, ...projects.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.8,
    images: [`${SITE_URL}${project.coverImage.src}`],
  }))];
}
