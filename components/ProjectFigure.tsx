import Image from "next/image";
import Link from "next/link";
import { displayScope } from "@/content/projects";
import type { Project } from "@/content/types";
import styles from "./ProjectFigure.module.css";

type ProjectFigureProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
  showDetail?: boolean;
};

export function ProjectFigure({
  project,
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
  showDetail = true,
}: ProjectFigureProps) {
  const image = project.coverImage;
  return (
    <figure className={styles.figure} data-category={project.category} data-status={project.status}>
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.name} project`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      </Link>
      <figcaption className={styles.caption}>
        <div>
          <span>{project.name}</span>
          <span>{project.location}</span>
        </div>
        {showDetail && (
          <div className={styles.detail}>
            <span>{displayScope(project.scope)}</span>
            <span>{project.status}</span>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
