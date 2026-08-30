import { projectsBySlug } from "./projects";

export const services = [
  {
    id: "architecture",
    number: "01",
    title: "Architecture",
    copy: "Architectural consultancy for residential projects, developing the building’s spatial organisation, form and character.",
    image: projectsBySlug.get("jvk")!.coverImage,
  },
  {
    id: "interiors",
    number: "02",
    title: "Interiors",
    copy: "Interior design that considers rooms, materials, built-in elements and everyday use as a connected environment.",
    image: projectsBySlug.get("perumal")!.gallery[5],
  },
  {
    id: "integrated",
    number: "03",
    title: "Architecture + Interiors",
    copy: "An integrated approach that carries one spatial and material language from the building shell into its interior spaces.",
    image: projectsBySlug.get("ramkumar")!.gallery[7],
  },
] as const;
