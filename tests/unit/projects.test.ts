import { describe, expect, it } from "vitest";
import { displayScope, getNextProject, projects } from "@/content/projects";

describe("canonical project data", () => {
  it("contains the complete ordered archive", () => {
    expect(projects).toHaveLength(13);
    expect(projects.map(({ slug }) => slug)).toEqual([
      "perumal", "ramkumar", "nisha", "alagiri", "balaji", "jvk", "tilak",
      "kannan", "dinesh", "kavitha", "praveen", "ramasamy", "pradeep",
    ]);
  });

  it("contains 73 unique images", () => {
    const paths = projects.flatMap((project) => project.gallery.map((image) => image.src));
    expect(paths).toHaveLength(73);
    expect(new Set(paths).size).toBe(73);
  });

  it("preserves unknown site areas as null", () => {
    expect(projects.filter((project) => project.siteAreaSqFt === null).map(({ slug }) => slug)).toEqual([
      "kavitha", "praveen", "ramasamy", "pradeep",
    ]);
  });

  it("cycles the next project and normalizes display scope", () => {
    expect(getNextProject(projects.at(-1)!).slug).toBe("perumal");
    expect(displayScope(projects.find((project) => project.slug === "alagiri")!.scope)).toBe("Architecture");
    expect(displayScope(projects[0].scope)).toBe("Architecture + Interiors");
  });
});
